/*
 * Created Date: Sunday September 18th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Sunday September 18th 2022 1:09:24 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { Client } from "../main";

export class _UIUtils {

    private round(num: number | string, decimals = 1): number {
        if(!("" + num).includes("e")) {
            const numString = num + "e+" + decimals;
            return +(Math.round(Number(numString))  + "e-" + decimals);
        } else {
            const arr = ("" + num).split("e");
            let sig = ""
            const numString = +arr[0] + "e" + sig + (+arr[1] + decimals);
            if(+arr[1] + decimals > 0) {
                sig = "+";
            }
            return +(Math.round(Number(numString)) + "e-" + decimals);
        }
    }

    public getSafeZoneBounds(): { x: number, y: number } {
        let safeSize = GetSafeZoneSize()
        safeSize = this.round(safeSize, 2)
        safeSize = (safeSize * 100) - 90
        safeSize = 10 - safeSize

        const w = 1920
        const h = 1080

        return { x: this.round(safeSize * ((w / h) * 5.4)), y: this.round(safeSize * 5.4) }
    }

    public updateSafeZone(): void {
        const menu = Client.menuManager.currentMenu
        if (!menu.safeZoneSize) {
            menu.safeZoneSize = { x: 0, y: 0 }
            if (menu.safezone) {
                menu.safeZoneSize = this.getSafeZoneBounds()
                SetScriptGfxAlign(76, 84)
                SetScriptGfxAlignParams(0, 0, 0, 0)
            }
        }
    }

    public renderRectangle(x: number, y: number, width: number, height: number, colors: { r: number, g: number, b: number, a: number}): void {
        const _x = (x || 0) / 1920
        const _y = (y || 0) / 1080
        const _width = (width || 0) / 1920 
        const _height = (height || 0) / 1080
        DrawRect((_x + _width) * 0.5, (_y + _height) * 0.5, _width, _height, colors.r, colors.g, colors.b, colors.a)
    }

    public renderSprite(textureDictionary: string, textureName: string, x: number, y: number, width: number, height: number, heading: number, r: number, g: number, b: number, a: number): void {
        const _x = (x || 0) / 1920
        const _y = (y || 0) / 1080
        const _width = (width || 0) / 1920
        const _height = (height || 0) / 1080

        if (!HasStreamedTextureDictLoaded(textureDictionary)) {
            RequestStreamedTextureDict(textureDictionary, true)
        }

        DrawSprite(textureDictionary, textureName, _x + _width * 0.5, _y + _height * 0.5, _width, _height, heading || 0, r || 255, g || 255, b || 255, a || 255)
    }

    renderText(text: string, x: number, y: number, font: number, scale: number, colors: { 
        r: number, 
        g: number, 
        b: number, 
        a: number
    }, alignment: string, dropShadow: boolean, outline: boolean, wordWrap: number): void {
        const _text = text || ""
        const _x = (x || 0) / 1920
        const _y = (y || 0) / 1080
        const _font = font || 0
        const _scale = scale || 0
        const _alignment = alignment || "left"
        SetTextFont(_font);
        SetTextScale(1.0, _scale)
        SetTextColour(colors.r, colors.g, colors.b, colors.a);
        if (dropShadow === true) SetTextDropShadow();
        if (outline === true) SetTextOutline();
        if (_alignment !== "left") {
            if (_alignment === "center") {
                SetTextCentre(true)
            } else if (_alignment === "right") {
                SetTextRightJustify(true)
            }
        }
        if (wordWrap) {
            if (_alignment === "center") {
                SetTextWrap(_x - ((wordWrap / 1920) / 2), _x + ((wordWrap / 1920) / 2))
            } else if (_alignment === "right") {
                SetTextWrap(0, _x)
            } else {
                SetTextWrap(_x, _x + (wordWrap / 1920))
            }
        } else {
            if (_alignment === "right") {
                SetTextWrap(0, _x)
            }
        }

        BeginTextCommandDisplayText("CELL_EMAIL_BCON")
        this.addTextEntry(_text)
        EndTextCommandDisplayText(_x, _y)
    }

    public addTextEntry(entryText: string): void {
        const charCount = entryText.length

        if (charCount < 100) {
            AddTextComponentSubstringPlayerName(entryText)
        } else {
            const splitText = entryText.match(/.{1,99}/g)
            for (const text of splitText) {
                AddTextComponentSubstringPlayerName(text)
            }
        }
    }

    private workOnSingleParam(param: any[]) {
        for (let i = 0; i < param.length; i++) {
            if (typeof(param[i]) == "number") {
                PushScaleformMovieFunctionParameterInt(param[i]);
            } else if (typeof(param[i]) == "boolean") {
                PushScaleformMovieFunctionParameterBool(param[i]);
            } else if (typeof(param[i]) == "string") {
                PushScaleformMovieFunctionParameterString(param[i]);
            }
        }
    }

    public setScaleformParams(scaleform: number, data: [{ name: string, param: any[], callback?: () => void }]): void {
        for (const param in data) {
            PushScaleformMovieFunction(scaleform, data[param].name);
            if (data[param].param) {
                this.workOnSingleParam(data[param].param);
            }
            if (data[param].callback) {
                data[param].callback();
            }
            PopScaleformMovieFunctionVoid();
        }
    }
}