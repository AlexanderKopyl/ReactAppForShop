import React, {useEffect, useState} from 'react';
import {MDBBtn, MDBCard, MDBCol, MDBContainer, MDBIcon, MDBRow,} from "mdbreact";
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
            const items = await productService.getProduct(match);
            setItems(items);
        };
        fetchItems();
    }, [match]);

    const auth_token = fun.getItem('auth_token');

    if (auth_token === 'null' || auth_token === null) {
        return (
            <Redirect to="/login"/>
        )
    }
    console.log(items.attr);
    const createMarkup = (html) => {
        return {__html: html}
    };

    return (
        <div className="box-page">
            <Header/>
            <MDBContainer>
                {items.attr ? '':
                    <div>

                <MDBRow>
                    <MDBCol md="6">
                        {items.thumb}
                    </MDBCol>
                    <MDBCol md="6">
                        <div>
                            <h2>{items.name}</h2>
                            <br/>
                            <div>Цена:{items.price}</div>
                            <div>
                                <MDBRow>
                                    <MDBCol md="12">
                                        {/*{items.attr.map((r) => (*/}
                                        {/*    <MDBListGroup key={r.attribute_id}>*/}
                                        {/*        <MDBListGroupItem key="firstname">{r.name}</MDBListGroupItem>*/}
                                        {/*    </MDBListGroup>*/}
                                        {/*))}*/}
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