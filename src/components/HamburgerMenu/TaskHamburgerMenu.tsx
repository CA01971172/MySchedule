import React, { useContext } from 'react';
import { DrawerContext } from '../../provider/DrawerProvider';
import HamburgerMenuHeader from "./HamburgerMenuHeader"
import { TaskSettings } from '../../utils/types';
import { TaskContext } from '../../provider/TaskProvider';
import TaskDbController from '../../utils/DbController/TaskDbController';
import { TaskSettingsContext } from '../../provider/TaskSettingsProvider';

export function TaskHamburgerMenu() {
  // ハンバーガーメニューが開いているかどうかを管理する
  const {setIsChangedSettings, setSettings} = useContext(DrawerContext);

  // 課題の設定データを管理する
  const [taskSettings, setTaskSettings] = useContext(TaskSettingsContext);

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

  // 課題のデータを管理する
  const [tasks, setTasks] = useContext(TaskContext);

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
              aria-describedby="alertHelp"
            />
            <label className="form-check-label user-select-none" htmlFor="enabledAlert">
              提出期限が迫ったら、アラートメールで通知する
            </label>
            <div id="alertHelp" className="form-text">毎日正午に通知します<br/>※未実装の機能です</div>
          </div>

          <div className='mb-3 d-flex'>
            <input
                style={{width: "4rem"}}
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

            <label className="form-label user-select-none m-0 d-flex align-items-center" htmlFor="daysBeforeDeadline">
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

          <div className="text-center">
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                const isDeleteDo: boolean = window.confirm("本当に全ての課題のデータを削除しますか？");
                if(isDeleteDo){
                  TaskDbController.deleteAllTask().then((res) => {
                    setTasks({});
                  })
                }
              }}
            >
              一括削除
            </button>
          </div>
        </div>
      </div>
  );
}

export default TaskHamburgerMenu;