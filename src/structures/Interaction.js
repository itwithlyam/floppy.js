const {Message} = require("./Message")

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
        console.log(this)
    }
}

module.exports = {Interaction}