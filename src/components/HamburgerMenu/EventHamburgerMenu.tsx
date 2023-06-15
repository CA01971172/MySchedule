import React, { useState } from 'react';

export function EventHamburgerMenu() {
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
            id="flexCheckDefault1"
            checked={checkboxes[0]}
            onChange={() => toggleCheckbox(0)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault1">
            提出期限が迫ったら、アラートメールで通知する
          </label>
        </div>

        <input
          type="number"
          name="example1"
          value={numberInput}
          onChange={handleNumberInputChange}
        />

        <div className="form-check">
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
    </main>
  );
}

export default EventHamburgerMenu;
