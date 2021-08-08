'use strict';

const {Channel} = require("./Channel")
const {Request} = require("../util/request")

class Guild {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.icon = data.icon
        this.icon_hash = data.icon_hash
        this.splash = data.splash
        this.discovery_splash = data.discovery_splash
        this.owner = data.owner
        this.owner_id = data.owner_id
        this.permissions = data.permissions
        this.rtc_region = data.region
        this.afk_channel_id = data.afk_channel_id
        this.afk_timeout = data.afk_timeout
        this.widget_enabled = data.widget_enabled
        this.widget_channel_id = data.widget_channel_id
        this.verification_level = data.verification_level
        this.default_message_notifications = data.default_message_notifications
        this.explicit_content_filter = data.explicit_content_filter
        this.roles = data.roles
        this.emojis = data.emojis
        this.features = data.features
        this.mfa_level = data.mfa_level
        this.application_id = data.application_id
        this.system_channel_id = data.system_channel_id
        this.system_channel_flags = data.system_channel_flags
        this.rules_channel_id = data.rules_channel_id
        this.joined_at = data.joined_at
        this.large = data.large
        this.unavailable = data.unavailable
        this.member_count = data.member_count
        this.voice_states = data.voice_states
        this.members = data.members
        this.channels = []
        data.channels.forEach(element => {
            this.channels.push(new Channel(element))
        });
        this.threads = data.threads
        this.presences = data.presences
        this.max_presences = data.max_presences
        this.max_members = data.max_members
        this.vanity_url_code = data.vanity_url_code
        this.description = data.description
        this.banner = data.banner
        this.premium_tier = data.premium_tier
        this.premium_subscription_count = data.premium_subscription_count
        this.preferred_locale = data.preferred_locale
        this.public_updates_channel_id = data.public_updates_channel_id
        this.max_video_channel_users = data.max_video_channel_users
        this.approximate_member_count = data.approximate_member_count
        this.approximate_presence_count = data.approximate_presence_count
        this.welcome_screen = data.welcome_screen
        this.nsfw_level = data.nsfw_level
        this.stage_instances = data.stage_instances
        this.stickers = data.stickers
    }
    async modify(data, reason) {
        let gid = this.id
        return new Promise((res, rej) => {
            const req = new Request("/guilds/" + gid, data)
            let result = req.request("PATCH", reason)
            res(result.data)
        })
    }
    async getChannels() {
        let gid = this.id
        return new Promise(resolve => {
            const req = new Request(`/guilds/${gid}/channels`)
            let resp = req.get()
            resolve(resp)
        })
    }
    async createChannel(data, reason) {

    }
    async modifyChannelPosition(data, reason) {}
    async listThreads() {}
    async getMember(userId) {}
    async listMembers(limit=1, after=0) {}
    async searchMembers(query, limit=1) {}
    async modifyMember(data, userId, reason) {}
    async modifyNick(nick, reason) {}
    async assignRole(userId, roleId, reason) {}
    async removeRole(userId, roleId, reason) {}
    async kick(userId, reason) {}
    async ban(userId, reason, deleteMessageDays=0) {}
    async getBans() {}
    async getBan(userId) {}
    async unban(userId, reason) {}
    async getRoles() {}
    async createRole(data, reason) {}
    async modifyRolePositions(roleId, position, reason) {}
    async modifyRole(roleId, data, reason) {}
    async deleteRole(roleId, reason) {}
    async pruneList(days, roles) {}
    async prune(data, reason) {}
    async voiceRegions() {}
    async getInvites() {}
    async getIntegrations() {}
    async deleteIntegration(integrationId, reason) {}
    async getWidgetSettings() {}
    async modifyWidget(data, reason) {}
    async getWidget() {}
    async getVanityURL() {} 
    async getWidgetImage(style="shield") {}
    async getWelcome() {}
    async modifyWelcome(data, reason) {}
    async modifyCurrentVoiceState(data) {}
    async modifyVoiceState(userId, data) {}
}
module.exports = {Guild}
