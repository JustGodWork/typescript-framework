/*
 * Created Date: Friday September 16th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Friday September 16th 2022 12:04:33 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Client } from './main';
import * as Cfx from 'fivem-js';

export class LocalPlayer extends Cfx.Player {
    private _id: number;
    private _character_id: number; 
    private _identifier: string;

    constructor(playerData: {
        id: number,
        characterId: number,
        identifier: string,
        position: [number, number, number],
    }, disableWantedLevel = true) {
        super(PlayerId());
        this._id = playerData.id;
        this._character_id = playerData.characterId;
        this._identifier = playerData.identifier;
        this.initialize(playerData, disableWantedLevel);
        Client.logs.info(playerData);
    }

    private initialize(playerData: any, disableWantedLevel: boolean): void {
        FreezeEntityPosition(this.Character.Handle, false);
        NetworkResurrectLocalPlayer(playerData.position[0], playerData.position[1], playerData.position[2], 0.0, true, false);
        this.Character.Position = new Cfx.Vector3(playerData.position[0], playerData.position[1], playerData.position[2]);
        ShutdownLoadingScreen();
        ShutdownLoadingScreenNui();
        if (disableWantedLevel) {
            ClearPlayerWantedLevel(this.Handle);
            SetMaxWantedLevel(0);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get characterId(): number {
        return this._character_id;
    }

    public get identifier(): string {
        return this._identifier;
    }
}