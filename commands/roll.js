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
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        if (args[0] === '1' || args[0] === '10'){
            var ID = message.author.id;

        
        
        
        

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
        
        
        const arrLR = [
            { id: "Gine", weight: 25 },
            { id: "Zyla", weight: 25 },
            
        ];
        const arrUR = [
            { id: "Saltea", weight: 25 },
            { id: "Jahnkeem", weight: 25 },
            { id: "RKTSM", weight: 25 },
            
            { id: "Shoko", weight: 25 },
            
            
            { id: "Yuki", weight: 25 },
            { id: "X99", weight: 25 },
            { id: "Blakninja", weight: 25 },
            { id: "Safryz", weight: 25 },
            { id: "Swede", weight: 25 },
            { id: "Jirachi", weight: 25 },
            { id: "RavingTurnip", weight: 25 },
            { id: "Tatertot", weight: 25 },
            { id: "Cabbag", weight: 25 },
            { id: "Wobbly Carrot", weight: 25 },


        ];
        const arrSR = [
            { id: "Semi", weight: 25 },
            { id: "Poro", weight: 25 },
            { id: "Otaku", weight: 25 },
            { id: "Koryan Fr1edch1ken", weight: 25 },
            { id: "Mayo", weight: 25 },
            { id: "Creamy", weight: 25 },
            { id: "Kiui", weight: 25 },
            { id: "Slasher", weight: 25 },
            { id: "Gaius", weight: 25 },
            { id: "UpGuess", weight: 25 },
            { id: "Pedquin", weight: 25 },
            { id: "LSniper", weight: 25 },
            { id: "Tuna", weight: 25 },
            { id: "Cinders", weight: 25 },
            { id: "Kitahime", weight: 25 },
            { id: "Notto", weight: 25 },
            
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
            { id: "iCarrot", weight: 25 },

            
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


            
        ];
        const arrC = [
            { id: "Lio", weight: 25 },
            { id: "Seraphael", weight: 25 },
            { id: "Aki", weight: 25 },
            { id: "Abababa", weight: 25 },
            { id: "Adam", weight: 25 },
            { id: "Adam (not staff)", weight: 25 },
            { id: "Alblue", weight: 25 },

            
            
        ];
        var rolledCharacter;
        var rolledRarity;
        
        if (args[0] === '1'){ // For the single pull sorted by rarity.  Highest to lowest
            //check for pity here then roll the certain pity
            var rolled = lucky.itemBy(arr, 'weight');
            switch (rolled.id){
                case 1:
                    rolledCharacter = "Milim";
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 2:
                    rolledCharacter = lucky.itemBy(arrLR, 'weight');
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 3:
                    rolledCharacter = lucky.itemBy(arrUR, 'weight');
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 4:
                    rolledCharacter = lucky.itemBy(arrSR, 'weight');
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 5:
                    rolledCharacter = lucky.itemBy(arrR, 'weight');
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 6:
                    rolledCharacter = lucky.itemBy(arrUC, 'weight');
                    rolledRarity = '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>';
                    break;
                case 7:
                    rolledCharacter = lucky.itemBy(arrC, 'weight');
                    rolledRarity = '<a:pinkstar:907752258870075462>';
                    break;
            }
            var image;
            var rolledCP;
            var awkNeeded;
            var awkThisUnit = false;
            for (let i = 0; i < unitSplash.length; i++){
                if (rolledCharacter.id === unitSplash[i].id){
                    image = unitSplash[i].icon;
                    rolledCP = unitSplash[i].CP;
                    awkNeeded = unitSplash[i].awakenThreshold;
                }
            }

            let playerData; 
            playerData = await playerModel.findOne({ userID: message.author.id});
            if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
            if (playerData.coins  < 50) return message.reply("Go get more coins baka");
            
                
            
                var have = false;
                for (let location = 0; location < playerData.maids.length; location++){
                    if (playerData.maids[location].unit === rolledCharacter.id){
                        
                        var owned = playerData.maids[location].dupes;
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

            } catch(err){
                console.log(err);
            }




            
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#E76AA3')
            .setTitle(`${rolledRarity} ${rolledCharacter.id}`)
            .setDescription(`${userMention(message.author.id)}  just pulled ${rolledCharacter.id} \nCP: ${rolledCP}`)
            .setImage(`${image}`)
            .setFooter('Congrats');
        

            message.channel.send({ embeds: [newEmbed] });
            if (awkThisUnit){
                message.channel.send(`${userMention(message.author.id)} has just awoken ${rolledCharacter.id}, Congrats!`);
            }
            
            
        }
        var highestCharacter = 8;
        var rolledCharacters = [];
        var awkCharacters = [];
        if (args[0] === '10'){
            var maids = lucky.itemsBy(arr, 'weight', 10, {unique: false}); //this will be used for 10 rolls

            
            
            var rarestUnit;
            for (let i = 0; i < maids.length; i++){
                
                var character;
                //check for pity here and if you are rolling skip the switch statement using and if else
                //put switch statment in else statement
                
                switch (maids[i].id){
                    case 1:
                        character = "Milim";
                        rolledCharacters.push({ unit: character, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        break;
                    case 2:
                        character = lucky.itemBy(arrLR, 'weight');
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        break;
                    case 3:
                        character = lucky.itemBy(arrUR, 'weight');
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        break;
                    case 4:
                        character = lucky.itemBy(arrSR, 'weight');
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        break;
                    case 5:
                        character = lucky.itemBy(arrR, 'weight');
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        break;
                    case 6:
                        character = lucky.itemBy(arrUC, 'weight');
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462>'});
                        break;
                    case 7:
                        character = lucky.itemBy(arrC, 'weight');
                        rolledCharacters.push({ unit: character.id, rarity: '<a:pinkstar:907752258870075462>'});
                        break;
                }
                if (maids[i].id < highestCharacter){
                    highestCharacter = maids[i].id;
                    if (character !== "Milim")  {
                        rarestUnit = character.id;
                    } else {
                        rarestUnit = "Milim";
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
            if (playerData.coins  < 50) return message.reply("Go get more coins baka");
            
            for (let k = 0; k < rolledCharacters.length; k++){
                let playerData; 
                var rolledCP;
                for (let l = 0; l < unitSplash.length; l++){
                    if (rolledCharacters[k].unit === unitSplash[l].id){
                        rolledCP = unitSplash[l].CP;
                    }
                }
                playerData = await playerModel.findOne({ userID: message.author.id});
                if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
                
                    
                
                    var have = false;
                    for (let location = 0; location < playerData.maids.length; location++){
                        var awkNeeded;
                        if (playerData.maids[location].unit === rolledCharacters[k].unit){
                            for (let j = 0; j < unitSplash.length; j++){
                                if (rolledCharacters[k].unit === unitSplash[j].id){
                                    awkNeeded = unitSplash[j].awakenThreshold;
                                }
                            }
                            
                            var owned = playerData.maids[location].dupes;
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
    
                } catch(err){
                    console.log(err);
                }

            }
            const newEmbed10 = new Discord.MessageEmbed()
            .setColor('#ff3399')
            .setTitle(`${rolledRarity} ${rarestUnit}`)
            .setDescription(`${userMention(message.author.id)}  just pulled 10 maids \n Rarest Unit: ${rarestUnit}`)
            .setFooter('Congrats')

            for (let j = 0; j < rolledCharacters.length; j++){
                newEmbed10.addFields(
                    {name: `${rolledCharacters[j].rarity}`, value: `**${rolledCharacters[j].unit}**`}
    
                )
            }
            var image;
            for (let i = 0; i < unitSplash.length; i++){
                if (rarestUnit === unitSplash[i].id){
                    image = unitSplash[i].icon;
                }
            }
            newEmbed10.setImage(`${image}`);
            
            
            
        

            message.channel.send({ embeds: [newEmbed10] });
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
        
    } else {
        return message.reply('Please enter either nothing, 1, or 10');
    }

    }
    // setting the dupes in the DB.  search the users array to see if they have a character.  if not push to the array.  if they do set the dictionary to +1 using $set.
}