import React, { useContext } from 'react';
import { PageState, PageStateContext } from '../../provider/PageStateProvider';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function CalendarAddButton() {
    // 現在操作中のデータ等を管理する
    const {setPageState, setFetchingId, setFetchingData} = useContext(PageStateContext);

    function transitionEditPage(pageState: PageState){
        setFetchingId(null);
        setFetchingData(null);
        setPageState(pageState);
    }

    return (
    <DropdownButton
        id="dropdown-item-button"
        title={<i className="bi bi-plus-lg"/>}
        size="lg"
        variant="primary"
        drop="up"
        className="position-absolute bottom-0 end-0 m-4"
    >
        <Dropdown.Item as="button" onClick={() => {transitionEditPage("taskEdit")}}>課題</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => {transitionEditPage("shiftEdit")}}>バイト</Dropdown.Item>
        <Dropdown.Item as="button" onClick={() => {transitionEditPage("eventEdit")}}>予定</Dropdown.Item>
    </DropdownButton>
    );
}