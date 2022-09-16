/*
 * Created Date: Thursday September 15th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Thursday September 15th 2022 8:05:58 pm
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Events } from "../../../shared/Enums/Events";

export class Player {
    private _id: number;
    private _character_id: number;
    private _identifier: string;
    private _name: string;
    private _position: number[];

    constructor(id: number, characterId: number, identifier: string, name: string, position: number[]) {
        this._id = id;
        this._character_id = characterId
        this._identifier = identifier
        this._name = name;
        this._position = position;
        this.onPlayerJoin();
    }

    onPlayerJoin(): void {
        emitNet(Events.playerLoaded, this.id, {
            id: this._id,
            characterId: this._character_id,
            identifier: this._identifier,
            position: this._position
        });
        GiveWeaponToPed(this.ped, GetHashKey("WEAPON_PISTOL"), 250, true, false);
        GiveWeaponToPed(this.ped, GetHashKey("WEAPON_ASSAULTRIFLE"), 250, true, false);
    };

    public get identifier(): string {
        return this._identifier;
    }

    public get characterId(): number {
        return this._character_id
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get position(): number[] {
        return GetEntityCoords(this.ped);
    }

    public get heading(): number {
        return GetEntityHeading(this.ped);
    }

    public get ped(): number {
        return GetPlayerPed(this.id);
    }

    triggerEvent(eventName: string, ...args: any[]): void {
        emitNet(eventName, this.id, ...args);
    }
}