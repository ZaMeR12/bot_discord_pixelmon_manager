const _ = require('lodash');
const Trainer = require('../../models/Trainer');

module.exports = {
    deleted: false,
    name: "account_date",
    description: "Commands to know how long you have created your account.",

    callback: async (client, interaction) => {
        const discord_id = interaction.member.id;
        const user = interaction.member;
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