import React, { ReactNode } from 'react';
import { PageStateProvider } from "./PageStateProvider"
import { DrawerProvider } from "./DrawerProvider"
import { TimetableProvider } from "./TimetableProvider"
import { TaskProvider } from "./TaskProvider"
import { ShiftProvider } from "./ShiftProvider"
import { EventProvider } from "./EventProvider"
import { CalendarProvider } from "./CalendarProvider"

export default function Providers({children}: {children: ReactNode}){
    return (
        <PageStateProvider>
            <DrawerProvider>
                <TimetableProvider>
                    <TaskProvider>
                        <ShiftProvider>
                            <EventProvider>
                                <CalendarProvider>
                                    {children}
                                </CalendarProvider>
                            </EventProvider>
                        </ShiftProvider>
                    </TaskProvider>
                </TimetableProvider>
            </DrawerProvider>
        </PageStateProvider>
    );
}