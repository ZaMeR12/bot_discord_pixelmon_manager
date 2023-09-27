const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const { ApplicationCommandOptionType } = require('discord.js');

/**
 * Commands that show minecraft username of the account of the user.
 */
module.exports = {
    deleted: false,
    name: "minecraft_pseudo",
    description: "Knowing the mincraft pseudo of someone.",
    options: [
        {
            name: "user_tag",
            description: "The user you want to know the minecraft pseudo.",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],

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
                
                const discord_id = interaction.options.get('user_tag').value;
                const user = await client.users.fetch(discord_id);
                const queryExist = {
                    discord_id: discord_id
                };
                const account = await Trainer.findOne(queryExist);
                if (!account) {
                    interaction.reply({
                        content: `${user.username} doesn't have an account yet.`,
                        ephemeral: true
                    });
                } else {
                    interaction.reply({
                        content: `**${user.username}**'s minecraft pseudo is **${account.minecraft_username}**`,
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
