const {Message} = require("./Message")
const {Request} = require("../util/request")

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
    }
    async createResponse(data) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/interactions/${this.id}/${this.token}/callback`, data, true)
            const res = await req.request('POST')
            console.log(await res)
        })
    }
    async createFollowupMessage(data) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.id}/${this.token}`, data, true)
            const res = await req.request('POST')
            console.log(await res)
        })
    }
    async getResponse() {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.id}/${this.token}/messages/@original`, j=true)
            const res = await req.get()
            console.log(await res)
            resolve(await res)
        })
    }
    async editResponse(data) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.id}/${this.token}/messages/@original`, data, j=true)
            const res = await req.request('PATCH')
            console.log(await res)
            resolve(await res)
        })
    }
    async deleteResponse() {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.id}/${this.token}/messages/@original`, j=false)
            await req.request('DELETE')
            console.log("it worked, deleted response")
            resolve(true)
        })
    }
    async getFollowupMessage() {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.id}/${this.token}/messages`, j=true)
            const res = await req.get()
            console.log(await res)
            resolve(await res)
        })
    }
    async editFollowupMessage(data) {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.id}/${this.token}/messages`, data, j=true)
            const res = await req.request('PATCH')
            console.log(await res)
            resolve(await res)
        })
    }
    async deleteFollowupMessage() {
        return new Promise(async (resolve, reject) => {
            const req = new Request(`/webhooks/${this.id}/${this.token}/messages`, j=false)
            await req.request('DELETE')
            console.log("it worked, deleted followup")
            resolve(true)
        })
    }
}

module.exports = {Interaction}