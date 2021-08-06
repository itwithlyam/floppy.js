const fetch = require("node-fetch")

class Request {
    /*
    * @param {string} url - The URL to request 
    */
    constructor(url, body=null, headers={
        "Content-Type": "application/json",
        "Authorization": "Bot " + process.env.TOKEN
    }) {
        this.url = url
        this.body = JSON.stringify(body)
        this.headers = headers
    }
    async request(method) {
        let request = await fetch(`https://discord.com/api/v9/${this.url}`, {
            method: method,
            body: this.body,
            headers: this.headers
        })
        let response = {
            code: await request.status,
            text: await request.statusText,
            data: await request.json()
        }
        return response
    }
    async get() {
        let request = await fetch(`https://discord.com/api/v9${this.url}`, {
            method: "GET",
            headers: this.headers
        })
        let response = {
            code: await request.statusCode,
            text: await request.statusText,
            data: await request.json()
        }
        return response
    }
}

module.exports = {Request}