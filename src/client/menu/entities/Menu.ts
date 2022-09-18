/*
 * Created Date: Sunday September 18th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Sunday September 18th 2022 1:03:48 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Client } from "../../main"
import { Sprite } from "./interfaces/Sprite";
import { MenuSettings } from "./Settings";

export class Menu {
    private _id = Client.utils.uuid();
    private _title: string;
    private _subtitle: string;
    private _position: { x: number, y: number };
    private _settings = new MenuSettings({
            show: true,
            text: {
                x: 175.5,
                y: -20,
                scale: 1.15,
                font: 1
            },
            background: {
                weight: 431, 
                height: 107,
                colors: {
                    r: 45,
                    g: 45,
                    b: 45,
                    a: 215
                },
                glare: true
            }
        },
        {
            show: true,
            leftText: {
                x: -20,
                y: 77,
                scale: 0.3,
                font: 0
            },
            rightText: {
                x: 0.93,
                y: 0.935,
                scale: 0.35,
                font: 0
            },
            background: {
                weight: 431,
                height: 37
            },
        },
        {
            show: true
        },
        {
            show: true
        }
    );
    private readonly _safezone = true;
    private _safeZoneSize: { x: number, y: number } | undefined;
    private _sprite: Sprite
    //public items: MenuItem[] = [];
    //public selectedItem: MenuItem | undefined;
    private _visible = false;
    private _itemSelect = 0;

    constructor(title: string, subtitle: string, textureDictionnary?: string, textureName?: string,position?: { x: number, y: number }) {
        this._title = title;
        this._subtitle = subtitle;
        this._position = position || { x: 80, y: 80 };
        // this._sprite = {
        //     dictionnary: textureDictionnary || "commonmenu",
        //     texture: textureName || "interaction_bgd"
        // };
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get title(): string {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get subtitle(): string {
        return this._subtitle;
    }

    public set subtitle(subtitle: string) {
        this._subtitle = subtitle;
    }

    public get position(): { x: number, y: number } {
        return this._position;
    }

    public set position(position: { x: number, y: number }) {
        this._position = position;
    }

    public get settings(): MenuSettings {
        return this._settings;
    }

    public set settings(settings: MenuSettings) {
        this._settings = settings;
    }

    public get safezone(): boolean {
        return this._safezone;
    }

    public get safeZoneSize(): { x: number, y: number } | undefined {
        return this._safeZoneSize;
    }

    public set safeZoneSize(safeZoneSize: { x: number, y: number } | undefined) {
        this._safeZoneSize = safeZoneSize;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public set sprite(sprite: Sprite) {
        this._sprite = sprite;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(visible: boolean) {
        this._visible = visible;
    }

    public get itemSelect(): number {
        return this._itemSelect;
    }

    public set itemSelect(itemSelect: number) {
        this._itemSelect = itemSelect;
    }

}