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
    MDBListGroup,
    MDBListGroupItem
} from "mdbreact";
import "./order.css";
import {Redirect, withRouter, Link} from 'react-router-dom';
import {authService} from "../../../shared/auth-service";
import {orderService} from "../../../shared/order-service";
import fun from '../../../lib/function'
import Header from "../../header";


const OrderPageInfo = ({match}) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {

            await authService.checkAuthTokenTime();

            const items = await orderService.getInfo(match);

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

    return (
        <div className="box-page">
            <Header/>
        <MDBContainer>
            <MDBRow>
                <MDBCol md="12"  sm="12" lg="4" >
                    <MDBCard style={{ marginTop: "1rem" }}>
                            {items.map((item) => (
                                <MDBListGroup key ="user-info">
                                    <MDBListGroupItem>Имя: {item.firstname}</MDBListGroupItem>
                                    <MDBListGroupItem>Фамилия: {item.lastname}</MDBListGroupItem>
                                    <MDBListGroupItem>Email: {item.email}</MDBListGroupItem>
                                    <MDBListGroupItem>Cтатус: {item.order_status}</MDBListGroupItem>
                                    <MDBListGroupItem>Телефон: {item.telephone}</MDBListGroupItem>
                                </MDBListGroup>
                            ))}
                    </MDBCard>
                </MDBCol>
                <MDBCol md="12"  sm="12" lg="4">
                    <MDBCard style={{ marginTop: "1rem" }}>
                        {items.map((item) => (
                            <MDBListGroup key ="user-order-total">
                                <MDBListGroupItem>Оплата: {item.payment_method}</MDBListGroupItem>
                                <MDBListGroupItem>Город: {item.payment_zone}</MDBListGroupItem>
                                <MDBListGroupItem>Доставка: {item.shipping_method}</MDBListGroupItem>
                                <MDBListGroupItem>Дата: {item.date_added}</MDBListGroupItem>
                                <MDBListGroupItem>Итого: {item.total}</MDBListGroupItem>
                            </MDBListGroup>
                        ))}
                    </MDBCard>
                </MDBCol>
                <MDBCol md="12"  sm="12" lg="4" >
                    <MDBCard style={{ marginTop: "1rem" }}>
                        {items.map((item) => (
                            <MDBListGroup key ="user-order-total">
                                <MDBListGroupItem>Коментарий: {item.comment}</MDBListGroupItem>
                            </MDBListGroup>
                        ))}
                    </MDBCard>
                </MDBCol>
            </MDBRow>
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
                            {items.map(({products:item}) => (
                                item.map((r) => (
                                    r.map((product) => (
                                        <tr key={product.product_id}>
                                            <td>{product.name}</td>
                                            <td>{product.model}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.price}</td>
                                            <td>{product.total}</td>
                                        </tr>
                                    ))
                                ))
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
            <Link to="/orders">
                <MDBBtn>
                    <MDBIcon icon="angle-double-left"/>
                    Назад
                </MDBBtn>
            </Link>
        </MDBContainer>
        </div>
    );
};

export default withRouter(OrderPageInfo);