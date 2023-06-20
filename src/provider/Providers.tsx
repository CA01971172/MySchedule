import React, { ReactNode } from 'react';
import { PageStateProvider } from "./PageStateProvider"
import { DrawerProvider } from "./DrawerProvider"
import { TimetableProvider } from "./TimetableProvider"
import { TaskProvider } from "./TaskProvider"

export default function Providers({children}: {children: ReactNode}){
    return (
        <PageStateProvider>
            <DrawerProvider>
                <TimetableProvider>
                    <TaskProvider>
                        {children}
                    </TaskProvider>
                </TimetableProvider>
            </DrawerProvider>
        </PageStateProvider>
    );
}