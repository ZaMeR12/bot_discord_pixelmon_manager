const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    deleted: false,
    name: "badges",
    description: "Infos about your badges.",
    options:[
        {
            name:"hide",
            description: "If you want your message to be se only by you. Default as FALSE",
            type: ApplicationCommandOptionType.Boolean
        }
    ],

    callback: async (client, interaction) => {
        const discord_id = interaction.member.id;
        const user = interaction.member;
        var hidingMessage = false;
        if(interaction.options.get('hide')){
            hidingMessage = true;
        }
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
                    # ${user}'s **badges** :

                    ## Number of badges: ${account.badges.length}
                `;
                var messagePart2 = "";
                if (!_.isEmpty(account.badges)){
                    messagePart2 = `
                        ### List of badges: \n
                     `;
                    for (const index in account.badges){
                        messagePart2 += `
                            > - Badge ${Number(index)+1}
                            >  - Type: **${account.badges[index].type.toUpperCase()}**
                            >  - Obtained: **${account.badges[index].obtained}**
                        `;
                    }
                }
                const message = messagePart1+messagePart2;
                interaction.reply({
                    content: message,
                    ephemeral:hidingMessage
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