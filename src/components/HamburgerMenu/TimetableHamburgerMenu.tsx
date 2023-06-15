import React from 'react';
import HamburgerMenuHeader from './HamburgerMenuHeader';
import TaskHamburgerMenu from './TaskHamburgerMenu';
import ShiftHamburgerMenu from './ShiftHamburgerMenu';
import EventHamburgerMenu from './EventHamburgerMenu';
import { TabType } from '../../utils/types';

export default function TimetableHamburgerMenu() {
    return (
        <main>
            <div>
                <HamburgerMenuHeader/>
                <span>hoge</span>
            </div>
        </main>
    );
}