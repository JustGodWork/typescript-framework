/*
 * Created Date: Thursday September 15th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Thursday September 15th 2022 9:17:16 pm
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Server } from '../main';
import mysql from 'mysql2';

export class MySQL {
    private module: mysql.Connection;
    constructor() {
        this.module = mysql.createConnection({
            database: 'gamemode',
            host: "localhost",
            port: 3307,
            user: "root",
            password: ""
        });
        this.initialize();
    }

    initialize(): void {
        this.module.connect(function(err) {
            if (err) {
                Server.logs.error("^1Connection to database failed !^7");
            } else {
                Server.logs.info("^4Database ^2connected^7");
            }
        });
    }

    query(query: string, params: any[], callback?: (result?: any) => void): void {
        this.module.query(query, params, (err, result) => {
            if (err) {
                Server.logs.error(err);
            }
            if (callback) callback(result)
        })
    }

    insert(query: string, params: any[], callback?: (result?: any) => void): void {
        this.module.query(query, params, (err, result) => {
            if (err) {
                Server.logs.error(err);
            }
            if (callback) callback(result)
        })
    }

    update(query: string, params: any[], callback?: (result?: any) => void): void {
        this.module.query(query, params, (err, result) => {
            if (err) {
                Server.logs.error(err);
            }
            if (callback) callback(result)
        })
    }

    delete(query: string, params: any[], callback?: (result?: any) => void): void {
        this.module.query(query, params, (err, result) => {
            if (err) {
                Server.logs.error(err);
            }
            if (callback) callback(result)
        })
    }

}