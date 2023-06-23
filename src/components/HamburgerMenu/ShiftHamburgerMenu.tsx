import React, { useContext } from 'react';
import HamburgerMenuHeader from "./HamburgerMenuHeader"
import { CalendarContext } from '../../provider/CalendarProvider';
import { ShiftContext } from '../../provider/ShiftProvider';
import CopyPasteButtonColumn from "./CopyPasteButtonColumn"
import { Shift, Shifts } from '../../utils/types';
import ShiftDbController from '../../utils/DbController/ShiftDbController';

// Dateオブジェクトを別の週のDateオブジェクトに変換する関数
function getDateInDifferentWeek(date: Date, year: number, month: number, week: number) {
  // 一旦指定された週のデータを取得する
  const firstDayOfWeek: number = 1 + (week - 1) * 7; // 指定された週の日を取得する(1, 8, 15...)  
  const firstDate: Date = new Date(year, month - 1, firstDayOfWeek); // 指定された年と月で新しいDateオブジェクトを作成する
  const firstWeekday: number = firstDate.getDay(); // 指定された週の日(1, 8, 15...)の曜日を取得する

  // 指定された週の日曜日の日のデータを取得する
  const firstSunday: number = firstDayOfWeek - firstWeekday; // 指定された週の最初の日曜日の日を取得する
  
  // 受け取ったDateオブジェクトのデータを取得する
  const receivedWeekday: number = date.getDay(); // 受け取ったDateオブジェクトの曜日を取得する

  // 指定された週内に移した、受け取ったDateオブジェクトのデータを取得する
  const dayInTheWeek: number = firstSunday + receivedWeekday; // 指定された週の受け取ったDateオブジェクトの曜日の日を取得する
  date.setFullYear(year);
  date.setMonth(month - 1);
  const result: Date = date;
  result.setDate(dayInTheWeek);
  return result;
}

export function ShiftHamburgerMenu() {
  // バイトシフトのドロワーメニュー用Context
  const {keptShifts, setKeptShifts, focusYear, focusMonth, calendarHeight} = useContext(CalendarContext);
  // バイトのシフトのデータを管理する
  const [shifts, setShifts] = useContext(ShiftContext);

  // 指定の週のシフトのデータを取得する
  function getWeekShift(week: number): Shifts{
    const result: Shifts = {}
    const firstDay: number = 1 + (week - 1) * 7; // 第n週目の日
    const firstDate: Date = new Date(focusYear, focusMonth - 1, firstDay); // 第n週目の日のDate
    const firstSunday: number = firstDay - firstDate.getDay(); // 第n週目の日曜日
    const startDate: Date = new Date(focusYear, focusMonth - 1, firstSunday); // 第n週目の日曜日のDate
    const startTime: number = startDate.getTime();
    const endDate: Date = new Date(focusYear, focusMonth - 1, firstSunday + 7); // 第n+1週目の日曜日のDate
    const endTime: number = endDate.getTime();
    for(const key in shifts){
      const value: Shift = shifts[key];
      const valueTime: number = value.startTime;
      if((valueTime >= startTime) && (valueTime < endTime)){
        result[key] = value;
      }
    }
    return result;
  }
  // 指定の週のシフトのデータをクリップボード(？)に保存する 
  function copyWeekShift(week: number): void{
    const weekShift: Shifts = getWeekShift(week);
    setKeptShifts(weekShift);
  }

  // 指定の週のシフトのデータが削除されたデータを取得する
  async function deleteWeekShift(week: number): Promise<void>{
    const deleteTargets: Shifts = getWeekShift(week);
    const deleteId: string[] = Object.keys(deleteTargets);
    deleteId.forEach((id: string) => {
      ShiftDbController.deleteShift(id); // データベースのシフトデータを削除する
      setShifts((prev) => { // useStateのシフトデータを削除する
        const deletedShifts = { ...prev };
        delete deletedShifts[id];
        return deletedShifts;
      });
    });
  }
  // クリップボード(？)に保存された指定の週のシフトのデータを指定の週に作成したデータを取得する
  async function createWeekShift(week: number, keptData: Shifts): Promise<void>{
    for(const key in keptData){
      // シフトのデータを取得する
      const value: Shift = keptData[key];
      const startTime: number = value.startTime;
      const startDate: Date = new Date(startTime);
      const endTime: number = value.endTime;
      // 取得したシフトのデータを別の週のデータに変換する
      const startDateInTheWeek: Date = getDateInDifferentWeek(startDate, focusYear, focusMonth, week);
      const startTimeInTheWeek: number = startDateInTheWeek.getTime();
      const timeDifference: number = startTimeInTheWeek - startTime; // シフトのデータと、指定された週のデータとの差
      const endTimeInTheWeek: number = endTime + timeDifference;
      const newShift: Shift = {
        startTime: startTimeInTheWeek,
        endTime: endTimeInTheWeek,
        breakTime: value.breakTime
      }
      // データベースのシフトデータを作成する
      // 作成したデータのキーを取得する
      let newId: string = await ShiftDbController.createShift(newShift, true);
      console.log("newId:",newId)
      setShifts((prev) => { // useStateのシフトデータを作成する
        const newShifts: Shifts = Object.assign(prev, newShift);
        console.log("set", newShift)
        console.log("newShifts", newShifts)
        return newShifts;
      });
    }
    return;
  }
  React.useEffect(()=>{
    console.log("changed.",shifts)
  },[shifts])
  // クリップボード(？)に保存された指定の週のシフトのデータを指定の週に貼り付け(上書き)する
  async function pasteWeekShift(week: number): Promise<void>{
    if(keptShifts === null){
      window.alert("シフトのデータがコピーされていません。")
    }else{
      deleteWeekShift(week);
      createWeekShift(week, keptShifts);
    }
  }

  return (
  <div className="d-flex flex-column align-items-center justify-content-center h-100">
    <HamburgerMenuHeader/>
    <div className="bg-body flex-grow-1 border-bottom w-100 d-flex align-items-center justify-content-center">週単位シフトコピペ</div>
    <div className="bg-body bg-opacity-25 container" style={{height: `${calendarHeight}px`}}>
      <CopyPasteButtonColumn week={1} copyWeekShift={copyWeekShift} pasteWeekShift={pasteWeekShift}/>
      <CopyPasteButtonColumn week={2} copyWeekShift={copyWeekShift} pasteWeekShift={pasteWeekShift}/>
      <CopyPasteButtonColumn week={3} copyWeekShift={copyWeekShift} pasteWeekShift={pasteWeekShift}/>
      <CopyPasteButtonColumn week={4} copyWeekShift={copyWeekShift} pasteWeekShift={pasteWeekShift}/>
      <CopyPasteButtonColumn week={5} copyWeekShift={copyWeekShift} pasteWeekShift={pasteWeekShift}/>
      <CopyPasteButtonColumn week={6} copyWeekShift={copyWeekShift} pasteWeekShift={pasteWeekShift}/>
    </div>
  </div>
  );
}

export default ShiftHamburgerMenu;