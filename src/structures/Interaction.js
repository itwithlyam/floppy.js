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
}

module.exports = {Interaction}