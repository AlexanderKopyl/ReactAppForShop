import config from '../app.config'
import fun from "../lib/function";
import {Link} from "react-router-dom";
import {MDBBtn, MDBIcon} from "mdbreact";
import React from "react";


class MenuService {

    constructor(url) {
        this.url = url;
    }

    async getCategories() {
        let categories = await this.getAllCategories();

        return this.treeCategories(categories);
    }

    async getAllCategories() {
        try {
            const data = await fetch(`${this.url}category`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });
            let {result} = await data.json();
            return result;
        } catch (e) {
            throw  new Error(e)
        }
    }
    async getCategory(match){
        try {
            const data = await fetch(`${this.url}category/${match.params.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });

            const products = await fetch(`${this.url}product/cat/${match.params.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });

            let {result:prods} = await products.json();
            let {result:cat} = await data.json();
            let items_to_table = [];
            prods.forEach((elem) =>{
                let {oc_product_descriptions,oc_products} = elem;
                let {product_id,model,image,price,quantity,viewed} = oc_products[0];
                let {name} = oc_product_descriptions[0];
                const arrayToTable = {
                    thumb: <img src={config.path_to_image+ "/" + image} alt="thumbnail" className="img-thumbnail" />,
                    product_id,
                    model,
                    name,
                    price,
                    quantity,
                    viewed,
                    action:<Link to={`/products/${product_id}`} target="_blank">
                        <MDBBtn color="purple" size="sm"><MDBIcon icon="eye" /></MDBBtn>
                    </Link>
                };

                items_to_table.push(arrayToTable);
            });
            // console.log(items_to_table);
            return {cat,prods:items_to_table};
        } catch (e) {
            throw  new Error(e)
        }
    }
    treeCategories(data) {
        data = data ? data : [];
        let parent = data.filter(elem => elem.parent_id === 0),
            dataReturn = [],
            children = [];
        parent.forEach(elem => {
            let children_data = [];

            children = data.filter(i => i.parent_id === elem.category_id);

            children.forEach(item_child => {
                let child = data.filter(i => i.parent_id === item_child.category_id);

                children_data.push({
                    name:item_child.oc_category_description.name,
                    parent:item_child.parent_id,
                    category_id: item_child.category_id,
                    child
                })
            });

            dataReturn.push( {
                name: elem.oc_category_description.name,
                category_id:elem.category_id,
                child: children_data
            });

        });

        return dataReturn;
    }
}

export const menuService = new MenuService(config.url);