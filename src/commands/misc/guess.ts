import type { CommandData, SlashCommandProps } from "commandkit";
import { Embed, EmbedBuilder } from "discord.js";
import { Client } from "discord.js";

export const data: CommandData = {
  name: "guess",
  description: "🔢 Give you a random number you need to guess!",
};

export function run({ interaction, client, handler }: SlashCommandProps) {
}