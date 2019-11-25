import React, {useEffect} from "react";
import {
    MDBRow, MDBCol, MDBBtn, MDBContainer, MDBInput, MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardHeader
} from "mdbreact";
import {Redirect,withRouter} from 'react-router-dom';
import {authService} from "../../../shared/auth-service";
import fun from "../../../lib/function";


const LoginForm = ({isLoggedIn, onLogin, changeHandler, submitHandler}) => {

    const auth_token = fun.getItem('auth_token');


    useEffect(() => {
        const check = async () => {

            await authService.checkAuthTokenTime();
        };
        check();
    }, []);

    let isAuth ;

    isAuth = !(auth_token === 'null' || auth_token === null);

    if (isLoggedIn || isAuth) {
        return <Redirect to="/"/>;
    }


    return (
        <MDBContainer>
            <div className="login-form">
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                                    <h3 className="my-3">
                                        <MDBIcon icon="lock"/> Login:
                                    </h3>
                                </MDBCardHeader>
                                <form className="needs-validation" onSubmit={submitHandler} noValidate>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Type your email"
                                            onChange={changeHandler}
                                            type="email"
                                            name="email"
                                            id="email"
                                            group
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <MDBInput
                                            label="Type your password"
                                            onChange={changeHandler}
                                            type="password"
                                            name="password"
                                            id="password"
                                            group
                                            validate
                                        />
                                    </div>

                                    <div className="text-center mt-4">
                                        <MDBBtn
                                            color="light-blue"
                                            className="mb-3"
                                            onClick={onLogin}
                                            type="submit"
                                        >
                                            Login
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        </MDBContainer>
    );
};

export default withRouter(LoginForm);
