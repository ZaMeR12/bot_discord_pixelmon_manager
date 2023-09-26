const getLocalCommands = require("../../utils/getLocalCommands");
require("dotenv").config();


module.exports = async (client,interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands =  getLocalCommands();

    try{
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        await commandObject.callback(client,interaction);
    }catch (error){
        console.log(error);
    }
};