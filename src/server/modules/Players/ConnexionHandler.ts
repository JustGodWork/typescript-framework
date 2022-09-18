/*
 * Created Date: Thursday September 15th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Thursday September 15th 2022 9:46:22 pm
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Server } from '../../main';
import { Player } from './Player';
import { Events } from '../../../shared/Enums/Events';

export class ConnexionHandler {
    constructor() {
        this.initialize();
    }

    initialize(): void {
        onNet(Events.onPlayerConnecting, () => {
            const playerId = source;
            const playerIdentifier = Server.playerManager.getIdentifier(playerId)
            this.playerExists(playerIdentifier, (exist: boolean) => {
                if (exist) {
                    this.loadData(playerIdentifier, (playerData: {
                        id: number,
                        characterId: number,
                        identifier: string,
                        position: string,
                    }) => {
                        try {
                            this.createPlayer(playerId, playerData);
                        } catch (e) {
                            Server.logs.info(e);
                        }
                    });
                } else {
                    this.registerData(playerIdentifier, (success) => {
                        if (success) {
                            this.loadData(playerIdentifier, (playerData: {
                                id: number,
                                characterId: number,
                                identifier: string,
                                position: string,
                            }) => {
                                try {
                                    this.createPlayer(playerId, playerData);
                                } catch (e) {
                                    Server.logs.info(e);
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    playerExists(playerIdentifier: string, callback: (result?: boolean) => void): void {
        //Check if player exists in database
        Server.mysql.query("SELECT * FROM players WHERE identifier = ?", [playerIdentifier], function (result) {
            try {
                callback(result.length > 0);
            } catch (e) {
                Server.logs.error(e);
            }
        });
    }

    loadData(playerIdentifier: string, callback: (result?: any) => void): void {
        //Load data from database
        Server.mysql.query("SELECT * FROM players WHERE identifier = ?", [playerIdentifier], function (result) {
            try {
                callback(result[0]);
            } catch (e) {
                Server.logs.error(e);
            }
        })
    }

    registerData(playerIdentifier: string, callback: (result?: boolean) => void): void {
        //Register data to database
        Server.mysql.query("INSERT INTO players (identifier, position) VALUES (?, ?)", [
            playerIdentifier, 
            JSON.stringify([-822.91, -123.28, 28.18])
        ], function (result) {
            try {
                if (result.affectedRows > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            } catch (e) {
                Server.logs.error("There was an error while registering player from database");
            }
        })
    }

    createPlayer(playerId: number, playerData: {
        id: number,
        characterId: number,
        identifier: string,
        position: string
    }): void {
        Server.playerManager.addPlayer(new Player(playerId, playerData.id, playerData.identifier, GetPlayerName(playerId), JSON.parse(playerData.position)));
    };
}