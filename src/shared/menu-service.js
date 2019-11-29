import config from '../app.config'
import fun from "../lib/function";


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

    treeCategories(data) {
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