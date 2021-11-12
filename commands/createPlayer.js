module.exports = {
    name: 'createProfile',
    aliases: ['register', 'create'],
    permissions: [],
    description: "Create user profile",
    async execute(client, message, cmd, args, Discord){
        message.reply('Profile created.  You can now check your profile/balance with $bal, $balance, $profile');
    }
}