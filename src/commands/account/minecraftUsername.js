const _ = require('lodash');
const Trainer = require('../../models/Trainer');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    deleted: false,
    name: "minecraft_pseudo",
    description: "Knowing the mincraft pseudo of someone.",
    options: [
        {
            name:"user_tag",
            description: "The user you want to know the minecraft pseudo.",
            type: ApplicationCommandOptionType.User,
            required: true
        }  
    ],

    callback: async (client, interaction) => {
        const discord_id =  interaction.options.get('user_tag').value;
        const user = await client.users.fetch(discord_id);
        const queryExist = {
            discord_id: discord_id
        };
        try {
            const account = await Trainer.findOne(queryExist);
            if (!account){
                interaction.reply({
                    content: `${user.username} doesn't have an account yet.`,
                    ephemeral:true
                });
            } else {
                
                interaction.reply({
                    content: `**${user.username}**'s minecraft pseudo is **${account.minecraft_username}**`,
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
