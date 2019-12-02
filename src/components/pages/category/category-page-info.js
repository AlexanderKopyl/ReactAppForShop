import React, {Component} from "react";
import {Redirect, withRouter} from "react-router-dom";
import fun from "../../../lib/function";
import {authService} from "../../../shared/auth-service";
import {menuService} from "../../../shared/menu-service";
import Header from "../../header";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer, MDBDataTable,
    MDBRow,
} from "mdbreact";



export default withRouter( class CategoryPageInfo extends Component{
    state = {
        item:{
            image:"no_image.jpg"
        },
        description: [],
        products: [],
    };
    componentDidMount() {
        const fetchItems = async () => {

            await authService.checkAuthTokenTime();
            const {cat,prods} = await menuService.getCategory(this.props.match);

            this.setState({
                item:cat,
                description: cat.oc_category_description,
                products:prods
            });

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

        const createMarkup = (html) => {
            return {__html: html}
        };
        const {item,description,products} = this.state;
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
            rows: products
        };

        // console.log(this.state);
        return (
            <div className="box-category-info">
                <Header/>
                <MDBContainer>
                        <MDBRow className="mb-4">
                            <MDBCol md="3">
                                <img src={"https://zoocomplex.com.ua/image/" + item.image} className="img-fluid" alt="" />
                            </MDBCol>
                            <MDBCol md="9">
                                <h1>{description.name ? description.name : ''}   </h1>
                            </MDBCol>
                        </MDBRow>
                    {products.length ? <MDBDataTable
                        striped
                        bordered
                        hover
                        data={data}
                    /> : <div className="spinner-grow text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}

                    <MDBCard>
                        <MDBCardBody><div dangerouslySetInnerHTML={createMarkup(description.description)}/></MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
})