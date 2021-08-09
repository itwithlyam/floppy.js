'use strict';

const {Request} = require("../util/request")

class WebhookManager {
    constructor(id, token) {
        this.id = id
        this.token = token
    }
    async createMessage(message) {
        return new Promise((resolve, reject) => {
            const req = new Request(`webhooks/${this.id}/${this.token}`, {content: "hi"}, false)
            const res = req.request("POST")
            console.log(res)
            resolve(res)
        })
    }
}

module.exports = {WebhookManager}