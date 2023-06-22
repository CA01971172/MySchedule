import React, { ReactNode } from 'react';
import { PageStateProvider } from "./PageStateProvider"
import { DrawerProvider } from "./DrawerProvider"
import { TimetableProvider } from "./TimetableProvider"
import { TaskProvider } from "./TaskProvider"
import { ShiftProvider } from "./ShiftProvider"

export default function Providers({children}: {children: ReactNode}){
    return (
        <PageStateProvider>
            <DrawerProvider>
                <TimetableProvider>
                    <TaskProvider>
                        <ShiftProvider>
                            {children}
                        </ShiftProvider>
                    </TaskProvider>
                </TimetableProvider>
            </DrawerProvider>
        </PageStateProvider>
    );
}