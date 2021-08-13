'use strict';

const {Request} = require("../util/request")
const fetch = require("node-fetch")
const {SlashCommand} = require("../structures/ApplicationCommands/SlashCommand")

const url = `https://discord.com/api/v8/applications/${process.env.APPID}/commands`

class InteractionManager {
    async createCommand(json) {
        const headers = {
            "Authorization": `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json"
        }
        console.log(process.env.APPID)
        return new Promise(async (resolve, reject) => {
            const req = await fetch(url, {
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
            const req = await fetch(url, {
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
            const req = await fetch(url + `/${id}`, {
                headers: headers,
                method: "DELETE"
            })
            if (!req.ok) reject("Response was not OK: " + req.status)
            resolve()
        })
    }
}

module.exports = {InteractionManager}