import React, { useState } from 'react';
import { Button, Offcanvas } from "react-bootstrap";
// 使用していない
import EventSettingsDbController from '../../utils/DbController/EventSettingsDbController';
import "bootstrap/dist/css/bootstrap.min.css";

export default function EventHamburgerMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="fa fa-bars"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>
                        You can place your menu items here.
                    </p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
