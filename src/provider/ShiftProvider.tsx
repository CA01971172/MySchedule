import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Shifts } from "./../utils/types"
import ShiftDbController from "./../utils/DbController/ShiftDbController"

export const ShiftContext = createContext<[Shifts, React.Dispatch<React.SetStateAction<Shifts>>]>([{}, ()=>{}])

export function ShiftProvider({children}: {children: ReactNode}){
    // バイトのシフトのデータを管理する
    const [shifts, setShifts] = useState<Shifts>({})

    useEffect(() => {
        let newShiftsData: Shifts;
        ShiftDbController.readShift().then((response) =>{
            newShiftsData = response as Shifts;
            setShifts(newShiftsData || {});
        });
    }, [])

    return (
        <ShiftContext.Provider value={[shifts, setShifts]}>
            {children}
        </ShiftContext.Provider>
    );
}