import React, {Component} from "react";
import {Redirect, withRouter} from "react-router-dom";
import fun from "../../../lib/function";
import {authService} from "../../../shared/auth-service";
import Header from "../../header";
import Menu from "../../menu/menu";
import {MDBContainer} from "mdbreact";


export default withRouter( class CategoryPage extends Component{
    state = {
        items:[]
    };

    componentDidMount() {
        const fetchItems = async () => {
            await authService.checkAuthTokenTime();
        };
        fetchItems()
    }

    render() {
        const auth_token = fun.getItem('auth_token');



        if (auth_token === 'null' || auth_token === null) {
            return (
                <Redirect to="/login"/>
            )
        }

        return (
            <div className="box-category-page">
                <Header/>
                <MDBContainer>
                    <Menu/>
                </MDBContainer>
            </div>
        )
    }
})