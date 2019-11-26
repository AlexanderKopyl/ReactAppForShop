import React from "react";
import {Link} from "react-router-dom";
import {MDBBtn, MDBIcon} from "mdbreact";
import config from '../app.config'
import fun from "../lib/function";


class ProductService {
    constructor(url) {
        this.url = url;
    }

    async getAllProducts() {
        try {
            const data = await fetch(`${this.url}product`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });
            let items = await data.json();
            let items_to_table = [];
            items.result.forEach((elem) =>{
                let {oc_product_description} = elem;
                const arrayToTable = {
                    thumb: <img src={config.path_to_image+ "/" + elem.image} alt="thumbnail" className="img-thumbnail" />,
                    product_id: elem.product_id,
                    model: elem.model,
                    name: oc_product_description.name,
                    price: elem.price,
                    quantity: elem.quantity,
                    viewed: elem.viewed,
                    action:<Link to={`/products/${elem.product_id}`}>
                        <MDBBtn color="purple" size="sm"><MDBIcon icon="eye" /></MDBBtn>
                    </Link>
                };
                items_to_table.push(arrayToTable);
            });
            // console.log(items_to_table);
            return items_to_table;
        } catch (e) {
            throw  new Error(e)
        }

    }
    async getProduct(match) {
        try {
            const data = await fetch(`${this.url}product/${match.params.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });
            let {result: items} = await data.json();
            let {oc_product_description} = items;
            return {
                thumb: <img src={config.path_to_image + "/" + items.image} className="img-fluid" alt=""/>,
                product_id: items.product_id,
                model: items.model,
                name: oc_product_description.name,
                attr : await this.getAllAttributes(match),
                description: oc_product_description.description,
                price: +items.price + " UAH",
                quantity: items.quantity,
                viewed: items.viewed
            };
        } catch (e) {
            throw  new Error(e)
        }

    }
    async getAllAttributes(match){
        try {
            const data = await fetch(`${this.url}product/attr/${match.params.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });
            let {result: items} = await data.json();
            let attrs = [];

            items.forEach((elem) =>{
                let data = {
                    text:elem.text,
                    name:elem.oc_attribute_description.name,
                    attr_id:elem.oc_attribute_description.attribute_id
                };
                attrs.push(data)
            });
            return attrs;
        } catch (e) {
            throw  new Error(e)
        }
    }


}


export const productService = new ProductService(config.url);