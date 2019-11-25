import React, {useState, useEffect} from 'react';
import {MDBCard, MDBContainer, MDBCardBody, MDBIcon, MDBRow, MDBCol,MDBBtn} from 'mdbreact';
import {Redirect, withRouter} from 'react-router-dom';
import fun from "../../lib/function";
import {authService} from '../../shared/auth-service'
import {customerService} from "../../shared/customer-service";
import Header from "../header";


const MainPage = () => {

    const [items, setItems] = useState([]);
    const auth_token = fun.getItem('auth_token');
    const user_id = fun.getItem('user_id');

    useEffect(() => {
        const user_func = async ()=>{
            await authService.checkAuthTokenTime();
            const {result:{count}} = await customerService.getRewardTotal(user_id);
            const {result:{total}} = await customerService.getRewardSum(user_id);
            const arrayTostate = {count,total};

            setItems(arrayTostate);
        };

        user_func();
    },[user_id]);

    if (auth_token === 'null' || auth_token === null) {
        return (
            <Redirect to="/login"/>
        )
    }


    return (
        <div className="box-page">
            <Header/>
            <MDBContainer>
              <MDBRow className="mb-4">
                    <MDBCol xl="4" md="4" sm="12" className="mb-r">
                        <MDBCard className="cascading-admin-card">
                            <div className="admin-up">
                                <MDBIcon icon="money-bill-alt" className="primary-color"/>
                                <div className="data">
                                    <p>Сумма</p>
                                    <h4>
                                        <strong>{items.total} UAH</strong>
                                    </h4>
                                </div>
                            </div>
                            <MDBCardBody>
                                <div className="link">
                                    <MDBBtn tag="a" href="/balance" role="button" color="primary"><MDBIcon icon="arrow-alt-circle-right" /></MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol xl="4" md="4" sm="12" className="mb-r">
                        <MDBCard className="cascading-admin-card">
                            <div className="admin-up">
                                <MDBIcon icon="shopping-cart" className="warning-color lighten-1"/>
                                <div className="data">
                                    <p>Заказов</p>
                                    <h4>
                                        <strong>{items.count}</strong>
                                    </h4>
                                </div>
                            </div>
                            <MDBCardBody>
                                <div className="link">
                                    <MDBBtn tag="a" href="/orders" role="button" color="primary"><MDBIcon icon="arrow-alt-circle-right" /></MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol xl="4" md="4" sm="12" className="mb-r">
                        <MDBCard className="cascading-admin-card">
                            <div className="admin-up">
                                <MDBIcon icon="users" className="default-color lighten-1"/>
                                <div className="data">
                                    <p>Профиль</p>
                                    <h4>
                                        <strong>Данные</strong>
                                    </h4>
                                </div>
                            </div>
                            <MDBCardBody>
                                <div className="link">
                                    <MDBBtn tag="a" href="/customer-info" role="button" color="primary"><MDBIcon icon="arrow-alt-circle-right" /></MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
};

export default withRouter(MainPage);

