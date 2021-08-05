const fetch = require("node-fetch")

class Request {
    /*
    * @param {string} url - The URL to request 
    */
    constructor(url, body=null, headers={
        "Content-Type": "application/json",
        "Authorization": process.env.TOKEN
    }) {
        this.url = url
        this.body = body
        this.headers = headers
    }
    async request(method) {
        let request = await fetch(this.url, {
            method: method,
            body: this.body,
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