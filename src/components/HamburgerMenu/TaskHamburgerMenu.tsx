import React, { useState } from 'react';

export function TaskHamburgerMenu() {
  const [checkboxes, setCheckboxes] = useState([false, false]);
  const [numberInput, setNumberInput] = useState('');

  const toggleCheckbox = (index: number) => {
    setCheckboxes(
      checkboxes.map((isChecked, i) => (i === index ? !isChecked : isChecked))
    );
  };

  const handleNumberInputChange = (event: any) => {
    setNumberInput(event.target.value);
  };

  return (
    <main>
      <div>
        <div className="d-flex justify-content-between border-bottom border-secondary">
          <button className="btn">×</button>
          <button type="button" className="btn btn-outline-danger">Logout</button>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
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
    </main>
  );
}

export default TaskHamburgerMenu;
