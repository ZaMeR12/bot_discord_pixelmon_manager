const { ApplicationCommandOptionType } = require('discord.js');
const Trainer = require('../../models/Trainer');
const lists = require('../../utils/Lists');

const choices = [];

//To give the user all the type exists
for (var type in lists.listTypes) {
    choices.push({
        name: lists.listTypes[type],
        value: lists.listTypes[type],
    });
};


/**
 * Command to add a badge.
 * The role is important to determinate if it's possible to the user to add
 * the badge to someone.
 * WARNING: The user have to just have one leader role, but can be admin too.
 */
module.exports = {
    deleted: false,
    name: "add_badge",
    description: "Add a badge to the account of someone.",
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
            if (client.cooldowns.has(interaction.member.id)) {
                interaction.reply({ content: "Please wait for cooldown to end", ephemeral: true });
            } else {
                const discord_id = interaction.options.get('user_tag').value;
                const user = await client.users.fetch(discord_id);
                const queryExist = {
                    discord_id: discord_id
                };
                const trainer = await Trainer.findOne(queryExist);
                if (trainer) {
                    // Validate that the list of badges can't be higher thant the number of types
                    if (trainer.badges.length <= lists.listTypes.length) {
                        var role = "";
                        const roles = interaction.member.roles.cache;
                        //Validate if there is at least one role the accept the adding.
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
                            for (const badge in trainer.badges) {
                                if (trainer.badges[badge].type == type) {
                                    badgeExist = true;
                                }
                            }
                            if (!badgeExist) {
                                const date = new Date();
                                trainer.badges.push({
                                    type: type,
                                    obtained: date
                                });
                                await trainer.save();
                                interaction.reply(
                                    {
                                        content: `The badge of **${type.toUpperCase()}** is added to ${user}`
                                    }
                                );
                            } else {
                                interaction.reply({
                                    content: `The user ${user} can't have twice the same badge.`,
                                    ephemeral: true
                                });
                            }
                        } else {
                            //Validate that the role of the user is appropriate for the adding.
                            for (const index in lists.rolesPermission) {
                                if (role == lists.rolesPermission[index] && interaction.options.get('type').value == lists.listTypes[index]) {
                                    const type = interaction.options.get('type').value;
                                    var badgeExist = false;
                                    for (const badge in trainer.badges) {
                                        if (trainer.badges[badge].type == type) {
                                            badgeExist = true;
                                        }
                                    }
                                    if (!badgeExist) {
                                        const date = new Date();
                                        trainer.badges.push({
                                            type: type,
                                            obtained: date
                                        });
                                        await trainer.save();
                                        interaction.reply(
                                            {
                                                content: `The badge of **${type.toUpperCase()}** is added to ${user}`
                                            }
                                        );
                                    } else {
                                        interaction.reply({
                                            content: `The user ${user} can't have twice the same badge.`,
                                            ephemeral: true
                                        });
                                    }
                                } else {
                                    interaction.reply({
                                        content: `You don't have the right to add a badge.`,
                                        ephemeral: true
                                    });
                                }
                            }
                        }
                    } else {
                        interaction.reply({
                            content: `The user ${user} can't have more than 18 badges`,
                            ephemeral: true
                        });
                    }
                } else {
                    interaction.reply({
                        content: `The user ${user} didn't have an account.`,
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
}