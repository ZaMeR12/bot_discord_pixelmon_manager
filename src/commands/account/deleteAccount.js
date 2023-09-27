const _ = require('lodash');
const Trainer = require('../../models/Trainer');

/**
 * Command that delete the account of the user who call it.
 */
module.exports = {
    deleted: false,
    name: "delete",
    description: "Delete an account for the bot.",

    callback: async (client, interaction) => {
        try {
            if (client.cooldowns.has(interaction.member.id)) {
                interaction.reply({ content: "Please wait for cooldown to end", ephemeral: true });
            } else {
                const id_discord = interaction.user.id;
                const queryExist = {
                    discord_id: id_discord
                };
                const queryDelete = {
                    discord_id: id_discord
                };
                const exist = await Trainer.findOne(queryExist);
                if (!exist) {
                    interaction.reply({
                        content: "You don't have account",
                        ephemeral: true
                    });
                } else {
                    await Trainer.findOneAndDelete(queryDelete);
                    interaction.reply({
                        content: `🗑️ ${interaction.user}'s account is deleted.`,
                        ephemeral: true
                    });
                }
            }
        } catch (error) {
            console.log(error);
            // Handle any errors appropriately
            interaction.reply({
                content: "There is a problem with the bot, please contact the developer.",
                ephemeral: true
            });
        }
    }
};
