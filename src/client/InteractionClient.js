'use strict';

const {Request} = require("../util/request")
const {EventEmitter} = require("events")
const fetch = require("node-fetch")
const {SlashCommand} = require("../structures/ApplicationCommands/SlashCommand")

class InteractionManager {
    async init() {
        return new Promise(async (resolve, reject) => {
            this.url = `https://discord.com/api/v9/applications/${process.env.APPID}/commands`
            resolve(true)
        })
    }
    async createCommand(json) {
        const headers = {
            "Authorization": `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json"
        }
        console.log(process.env.APPID)
        return new Promise(async (resolve, reject) => {
            const req = await fetch(this.url, {
                headers: headers,
                body: JSON.stringify(json),
                method: "POST"
            })
            if (!req.ok) reject("Response was not OK")
            const res = await req.json()
            resolve(res)
        })
    }
    async getCommands() {
        const headers = {
            "Authorization": `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json"
        }
        return new Promise(async (resolve, reject) => {
            const req = await fetch(this.url, {
                headers: headers,
                method: "GET"
            })
            if (!req.ok) reject("Response was not OK")
            const res = await req.json()
            const ress = []
            res.forEach(resss => ress.push(new SlashCommand(resss)))
            resolve(ress)
        })
    }
    async deleteCommand(id) {
        const headers = {
            "Authorization": `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json"
        }
        return new Promise(async (resolve, reject) => {
            const req = await fetch(this.url + `/${id}`, {
                headers: headers,
                method: "DELETE"
            })
            if (!req.ok) reject("Response was not OK: " + req.status)
            resolve()
        })
    }
}

module.exports = {InteractionManager}