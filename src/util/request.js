'use strict';

const fetch = require("node-fetch")

class Request {
    /*
    * @param {string} url - The URL to request 
    */
    constructor(url, body=null, j=true, headers={
        "Content-Type": "application/json",
        "Authorization": "Bot " + process.env.TOKEN
    }) {
        this.url = url
        this.body = JSON.stringify(body)
        this.headers = headers
        this.json = j
    }
    async test_request(method, reason=null) {
        if (reason) this.headers["X-Audit-Log-Reason"] = reason
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
        console.log(response.text)
        return response
    }
    async test_get() {
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
    async request(method, reason=null) {
        if (reason) this.headers["X-Audit-Log-Reason"] = reason
        let request = await fetch(`https://discord.com/api/v9/${this.url}`, {
            method: method,
            body: this.body,
            headers: this.headers
        })
        if (this.json) {
            return await request.json()
        }
    }
    async get() {
        let request = await fetch(`https://discord.com/api/v9${this.url}`, {
            method: "GET",
            headers: this.headers
        })
        return await request.json()
    }
}

module.exports = {Request}