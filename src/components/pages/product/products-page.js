import React, {useState, useEffect} from 'react';
import {MDBContainer, MDBDataTable} from 'mdbreact';
import {Redirect, withRouter} from 'react-router-dom';
import {authService} from "../../../shared/auth-service";
import {productService} from "../../../shared/product-service";
import fun from '../../../lib/function'
import Header from "../../header";


const ProductPage = () => {

    const [items, setItems] = useState([]);
    // const user_id = fun.getItem('user_id');

    useEffect(() => {
        const fetchItems = async () => {

            await authService.checkAuthTokenTime();

            const items = await productService.getAllProducts();
            // console.log(items);
            setItems(items);
        };
        fetchItems();
    }, []);

    const auth_token = fun.getItem('auth_token');

    const data = {
        columns: [
            {
                label: 'Thumb',
                field: 'thumb',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Product_id',
                field: 'product_id',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Model',
                field: 'model',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Price',
                field: 'price',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Quantity',
                field: 'quantity',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Viewed',
                field: 'viewed',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 100
            }
        ],
        rows: items
    };


    if (auth_token === 'null' || auth_token === null) {
        return (
            <Redirect to="/login"/>
        )
    }


    return (
        <div className="box-page">
            <Header/>
            <MDBContainer>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                />
            </MDBContainer>
        </div>
    );
};

export default withRouter(ProductPage);