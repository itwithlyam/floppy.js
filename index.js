'use strict';

const Bot = require("./src/client/gateway").Client
const Client = require("./src/client/gateway").Client
const Gateway = require("./src/client/gateway").Client
const WebhookManager = require("./src/client/webhook").WebhookManager
const WebhookClient = require("./src/client/webhook").WebhookManager
const InteractionManager = require("./src/client/InteractionClient").InteractionManager
const InteractionClient = require("./src/client/InteractionClient").InteractionManager
const SlashCommand = require("./src/structures/ApplicationCommands/SlashCommand").SlashCommand
const Component = require("./src/structures/MessageComponents/Component").Component

module.exports = {
    Bot,
    Client,
    Gateway,
    WebhookManager,
    WebhookClient,
    InteractionManager,
    InteractionClient,
    SlashCommand,
    Component
}