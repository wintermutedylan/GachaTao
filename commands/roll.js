const playerModel = require("../models/playerSchema");
var unitSplash = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'roll',
    aliases: [],
    permissions: [],
    description: "Give coins to users",
    async execute(client, message, cmd, args, Discord){
        
        //make a thing where people can't use this command untill they run register
        //so that they have to get their starting unit first
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        let currentTime = message.createdTimestamp;
        
        
        
        if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        let timePassed = playerData.rollCD;
        var userAboose = await client.users.fetch(message.author.id);
        
        if (args[0] === '1' || args[0] === '10'){
            var ID = message.author.id;
            var channelID = message.channel.id;
            var LRPity = playerData.lrPity;
            var URPity = playerData.urPity;

        
        
        
        

        //<a:pinkstar:907752258870075462>
        
        // good values
        
        const arr = [
            { id: 1, weight: 6 },
            { id: 2, weight: 30 },
            { id: 3, weight: 150 },
            { id: 4, weight: 900 },
            { id: 5, weight: 1200 },
            { id: 6, weight: 1500 },
            { id: 7, weight: 2000 },
        ];
        
        
        var standardBannerChannel = "927769520238637076";
        const arrLR = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
        ];

        var maidBannerChannel = "927770197996232784";
        const arrLRMaid = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
            { id: "Maid Cafe Kiui", weight: 75 },
            { id: "Catboy Maid Shoko", weight: 75 },
            { id: "Tsundere Maid Ren", weight: 75 },
            { id: "Maid Cafe Lio", weight: 75 },
            { id: "Maid Cafe Merrytaler", weight: 75 },

        ];

        var summerBannerChannel = "928067051657003089";
        const arrLRSummer = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
            { id: "Summer Swede", weight: 75 },
            { id: "Summer Shoko", weight: 75 },
            { id: "Summer Adam", weight: 75 },
            { id: "Bikini Gaius", weight: 75 },
            { id: "Summer Aki", weight: 75 },

        ];

        var galaxyBannerChannel = "";
        const arrLRGalaxy = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
            { id: "WynkenBlynken", weight: 75 },
            { id: "WynkenBlynken", weight: 75 },

        ];

        const arrUR = [
            { id: "Saltea", weight: 25 },
            { id: "Jahnkeem", weight: 25 },
            { id: "RKTSM", weight: 25 },
            { id: "Shoko", weight: 25 },
            { id: "Yuki", weight: 25 },
            { id: "X99", weight: 25 },
            { id: "Blakninja", weight: 25 },
            { id: "Swede", weight: 25 },
            { id: "Jirachi", weight: 25 },
            { id: "RavingTurnip", weight: 25 },
            { id: "Tatertot", weight: 25 },
            { id: "Cabbag", weight: 25 },
            { id: "Wobbly Carrot", weight: 25 },
            { id: "Soomiko", weight: 25 },
            { id: "Cyber_tronic", weight: 25 },
            { id: "Renii", weight: 25 },


        ];

        const arrSR = [
            { id: "Semi", weight: 25 },
            { id: "Poro", weight: 25 },
            
            { id: "Koryan Fr1edch1ken", weight: 25 },
            { id: "Mayo", weight: 25 },
            { id: "Creamy", weight: 25 },
            { id: "Kiui", weight: 25 },
            { id: "Gaius", weight: 25 },
            { id: "UpGuess", weight: 25 },
            { id: "Pedquin", weight: 25 },
            { id: "LSniper", weight: 25 },
            { id: "Tuna", weight: 25 },
            { id: "Cinders", weight: 25 },
            { id: "Kitahime", weight: 25 },
            { id: "Notto", weight: 25 },
            { id: "iCarrot", weight: 25 },

            
        ];

        const arrR = [
            { id: "Lara", weight: 25 },
            { id: "Nove", weight: 25 },
            { id: "Corin", weight: 25 },
            { id: "Pat", weight: 25 },
            { id: "Riceerd", weight: 25 },
            { id: "Starlight", weight: 25 },
            { id: "Zohruii", weight: 25 },
            { id: "MadKnight", weight: 25 },
            { id: "Zero Cream", weight: 25 },
            { id: "NZPIEFACE", weight: 25 },
            { id: "Corin the Onion", weight: 25 },
            { id: "Nimals-Ayomii", weight: 25 },
            { id: "Sansidia", weight: 25 },
            { id: "Yoli", weight: 25 },

            
        ];

        const arrUC = [
            { id: "JakefromStatefarm", weight: 25 },
            { id: "Nao", weight: 25 },
            { id: "Infinity", weight: 25 },
            { id: "OnePokeMan", weight: 25 },
            { id: "Felix", weight: 25 },
            { id: "Leaf", weight: 25 },
            { id: "Ledia", weight: 25 },
            { id: "Kagaxmii", weight: 25 },
            { id: "Jimi", weight: 25 },
            { id: "Arrieh", weight: 25 },
            { id: "Regis", weight: 25 },
            { id: "Lin", weight: 25 },
            { id: "Sona", weight: 25 },
            { id: "Khralle", weight: 25 },
            { id: "Bliz", weight: 25 },




            
        ];

        const arrC = [
            { id: "Lio", weight: 25 },
            { id: "Seraphael", weight: 25 },
            { id: "Aki", weight: 25 },
            { id: "Abababa", weight: 25 },
            { id: "Adam", weight: 25 },
            { id: "Adam (not staff)", weight: 25 },
            { id: "Fairytaler", weight: 25 },
            { id: "Alblue", weight: 25 },
            { id: "Taiyaki", weight: 25 },
            { id: "Annie", weight: 25 },
            { id: "Dead elph", weight: 25 },
            { id: "Moist", weight: 25 },


            
            
        ];

        var rolledCharacter;
        var rolledRarity;
    if (channelID === standardBannerChannel || channelID === maidBannerChannel || channelID === summerBannerChannel || channelID === galaxyBannerChannel)   { 
        if (currentTime - timePassed < 10000){
            const d = new Date(currentTime - timePassed);
            let seconds = 10 - d.getSeconds();
            console.log(`User ${userAboose.username}#${userAboose.discriminator} rolled too fast`);
            return message.reply(`You must wait ${seconds.toString().padStart(2, 0)} seconds before you can roll again`);
        }
        setRollCD(currentTime, message.author.id);  
        if (args[0] === '1'){ // For the single pull sorted by rarity.  Highest to lowest
            
            if (playerData.coins  < 50) return message.reply("Go get more coins baka");
            //check for pity here then roll the certain pity
            var rolled = lucky.itemBy(arr, 'weight');
            if (LRPity === 175){
                if (channelID === maidBannerChannel){
                    rolledCharacter = lucky.itemBy(arrLRMaid, 'weight');
                }
                else if(channelID === summerBannerChannel){
                    rolledCharacter = lucky.itemBy(arrLRSummer, 'weight');
                } else {
                    rolledCharacter = lucky.itemBy(arrLR, 'weight');
                }
                rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                LRPity = 0;
                URPity++;
            } 
            else if (URPity === 50){
                rolledCharacter = lucky.itemBy(arrUR, 'weight');
                rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                LRPity++;
                URPity = 0;

            }
            else {
                switch (rolled.id){
                    case 1:
                        if (channelID === maidBannerChannel){
                            rolledCharacter = { id: "Maid Milim", weight: 25 };
                        } else if(channelID === summerBannerChannel){
                            rolledCharacter = { id: "Summer Milim", weight: 25 };
                        } else {
                            rolledCharacter = { id: "Milim", weight: 25 };
                        }
                        
                        rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                        LRPity++;
                        URPity++;
                        break;
                    case 2:
                        if (channelID === maidBannerChannel){
                            rolledCharacter = lucky.itemBy(arrLRMaid, 'weight');
                        } else if(channelID === summerBannerChannel){
                            rolledCharacter = lucky.itemBy(arrLRSummer, 'weight');
                        } else {
                            rolledCharacter = lucky.itemBy(arrLR, 'weight');
                        }
                        rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                        LRPity = 0;
                        URPity++;
                        break;
                    case 3:
                        rolledCharacter = lucky.itemBy(arrUR, 'weight');
                        rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                        LRPity++;
                        URPity = 0;
                        break;
                    case 4:
                        rolledCharacter = lucky.itemBy(arrSR, 'weight');
                        rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                        LRPity++;
                        URPity++;
                        break;
                    case 5:
                        rolledCharacter = lucky.itemBy(arrR, 'weight');
                        rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                        LRPity++;
                        URPity++;
                        break;
                    case 6:
                        rolledCharacter = lucky.itemBy(arrUC, 'weight');
                        rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                        LRPity++;
                        URPity++;
                        break;
                    case 7:
                        rolledCharacter = lucky.itemBy(arrC, 'weight');
                        rolledRarity = '<a:pinkstar:907752258870075462>';
                        LRPity++;
                        URPity++;
                        break;
                }
            }
            var image;
            let rarityValue;
            var rolledCP;
            var awkNeeded;
            var awkThisUnit = false;
            
            for (let i = 0; i < unitSplash.length; i++){
                if (rolledCharacter.id === unitSplash[i].id){
                    image = unitSplash[i].icon;
                    rarityValue = unitSplash[i].rValue;
                    rolledCP = unitSplash[i].CP;
                    awkNeeded = unitSplash[i].awakenThreshold;
                }
            }

            
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            coins: -50
                        },
                    }
                );
    
            } catch(err){
                console.log(err);
            }
            
                
            
                var have = false;
                let playerData2; 
                playerData2 = await playerModel.findOne({ userID: message.author.id}); // take this out and it breaks dupes
                for (let location = 0; location < playerData2.maids.length; location++){
                    if (playerData2.maids[location].unit === rolledCharacter.id){
                        
                        var owned = playerData2.maids[location].dupes;
                        owned++;
                        if (owned === awkNeeded){
                            awkThisUnit = true;
                        }
                        
                        try {
                            await playerModel.findOneAndUpdate(
                                {
                                    userID: ID
                                },
                                {
                                    $set: {
                                        ["maids." + location + ".dupes"]: owned
                                    },
                                }
                            );
        
                        } catch(err){
                            console.log(err);
                        }
                        have = true;
                        break;
                    }
                }
                if (!have){
                    try {
                        await playerModel.findOneAndUpdate(
                            {
                                userID: ID
                            },
                            {
                                $push: {
                                    maids: { unit: rolledCharacter.id , dupes: 0 }
                                },
                            }
                        );
    
                    } catch(err){
                        console.log(err);
                    }

                }
            
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            totalCP: rolledCP,
                        },
                    }
                );
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $set: {
                            lrPity: LRPity,
                            urPity: URPity,
                        },
                    }
                );

            } catch(err){
                console.log(err);
            }
            




            
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#E76AA3')
            .setTitle(`${rolledRarity} ${rolledCharacter.id}`)
            .setDescription(`${userMention(message.author.id)}  just pulled ${rolledCharacter.id} \nCP: ${new Intl.NumberFormat().format(rolledCP)}`)
            
            .setFooter(`LR Pity: ${LRPity}, UR Pity: ${URPity}`);

            if (rarityValue <= 2){
                newEmbed.setImage(`${image}`)
            }
        

            message.channel.send({ embeds: [newEmbed]});
            if (awkThisUnit){
                message.channel.send(`${userMention(message.author.id)} has just awoken ${rolledCharacter.id}, Congrats!`);
            }
            if (rolledCharacter.id === "Milim" || rolledCharacter.id === "Maid Milim"){
                var target = message.guild.members.cache.get(message.author.id);
                var role = "925851063200936027";
                if (target.roles.cache.some(role => role.name === 'Chapter 1')){
            
                } else {
                    var user = await client.users.fetch(message.author.id);
                    target.roles.add(role);
                    message.channel.send(`${userMention("238364422135873536")}, ${user.username}#${user.discriminator} has just pulled **${rolledCharacter.id}**`);
                }
            } 
            
            
        }
        var highestCharacter = 8;
        var rolledCharacters = [];
        var awkCharacters = [];
        if (args[0] === '10'){
            if (playerData.coins  < 500) return message.reply("Go get more coins baka");
            //var maids = lucky.itemsBy(arr, 'weight', 10, {unique: false}); //this will be used for 10 rolls

            
            
            var rarestUnit;
            for (let i = 0; i < 10; i++){
                var maids = lucky.itemBy(arr, 'weight');
                var maidsID;
                var character;
                //check for pity here and if you are rolling skip the switch statement using and if else
                //put switch statment in else statement
                if (LRPity === 175){ 
                    if (channelID === maidBannerChannel){
                        character = lucky.itemBy(arrLRMaid, 'weight');
                    } else if(channelID === summerBannerChannel){
                        character = lucky.itemBy(arrLRSummer, 'weight');
                    } else {
                        character = lucky.itemBy(arrLR, 'weight');
                    }
                    maidsID = 2;
                    rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                    LRPity = 0;
                    URPity++;
                } 
                else if (URPity === 50){
                    character = lucky.itemBy(arrUR, 'weight');
                    maidsID = 3;
                    rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                    LRPity++;
                    URPity = 0;
    
                }
                else {
                
                switch (maids.id){
                    case 1:
                        if (channelID === maidBannerChannel){
                            character = { id: "Maid Milim", weight: 25 };
                        } else if(channelID === summerBannerChannel){
                            character = { id: "Summer Milim", weight: 25 };
                        } else {
                            character = { id: "Milim", weight: 25 };
                        }
                        maidsID = 1;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity++;
                        break;
                    case 2:
                        if (channelID === maidBannerChannel){
                            character = lucky.itemBy(arrLRMaid, 'weight');
                        }else if(channelID === summerBannerChannel){
                            character = lucky.itemBy(arrLRSummer, 'weight');
                        } else {
                            character = lucky.itemBy(arrLR, 'weight');
                        }
                        maidsID = 2;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        LRPity = 0;
                        URPity++;
                        break;
                    case 3:
                        character = lucky.itemBy(arrUR, 'weight');
                        maidsID = 3;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity = 0;
                        break;
                    case 4:
                        character = lucky.itemBy(arrSR, 'weight');
                        maidsID = 4;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity++;
                        break;
                    case 5:
                        character = lucky.itemBy(arrR, 'weight');
                        maidsID = 5;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity++;
                        break;
                    case 6:
                        character = lucky.itemBy(arrUC, 'weight');
                        maidsID = 6;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity++;
                        break;
                    case 7:
                        character = lucky.itemBy(arrC, 'weight');
                        maidsID = 7;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity++;
                        break;
                }
            }
            
            
                if (maidsID < highestCharacter){
                    highestCharacter = maidsID;
                    if (character !== "Milim")  {
                        rarestUnit = character.id;
                    } else {
                        if (channelID === maidBannerChannel){
                            rarestUnit = "Maid Milim";
                        } else {
                            rarestUnit = "Milim";
                        }
                        
                    }
                }
                
            
                
                
            }
            switch (highestCharacter){
                case 1:
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 2:
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 3:
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 4:
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 5:
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 6:
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 7:
                    rolledRarity = '<a:pinkstar:907752258870075462>';
                    break;
            }
            
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            coins: -500
                        },
                    }
                );
    
            } catch(err){
                console.log(err);
            }
            
            for (let k = 0; k < rolledCharacters.length; k++){
                
                var rolledCP;
                for (let l = 0; l < unitSplash.length; l++){
                    if (rolledCharacters[k].unit === unitSplash[l].id){
                        rolledCP = unitSplash[l].CP;
                    }
                }
                
                
                    
                
                    var have = false;
                    let playerData3; 
                    playerData3 = await playerModel.findOne({ userID: message.author.id}); // take this out and it breaks dupes
                    for (let location = 0; location < playerData3.maids.length; location++){
                        var awkNeeded;
                        if (playerData3.maids[location].unit === rolledCharacters[k].unit){
                            for (let j = 0; j < unitSplash.length; j++){
                                if (rolledCharacters[k].unit === unitSplash[j].id){
                                    awkNeeded = unitSplash[j].awakenThreshold;
                                }
                            }
                            
                            var owned = playerData3.maids[location].dupes;
                            owned++;
                            if (owned === awkNeeded){
                                awkCharacters.push(rolledCharacters[k].unit);
                            }
                            
                            try {
                                await playerModel.findOneAndUpdate(
                                    {
                                        userID: ID
                                    },
                                    {
                                        $set: {
                                            ["maids." + location + ".dupes"]: owned
                                        },
                                    }
                                );
            
                            } catch(err){
                                console.log(err);
                            }
                            have = true;
                            break;
                        }
                    }
                    if (!have){
                        try {
                            await playerModel.findOneAndUpdate(
                                {
                                    userID: ID
                                },
                                {
                                    $push: {
                                        maids: { unit: rolledCharacters[k].unit , dupes: 0 }
                                    },
                                }
                            );
        
                        } catch(err){
                            console.log(err);
                        }

                    }
                
                try {
                    await playerModel.findOneAndUpdate(
                        {
                            userID: ID
                        },
                        {
                            $inc: {
                                totalCP: rolledCP,
                            },
                        }
                    );
                    await playerModel.findOneAndUpdate(
                        {
                            userID: ID
                        },
                        {
                            $set: {
                                lrPity: LRPity,
                                urPity: URPity,
                            },
                        }
                    );
    
                } catch(err){
                    console.log(err);
                }

            }
            const newEmbed10 = new Discord.MessageEmbed()
            .setColor('#ff3399')
            .setTitle(`${rolledRarity} ${rarestUnit}`)
            .setDescription(`${userMention(message.author.id)}  just pulled 10 units \n Rarest Unit: ${rarestUnit}`)
            .setFooter(`LR Pity: ${LRPity}, UR Pity: ${URPity}`)

            for (let j = 0; j < rolledCharacters.length; j++){
                newEmbed10.addFields(
                    {name: `${rolledCharacters[j].rarity}`, value: `**${rolledCharacters[j].unit}**`}
    
                )
            }
            
            let image2;
            let rarityValue2;
            for (let i = 0; i < unitSplash.length; i++){
                if (rarestUnit === unitSplash[i].id){
                    image2 = unitSplash[i].icon;
                    rarityValue2 = unitSplash[i].rValue;
                    
                }
            }
            if (rarityValue2 <= 2){
                newEmbed.setImage(`${image2}`)
            }
            
            
            
        

            message.channel.send({ embeds: [newEmbed10], files: [images] });
            if (awkCharacters.length != 0){
                var awkUnits = "";
                if (awkCharacters.length === 1){
                    message.channel.send(`${userMention(message.author.id)} has just awoken ${awkCharacters[0]}, Congrats!`);
                } else {
                    awkUnits = awkCharacters[0];
                    for (let i = 1; i < awkCharacters.length; i ++){
                        awkUnits = awkUnits + ", " + awkCharacters[i];
                    }
                    message.channel.send(`${userMention(message.author.id)} has just awoken **${awkUnits}**, Congrats!`);
                }
            }
        }
        if (rarestUnit === "Milim" || rarestUnit === "Maid Milim"){
            var target = message.guild.members.cache.get(message.author.id);
            var role = "925851063200936027";
            if (target.roles.cache.some(role => role.name === 'Milim')){
            
            } else {
                target.roles.add(role);
                message.reply(`You have rolled Milim and can now run the !milim command. Enjoy the new role`);
    
            }
            var user = await client.users.fetch(message.author.id);
            message.channel.send(`${userMention("238364422135873536")}, ${user.username}#${user.discriminator} has just pulled **${rarestUnit}**`);
        }
        } else {
            message.reply(`Please only roll in these channels: ${channelMention(standardBannerChannel)}, ${channelMention(maidBannerChannel)}, ${channelMention(summerBannerChannel)}`);//, ${channelMention(galaxyBannerChannel)}
        }    
    } else {
        return message.reply('Please enter either nothing, 1, or 10');
    }

    }
    // setting the dupes in the DB.  search the users array to see if they have a character.  if not push to the array.  if they do set the dictionary to +1 using $set.
}
async function setRollCD(time, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    rollCD: time,
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}