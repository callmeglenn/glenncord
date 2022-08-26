# Glenncord
A framework extension of the [discord.js](https://discord.js.org/#/) library.
This isn't for public use, so I don't have any intentions on creating a guide on how to use this framework.

## Requirements
- [discord.js](https://www.npmjs.com/package/discord.js) - Version 14.3.0
- [distube](https://www.npmjs.com/package/distube) - Version 4.0.3
- [mongoose](https://www.npmjs.com/package/mongoose) - Version 6.5.2

## Installation
[Node.js 16.9.0](https://nodejs.org/en/) or newer is required.

```sh-session
npm install glenncord
```

**Initializing a new Glenncord Client.**

```js
const Glenncord = require('glenncord')
const { GatewayIntentBits } = require('discord.js')

const client = new Glenncord.Client({
    intents: [GatewayIntentBits.Guilds],
    credentials: {
        token: "YOURTOKENHERE",
        mongo: "YOURMONGOHERE"
    },
    directories: {
        commands: "./commands",
        events: "./events"
    }
})
client.start()
```

**Creating a Glenncord ClientEvent.**

```js
const Glenncord = require('glenncord')

const event = new Glenncord.ClientEvent({
    event: "ready",
    on: function(client) {
        console.log(`Logged in as ${client.user.tag}.`)
    }
})
```

**Creating a Glenncord ClientCommand.**

```js
const Glenncord = require('glenncord')
const { SlashCommandBuilder } = require('discord.js')

const command = new Glenncord.ClientCommand({
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get the client's response time."),
    run: function(interaction) {
        interaction.reply(`${interaction.client.ws.ping}ms`)
    }
})
```
