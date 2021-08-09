'use strict';

const Bot = require("./src/client/gateway").Client
const Client = require("./src/client/gateway").Client
const Gateway = require("./src/client/gateway").Client
const WebhookManager = require("./src/client/webhook").WebhookManager
const WebhookClient = require("./src/client/webhook").WebhookManager

module.exports = {
    Bot,
    Client,
    Gateway,
    WebhookManager,
    WebhookClient,
}