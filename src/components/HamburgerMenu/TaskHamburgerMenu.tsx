import React, { useState } from 'react';
import HamburgerMenuHeader from "./HamburgerMenuHeader"

export function TaskHamburgerMenu() {
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
      <div className='p-2'>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault1"
            checked={checkboxes[0]}
            onChange={() => toggleCheckbox(0)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            過去の予定を非表示にする
          </label>
        </div>

        <button className="btn btn-outline-dark" style={{ display: 'block', margin: '0 auto' }}>
          一括削除
        </button>
      </div>
    </div>  
  );
}

export default TaskHamburgerMenu;


