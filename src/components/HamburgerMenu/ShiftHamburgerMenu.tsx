import React, { useContext } from 'react';
import HamburgerMenuHeader from "./HamburgerMenuHeader"
import { CalendarContext } from '../../provider/CalendarProvider';
import { ShiftContext } from '../../provider/ShiftProvider';

export function ShiftHamburgerMenu() {
    // バイトシフトのドロワーメニュー用Context
    const {keptShifts, setKeptShifts} = useContext(CalendarContext);

    // バイトのシフトのデータを管理する
    const [shifts, setShifts] = useContext(ShiftContext);

    // 指定の週のシフトのデータをクリップボード(？)に保存する
    function getWeekShift(year: number, month: number, week: number): void{
      const startDate: Date = new Date(year)
    } 

  return (
    <div>
      <HamburgerMenuHeader/>
      <p className='text-center  border-bottom'>週単位シフトコピペ</p>
      <div >
        <div className="p-3 d-flex justify-content-center border-bottom ">
          <button type="button" className="btn btn-outline-dark w-25 me-3">コピー</button>
          <button type="button" className="btn btn-outline-dark w-25 ">貼り付け</button>
        </div>
        <div className="p-3 d-flex justify-content-center border-bottom ">
          <button type="button" className="btn btn-outline-dark w-25 me-3">コピー</button>
          <button type="button" className="btn btn-outline-dark w-25 ">貼り付け</button>
        </div>
        <div className="p-3 d-flex justify-content-center border-bottom ">
          <button type="button" className="btn btn-outline-dark w-25 me-3">コピー</button>
          <button type="button" className="btn btn-outline-dark w-25 ">貼り付け</button>
        </div>
        <div className="p-3 d-flex justify-content-center border-bottom ">
          <button type="button" className="btn btn-outline-dark w-25 me-3">コピー</button>
          <button type="button" className="btn btn-outline-dark w-25 ">貼り付け</button>
        </div>
        <div className="p-3 d-flex justify-content-center border-bottom ">
          <button type="button" className="btn btn-outline-dark w-25 me-3">コピー</button>
          <button type="button" className="btn btn-outline-dark w-25 ">貼り付け</button>
        </div>
        <div className="p-3 d-flex justify-content-center border-bottom ">
          <button type="button" className="btn btn-outline-dark w-25 me-3">コピー</button>
          <button type="button" className="btn btn-outline-dark w-25 ">貼り付け</button>
        </div>
      </div>
    </div>
  );
}

export default ShiftHamburgerMenu;