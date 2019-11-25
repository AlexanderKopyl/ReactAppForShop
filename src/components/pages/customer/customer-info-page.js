import React, {useState, useEffect} from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTabPane,
    MDBTabContent,
    MDBNav,
    MDBNavItem,
    MDBNavLink,
    MDBCard,
    MDBListGroup,
    MDBListGroupItem,
    MDBBtn,
    MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInputGroup, MDBInput, MDBAlert
} from "mdbreact";
import {Redirect, withRouter} from 'react-router-dom';
import {authService} from "../../../shared/auth-service";
import {customerService} from "../../../shared/customer-service";
import fun from '../../../lib/function'

function CustomerInfo({toggle, state, update, changeState, setStateFromSevice, modal}) {

    const [items, setItems] = useState([]);

    const auth_token = fun.getItem('auth_token');
    const user_id = fun.getItem('user_id');

    const {firstname, lastname, email, telephone} = state.error;
    useEffect(() => {
        const fetchItems = async () => {
            await authService.checkAuthTokenTime();
            const result = await customerService.getInfo(user_id);
            setStateFromSevice(result);
            setItems(result);
        };
        fetchItems();
    }, [user_id,setStateFromSevice]);


    if (auth_token === 'null' || auth_token === null ) {
        return (
            <Redirect to="/login"/>
        )
    }

    return (
        <MDBContainer>
            <MDBModal isOpen={state.modal} toggle={modal}>
                <MDBModalHeader toggle={modal}>MDBModal title</MDBModalHeader>
                <MDBModalBody>
                    <div key="modal-user">
                        <div key="modal-user">
                            <MDBInputGroup
                                containerClassName="mb-3"
                                inputs={
                                    <>
                                        <MDBInput
                                            noTag
                                            name="firstname"
                                            onChange={changeState}
                                            value={state.firstname}
                                            id="firstname"
                                        />
                                    </>
                                }
                                prepend="FirstName"
                                size="sm"
                            />
                            {firstname && <MDBAlert color="danger">
                                {firstname ? firstname : ''}
                            </MDBAlert>}

                            <MDBInputGroup
                                containerClassName="mb-3"
                                inputs={
                                    <>
                                        <MDBInput
                                            noTag
                                            onChange={changeState}
                                            name="lastname"
                                            value={state.lastname}
                                            id="lastname"
                                        />
                                    </>
                                }

                                prepend="LastName"

                                size="sm"/>
                            {lastname && <MDBAlert color="danger">
                                {lastname ? lastname : ''}
                            </MDBAlert>}

                            <MDBInputGroup
                                containerClassName="mb-3"
                                inputs={
                                    <>
                                        <MDBInput
                                            noTag
                                            onChange={changeState}
                                            name="email"
                                            value={state.email}
                                            id="email"
                                        />
                                    </>
                                }

                                prepend="Email"
                                size="sm"/>
                            {email && <MDBAlert color="danger">
                                {email ? email : ''}
                            </MDBAlert>}

                            <MDBInputGroup
                                containerClassName="mb-3"
                                inputs={
                                    <>
                                        <MDBInput
                                            noTag
                                            onChange={changeState}
                                            name="telephone"
                                            value={state.telephone}
                                            id="telephone"
                                        />
                                    </>
                                }

                                prepend="Telephone"
                                size="sm"/>
                            {telephone && <MDBAlert color="danger">
                                {telephone ? telephone : ''}
                            </MDBAlert>}
                        </div>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={modal}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={update}>Save changes</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            <MDBRow>
                <MDBCol md="12">
                    <MDBNav className="nav-tabs mt-5">
                        <MDBNavItem>
                            <MDBNavLink to="#" active={state.activeItem === "1"} onClick={toggle("1")} role="tab">
                                Основные данные
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" active={state.activeItem === "2"} onClick={toggle("2")} role="tab">
                                Конакты
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>
                    <MDBTabContent activeItem={state.activeItem}>
                        <MDBTabPane tabId="1" role="tabpanel">
                            <MDBRow>
                                <MDBCol md="4">
                                    <MDBCard style={{width: "22rem", marginTop: "1rem"}}>
                                        {items.map((r) => (
                                            <MDBListGroup key={r.customer_id}>
                                                <MDBListGroupItem key="firstname">Имя:{r.firstname}</MDBListGroupItem>
                                                <MDBListGroupItem key="lastname">Фамилия:{r.lastname}</MDBListGroupItem>
                                                <MDBListGroupItem key="email">Почта:{r.email}</MDBListGroupItem>
                                                <MDBListGroupItem
                                                    key="telephone">Telephone:{r.telephone}</MDBListGroupItem>
                                            </MDBListGroup>
                                        ))}
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBListGroupItem><MDBBtn rounded color="info" onClick={modal}>Поменять
                                        данные</MDBBtn></MDBListGroupItem>
                                </MDBCol>
                            </MDBRow>
                        </MDBTabPane>
                        <MDBTabPane tabId="2" role="tabpanel">
                            <p className="mt-2" id="test-panel">
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                            </p>
                            <p>
                                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                voluptate odit minima. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit. Nihil odit magnam minima,
                                soluta doloribus reiciendis molestiae placeat unde eos
                                molestias.
                            </p>
                        </MDBTabPane>
                    </MDBTabContent>
                </MDBCol>

            </MDBRow>
        </MDBContainer>

    );
};

export default withRouter(CustomerInfo);

