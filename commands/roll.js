const playerModel = require("../models/playerSchema");
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

        
        
        
        

        //<a:pinkstar:907752258870075462>
        const unitSplash = [
            { id: "Milim", icon: "https://i.redd.it/s2754m4u81m51.jpg" },
            { id: "Veldora", icon: "https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/8/87/Veldora_Human_Anime.png/revision/latest?cb=20210628010435" },
            { id: "Rimuru", icon: "https://cdn.discordapp.com/attachments/907801558765420544/907802085507076156/Rimuru-Emote.png" },
            { id: "Benimaru", icon: "https://static.wikia.nocookie.net/topstrongest/images/b/bd/Benimaru_Anime.png/revision/latest?cb=20190206131059" },
            { id: "Maid Cafe Shoko", icon: "https://cdn.discordapp.com/avatars/219322584477466625/780a452f94af5243607cdf7c555a9e27.png?size=4096" },
            { id: "Sewage Monster Smug", icon: "https://cdn.discordapp.com/avatars/272421193901015041/16f2024f5e4b4087c436856aced7fdc5.png?size=4096" },
            { id: "Idol Ren", icon: "https://cdn.discordapp.com/attachments/907801558765420544/907830509307048007/IMG_0469.png" },
            { id: "Lio", icon: "https://cdn.discordapp.com/attachments/907801558765420544/907832254653399081/IMG_0470.png" },
            { id: "Melody", icon: "https://cdn.discordapp.com/attachments/907801558765420544/907814022563389450/melody.png" },
            { id: "Priscilla", icon: "https://i.imgur.com/RTjf5cI.png" },
            { id: "Mayo", icon: "https://images-ext-1.discordapp.net/external/bJtQFv6PaetBcMGu-KOxRD-3GjgpD0eQ2UNS9NzNcqE/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/231906328954535948/267cf486324f9e5d57a73bca8cf1ca6a.png" },
            { id: "Seraphel", icon: "https://images-ext-1.discordapp.net/external/UBzuR_cdtVxEedRL1nnSqI-6gFQt48xVLbNQEIyMHhM/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/257190913862926336/a_35270966580d867cff641f944db14aa3.gif" },
            { id: "Diablo", icon: "https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/f/f5/Diablo_Anime.png/revision/latest?cb=20190115050410" },
            { id: "Vox", icon: "https://i.imgur.com/PbQoWvO.png" },
            { id: "Dark Hart", icon: "https://i.imgur.com/pfcVRVi.png" },
            { id: "Riceerd", icon: "https://cdn.discordapp.com/avatars/170705342269751296/5dbd0e8b182b65495f345ad05211a714.png?size=4096" },
            { id: "Shion", icon: "https://static.wikia.nocookie.net/tensei-shitara-slime-datta-ken/images/b/b7/Shion_Anime.png/revision/latest?cb=20180924183120" },
            { id: "Ahsoka", icon: "https://www.looper.com/img/gallery/the-real-reason-the-mandalorian-needs-ahsoka-tano/intro-1604691488.jpg" },
            { id: "Seraphael, Everyone's Wife", icon: "https://images-ext-1.discordapp.net/external/UBzuR_cdtVxEedRL1nnSqI-6gFQt48xVLbNQEIyMHhM/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/257190913862926336/a_35270966580d867cff641f944db14aa3.gif" },
            { id: "Blakninja", icon: "https://cdn.discordapp.com/avatars/238364422135873536/a_cc9cfe6052a997a7d16a68f0d957d8d1.gif?size=4096" },
            { id: "Cinders", icon: "https://cdn.discordapp.com/avatars/491836708359372800/66d1a224a9abe2a1d199eeeea6c103eb.png?size=4096" },
            { id: "Aki", icon: "https://cdn.discordapp.com/avatars/259747383699701760/1045eef56f78f732f2449d6f330589b1.png?size=4096" },
            { id: "Abababa", icon: "https://cdn.discordapp.com/avatars/121030264901206016/a_c49901fdc09f7b1ad8462fad54eebc20.gif?size=4096" },
            { id: "Ren", icon: "https://cdn.discordapp.com/avatars/307860993910898700/d2c632b56b38b6c188a67bd5552804b9.png?size=4096" },
            { id: "Kiui", icon: "https://cdn.discordapp.com/attachments/907801558765420544/907821253610569768/IMG_0467.png" },

        ];
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