module.exports = {
    name: 'guess',
    description: '🔢 Guess a random number in range from 1 to 100',
    callback: async (client, interaction) => {
      const { user, channel, type } = interaction;
      const message = interaction.message;
      const randomNumber = Math.floor(Math.random() * 100) + 1;
  
      if (type === 'COMMAND' && interaction.user.id === message.author.id) {
        // Check if the guess is correct
        const guess = parseInt(interaction.options.getString('guess'));
        if (guess === randomNumber) {
          message.channel.send(`🎉 Congratulations, ${user.username}! You guessed the correct number: ${randomNumber}`);
        } else if (guess < randomNumber) {
          message.channel.send(`🤔 Your guess of ${guess} is too low. Try a higher number.`);
        } else {
          message.channel.send(`🤔 Your guess of ${guess} is too high. Try a lower number.`);
        }
      }
    },
  };