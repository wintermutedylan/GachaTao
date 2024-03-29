const playerModel = require("../models/playerSchema");
var unitSplash = require("../units/maids.json");
var prestigeStuff = require("../units/prestigeinfo.json");
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
            { id: 1, weight: 4 },
            { id: 2, weight: 30 },
            { id: 3, weight: 150 },
            { id: 4, weight: 900 },
            { id: 5, weight: 1200 },
            { id: 6, weight: 1500 },
            { id: 7, weight: 2000 },
        ];

        const akiArr = [
            { id: 1, weight: 6 },
            { id: 7, weight: 2000 },
        ];
        
        
        var standardBannerChannel = "927769520238637076";
        const arrLR = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
        ];

        var akiBannerChannel = "934892708491837480";
        

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

        var galaxyBannerChannel = "934891599840829520";
        const arrLRGalaxy = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
            { id: "Crowin", weight: 75 },
            { id: "Space Bear Miko", weight: 75 },
            { id: "Space Infinity", weight: 75 },
            { id: "Eye of the Universe: Wobbly the Carrot", weight: 75 },
            { id: "Space Phantom of Wholesome", weight: 75 },

        ];

        var cnyBannerChannel = "937890126334427176";
        const arrLRcny = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
            { id: "CNY Cinders", weight: 75 },
            { id: "CNY Blakninja", weight: 75 },
            { id: "CNY Kagaxmii", weight: 75 },
            { id: "CNY Tuna", weight: 75 },
        ];

        var bugcatBannerChannel = "942102821749264384";
        const arrLRbugcat = [
            { id: "Gine", weight: 25 },
            { id: "WynkenBlynken", weight: 25 },
            { id: "Otaku", weight: 25 },
            { id: "Bugcat Doge", weight: 75 },
            { id: "Bugcat Kagaxmii", weight: 75 },
            { id: "Bugcat Cinders", weight: 75 },
            { id: "Bugcat Melody", weight: 75 },
            { id: "Bugcat Tako", weight: 75 },
            { id: "Bugcat Tuna", weight: 75 },

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
            { id: "Stoermshark", weight: 25 },

            
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
            { id: "Callie", weight: 25 },

            
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
            { id: "Sheptile", weight: 25 },




            
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
            { id: "Doge", weight: 25 },
            { id: "Breadbun", weight: 25 },


            
            
        ];

        var rolledCharacter;
        var rolledRarity;
    if (channelID === standardBannerChannel || channelID === bugcatBannerChannel || channelID === summerBannerChannel)   { 
        if (currentTime - timePassed < 10000){
            const d = new Date(currentTime - timePassed);
            let seconds = 10 - d.getSeconds();
            console.log(`User ${userAboose.username}#${userAboose.discriminator} rolled too fast`);
            return message.reply(`You must wait ${seconds.toString().padStart(2, 0)} seconds before you can roll again`);
        }
        setRollCD(currentTime, message.author.id);  
        if (args[0] === '1'){ // For the single pull sorted by rarity.  Highest to lowest
            
            if (playerData.coins  < 50) return message.reply("Go get more coins baka");
            var rolled;
            let milimBadge = "none";
            //check for pity here then roll the certain pity
            if (channelID === akiBannerChannel){
                rolled = lucky.itemBy(akiArr, 'weight');
            } else {
                rolled = lucky.itemBy(arr, 'weight');
            }
            if (LRPity >= 175 && channelID != akiBannerChannel){
                if (channelID === maidBannerChannel){
                    rolledCharacter = lucky.itemBy(arrLRMaid, 'weight');
                }
                else if(channelID === summerBannerChannel){
                    rolledCharacter = lucky.itemBy(arrLRSummer, 'weight');
                } else if(channelID === galaxyBannerChannel){
                    rolledCharacter = lucky.itemBy(arrLRGalaxy, 'weight');
                } else if(channelID === cnyBannerChannel){
                    rolledCharacter = lucky.itemBy(arrLRcny, 'weight');
                } else if(channelID === bugcatBannerChannel){
                    rolledCharacter = lucky.itemBy(arrLRbugcat, 'weight');
                } else {
                    rolledCharacter = lucky.itemBy(arrLR, 'weight');
                }
                rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                LRPity = 0;
                URPity++;
            } 
            else if (URPity >= 50 && channelID != akiBannerChannel){
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
                            milimBadge = "<:maidmilimbadge:942459609497624596>";
                        } else if(channelID === summerBannerChannel){
                            rolledCharacter = { id: "Summer Milim", weight: 25 };
                            milimBadge = "<:summermilimbadge:942500690113208360>";
                        } else if(channelID === galaxyBannerChannel){
                            rolledCharacter = { id: "Galaxy Milim", weight: 25 };
                            milimBadge = "<:galaxymilimbadge:942505910641754182>";
                        } else if(channelID === akiBannerChannel){
                            rolledCharacter = { id: "Aki Milim", weight: 25 };
                            milimBadge = "<:akimilimbadge:942504140830015558>";
                        } else if(channelID === cnyBannerChannel){
                            rolledCharacter = { id: "CNY Milim", weight: 25 };
                            milimBadge = "<:cnymilimbadge:942453930082861149>";
                        } else if(channelID === bugcatBannerChannel){
                            rolledCharacter = { id: "Bugcat Milim", weight: 25 };
                            milimBadge = "<:bugcatmilimbadge:942507932803797022>";
                        } else {
                            rolledCharacter = { id: "Milim", weight: 25 };
                            milimBadge = "<:milimbadge:942461664031297557>";
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
                        } else if(channelID === galaxyBannerChannel){
                            rolledCharacter = lucky.itemBy(arrLRGalaxy, 'weight');
                        } else if(channelID === cnyBannerChannel){
                            rolledCharacter = lucky.itemBy(arrLRcny, 'weight');
                        } else if(channelID === bugcatBannerChannel){
                            rolledCharacter = lucky.itemBy(arrLRbugcat, 'weight')
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
                        if (channelID === akiBannerChannel){
                            rolledCharacter = { id: "Aki", weight: 25 };
                        } else {
                            rolledCharacter = lucky.itemBy(arrC, 'weight');
                        }
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
            
            if (playerData.totalCP + rolledCP >= playerData.maxCP){
                let minusCP = playerData.maxCP - playerData.totalCP;
                if (minusCP > 0){
                    try {
                        await playerModel.findOneAndUpdate(
                            {
                                userID: ID
                            },
                            {
                                $inc: {
                                    totalCP: minusCP,
                                },
                            }
                        );

                    } catch(err){
                        console.log(err);
                    }
                }

            } 
            else if (playerData.totalCP !== playerData.maxCP){
            
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
            if (milimBadge !== "none"){
                if (!playerData.milimsOwned.includes(milimBadge)){
                    addMilim(milimBadge, message.author.id);
                }
            }
            if (playerData.totalCP === playerData.maxCP){
                message.channel.send(`${userMention(message.author.id)} These units haven't been added becuase you are already at the max CP for your Prestige level`);
            }
            if (awkThisUnit){
                message.channel.send(`${userMention(message.author.id)} has just awoken ${rolledCharacter.id}, Congrats!`);
            }
            if (rolledCharacter.id === "Milim" || rolledCharacter.id === "Maid Milim" || rolledCharacter.id === "Summer Milim" || rolledCharacter.id === "Galaxy Milim" || rolledCharacter.id === "Milim Aki" || rolledCharacter.id === "CNY Milim"){
                var target = message.guild.members.cache.get(message.author.id);
                var role = "925851063200936027";
                if (target.roles.cache.some(role => role.name === 'Milim')){
            
                } else {
                    var user = await client.users.fetch(message.author.id);
                    target.roles.add(role);
                    message.channel.send(`${userMention(message.author.id)}You have rolled Milim and can now run the !milim command. Enjoy the new role`);
                    
                }
            } 
            
            
        }
        var highestCharacter = 8;
        var rolledCharacters = [];
        var awkCharacters = [];
        let milimBadgeArray = [];
        if (args[0] === '10'){
            if (playerData.coins  < 500) return message.reply("Go get more coins baka");
            
            //var maids = lucky.itemsBy(arr, 'weight', 10, {unique: false}); //this will be used for 10 rolls

            
            
            var rarestUnit;
            for (let i = 0; i < 10; i++){
                var maids;
                if (channelID === akiBannerChannel){
                    maids = lucky.itemBy(akiArr, 'weight');
                } else {
                    maids = lucky.itemBy(arr, 'weight');
                }
                var maidsID;
                var character;
                
                //check for pity here and if you are rolling skip the switch statement using and if else
                //put switch statment in else statement
                if (LRPity >= 175 && channelID != akiBannerChannel){ 
                    if (channelID === maidBannerChannel){
                        character = lucky.itemBy(arrLRMaid, 'weight');
                    } else if(channelID === summerBannerChannel){
                        character = lucky.itemBy(arrLRSummer, 'weight');
                    } else if(channelID === galaxyBannerChannel){
                        character = lucky.itemBy(arrLRGalaxy, 'weight');
                    } else if(channelID === cnyBannerChannel){
                        character = lucky.itemBy(arrLRcny, 'weight');
                    } else if(channelID === bugcatBannerChannel){
                        character = lucky.itemBy(arrLRbugcat, 'weight');
                    } else {
                        character = lucky.itemBy(arrLR, 'weight');
                    }
                    maidsID = 2;
                    rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                    LRPity = 0;
                    URPity++;
                } 
                else if (URPity >= 50 && channelID != akiBannerChannel){
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
                            milimBadgeArray.push("<:maidmilimbadge:942459609497624596>");
                        } else if(channelID === summerBannerChannel){
                            character = { id: "Summer Milim", weight: 25 };
                            milimBadgeArray.push("<:summermilimbadge:942500690113208360>")
                        } else if(channelID === galaxyBannerChannel){
                            character = { id: "Galaxy Milim", weight: 25 };
                            milimBadgeArray.push("<:galaxymilimbadge:942505910641754182>")
                        } else if(channelID === akiBannerChannel){
                            character = { id: "Milim Aki", weight: 25 };
                            milimBadgeArray.push("<:akimilimbadge:942504140830015558>")
                        } else if(channelID === cnyBannerChannel){
                            character = { id: "CNY Milim", weight: 25 };
                            milimBadgeArray.push("<:cnymilimbadge:942453930082861149>")
                        } else if(channelID === bugcatBannerChannel){
                            character = { id: "Bugcat Milim", weight: 25 };
                            milimBadgeArray.push("<:bugcatmilimbadge:942507932803797022>")
                        } else {
                            character = { id: "Milim", weight: 25 };
                            milimBadgeArray.push("<:milimbadge:942461664031297557>")
                        }
                        maidsID = 1;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity++;
                        break;
                    case 2:
                        if (channelID === maidBannerChannel){
                            character = lucky.itemBy(arrLRMaid, 'weight');
                        } else if(channelID === summerBannerChannel){
                            character = lucky.itemBy(arrLRSummer, 'weight');
                        } else if(channelID === galaxyBannerChannel){
                            character = lucky.itemBy(arrLRGalaxy, 'weight');
                        } else if(channelID === cnyBannerChannel){
                            character = lucky.itemBy(arrLRcny, 'weight');
                        } else if(channelID === bugcatBannerChannel){
                            character = lucky.itemBy(arrLRbugcat, 'weight');
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
                        if (channelID === akiBannerChannel){
                            character = { id: "Aki", weight: 25 };
                        } else {
                            character = lucky.itemBy(arrC, 'weight');
                        }
                        maidsID = 7;
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462>'});
                        LRPity++;
                        URPity++;
                        break;
                }
            }
            
            
                if (maidsID < highestCharacter){
                    highestCharacter = maidsID;
                    if (character === "Milim" || character === "Maid Milim" || character === "Summer Milim"|| character === "Galaxy Milim" || character === "Milim Aki" || character === "CNY Milim" || character === "Bugcat Milim")  {
                        if (channelID === maidBannerChannel){
                            rarestUnit = "Maid Milim";
                        } else if (channelID === summerBannerChannel){
                            rarestUnit = "Summer Milim";
                        } else if (channelID === galaxyBannerChannel){
                            rarestUnit = "Galaxy Milim";
                        } else if (channelID === akiBannerChannel){
                            rarestUnit = "Milim Aki";
                        } else if (channelID === cnyBannerChannel){
                            rarestUnit = "CNY Milim";
                        } else if (channelID === bugcatBannerChannel){
                            rarestUnit = "Bugcat Milim";
                        } else {
                            rarestUnit = "Milim";
                        }
                        
                    } else {
                        
                        rarestUnit = character.id;
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
            let currentCP = playerData.totalCP;
            
            for (let k = 0; k < rolledCharacters.length; k++){
                
                var rolledCP;
                for (let l = 0; l < unitSplash.length; l++){
                    if (rolledCharacters[k].unit === unitSplash[l].id){
                        rolledCP = unitSplash[l].CP;
                    }
                }
                if (currentCP + rolledCP >= playerData.maxCP){
                    let minusCP = playerData.maxCP - currentCP;
                    if (minusCP > 0){
                        try {
                            await playerModel.findOneAndUpdate(
                                {
                                    userID: ID
                                },
                                {
                                    $inc: {
                                        totalCP: minusCP,
                                    },
                                }
                            );
        
                        } catch(err){
                            console.log(err);
                        }
                        currentCP = currentCP + minusCP;

                    }
    
                } 
                else if (currentCP !== playerData.maxCP){
                
                
                    
                
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
                currentCP = currentCP + rolledCP;
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
                newEmbed10.setImage(`${image2}`)
            }
            if (playerData.totalCP === playerData.maxCP){
                message.channel.send(`${userMention(message.author.id)} These units haven't been added becuase you are already at the max CP for your Prestige level`);
            }
            
            
        

            message.channel.send({ embeds: [newEmbed10]});
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
        if (milimBadgeArray.length !== 0){
            for (let m = 0; m < milimBadgeArray.length; m++){
                if (!playerData.milimsOwned.includes(milimBadgeArray[m])){
                    addMilim(milimBadgeArray[m], message.author.id);
                }
            }
        }

        if (rarestUnit === "Milim" || rarestUnit === "Maid Milim" || rarestUnit === "Summer Milim" || rarestUnit === "Galaxy Milim" || rarestUnit === "Milim Aki" || rarestUnit === "CNY Milim" || rarestUnit === "Bugcat Milim"){
            var target = message.guild.members.cache.get(message.author.id);
            var role = "925851063200936027";
            if (target.roles.cache.some(role => role.name === 'Milim')){
            
            } else {
                target.roles.add(role);
                message.channel.send(`${userMention(message.author.id)}You have rolled Milim and can now run the !milim command. Enjoy the new role`);
    
            }
            var user = await client.users.fetch(message.author.id);
        }
        } else {
            message.reply(`Please only roll in these channels: ${channelMention(standardBannerChannel)}, ${channelMention(summerBannerChannel)}, ${channelMention(bugcatBannerChannel)}`);//, ${channelMention(maidBannerChannel)}, ${channelMention(summerBannerChannel)}
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

async function addMilim(milimEmote, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $push: {
                    milimsOwned: milimEmote,
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}