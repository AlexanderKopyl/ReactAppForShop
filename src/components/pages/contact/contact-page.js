import React, {Component} from "react";
import ContactPageForm from './contact-page-form'
import {withRouter} from 'react-router-dom';
import {authService} from '../../../shared/auth-service'
import {mailService} from '../../../shared/mail-service'
import Header from "../../header";

export default withRouter(class ContactPage extends Component {
    state = {
        name: "",
        email: "",
        subject: "",
        text: ""
    };

    reset() {
        this.setState({
            name: "",
            email: "",
            subject: "",
            text: ""
        });
    }

    sendMessage = async () => {
        await authService.checkAuthTokenTime();
        let answer = await mailService.send(this.state);
        if (answer.code === 200){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.flash('Your message send', 'success');
            this.reset();
        }else{
            window.flash('record has been created successfully!', 'error');
        }
        console.log(answer);
    };

    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <div className="box-page">
                <Header/>
                <ContactPageForm
                    state={this.state}
                    sendMessage={this.sendMessage}
                    changeHandler={this.changeHandler}
                    submitHandler={this.submitHandler}/>
            </div>
        );
    }
})