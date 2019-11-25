import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBIcon} from "mdbreact";
import config from '../app.config'
import fun from "../lib/function";


class OrderService {
    constructor(url) {
        this.url = url;
    }

    async getAllOrdersForUser(user_id) {
        try {
            const data = await fetch(`${this.url}orders/customer/${user_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });
            let items = await data.json();
            let items_to_table = [];

            items.result.forEach((elem) =>{
                const {order_id, firstname, lastname, email, date_added, oc_order_status: {name}, telephone, total} = elem;
                const arrayToTable = {
                    order_id,
                    firstname,
                    lastname,
                    email,
                    date_added,
                    order_status:name,
                    telephone,
                    total,
                    action:<Link to={`/orders/${elem.order_id}`}>
                        <MDBBtn color="purple" size="sm"><MDBIcon icon="eye" /></MDBBtn>
                    </Link>
                };
                items_to_table.push(arrayToTable);
            });

            return items_to_table;
        } catch (e) {
            throw  new Error(e)
        }
    }

    async getAllProductToOrderById(id) {
        try {
            const data = await fetch(`${this.url}orders/order_products/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });

            return await data.json();
        } catch (e) {
            throw  new Error(e)
        }
    }

    async getInfo(match) {
        try {
            const result = await fetch(`${this.url}orders/${match.params.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });

            let items_to_table = [];

            let {data} = await result.json();
            let {data:data_products} = await this.getAllProductToOrderById(match.params.id);

            data.forEach((elem) => {
                const {firstname,comment,payment_zone,shipping_method,payment_method, lastname, email, date_added, oc_order_status: {name}, telephone, total} = elem;
                let date = new Date(date_added);

                const arrayToTable = {
                    products:data_products,
                    payment_zone,
                    shipping_method,
                    payment_method,
                    comment,
                    firstname,
                    lastname,
                    email,
                    date_added:fun.formatDate(date),
                    order_status: name,
                    telephone,
                    total,
                };
                items_to_table.push(arrayToTable);
            });
            return items_to_table;
        } catch (e) {
            throw  new Error(e)
        }
    }
}



export const orderService = new OrderService(config.url);