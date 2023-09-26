const { ApplicationCommandOptionType } = require('discord.js');
const Trainer = require('../../models/Trainer');
const lists = require('../../utils/Lists');
const _ = require('lodash');

const choices = [];

for (var type in lists.listTypes) {
    choices.push({
        name: lists.listTypes[type],
        value: lists.listTypes[type],
    });
};

/**
 * Command that can delete a badge sof someone.
 * WARNING: The user have to have onely one leader role, but can be admin.
 */
module.exports = {
    deleted: false,
    name: "delete_badge",
    description: "Delete a badge to the account of someone.",
    options: [
        {
            name: 'type',
            description: "The type of the badge.",
            type: ApplicationCommandOptionType.String,
            choices: choices,
            required: true,
        },
        {
            name: "user_tag",
            description: "The user tag of the account you want to add the badge.",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],

    callback: async (client, interaction) => {
        try {
            const discord_id = interaction.options.get('user_tag').value;
            const user = await client.users.fetch(discord_id);
            const queryExist = {
                discord_id: discord_id
            };
            const trainer = await Trainer.findOne(queryExist);
            if (trainer) {
                //Validate if the list of badges is empty.
                if (!_.isEmpty(trainer.badges)) {
                    var role = "";
                    const roles = interaction.member.roles.cache;
                    roles.forEach(element => {
                        if (element.name == lists.rolesPermission[0]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[1]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[3]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[4]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[5]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[6]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[7]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[8]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[9]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[10]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[11]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[12]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[13]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[14]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[15]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[16]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[17]) {
                            role = element.name;
                        }
                        else if (element.name == lists.rolesPermission[18]) {
                            role = element.name;
                        }
                        if (element.name == "Admin") {
                            role = element.name;
                        }
                    });
                    if (role == "Admin") {
                        const type = interaction.options.get('type').value;
                        var badgeExist = false;
                        var indexBadge = "";
                        for (const badge in trainer.badges) {
                            if (trainer.badges[badge].type == type) {
                                badgeExist = true;
                                indexBadge = badge;
                            }
                        }
                        if (badgeExist) {
                            var listbadges = trainer.badges;
                            _.pull(listbadges, listbadges[indexBadge]);
                            console.log(listbadges);
                            await Trainer.updateOne({ discord_id: discord_id }, { badges: listbadges })
                            interaction.reply({
                                content: `The user ${user} have the badge **${type.toUpperCase()}** deleted.`,
                                ephemeral: false
                            });
                        } else {
                            interaction.reply({
                                content: `The user ${user} doesn't already have the badge **${type.toUpperCase()}**.`,
                                ephemeral: true
                            });
                        }
                    } else {
                        //Validate the role of the user in the leaders roles.
                        for (const index in lists.rolesPermission) {
                            if (role == lists.rolesPermission[index] && interaction.options.get('type').value == lists.listTypes[index]) {
                                const type = interaction.options.get('type').value;
                                var badgeExist = false;
                                var indexBadge = "";
                                for (const badge in trainer.badges) {
                                    if (trainer.badges[badge].type == type) {
                                        badgeExist = true;
                                        indexBadge = badge;
                                    }
                                }
                                if (badgeExist) {
                                    var listbadges = trainer.badges;
                                    _.pull(listbadges, listbadges[indexBadge]);
                                    await Trainer.updateOne({ discord_id: discord_id }, { badges: listbadges })
                                    interaction.reply({
                                        content: `The user ${user} have the badge **${type.toUpperCase()}** deleted.`
                                    });
                                } else {
                                    interaction.reply({
                                        content: `The user ${user} doesn't already have the badge **${type.toUpperCase()}**.`,
                                        ephemeral: true
                                    });
                                }
                            } else {
                                interaction.reply({
                                    content: `You don't have the right to delete a badge.`,
                                    ephemeral: true
                                });
                            }
                        }
                    }
                } else {
                    interaction.reply({
                        content: `The user ${user} doesn't have badges in the account`,
                        ephemeral: true
                    });
                }
            } else {
                interaction.reply({
                    content: `The user ${user} didn't have an account.`,
                    ephemeral: true
                });
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
}