/*
 * Created Date: Wednesday September 14th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Wednesday September 14th 2022 4:10:30 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import * as Cfx from 'fivem-js';
import { Shared } from '../shared/shared';
import { Events } from '../shared/Enums/Events';
import { LocalPlayer } from './Player';
import { _MenuManager } from './menu/MenuManager';

class _Client extends Shared {
	public loginTick: number;
	public player: Cfx.Player;
	public menuManager = new _MenuManager();

    constructor() {
		super();
		this.initialize();
		this.loginTick = setTick(() => {
			if (NetworkIsPlayerActive(PlayerId())) {
				emitNet(Events.onPlayerConnecting);
				clearTick(this.loginTick);
			}
		});
    }

	private initialize(): void {
		onNet(Events.playerLoaded, (playerData: any) => {
			this.player = new LocalPlayer(playerData);
		})
	}

}

export const Client = new _Client();

const menu = Client.menuManager.createMenu("My Big Title", "This is my subtitle");

RegisterCommand("t", function() {
    Client.menuManager.toggleMenu(menu);
}, false);

