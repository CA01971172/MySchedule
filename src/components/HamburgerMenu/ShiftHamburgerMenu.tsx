import React, { useState } from 'react';
import HamburgerMenuHeader from "./HamburgerMenuHeader"

export function ShiftHamburgerMenu() {
  const [checkboxes, setCheckboxes] = useState([false, false]);
  const [numberInput, setNumberInput] = useState('');

  const toggleCheckbox = (index: number) => {
    setCheckboxes(
      checkboxes.map((isChecked, i) => (i === index ? !isChecked : isChecked))
    );
  };

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


