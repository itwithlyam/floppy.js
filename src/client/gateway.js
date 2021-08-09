"use strict";

const { EventEmitter } = require("events");
const fs = require("fs");
const ws = require("ws");
const system = require("os");
const {Guild} = require("../structures/Guild")
const GATEWAY = "wss://gateway.discord.gg/?v=9&encoding=json";
let online = false;
const fetch = require("node-fetch")
const presence = require("./actions/presenceUpdate")
const {
  TokenError,
  IntentsError,
  ConnectionError,
  PayloadError,
  IdentificationError,
  RateLimited,
  ResumeError,
  ShardError,
} = require("../util/errors");
const { Message } = require("../structures/Message")
let connected = false;

const recieve = new ws.Server({ port: 8080 });

class Client extends EventEmitter {
  constructor(token = null, intents = 513) {
    super();
    this.connected = false
    if (token) process.env.TOKEN = token;
    this.intents = intents;
  }
  async start(token = null) {
    connected = false;
    if (token) {
      process.env.TOKEN = token;
    }
    const identify = {
      op: 2,
      d: {
        token: (process.env.TOKEN = token),
        intents: this.intents,
        properties: {
          $os: system.type(),
          $browser: "floppy.js",
          $device: "floppy.js",
        },
      },
    };
    const m = {
      op: 1,
      d: null,
    };
    const socket = new ws(GATEWAY);
    socket.on("message", (message) => {
      message = JSON.parse(message);
      const data = message.d;
      const opcode = message.op;
      if (!online) {
        online = true;
        const interval = data.heartbeat_interval;
        setTimeout(() => {
          socket.send(JSON.stringify(m));
          socket.send(JSON.stringify(identify));
          setInterval(() => {
            socket.send(JSON.stringify(m));
          }, interval);
        }, interval * Math.random());
      }
      if (opcode === 11 || opcode === 10) return;
      switch (opcode) {
        case 1:
          socket.send(JSON.stringify(m));
          break;
        case 10:
        case 11:
          throw new Error(
            "Why are you seeing this? I don't know, but you didn't return for some reason 🤷‍♂️"
          );
          break;
        case 0:
          switch (message.t) {
            case "READY":
              data.guilds = undefined
              this.emit("READY", data);
              connected = true;
              this.connected = true
              this.v = data.v
              this.user = data.user
              this.session_id = data.session_id
              this.shard = data.shard
              this.guilds = []
              this.application = data.application
              this.user.name = `${this.user.username}#${this.user.discriminator}`
              console.log(this)
              break;
            case "GUILD_CREATE":
              this.emit("GUILD_CREATE", new Guild(data));
              this.guilds.push(new Guild(data))
              break;
            case "MESSAGE_CREATE":
              this.emit("MESSAGE_CREATE", new Message(data));
              break;
          }
          break;
      }
    });
    socket.on("close", (code, reason) => {
      this.emit("close", code, reason);
      switch (code) {
        case 4000:
          throw new ConnectionError(
            `The Gateway threw an unknown close code. (${code}: ${reason})`
          );
          break;
        case 4001:
          throw new PayloadError(
            `The Gateway recieved an unknown opcode. (${code}: ${reason})`
          );
          break;
        case 4002:
          throw new PayloadError(
            `The Gateway recieved an invalid or unknown payload. (${code}: ${reason})`
          );
          break;
        case 4003:
          throw new PayloadError(
            `The Gateway recieved a payload before identifying. (${code}: ${reason})`
          );
          break;
        case 4004:
          throw new TokenError(
            `The Gateway recieved an invalid account token. (${code}: ${reason})`
          );
          break;
        case 4005:
          throw new IdentificationError(
            `The Gateway already recieved an Identify payload. (${code}: ${reason})`
          );
          break;
        case 4007:
          throw new ResumeError(
            `The Gateway recieved an invalid sequence while resuming. (${code}: ${reason})`
          );
          break;
        case 4008:
          throw new RateLimited(
            `The Gateway has rate limited you due to too many requests being made. (${code}: ${reason})`
          );
          break;
        case 4009:
          process.exit();
          break;
        case 4010:
          throw new ShardError(
            `The Gateway recieved an invalid shard while connecting. (${code}: ${reason})`
          );
          break;
        case 4011:
          throw new ShardError(
            `The Gateway requires sharding to continue. (${code}: ${reason})`
          );
          break;
        case 4012:
          throw new ConnectionError(
            `The Gateway version is invalid. (${code}: ${reason})`
          );
          break;
        case 4013:
          throw new IntentsError(
            `The Gateway recieved invalid Intents. Recalculate your Bitwise permissions! (${code}: ${reason})`
          );
          break;
        case 4014:
          throw new IntentsError(
            `The Gateway has denied your Intents. Check your settings. (${code}: ${reason})`
          );
          break;
        case 1006:
          process.exit();
          break;
        default:
          throw new ConnectionError(
            `The Gateway has thrown an unknown/undefined error. (${code}: ${reason})`
          );
      }
    });
    recieve.on("connection", function (connection) {
      connection.on("message", function (message) {
        if (connected === true) {
          socket.send(message.toString());
        } else {
          throw new PayloadError("You are not logged in.");
        }
      });
    });
  }
  async createStatus(name, type, activities) {
    return new Promise((resolve, reject) => {
      try {
      presence.update(name, type, activities)
      } catch(e) {
        reject(e)
      }
      resolve()
    })
  }
}

module.exports = {
  Client,
};
