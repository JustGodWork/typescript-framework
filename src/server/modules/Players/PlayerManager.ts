/*
 * Created Date: Thursday September 15th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Thursday September 15th 2022 8:04:45 pm
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Server } from '../../main';
import { Player } from './Player';
import { ConnexionHandler } from './ConnexionHandler';

export class PlayerManager {
    private connectionHandler: ConnexionHandler;
    private players: Array<Player>;

    constructor() {
        this.connectionHandler = new ConnexionHandler();
        this.players = [];
        this.initialize(this);
    }

    initialize(playerManager: PlayerManager): void {
        on("onResourceStop", function (resourceName) {
            if (resourceName === GetCurrentResourceName()) {
                //Save players
                Server.logs.info("Saving players before restart...");
                playerManager.savePlayers();
            }
        });
        this.saveThread();
    }

    getIdentifiers(playerId: number): any {
        return getPlayerIdentifiers(playerId).reduce((identifiers, identifier) => {
            const identifierSplit = identifier.split(':')[1];
            if (identifier.startsWith("license") && identifierSplit !== 'licence2') {
                identifiers.license = identifier;
            } else if (identifier.startsWith("steam")) {
                identifiers.steam = identifier;
            } else if (identifier.startsWith("discord")) {
                identifiers.discord = identifier;
            } else if (identifier.startsWith("ip")) {
                identifiers.ip = identifier;
            }
            return identifiers;
        }, {
            license: null,
            steam: null,
            discord: null,
            ip: null
        });
    }

    getIdentifier(playerId: number, identifierType = "steam"): string {
        return this.getIdentifiers(playerId)[identifierType];
    }

    addPlayer(player: Player): void {
        try {
            this.players.push(player);
            Server.logs.info("New player added: " + player.name);
        } catch (e) {
            Server.logs.error(e);
        }
    }

    removePlayer(player: Player): void {
        this.players = this.players.filter(p => p.id !== player.id);
    }

    getPlayer(id: number): Player {
        return this.players.find(p => p.id === id);
    }

    getPlayers(): Player[] {
        return this.players;
    }

    savePlayer(player: Player): void {
        const position = player.position;
        //Function to save player
        Server.mysql.update("UPDATE players SET position = ? WHERE id = ?", [
            JSON.stringify([
                Server.utils.math.round(position[0]),
                Server.utils.math.round(position[1]),
                Server.utils.math.round(position[2])
            ]),
            player.characterId
        ]);
    }

    /**
     * Save all players
     */
    savePlayers(): void {
        try {
            this.players.forEach(player => {
                this.savePlayer(player);
            })
            Server.logs.info("All players saved successfully!");
        } catch (e) {
            Server.logs.error(e);
        }

    }

    async saveThread(): Promise<void> {
        setTimeout(() => {
            this.savePlayers();
            this.saveThread();
        }, 120000);
    }
}