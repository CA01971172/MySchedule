import React, { useContext } from 'react';
import { DrawerContext } from '../../provider/DrawerProvider';
import HamburgerMenuHeader from "./HamburgerMenuHeader"
import { TaskSettings } from '../../utils/types';

export function TaskHamburgerMenu({taskSettings, setTaskSettings}: {taskSettings: TaskSettings, setTaskSettings: (settings: TaskSettings) => void}) {
    // ハンバーガーメニューが開いているかどうかを管理する
    const [drawerOpened, setDrawerOpened, isChangedSettings, setIsChangedSettings, settings, setSettings, openHamburgerMenu, closeHamburgerMenu] = useContext(DrawerContext);

  // 課題の設定データを編集するための関数
  function changeTaskSettings(enabledAlert?: boolean, daysBeforeDeadline?: number, autoTaskDelete?: boolean){
    const newSettings: TaskSettings = Object.assign({}, taskSettings);
    if(enabledAlert !== undefined) newSettings.enabledAlert = enabledAlert;
    if(daysBeforeDeadline !== undefined) newSettings.daysBeforeDeadline = daysBeforeDeadline;
    if(autoTaskDelete !== undefined) newSettings.autoTaskDelete = autoTaskDelete;
    setTaskSettings(newSettings); // 表示用のデータを変更する
    setSettings(["task", newSettings]); // データ保存用のデータを変更する
    setIsChangedSettings(true); // データが変更済であることを記憶する
  }

  return (
      <div>
        <HamburgerMenuHeader/>
        <div className='p-2'>
          <div className="mb-3 form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="enabledAlert"
              checked={taskSettings.enabledAlert}
              onChange={() => {
                let nowBool: boolean = false;
                if(taskSettings.enabledAlert !== undefined){
                  nowBool = taskSettings.enabledAlert;
                }
                const newValue = !nowBool;
                changeTaskSettings(newValue, undefined, undefined);
              }}
            />
            <label className="form-check-label user-select-none" htmlFor="enabledAlert">
              提出期限が迫ったら、アラートメールで通知する
            </label>
          </div>

          <div className='mb-3 form-group row'>
            <div className="col-md-2">
              <input
                id="daysBeforeDeadline"
                className="form-control"
                type="number"
                min={0}
                value={taskSettings.daysBeforeDeadline}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const inputValue: string = event.target.value;
                  const newNumber: number = Math.min(Number(inputValue));
                  changeTaskSettings(undefined, newNumber, undefined);
                }}
              />
            </div>

            <label className="col-md-10 col-form-label user-select-none" htmlFor="daysBeforeDeadline">
              日前に通知する
            </label>
          </div>

          <div className="mb-3 form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="autoTaskDelete"
              checked={taskSettings.autoTaskDelete}
              onChange={() => {
                let nowBool: boolean = false;
                if(taskSettings.autoTaskDelete !== undefined){
                  nowBool = taskSettings.autoTaskDelete;
                }
                const newValue = !nowBool;
                changeTaskSettings(undefined, undefined, newValue);
              }}
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