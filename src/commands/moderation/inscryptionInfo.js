const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const {ApplicationCommandOptionType,PermissionFlagsBits} = require('discord.js');

module.exports = {
    deleted: false,
    name: "creation_date_info",
    description: "Commands to know the creation of the account for admin",
    permissionsRequired: [PermissionFlagsBits.Administrator],
    options: [
      {
        name:"user_tag",
        description: "The user you want to know the date of the creation of account.",
        type: ApplicationCommandOptionType.User,
        required: true
      }  
    ],

    callback: async (client, interaction) => {
        const discord_id = interaction.options.get('user_tag').value;
        const user = await client.users.fetch(discord_id);
        const queryExist = {
            discord_id: discord_id
        };
        try {
            const account = await Trainer.findOne(queryExist);
            if (!account){
                interaction.reply({
                    content: `${user} doesn't have an account yet.`,
                    ephemeral:true
                });
            } else {
                interaction.reply({
                    content: `The creation date is **${account.inscryption}** of ${user}'s account`,
                    ephemeral:true
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