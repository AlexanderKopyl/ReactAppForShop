import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBCard, MDBCol, MDBContainer, MDBIcon, MDBListGroup, MDBListGroupItem, MDBRow,} from "mdbreact";
import {Link, Redirect, withRouter} from 'react-router-dom';
import {authService} from "../../../shared/auth-service";
import {productService} from "../../../shared/product-service";
import fun from '../../../lib/function'
import Header from "../../header";
import "./product-page.css";

const ProductPageInfo = ({match}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {

            await authService.checkAuthTokenTime();
            await productService.getProduct(match)
                .then(
                items=>
                {
                    setItems(items)
                }

            );

        };
        fetchItems();
    }, [match]);

    const auth_token = fun.getItem('auth_token');



    if (auth_token === 'null' || auth_token === null) {
        return (
            <Redirect to="/login"/>
        )
    }

    const createMarkup = (html) => {
        return {__html: html}
    };

    return (
        <div className="box-page">
            <Header/>
            <MDBContainer>
                {
                    <div>

                <MDBRow>
                    <MDBCol md="6">
                        {items.thumb}
                    </MDBCol>
                    <MDBCol md="6">
                        <div>
                            <h2>{items.name}</h2>
                            <br/>
                            <div></div>
                            <div>
                                <MDBRow>
                                    <MDBCol md="12">
                                        {items.attr ?
                                            <MDBListGroup>{
                                            items.attr.map((r) => (

                                                    <MDBListGroupItem key={r.attr_id}>{r.name}:{r.text}</MDBListGroupItem>

                                            ))}
                                                <MDBListGroupItem key="price">Цена:{items.price}</MDBListGroupItem>
                                            </MDBListGroup>: ''
                                        }
                                    </MDBCol>
                                </MDBRow>
                                <Link to="/products">
                                    <MDBBtn>
                                        <MDBIcon icon="angle-double-left"/>
                                        Назад
                                    </MDBBtn>
                                </Link>
                            </div>
                        </div>
                    </MDBCol>

                </MDBRow>

                <MDBCard className={"description"}>
                    {
                        <div dangerouslySetInnerHTML={createMarkup(items.description)}/>

                    }
                </MDBCard>
                    </div>
                    }

            </MDBContainer>
        </div>
    );
};

export default withRouter(ProductPageInfo);