require('dotenv').config();
const playerModel = require("../../models/playerSchema");
/**
 * these 3 things are to keep track of all the stats for coin drop
 */
let count = 0;
let countTotal = 10;
let timeStampt = 1641854534523;

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    /**
     * This is for the random drops for chat
     */
    if (!message.content.startsWith(prefix) && !message.author.bot && message.channel.id === "851169729808302140"){
        count++;
        
        if (count >= countTotal && (message.createdTimestamp - timeStampt  > 60000)){ 
        
            
            
            const commandDrop = client.commands.get("drop");
            try {
                commandDrop.execute(client, message, "drop", [ '851169729808302140' ], Discord);
            } catch (err){
                message.reply("There was an error trying to execute this command!");
                console.log(err);
            }
            timeStampt = message.createdTimestamp;
            
            countTotal = Math.floor(Math.random() * (151 - 50) + 50);
            count = 0;
        }
    }
    //Checking the message to see if it starts with the prefix or if its a bot
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    /**
     * Creating the player data in the database if they don't have an account
     */
        let playerData;

        try {
            playerData = await playerModel.findOne({ userID: message.author.id });
            if (!playerData){
                let player = await playerModel.create({
                    userID: message.author.id,
                    coins: 0,
                    raidTickets: 3,
                    maids: [],
                    dailyReset: false,
                    starterSelected: false,
                    urPity: 0,
                    lrPity: 0,
                    totalCP: 0,
                    stealCD: 1640744901699,
                    raidCD: 1640744901699,
                    raidsWon: 0,
                    weeklyRaidsWon: 0,
                    questsComplete: [],
                    items: []
                    
                });
                player.save();
            }
        } catch(err){
            console.log(err);
        }
    

    

    
    
    
    
    //the next 2 lines look for the command and if it doesn't find the command it returns the provided message
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    
    if (!command) return message.channel.send("This command doesn't exist!");
    //The valid permissions to use in the commands
    const validPermissions = [
        "ADMINISTRATOR",
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS"
    ];
    //checking if the person running the command has the required permissions for the command being ran
    if (command.permissions.length) {
        let invalidPerms = [];
        for (const perm of command.permissions){
            if (!validPermissions.includes(perm)){
                return console.log(`Invalid Permissions ${perm}`);
            }
            if (!message.member.permissions.has(perm)){
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length) {
            return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
    }

    //this is actually running the command.  sending all the info to the command file to use
    try {
        command.execute(client, message, cmd, args, Discord);
    } catch (err){
        message.reply("There was an error trying to execute this command!");
        console.log(err);
    }
}