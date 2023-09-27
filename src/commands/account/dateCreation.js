const _ = require('lodash');
const Trainer = require('../../models/Trainer');


/**
 * Command to show date of account's creation of the user who call it
 */
module.exports = {
    deleted: false,
    name: "account_date",
    description: "Commands to know how long you have created your account.",

    callback: async (client, interaction) => {
        try {
            if (client.cooldowns.has(interaction.member.id)) {
                interaction.reply({ content: "Please wait for cooldown to end", ephemeral: true });
            } else {
                //now, set cooldown
                client.cooldowns.set(interaction.member.id, true);

                // After the time you specified, remove the cooldown
                setTimeout(() => {
                    client.cooldowns.delete(interaction.user.id);
                }, client.COOLDOWN_SECONDS * 1000);

                const discord_id = interaction.member.id;
                const user = interaction.member;
                const queryExist = {
                    discord_id: discord_id
                };
                const account = await Trainer.findOne(queryExist);
                if (!account) {
                    interaction.reply({
                        content: `${user} doesn't have an account yet.`,
                        ephemeral: true
                    });
                } else {
                    interaction.reply({
                        content: `The creation date is **${account.inscryption}** of ${user}'s account`,
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