import config from '../app.config'
import fun from "../lib/function";


class MailService {

    constructor(url) {
        this.url = url;
    }
    async send(body) {
        try {
            const data = await fetch(`${this.url}mail/`, {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + fun.getItem('auth_token')
                },
                body:JSON.stringify(body)
            });
            return await data.json();
        } catch (e) {
            throw  new Error(e)
        }
    }
}
export const mailService = new MailService(config.url);
