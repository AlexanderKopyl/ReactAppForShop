import config from '../app.config'
import fun from "../lib/function";


class CustomerService {

    constructor(url) {
        this.url = url;
    }

    async getInfo(user_id) {
        try {
            const data = await fetch(`${this.url}customers/${user_id}`, {
                headers: {
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                }
            });
            let {result} = await data.json();
            return [result] ;
        } catch (e) {
            throw  new Error(e)
        }
    }
    async updateCutomer(body,user_id) {
        try {
            const data = await fetch(`${this.url}customers/${user_id}`, {
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                },
                body:JSON.stringify(body)
            });
            // let {result,result_code} = await data.json();
            let {error,result_code} = await data.json();
            return [error,result_code];
        } catch (e) {
            throw  new Error(e)
        }
    }
    async getReward (user_id)  {
        const data = await fetch(`${this.url}customers/reward/${user_id}`, {
            headers: {
                'Authorization': 'Bearer ' + fun.getItem('auth_token')
            }
        });
        let {result} = await data.json();
        let items_to_table = [];

        result.forEach((elem) => {
            const {description,points,date_added} = elem;
            let date = new Date(date_added);

            const arrayToTable = {
                description,
                points,
                date_added:fun.formatDate(date)
            };
            items_to_table.push(arrayToTable);
        });

        return items_to_table;
    }

    async getRewardTotal (user_id)  {
        const data = await fetch(`${this.url}customers/totalReward/${user_id}`, {
            headers: {
                'Authorization': 'Bearer ' + fun.getItem('auth_token')
            }
        });
        return await data.json();
    }
    async getRewardSum (user_id)  {
        const data = await fetch(`${this.url}customers/totalSum/${user_id}`, {
            headers: {
                'Authorization': 'Bearer ' + fun.getItem('auth_token')
            }
        });
        return await data.json();
    }
}

export const customerService = new CustomerService(config.url);