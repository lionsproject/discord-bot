import type { CommandData, SlashCommandProps } from "commandkit";
import { Embed, EmbedBuilder } from "discord.js";
import { Client } from "discord.js";

export const data: CommandData = {
  name: "guess",
  description: "🔢 Give you a random number you need to guess!",
};

export function run({ interaction, client, handler }: SlashCommandProps) {
  // Ensure the user is not a bot
  if (interaction.user.bot) return;

  // Start the game by generating a random number
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  // Set up an array to store the user's guesses
  const guesses: number[] = [];

  // Create an embed message for the game
  const embed = new EmbedBuilder()
    .setTitle("Number Guessing Game")
    .setDescription(`I have generated a random number between 1 and 100. You have 5 attempts to guess the number. 🤔\n\nWhat is your first guess?`)
    .setFooter("Number Guessing Game");

  // Send the embed message to the channel where the command was used
  interaction.reply(embed);

  // Begin handling the user's guesses
  let guessCount = 0;
  while (guessCount < 5) {
    // Wait for the user's response
    const response = await interaction.client.waitFor('message', {
      author: interaction.user.id,
      content: /\d+/ // Check for valid numeric input
    });

    // Parse the user's guess
    const guess = parseInt(response.content);

    // Check if the guess is correct
    if (guess === randomNumber) {
      // Win message
      const winEmbed = new EmbedBuilder()
        .setTitle("Congrats!")
        .setDescription(`You guessed the number correctly! It was ${randomNumber}. 🥳`)
        .setFooter("Number Guessing Game");

      // Send win message to the channel
      interaction.editEmbedBuilder(winEmbed);
      break; // Exit the game loop
    } else if (guess < randomNumber) {
      // Respond with a hint to guess higher
      const hintEmbed = new EmbedBuilder()
        .setTitle("Too low!")
        .setDescription(`Your guess is too low. Try a higher number. 👇`)
        .setFooter("Number Guessing Game");

      // Send hint embed to the channel
      interaction.editEmbedBuilder(hintEmbed);
    } else {
      // Respond with a hint to guess lower
      const hintEmbed = new EmbedBuilder()
        .setTitle("Too high!")
        .setDescription(`Your guess is too high. Try a lower number. 👆`)
        .setFooter("Number Guessing Game");

      // Send hint embed to the channel
      interaction.editEmbedBuilder(hintEmbed);
    }

    // Add the guess to the list of attempts
    guesses.push(guess);

    // Update the message with the user's remaining attempts
    const remainingAttempts = 5 - guessCount;
    embed.setDescription(`You have ${remainingAttempts} attempts remaining.\n\nWhat is your next guess?`)
    interaction.editEmbedBuilder(embed);

    guessCount++;
  }

  // Handle the case where the user used all attempts
  if (guessCount === 5) {
    const loseEmbed = new EmbedBuilder()
      .setTitle("Sorry, you lost!")
      .setDescription(`You used up all of your 5 attempts. The correct number was ${randomNumber}. 😔`)
      .setFooter("Number Guessing Game");

    // Send lose message to the channel
    interaction.editEmbedBuilder(loseEmbed);
  }
}