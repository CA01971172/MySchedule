import React from 'react';

interface MyProps{
    setFocusYear: React.Dispatch<React.SetStateAction<number>>;
    setFocusMonth: React.Dispatch<React.SetStateAction<number>>;
}

export default function DateController(props: MyProps) {
    const {setFocusYear, setFocusMonth} = props;

    return (
        <div/>
    );
}