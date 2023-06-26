import React, { useContext } from 'react';
import { DrawerContext } from '../../provider/DrawerProvider';
import HamburgerMenuHeader from "./HamburgerMenuHeader"
import { EventSettings } from '../../utils/types';
import { EventSettingsContext } from '../../provider/EventSettingsProvider';

export default function EventHamburgerMenu() {
  // ハンバーガーメニューが開いているかどうかを管理する
  const {setIsChangedSettings, setSettings} = useContext(DrawerContext);

  // 予定の設定データを管理する
  const [eventSettings, setEventSettings] = useContext(EventSettingsContext);

  // 予定の設定データを編集するための関数
  function changeEventSettings(hidePassedEvent?: boolean){
    const newSettings: EventSettings = Object.assign({}, eventSettings);
    if(hidePassedEvent !== undefined) newSettings.hidePassedEvent = hidePassedEvent;
    setEventSettings(newSettings); // 表示用のデータを変更する
    setSettings(["event", newSettings]); // データ保存用のデータを変更する
    setIsChangedSettings(true); // データが変更済であることを記憶する
  }

  return (
    <div>
      <HamburgerMenuHeader/>
      <div className='p-2'>
        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="hidePassedEvent"
            checked={eventSettings.hidePassedEvent}
            onChange={() => {
              let nowBool: boolean = false;
              if(eventSettings.hidePassedEvent !== undefined){
                nowBool = eventSettings.hidePassedEvent;
              }
              const newValue = !nowBool;
              changeEventSettings(newValue);
            }}
          />
          <label className="form-check-label user-select-none" htmlFor="hidePassedEvent">
            過去の課題を非表示にする
          </label>
        </div>
      </div>
    </div>
  );
}