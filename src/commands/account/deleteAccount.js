const _ = require('lodash');
const Trainer = require('../../models/Trainer');

module.exports = {
    deleted: false,
    name: "delete",
    description: "Delete an account for the bot.",

    callback: async (client, interaction) => {
        const id_discord = interaction.user.id;
        const queryExist = {
            discord_id: id_discord
        };
        const queryDelete = {
            discord_id: id_discord
        };
        try {
            const exist = await Trainer.findOne(queryExist);
            if (!exist){
                interaction.reply({
                    content: "You don't have account",
                    ephemeral:true
                });
            } else {
                await Trainer.findOneAndDelete(queryDelete);
                interaction.reply({
                    content: `🗑️ ${interaction.user}'s account is deleted.`,
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
