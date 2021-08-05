"use strict";

const { EventEmitter } = require("events");
const fs = require("fs");
const ws = require("ws");
const system = require("os");
const GATEWAY = "wss://gateway.discord.gg/?v=9&encoding=json";
let online = false;
const constraints = "./client/constraints.json";
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
let connected = false;

function open() {
  return JSON.parse(fs.readFileSync(constraints).toString());
}
function close(object) {
  fs.writeFileSync(constraints, JSON.stringify(object));
}

class Client extends EventEmitter {
  constructor(token = null, intents = 513) {
    super();
    if (token) process.env.TOKEN = token;
    this.intents = intents;
  }
  login(token = null) {
    connected = false;
    if (token) {
      let p = open();
      p.token = token;
      close(p);
    }
    const identify = {
      op: 2,
      d: {
        token: open().token,
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
    const recieve = new ws.Server({ port: 8080 });
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
              this.emit("ready");
              connected = true;

              break;
            case "GUILD_CREATE":
              this.emit("guildCreate");

              break;
            case "MESSAGE_CREATE":
              this.emit("message", data.content);

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
          socket.send(JSON.stringify(message));
        } else {
          throw new PayloadError("You are not logged in.");
        }
      });
    });
  }
}

module.exports = {
  Client,
};