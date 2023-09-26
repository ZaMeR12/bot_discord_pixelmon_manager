const { Client,IntentsBitField } = require("discord.js");
require("dotenv").config();
const eventHandler = require("./handlers/eventHandler");
const mongoose = require('mongoose');

const client = new Client(
    {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
        ]
    }
);

(async ()=>{
    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.MONGO_SERVER);
        console.log("DB connected");
        eventHandler(client);
        client.login(process.env.CONNECTION_BOT);
    } catch (error){
        console.log(error);
    }
})();




// function addBadge(user, type) {
//     const queryInsertBadge = "INSERT INTO badge(user_id,type_id) VALUES (?,?)";
//     const querySelectUserId = `SELECT id FROM user WHERE discord_id = ?`;
//     const querySelectTypeId = `SELECT id FROM type WHERE name = ?`;
//     var validate = {
//         validation: false,
//         message: ""
//     };

//     try {
//         var user_id = 0;
//         var type_id = 0;
//         db.get(querySelectUserId,[user],(err,))
        
//         if (user_id != 0 && type_id != 0) {
//             db.serialize(() => {
//                 const stmt = db.prepare(query);
//                 stmt.run([user_id.toString(), type_id.toString()]);
//                 stmt.finalize();
//             });
//             validate.validation = true;
//             validate.message = `The badge ${type} is added successfully to ${user.tag}`;
//         } else {
//             validate.message = `Something is wrong in your command request.`;
//         }
//     } catch (error) {
//         console.log(error);
//         validate.message = "There is a problem with the bot, please contact the dev.";
//     }
//     return validate
// }