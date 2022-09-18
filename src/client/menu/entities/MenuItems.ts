/*
 * Created Date: Sunday September 18th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Sunday September 18th 2022 6:15:40 pm
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { IItemSettings } from "./interfaces/ItemSettings";

export class MenuItems implements IItemSettings {
    background: {
        width: 431;
        height: 38;
        color: { r: number; g: number; b: number; a: number; };
    }
    text: {
        text: string;
        scale: string;
        x: number;
        y: number;
        left: number;
    }
    rightText: {
        text: string;
        scale: string;
        x: number;
        y: number;
        left: number;
    }
    leftBadge: {
        type: string;
        width: number;
        height: number;
        left: number;
    }
    rightBadge: {
        type: string;
        width: number;
        height: number;
        left: number;
    }
    selectedSprite: {
        width: number;
        height: number;
        color: { r: number; g: number; b: number; a: number; };
        y: number;
        dictionary: string;
        texture: string;
    }
}