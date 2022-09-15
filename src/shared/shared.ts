/*
 * Created Date: Wednesday September 14th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Wednesday September 14th 2022 1:44:00 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Logs } from "./modules/Logs";
import { Utils } from "./modules/utils/Utils";

export class Shared {
    public readonly _Version: string = "1.0.0";
    public readonly _Name: string = "TestJS";
    public readonly _Author: string = "JustGod";
    public readonly _ResourceName: string = GetCurrentResourceName();
    public readonly _side: string = IsDuplicityVersion() ? "server" : "client";
    public readonly _logs: Logs = new Logs();
    public readonly _utils: Utils = new Utils();

    constructor() {
        this.logs.info(`Loaded ^1Core^7 functions of resource ^1${this.ResourceName}^7 from ^1${this.Author}^7 ^7[^1v${this.Version}^7]`);
    }

    public get Version(): string {
        return this._Version;
    }

    public get Name(): string {
        return this._Name;
    }

    public get Author(): string {
        return this._Author;
    }

    public get ResourceName(): string {
        return this._ResourceName;
    }

    public get side(): string {
        return this._side;
    }

    public get logs(): Logs {
        return this._logs;
    }

    public get utils(): Utils {
        return this._utils;
    }
}