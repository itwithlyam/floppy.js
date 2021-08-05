

class Message {
    constructor(data=null) {
        if (data) {
            this._data = data
            this.type = data.type
            this.tts = data.tts
            this.timestamp = data.timestamp
            this.referenced_message = data.referenced_message
            this.pinned = data.pinned
            this.nonce = data.nonce
            this.mentions = data.mentions
            this.mention_roles = data.mention_roles
            this.mention_everyone = data.mention_everyone
            this.member = {
                roles: data.member.roles,
                premium_since: data.member.premium_since,
                pending: data.member.pending,
                nick: data.member.nick,
                joined_at: data.member.joined_at,
                is_pending: data.member.is_pending,
                hoisted_role: data.member.hoisted_role,
                deaf: data.member.deaf,
            }
            this.id = data.id
            this.flags = data.flags
            this.embeds = data.embeds
            this.edited_timestamp = data.edited_timestamp
            this.content = data.content
            this.components = data.components
            this.channel_id = data.channel_id
            this.author = {
                username: data.author.username,
                public_flags: data.author.public_flags,
                id: data.author.id,
                discriminator: data.author.discriminator,
                avatar: data.author.avatar,
            }
            this.attatchments = data.attatchments
            this.guild_id = data.guild_id
            this.channel = data.channel
        }
    }
}

module.exports = {Message}