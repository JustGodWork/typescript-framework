/*
 * Created Date: Wednesday September 14th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Wednesday September 14th 2022 2:07:27 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

export class Logs {
    types: unknown;

    constructor() {
        this.types = {
            INFO: "^4INFO^7",
            WARNING: "^3WARNING^7",
            ERROR: "^1ERROR^7",
            DEBUG: "^2DEBUG^7"
        };
    }

    send(type: string, message: unknown, ...args: any[]): void {
        const gameType = IsDuplicityVersion() ? "^1SERVER^7" : "^1CLIENT^7";
        if (typeof(message) === "string") {
            console.log(`[${gameType}] [${this.types[type]}] ` + message, ...args);
        } else {
            console.log(`[${gameType}] [${this.types[type]}] `, ...args);
            console.log(message);
        }
    }

    info(message: unknown, ...args: any[]): void {
        this.send("INFO", message, ...args);
    }

    warning(message: unknown, ...args: any[]): void {
        this.send("WARNING", message, ...args);
    }

    error(message: unknown, ...args: any[]): void {
        this.send("ERROR", message, ...args);
    }

    debug(message: unknown, ...args: any[]): void {
        this.send("DEBUG", message, ...args);
    }
}