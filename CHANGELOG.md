# Changelog

All notable changes to this project will be documented in this file.

# 1.3.1 (2022-09-02)

## Classes

- **Client**: Files exported in directories specified in Client#directories will only be registered as commands/events if using **ClientCommand** or **ClientEvent**. ([defb3f6](https://github.com/callmeglenn/glenncord/commit/defb3f68e98d4be866f093010a7ded21fe66f539d))

# 1.3.0 - (2022-08-31)

## Documentation
- This file will now document all notable changes in this file. ([929e41f](https://github.com/callmeglenn/glenncord/commit/929e41faeaf5853431af5a6b85b9305f55716c2d))
- src/client directory has been renamed to src/classes. ([929e41f](https://github.com/callmeglenn/glenncord/commit/929e41faeaf5853431af5a6b85b9305f55716c2d))

## Classes

- **MongoDefault**: A class that can be used as an extend for its common-to-use method interactions with MongoDB. ([52b510a](https://github.com/callmeglenn/glenncord/commit/52b510a800a549d6133f1bac883d434be949b311))

## Typings

- **ClientCommandType**: Removed since [DM Permission](https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder?scrollTo=setDMPermission) exists. ([52b510a](https://github.com/callmeglenn/glenncord/commit/52b510a800a549d6133f1bac883d434be949b311))

