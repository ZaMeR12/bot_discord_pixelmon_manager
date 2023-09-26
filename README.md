# bot_discord_pixelmon_manager

## Author: ZaMeR12

## Important note:

> The base of the structure of the repository and the code is from the youtube channel named *Under Ctrl*.
> - [Youtbe channel](https://www.youtube.com/@UnderCtrl)
> - [Tutorial playlist](https://www.youtube.com/playlist?list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es) 


> **WARNING**: The bot was an personnal project, so there can have some issue and not totally tested yet about all the fonctionnalities.

## What is this discord bot?

This discord bot have for purpose to manager the league and the badges of informations of a user in a discord's server. Especially for server who use an RP minecraft Pixelmon server. **WARNING**: *The bot doesn't cretaes roles either administrate the server like moderator bot.*


## Important stuff:


### .env file:
You have to create and *.env* in the root of your derver to manager the bot. There is an example of it in the *[.envExample](./.envExample)*

```dotenv
## Connection to the bot account ##
CONNECTION_BOT = XXX

## Discord server id ##
SERVER_DISCORD = XXX

## Bot id ##
CLIENT_ID = XXX

## Connection to MongoDB ##
MONGO_SERVER = XXX
```

> To know all each variables mean you can watch the tutorial of *Under Ctrl*


### Lists of pokemon's types and discord's role for gym leaders

These lists can be edited by the dev depending the need in the file *[Lists.js](./src/utils/Lists.js)* at the path ***src/utils/Lists.js***.

```js
module.exports = {
    // List of all persmissions roles for badges
    rolesPermission: [
        "Gym Leader - Water",
        "Gym Leader - Fire",
        "Gym Leader - Grass",
        "Gym Leader - Ice",
        "Gym Leader - Fairy",
        "Gym Leader - Psychic",
        "Gym Leader - Ghost",
        "Gym Leader - Poison",
        "Gym Leader - Steel",
        "Gym Leader - Dark",
        "Gym Leader - Ground",
        "Gym Leader - Normal",
        "Gym Leader - Flying",
        "Gym Leader - Bug",
        "Gym Leader - Electric",
        "Gym Leader - Fighting",
        "Gym Leader - Dragon",
        "Gym Leader - Rock"
    ],
    //List of all types of pokemons
    listTypes: [
        'water',
        'fire',
        'grass',
        'ice',
        'fairy',
        'psychic',
        'ghost',
        'poison',
        'steel',
        'dark',
        'ground',
        'normal',
        'flying',
        'bug',
        'electric',
        'fighting',
        'dragon',
        'rock'
    ]
};
```
> **IMPORTANT**: The order of each type of leader need to follow the same order of the list of pokemon's type and with the same number of items for each to not create logic error in the bot.


### Database choice:

I decide to choose MongoDB as database server.Why? Because the SQL format for this case of database can make it limited to the number of user. Than MongoDb use json base for the database, so it's just the size of the database that affect performance. (I want to mean by that in general)

So you have to take in consideration to use a cloudserver that use MongoDB. Sorry, people who wanted to manage all the database in the same place of bot.

An exemple of the model of the database can be found at the file *[model_DB.json](./src/database/model_DB.json)* at the path ***/src/database/model_DB.json***.

```json
{
	"_id":"650fc6b3d4d2efecc7082f47",
	"discord_id": "521369475812365948",
	"minecraft_username":"Test",
	"isChampion":false,
	"succeedLeague":false,
	"badges": [
		{
			"type": "fire",
			"obtained":"023-09-20"
		}
	],
	"inscryption": "2023-09-24T07:58:52.580+00:00"
}
```

#### Explaination of the model:

 - _id:
    - Type: ObjectId/String
    - Usage: The identifier for each document that correspond to each account of user (trainer)
 - discord_id:
     - Type: String
    - Usage: The discord's id of the user to identifiate it to it's account.
 - 	minecraft_username:
    - Type: String
    - Usage: The username in minecraft that the discord's user.
 - 	isChampion:
    - Type: Boolean
    - Usage: Determinate if the user is an champion.
 - 	succeedLeague:
    - Type: Boolean
    - Usage: Determinate if the user succeed on the elite four (not won to the champion necessary)
 - 	inscryption:
    - Type: Date
    - Usage: The date of creation of the account.
 -  badges:
     -  Type: Array
     -  Usage: The list of badges that the user have.

<br> <br>

### Discord's Slash commands:

> * User:
>   * sad
>
> - Administrator:
>   * asdasd
>
> - Gym Leaders:
>   * asdasd