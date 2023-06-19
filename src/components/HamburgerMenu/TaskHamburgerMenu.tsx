import React, { useState } from 'react';
import HamburgerMenuHeader from "./HamburgerMenuHeader"

export function TaskHamburgerMenu() {
  const [checkboxes, setCheckboxes] = useState<boolean[]>([false, false]);
  const [numberInput, setNumberInput] = useState<number>(3);

  const toggleCheckbox = (index: number) => {
    setCheckboxes(
      checkboxes.map((isChecked, i) => (i === index ? !isChecked : isChecked))
    );
  };

  const handleNumberInputChange = (event: any) => {
    const receive: string = event.target.value;
    const textValue = receive.replace(/[０-９．]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );
    if (!isNaN(Number(textValue))) {
      setNumberInput(Number(textValue));
    }
  };

  return (
      <div>
        <HamburgerMenuHeader/>
        <div className='p-2'>
          <div className="mb-3 d-flex">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="enabledAlert"
              checked={checkboxes[0]}
              onChange={() => toggleCheckbox(0)}
            />
            <label className="form-check-label user-select-none" htmlFor="enabledAlert">
              提出期限が迫ったら、アラートメールで通知する
            </label>
          </div>

          <div className='mb-3 d-flex align-items-center'>
            <input
              style={{width: "4rem"}}
              id="daysBeforeDeadline"
              className="form-control"
              type="string"
              value={numberInput}
              onChange={handleNumberInputChange}
            />

            <label className="form-label user-select-none" htmlFor="daysBeforeDeadline">
              日前に通知する
            </label>
          </div>

          <div className="mb-3 d-flex">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="autoTaskDelete"
              checked={checkboxes[1]}
              onChange={() => toggleCheckbox(1)}
            />
            <label className="form-check-label user-select-none" htmlFor="autoTaskDelete">
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

export default TaskHamburgerMenu;