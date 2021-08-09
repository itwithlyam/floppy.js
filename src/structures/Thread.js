'use strict';

const {Request} = require("../util/request")

class Thread {
    constructor(data) {
        this.id = data.id
        this.type = data.type
        this.guild_id = data.guild_id
        this.name = data.name
        this.last_message_id = data.last_message_id
        this.last_pin_timestamp = data.last_pin_timestamp
        this.rate_limit_per_user = data.rate_limit_per_user
        this.owner_id = data.owner_id
        this.parent_id = data.parent_id
        this.message_count = data.message_count
        this.member_count = data.member_count
        this.thread_metadata = data.thread_metadata
    }
    async createMessage(content) {
        return new Promise((resolve, reject) => {
            const req = new Request(`channels/${this.id}/messages`, {content: content}, true)
            resolve(req.request('POST'))
        })
    }
}

module.exports={Thread}