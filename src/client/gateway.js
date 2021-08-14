"use strict";

const { EventEmitter } = require("events");
const { Thread } = require("../structures/Thread");
const fs = require("fs");
const ws = require("ws");
const system = require("os");
const { Guild } = require("../structures/Guild");
const { Interaction } = require("../structures/Interaction");
const GATEWAY = "wss://gateway.discord.gg/?v=9&encoding=json";
let online = false;
const {
  SlashCommand,
} = require("../structures/ApplicationCommands/SlashCommand");
const fetch = require("node-fetch");
const allThreads = [];
const presence = require("./actions/presenceUpdate");
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
const { Message } = require("../structures/Message");
let connected = false;
const {Logging} = require("../util/logging")


const l = new Logging("./log.log");

const o_log = console.log;
const o_warn = console.warn;
const o_err = console.error;
const o_debug = console.debug;
const o_info = console.info;

console.log = function () {
  const args = Array.prototype.slice.call(arguments);
  l.log(...args);
}

console.trace = function () {
  const args = Array.prototype.slice.call(arguments)
  l.trace(...args)
}

console.debug = function () {
  const args = Array.prototype.slice.call(arguments);
  l.debug(...args);
}

console.info = function () {
  const args = Array.prototype.slice.call(arguments);
  l.info(...args);
}

console.alert = function () {
  const args = Array.prototype.slice.call(arguments);
  l.alert(...args);
}

console.success = function () {
  const args = Array.prototype.slice.call(arguments);
  l.success(...args);
}

console.warning = function () {
  const args = Array.prototype.slice.call(arguments);
  l.warning(...args);
}

console.warn = function () {
  const args = Array.prototype.slice.call(arguments);
  l.warn(...args);
}

console.error = function () {
  const args = Array.prototype.slice.call(arguments);
  l.error(...args);
}

console.reset = function () {
  console.log = o_log;
  console.debug = function() {return};
  console.warn = function() {return};
  console.error = function() {return};
  console.info = function() {return};
  console.trace = function() {return};
  console.warning = function() {return};
  console.success = function() {return};
  console.alert = function() {return};
}



const recieve = new ws.Server({ port: 8080 });

class Client extends EventEmitter {
  constructor(data = {}, logging=false) {
    super();
    if (!logging) {
      console.reset()
    } else {
      console.warning("Running on Debug mode")
    }
    if (!data.intents) data.intents = 513;
    if (!data.token) data.token = ".";
    if (!data.appid) data.appid = "0";
    this.connected = false;
    process.env.TOKEN = data.token;
    process.env.APPID = data.appid;
    this.intents = data.intents;
    console.trace("Client initialized");
  }
  async start(token = null) {
    console.trace("Client startup procedure initiated");
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
    console.trace("Starting gateway procedure");
    socket.on("message", (message) => {
      console.alert(message)
      message = JSON.parse(message);
      if (message.s) {
        this._seq = message.s
        m.d = this._seq
        console.warn("SEQUENCING: Set new SEQ num to " + this._seq)
      }
      const data = message.d;
      const opcode = message.op;
      if (!online) {
        online = true;
        const interval = data.heartbeat_interval;
        setTimeout(() => {
          console.debug("Initial Heartbeat");
          socket.send(JSON.stringify(m));
          socket.send(JSON.stringify(identify));
          console.debug("Identification sent");
          setInterval(() => {
            this._seq = m.d + 1
            m.d = this._seq
            console.warn("SEQUENCING: Set new SEQ num to " + this._seq)
            console.debug("Heartbeat: " + JSON.stringify(m));
            socket.send(JSON.stringify(m));
          }, interval);
        }, interval * Math.random());
      }
      if (opcode === 10) return;
      switch (opcode) {
        case 11: 
          console.debug("Heartbeat ACKed: " + JSON.stringify(message))
          break;
        case 1:
          console.debug("Intimittent Heartbeat: " + JSON.stringify(message));
          socket.send(JSON.stringify(m));
          break;
        case 10:
          console.error("Not recieved Hrtbt Return: " + JSON.stringify(message));
          throw new Error(
            "Why are you seeing this? I don't know, but you didn't return for some reason 🤷‍♂️"
          );
          break;
        case 0:
          switch (message.t) {
            case "READY":
              this._seq = message.s
              data.guilds = undefined;
              this.emit("READY", data);
              console.debug("READY: " + JSON.stringify(message));
              connected = true;
              this.connected = true;
              this.v = data.v;
              this.user = data.user;
              this.session_id = data.session_id;
              this.shard = data.shard;
              this.guilds = [];
              this.guild_count;
              this.application = data.application;
              this.user.name = `${this.user.username}#${this.user.discriminator}`;

              break;
            case "GUILD_CREATE":
              this.emit("GUILD_CREATE", new Guild(data));
              console.log("GUILD_CREATE %s", data.name);
              this.guilds.push(new Guild(data));
              this.guild_count += 1;
              break;
            case "MESSAGE_CREATE":
              this.emit("MESSAGE_CREATE", new Message(data));
              console.log("MESSAGE_CREATE %s", data.id);
              break;
            case "THREAD_CREATE":
              if (allThreads.includes(data.id)) return;
              allThreads.push(data.id);
              this.emit("THREAD_CREATE", new Thread(data));
              console.log("THREAD_CREATE %s", data.name);
              console.log("created thread");
              break;
            case "THREAD_DELETE":
              const pos = allThreads.indexOf(data.id);
              delete allThreads[pos];
              this.emit("THREAD_DELETE", new Thread(data));
              console.log("THREAD_DELETE %s", data.name);
              break;
            case "APPLICATION_COMMAND_CREATE":
              this.emit("APPLICATION_COMMAND_CREATE", new SlashCommand(data));
              console.log("APPLICATION_COMMAND_CREATE %s", data.name);
              break;
            case "INTERACTION_CREATE":
              this.emit("INTERACTION_CREATE", new Interaction(data));
              console.log("INTERACTION_CREATE");
              break;
          }
          break;
      }
    });
    socket.on("close", (code, reason) => {
      this.emit("close", code, reason);
      console.error("GATEWAY CLOSURE %s", `${code}: ${reason}`);
      switch (code) {
        case 1000:
          throw new ConnectionError(
            `The Gateway zombied the connection. (${code})`
          );
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
      console.trace("Gateway local-remote connected");
      connection.on("message", function (message) {
        if (connected === true) {
          socket.send(message.toString());
        } else {
          console.error("Gateway local-remote error, not logged in");
          throw new PayloadError("You are not logged in.");
        }
      });
    });
  }
  async createStatus(name, type, activities) {
    return new Promise((resolve, reject) => {
      try {
        presence.update(name, type, activities);
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  }
}

module.exports = {
  Client,
};
