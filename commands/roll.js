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
        
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        if (args[0] === '1' || args[0] === '10'){
            var ID = message.author.id;

        
        
        
        

        //<a:pinkstar:907752258870075462>
        const arr = [
            { id: 1, weight: 2 },
            { id: 2, weight: 200 },
            { id: 3, weight: 350 },
            { id: 4, weight: 800 },
            { id: 5, weight: 1000 },
            { id: 6, weight: 1500 },
            { id: 7, weight: 1500 },
        ];
        const arrLR = [
            { id: "Veldora", weight: 25 },
            { id: "Rimuru", weight: 25 },
            { id: "Benimaru", weight: 25 },
            { id: "Kiui", weight: 25 },
        ];
        const arrUR = [
            { id: "Maid Cafe Shoko", weight: 25 },
            { id: "Sewage Monster Smug", weight: 25 },
            { id: "Idol Ren", weight: 25 },
            { id: "Lio", weight: 25 },
        ];
        const arrSR = [
            { id: "Melody", weight: 25 },
            { id: "Priscilla", weight: 25 },
            { id: "Mayo", weight: 25 },
            { id: "Seraphel", weight: 25 },
        ];
        const arrR = [
            { id: "Diablo", weight: 25 },
            { id: "Vox", weight: 25 },
            { id: "Dark Hart", weight: 25 },
            { id: "Riceerd", weight: 25 },
        ];
        const arrUC = [
            { id: "Shion", weight: 25 },
            { id: "Ashoka", weight: 25 },
            { id: "Seraphael, Everyone's Wife", weight: 25 },
            { id: "Blakninja", weight: 25 },
        ];
        const arrC = [
            { id: "Cinders", weight: 25 },
            { id: "Aki", weight: 25 },
            { id: "Abababa", weight: 25 },
            { id: "Ren", weight: 25 },
        ];
        var rolledCharacter;
        var rolledRarity;
        
        if (args[0] === '1'){ // For the single pull sorted by rarity.  Highest to lowest
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
            for (let i = 0; i < unitSplash.length; i++){
                if (rolledCharacter.id === unitSplash[i].id){
                    image = unitSplash[i].icon;
                }
            }

            let playerData; 
            playerData = await playerModel.findOne({ userID: message.author.id});
            if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
            if (playerData.maids.length === 0) {
                try {
                    await playerModel.findOneAndUpdate(
                        {
                            userID: ID
                        },
                        {
                            $push: {
                                maids: { unit: rolledCharacter.id, dupes: 0 }
                            },
                        }
                    );

                } catch(err){
                    console.log(err);
                }
            } else {
                
            
                var have = false;
                for (let location = 0; location < playerData.maids.length; location++){
                    if (playerData.maids[location].unit === rolledCharacter.id){
                        
                        var owned = playerData.maids[location].dupes;
                        owned++;
                        
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
            }



            
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#E76AA3')
            .setTitle(`${rolledRarity} ${rolledCharacter.id}`)
            .setDescription(`${userMention(message.author.id)}  just pulled ${rolledCharacter.id}`)
            .setImage(`${image}`)
            .setFooter('Congrats');
        

            message.channel.send({ embeds: [newEmbed] });
            
            
        }
        var highestCharacter = 8;
        var rolledCharacters = [];
        if (args[0] === '10'){
            var maids = lucky.itemsBy(arr, 'weight', 10, {unique: false}); //this will be used for 10 rolls

            
            
            var rarestUnit;
            for (let i = 0; i < maids.length; i++){
                var character;
                
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
            for (let k = 0; k < rolledCharacters.length; k++){
                let playerData; 
                playerData = await playerModel.findOne({ userID: message.author.id});
                if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
                if (playerData.maids.length === 0) {
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
                } else {
                    
                
                    var have = false;
                    for (let location = 0; location < playerData.maids.length; location++){
                        if (playerData.maids[location].unit === rolledCharacters[k].unit){
                            
                            var owned = playerData.maids[location].dupes;
                            owned++;
                            
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
            //message.channel.send(`Rarest Character pulled ${rarestUnit}, Rarity: ${highestCharacter}`);
        }  
        
    } else {
        return message.reply('Please enter either nothing, 1, or 10');
    }

    }
    // setting the dupes in the DB.  search the users array to see if they have a character.  if not push to the array.  if they do set the dictionary to +1 using $set.
}