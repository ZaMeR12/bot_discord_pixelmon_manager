const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    deleted: false,
    name: "create",
    description: "Create an account for the bot.",
    options: [
        {
            name: "minecraft_username",
            description: "You real minecraft pseudo. WARNING: NOT ABLE TO CHANGE IT EXEPT MODOS AFTER CREATION",
            type: ApplicationCommandOptionType.String,
            required:true
        }
    ],

    callback: async (client, interaction) => {
        const id_discord = interaction.user.id;
        const minecraft_username = interaction.options.get('minecraft_username').value;
        const queryExist = {
            discord_id: id_discord
        };
        const queryInsert = {
            discord_id: id_discord,
            minecraft_username:minecraft_username,
            isChampion: false,
            succeedLeague: false,
            badges:[],
            inscryption: new Date()
        };
        try {
            const exist = await Trainer.findOne(queryExist);
            if (exist){
                interaction.reply({
                    content: "Your account is already create.",
                    ephemeral:true
                });
            } else {
                await Trainer.create(queryInsert);
                interaction.reply(`${interaction.user}'s account is create.`);
            }
        } catch (error) {
            console.log(error);
            // Handle any errors appropriately
            interaction.reply({
                content:"There is a problem with the bot, please contact the developer.",
                ephemeral:true
            });
        }
    }
};
