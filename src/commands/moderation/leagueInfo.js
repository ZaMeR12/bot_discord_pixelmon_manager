const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const {ApplicationCommandOptionType,PermissionFlagsBits} = require('discord.js');

/**
 * Command to know the league informations about an discord's user 
 * of the server.
 */
module.exports = {
    deleted: false,
    name: "league_info",
    description: "Infos of the league of an user.",
    options:[
        {
            name:"user_tag",
            description: "The user you want to know the badges informations",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],

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
                const messagePart1 = `
                    # ${user}'s **League infos** :
                `;
                var messagePart2 = "";
                if (account.badges.lenght >= 8){
                   messagePart2 = `
                    > - Can fight league: **YES**
                   `;
                } else {
                    messagePart2 = `
                    > - Can fight league: **NO**
                   `;
                }
                var messagePart3 = "";
                if (account.succeedLeague){
                    messagePart3 = `
                    > - Win the league: **YES**
                   `;
                } else {
                    messagePart3 = `
                    > - Win the league: **NO**
                   `;
                }
                var messagePart4 = "";
                if (account.succeedLeague){
                    messagePart4 = `
                    > - Is champion: **YES**
                   `;
                } else {
                    messagePart4 = `
                    > - Is champion: **NO**
                   `;
                }
                const message = messagePart1+messagePart2+messagePart3+messagePart4;
                interaction.reply({
                    content: message,
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