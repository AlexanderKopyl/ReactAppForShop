import config from '../app.config'
import fun from "../lib/function";


class MenuService {

    constructor(url) {
        this.url = url;
    }

    async getCategories() {
        let categories = await this.getAllCategories(0),
            data = [],
            children = [];

        categories.map((elem) => {
            let children_data = [];
            children = this.getAllCategories(elem.category_id);

            children.then(elem => {
                elem.map((item) =>{
                    let child = this.getAllCategories(item.category_id);
                    children_data.push({
                        name:item.oc_category_description.name,
                        parent:item.parent_id,
                        category_id: item.category_id,
                        child
                    })
                });
            });
            data.push(
                {
                    name: elem.oc_category_description.name,
                    category_id:elem.category_id,
                    child: children_data
                }
            );
        });

        return data;
    }

    async getAllCategories(category_id = 0) {
        try {
            const data = await fetch(`${this.url}category/parent/${category_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });
            let {result} = await data.json();
            return result ;
        } catch (e) {
            throw  new Error(e)
        }
    }
}

export const menuService = new MenuService(config.url);