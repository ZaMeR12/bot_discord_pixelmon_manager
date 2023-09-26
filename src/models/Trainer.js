const {Schema,model,Date, default: mongoose} = require('mongoose');
const lists =  require('../utils/Lists');
require("dotenv").config();

const trainerSchema = new Schema({
    discord_id:{
        type: String,
        required:[true,"The discord_id is mandatory."]
    },
    minecraft_username:{
        type:String,
        required:[true,"The minecraft username is mandatory."]
    },
    isChampion: {
        type: Boolean,
        required:[true,"The isChampion is mandatory."]
    },
    succeedLeague:{
        type: Boolean,
        required:[true,"The succeedLegue is mandatory."]
    },
    badges: {
        type: [
            {
                type: {
                    type: String,
                    enum: lists.listTypes,
                    required: [true, "The type of badge is mandatory."]
                },
                obtained: {
                    type: Date,
                    required: [true, "The date of obtention is mandatory."]
                }
            }
        ],
        required:[true, "It's can be empty, but have to exists."]
    },
    inscryption: {
        type:Date,
        required: [true, "The inscryption is mandatory"]
    }
});

module.exports = model('Trainer',trainerSchema);