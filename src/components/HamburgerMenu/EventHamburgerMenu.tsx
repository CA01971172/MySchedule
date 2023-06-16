import React, { useState } from 'react';
import HamburgerMenuHeader from "./HamburgerMenuHeader"

export function EventHamburgerMenu() {
  const [checkboxes, setCheckboxes] = useState<boolean[]>([false, false]);
  const [numberInput, setNumberInput] = useState<number>(3);

  const toggleCheckbox = (index: number) => {
    setCheckboxes(
      checkboxes.map((isChecked, i) => (i === index ? !isChecked : isChecked))
    );
  };

  const handleNumberInputChange = (event: any) => {
    setNumberInput(event.target.value);
  };

  return (
      <div>
        <HamburgerMenuHeader/>
        <div className='p-2'>
          <div className=" mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault1"
              checked={checkboxes[0]}
              onChange={() => toggleCheckbox(0)}
            />
            <label className="form-check-label " htmlFor="flexCheckDefault1">
              提出期限が迫ったら、アラートメールで通知する
            </label>
          </div>

          <div className='mb-3'>
            <input
              type="number"
              name="example1"
              value={numberInput}
              onChange={handleNumberInputChange}
            />

            <label>
              日前に通知する
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault2"
              checked={checkboxes[1]}
              onChange={() => toggleCheckbox(1)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              提出期限を過ぎた課題を自動で削除する
            </label>
          </div>

          <button className="btn btn-outline-dark" style={{ display: 'block', margin: '0 auto' }}>
            一括削除
          </button>
        </div>
      </div>
  );
}

export default EventHamburgerMenu;
