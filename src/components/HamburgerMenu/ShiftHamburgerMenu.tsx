import React, { useContext } from 'react';
import HamburgerMenuHeader from "./HamburgerMenuHeader"
import { CalendarContext } from '../../provider/CalendarProvider';
import { ShiftContext } from '../../provider/ShiftProvider';
import CopyPasteButtonColumn from "./CopyPasteButtonColumn"
import { Shift, Shifts } from '../../utils/types';

export function ShiftHamburgerMenu() {
  // バイトシフトのドロワーメニュー用Context
  const {keptShifts, setKeptShifts, focusYear, focusMonth, calendarHeight} = useContext(CalendarContext);
  // バイトのシフトのデータを管理する
  const [shifts, setShifts] = useContext(ShiftContext);

  // 指定の週のシフトのデータをクリップボード(？)に保存する
  function getWeekShift(week: number): Shifts{
    const result: Shifts = {}
    const firstDay: number = 1 + (week - 1) * 7; // 第n週目の日
    const firstDate: Date = new Date(focusYear, focusMonth - 1, firstDay); // 第n週目の日のDate
    const firstSunday: number = firstDay - firstDate.getDay(); // 第n週目の日曜日
    const startDate: Date = new Date(focusYear, focusMonth - 1, firstSunday); // 第n週目の日曜日のDate
    const startTime: number = startDate.getTime();
    const endDate: Date = new Date(focusYear, focusMonth - 1, firstSunday + 7); // 第n+1週目の日曜日のDate
    const endTime: number = endDate.getTime();
    Object.keys(shifts).map((key, index) => {
      const value: Shift = shifts[key];
      const valueTime: number = value.startTime;
      if((valueTime >= startTime) && (valueTime < endTime)){
        result.key = value;
      }
    })
    return result;
  }

  return (
  <div className="d-flex flex-column align-items-center justify-content-center h-100">
    <HamburgerMenuHeader/>
    <div className="flex-grow-1 border-bottom w-100 d-flex align-items-center justify-content-center">週単位シフトコピペ</div>
    <div className="container" style={{height: `${calendarHeight}px`}}>
      <CopyPasteButtonColumn week={1} getWeekShift={getWeekShift}/>
      <CopyPasteButtonColumn week={2} getWeekShift={getWeekShift}/>
      <CopyPasteButtonColumn week={3} getWeekShift={getWeekShift}/>
      <CopyPasteButtonColumn week={4} getWeekShift={getWeekShift}/>
      <CopyPasteButtonColumn week={5} getWeekShift={getWeekShift}/>
      <CopyPasteButtonColumn week={6} getWeekShift={getWeekShift}/>
    </div>
  </div>
  );
}

export default ShiftHamburgerMenu;