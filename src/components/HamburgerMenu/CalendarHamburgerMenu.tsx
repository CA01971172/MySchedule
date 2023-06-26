import React, {useContext} from 'react';
import HamburgerMenuHeader from './HamburgerMenuHeader';
import { CalendarContext } from '../../provider/CalendarProvider';

export default function CalendarHamburgerMenu() {
    const {enableTask, setEnableTask, enableShift, setEnableShift, enableEvent, setEnableEvent} = useContext(CalendarContext);

    return (
        <div>
            <HamburgerMenuHeader/>
            <div className='p-2'>
                <div className="mb-3 form-group form-check">
                    <label className="form-check-label user-select-none checkbox-task" htmlFor="enableTask">
                        課題
                    </label>
                    <input
                        className="form-check-input checkbox-task"
                        type="checkbox"
                        id="enableTask"
                        checked={enableTask}
                        onChange={() => {setEnableTask((prev) => !prev)}}
                    />
                </div>
                <div className="mb-3 form-group form-check">
                    <label className="form-check-label user-select-none" htmlFor="enableShift">
                        バイト
                    </label>
                    <input
                        className="form-check-input checkbox-shift"
                        type="checkbox"
                        id="enableShift"
                        checked={enableShift}
                        onChange={() => {setEnableShift((prev) => !prev)}}
                    />
                </div>
                <div className="mb-3 form-group form-check">
                    <label className="form-check-label user-select-none" htmlFor="enableEvent">
                        予定
                    </label>
                    <input
                        className="form-check-input checkbox-event"
                        type="checkbox"
                        id="enableEvent"
                        checked={enableEvent}
                        onChange={() => {setEnableEvent((prev) => !prev)}}
                    />
                </div>
            </div>
        </div>
    );
}