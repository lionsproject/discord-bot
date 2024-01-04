module.exports = {
    name: 'guess',
    description: '🔢 Guess a random number in range from 1 to 100',
  
    callback: async (client, interaction) => {
      if (interaction.type === 'applicationCommand' && interaction.commandName === 'guess') {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        let guesses = 0;
  
        while (true) {
          if (!await interaction.reply('Guess a number between 1 and 100:')) return;
  
          const guess = parseInt(await interaction.waitFor('message', { timeout: 10000 }));
          guesses++;
  
          if (guess === randomNumber) {
            await interaction.editReply('Congratulations! You guessed the number ' + randomNumber + ' in ' + guesses + ' guesses!');
            break;
          } else if (guess < randomNumber) {
            await interaction.editReply('Your guess is too low. Try again.');
          } else {
            await interaction.editReply('Your guess is too high. Try again.');
          }
        }
      }
    }
  };