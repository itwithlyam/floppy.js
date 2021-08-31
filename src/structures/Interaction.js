const {Message} = require("./Message")
const {Request} = require("../util/request")

console.json = function(str) {process.stdout.write(JSON.stringify(str)+"\n")}

class Interaction {
    constructor(data) {
        this.id = data.id
        this.application_id = data.application_id
        this.type = data.type
        this.data = data.data
        this.guild_id = data.guild_id
        this.channel_id = data.channel_id
        this.member = data.member
        this.user = data.user
        this.token = data.token
        this.version = data.version
        this.message = new Message(data.message)
        this.app = process.env.APPID
    }
    async createResponse(data) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/interactions/${this.id}/${this.token}/callback`, data, false)
            const res = await req.request('POST')
            resolve(true)
        })
    }
    async createFollowupMessage(data) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.app}/${this.token}`, data, true)
            const res = await req.request('POST')
            resolve(res.data)
        })
    }
    async getResponse() {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.app}/${this.token}/messages/@original`, {}, true)
            const res = await req.get()
            resolve(await res.data)
        })
    }
    async editResponse(data) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.app}/${this.token}/messages/@original`, data, true)
            const res = await req.request('PATCH')
            resolve(await res)
        })
    }
    async deleteResponse() {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.app}/${this.token}/messages/@original`, {}, false)
            await req.request('DELETE')
            resolve(true)
        })
    }
    async getFollowupMessage(id) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.app}/${this.token}/messages/${id}`, {}, true)
            const res = await req.get()
            resolve(await res)
        })
    }
    async editFollowupMessage(data, id) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.app}/${this.token}/messages/${id}`, data, true)
            const res = await req.request('PATCH')
            resolve(await res)
        })
    }
    async deleteFollowupMessage(id) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.app}/${this.token}/messages/${id}`, {}, false)
            await req.request('DELETE')
            resolve(true)
        })
    }
}

module.exports = {Interaction}