/*
 * Created Date: Tuesday August 4th 2020
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Tuesday August 4th 2020 5:18:50 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Shared } from '../shared/shared';
import { MySQL } from './modules/mysql';
import { PlayerManager } from './modules/Players/PlayerManager';

class _Server extends Shared {
    public mysql: MySQL = new MySQL();
    public playerManager: PlayerManager = new PlayerManager();
    constructor() {
        super();
    }
}

export const Server = new _Server();
