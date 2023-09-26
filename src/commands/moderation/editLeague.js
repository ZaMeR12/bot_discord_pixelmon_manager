const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const {ApplicationCommandOptionType,PermissionFlagsBits} = require('discord.js');

/**
 * Command for administrators to edit the succeed of the league of an account.
 */
module.exports = {
    deleted: false,
    name: "edit_league",
    description: "Edit the account of an user to indicate taht it succeed at the league",
    options:[
        {
            name:"user_tag",
            description: "The user you want to know the badges informations",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name:"value",
            description: "The value you want to change the account info.",
            type: ApplicationCommandOptionType.Boolean,
            required: true
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],

    callback: async (client, interaction) => {
        const discord_id = interaction.options.get('user_tag').value;
        const user = await client.users.fetch(discord_id);
        const succeed = interaction.options.get('value').value;
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
                if (account.badges.length >= 8){
                    account.succeedLeague = succeed;
                    account.save();
                    interaction.reply({
                        content: `${user}'s league succeed info is edited.`,
                        ephemeral:false
                    });
                } else {
                    interaction.reply({
                        content: `${user} doesn't have access to the league yet.`,
                        ephemeral:true
                    });
                }
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