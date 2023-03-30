import { CommandInteraction, Snowflake } from "discord.js";

export interface CooldownObject {
    id: Snowflake;
    cooldown: number; /* in milliseconds */
    start: EpochTimeStamp;
    type: "user" | "guild" | "channel";
}

export default class Cooldown {
    private cooldowns: Map<Snowflake, CooldownObject> = new Map();

    public setCooldown(id: Snowflake, cooldown: number, type: "user" | "guild" | "channel"): void {
        this.cooldowns.set(id, { id, cooldown, start: Date.now(), type });
        setTimeout(() => this.deleteCooldown(id), cooldown);
    }

    public getCooldown(id: Snowflake): CooldownObject | undefined {
        return this.cooldowns.get(id);
    }

    public deleteCooldown(id: Snowflake): void {
        this.cooldowns.delete(id);
    }

    public isOnCooldown(id: Snowflake): boolean {
        return this.cooldowns.has(id);
    }

    public interactionCooldown(interaction: CommandInteraction): CooldownObject | undefined {
        const userId = interaction.user.id as Snowflake;
        const guildId = interaction.guildId as Snowflake;
        const channelId = interaction.channelId as Snowflake;
        const cooldowns = [this.getCooldown(userId), this.getCooldown(guildId), this.getCooldown(channelId)]
            .filter(cooldown => cooldown !== undefined) as CooldownObject[];

        if (cooldowns.length === 0) return;
        return cooldowns.reduce((prev, curr) => prev.cooldown > curr.cooldown ? prev : curr);
    }

    public getTimeLeft(id: Snowflake): number {
        const cooldown = this.getCooldown(id);
        return cooldown ? cooldown.start + cooldown.cooldown - Date.now() : 0;
    }
}