import React, {useState, useEffect} from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn,
    MDBIcon,
    MDBCard,
} from "mdbreact";
import {Redirect, withRouter, Link} from 'react-router-dom';
import {authService} from "../../../shared/auth-service";
import {productService} from "../../../shared/product-service";
import fun from '../../../lib/function'
import Header from "../../header";


const ProductPageInfo = ({match}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {

            await authService.checkAuthTokenTime();
            const items = await productService.getProduct(match);
            console.log(items);
            setItems(items);

        };
        fetchItems();
    },[match]);

    const auth_token = fun.getItem('auth_token');

    if (auth_token === 'null' || auth_token === null) {
        return (
            <Redirect to="/login"/>
        )
    }

   const createMarkup = (html) => { return {__html: html}};

    return (
        <div className="box-page">
            <Header/>
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    {items.thumb}
                </MDBCol>
                <MDBCol md="6">
                    <div>
                        <h2>{items.name}</h2>
                        <br />
                        <div>{items.price}</div>
                        <div>
                        </div>
                    </div>
                </MDBCol>

            </MDBRow>

            <MDBCard className={"description"}>
                {
                    <div dangerouslySetInnerHTML={createMarkup(items.description)} />

                }
            </MDBCard>
            <MDBRow>
                <MDBCol md="12">
                    <MDBTable responsiveSm className="table-products">
                        <MDBTableHead>
                            <tr>
                                <th>Name</th>
                                <th>Model</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>

                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
            <Link to="/products">
                <MDBBtn>
                    <MDBIcon icon="angle-double-left"/>
                    Назад
                </MDBBtn>
            </Link>
        </MDBContainer>
        </div>
    );
};

export default withRouter(ProductPageInfo);