import React, {useEffect} from 'react';
import {MDBIcon, MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import {Redirect,withRouter} from 'react-router-dom';
import {authService} from '../../shared/auth-service'
import fun from "../../lib/function";
import Header from "../header";

const DocumentPage = () => {

    const auth_token = fun.getItem('auth_token');

    useEffect(() => {
        const user_func = async ()=>{
            await authService.checkAuthTokenTime();
        };

        user_func();
    },[]);

    if(auth_token === 'null' || auth_token === null){
        return (
            <Redirect to="/login"/>
        )
    }

    return (
        <div className="box-page">
            <Header/>
        <MDBContainer>
            <MDBRow>
                <MDBCol md="3" className="mb-3 mt-3">
                    <p>Файл откроется в новой вкладе. <br/>
                        Вы сможете его сохранить нажав правой клавишой мышки и выбрав пункт сохранить как .</p>
                    <a href="https://zoocomplex.com.ua/prom.xml" rel="noopener noreferrer" target="_blank"
                       download="http://zoocomplex.com.ua/prom.xml">
                        <button className="btn">Скачать файл <MDBIcon icon="download"/></button>
                    </a>


                </MDBCol>
            </MDBRow>

        </MDBContainer>
        </div>
    );
};

export default withRouter(DocumentPage);

