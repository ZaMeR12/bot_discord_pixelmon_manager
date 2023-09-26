const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const {ApplicationCommandOptionType,PermissionFlagsBits} = require('discord.js');

/**
 * Command to be able to edit an user minecraft pseudo from daministrators.
 * The confirmation can't be ephemeral, because of administration logs channels.
 */
module.exports = {
    deleted: false,
    name: "edit_minecraft",
    description: "Edit the username of someone account",
    permissionsRequired: [PermissionFlagsBits.Administrator],
    options: [
      {
        name:"user_tag",
        description: "The user you want to know the date of the creation of account.",
        type: ApplicationCommandOptionType.User,
        required: true
      } ,
      {
        name:"minecraft_username",
        description: "The new minecraft username.",
        type: ApplicationCommandOptionType.String,
        required: true
      } 
    ],

    callback: async (client, interaction) => {
        const discord_id = interaction.options.get('user_tag').value;
        const user = await client.users.fetch(discord_id);
        const minecraft_username = interaction.options.get('minecraft_username').value;
        const queryExist = {
            discord_id: discord_id
        };
        const queryEdit = {
            minecraft_username: minecraft_username
        };
        try {
            const exist = await Trainer.findOne(queryExist);
            if (!exist){
                interaction.reply({
                    content: `${user} doesn't have an account`,
                    ephemeral:true
                });
            } else {
                await Trainer.updateOne(queryEdit);
                interaction.reply({
                    content: `🖋️ ${user}'s minecraft pseudo is changed to ${minecraft_username}.`,
                    /** For administration trace. */
                    ephemeral:false
                });
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
