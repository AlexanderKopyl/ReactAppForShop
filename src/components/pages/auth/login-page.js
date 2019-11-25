import React, {Component} from "react";
import LoginForm from './login-form'
import {withRouter} from 'react-router-dom';
import {authService} from '../../../shared/auth-service'
import fun from '../../../lib/function'

export default withRouter(class LoginPage extends Component {

    state = {
        email: "",
        password: "",
        isLoggedIn: false,
        auth_token: fun.getItem('auth_token')
    };


    onLogin = () => {

        const {email,password} = this.state;

        authService.signIn({login:email,password}).then((r)=>{
            if(r){
                this.setState({
                    isLoggedIn: true
                });
            }
        });

    };


    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    };

    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <LoginForm isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin} changeHandler={this.changeHandler}
                       submitHandler={this.submitHandler}/>
        );
    }


});



