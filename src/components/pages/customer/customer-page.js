import React, {Component} from 'react';
import CustomerInfo from './customer-info-page'
import {customerService} from "../../../shared/customer-service";
import Header from "../../header";
import fun from "../../../lib/function";


export default class CustomerPage extends Component {

    state = {
        email: "",
        firstname: "",
        lastname: "",
        telephone: "",
        activeItem: "1",
        error: [],
        modal: false
    };

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    updateInfo = () => {
        let {firstname, lastname, email, telephone} = this.state;
        const user_id = fun.getItem('user_id');

        customerService.updateCutomer({firstname, lastname, email, telephone},user_id)
            .then((r) => {
                    if (!r[1]) {
                        window.location.reload();
                    } else {
                        this.setState({
                                error: r[0]
                            }
                        )
                    }
                }
            )
    };

    changeState = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    setStateFromService = (arr) => {
        arr.map((r) => {
            this.setState({
                firstname: r.firstname,
                lastname: r.lastname,
                email: r.email,
                telephone: r.telephone
            });
            return true;
        });
    };


    render() {
        return (
            <div className="box-page">
                <Header/>
                <CustomerInfo toggle={this.toggle}
                              state={this.state}
                              modal={this.toggleModal}
                              changeState={this.changeState}
                              setStateFromSevice={this.setStateFromService}
                              update={this.updateInfo}/>
            </div>
        )
    }
}