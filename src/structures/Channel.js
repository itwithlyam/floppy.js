class Channel {
    constructor(data) {
        this.id = data.id
        this.type = data.type
        this.guild_id = data.guild_id
        this.position = data.position
        this.permission_overwrites = data.permission_overwrites
        this.name = data.name
        this.topic = data.topic
        this.nsfw = data.nsfw
        this.last_message_id = data.last_message_id
        this.bitrate = data.bitrate
        this.user_limit = data.bitrate
        this.slowmode = data.rate_limit_per_user
        this.recipients = data.recipients
        this.icon = data.icon
        this.owner_id = data.owner_id
        this.application_id = data.application_id
        this.parent_id = data.parent_id
        this.last_pin_timestamp = data.last_pin_timestamp
        this.rtc_region = data.rtc_region
        this.video_quality_mode = data.video_quality_mode
        this.message_count = data.message_count
        this.thread_metadata = data.thread_metadata
        this.member = data.member
        this.default_auto_archive_duration = data.default_auto_archive_duration
        this.permissions = data.permissions
    }
    async sync() {}
    async modify(data, reason) {}
    
}
module.exports = {Channel}