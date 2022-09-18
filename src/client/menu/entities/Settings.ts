/*
 * Created Date: Sunday September 18th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Sunday September 18th 2022 3:04:51 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { IMenuSettings } from "./interfaces/Settings"

export class MenuSettings implements IMenuSettings {
    public header: {
        show: boolean,
        text: {
            x: number,
            y: number,
            scale: number,
            font: number
        },
        background: {
            weight: number, 
            height: number,
            colors: {
                r: number,
                g: number,
                b: number,
                a: number
            },
            glare: boolean
        }
    }
    public subtitle: {
        show: boolean,
        leftText: {
            x: number,
            y: number,
            scale: number,
            font: number
        },
        rightText: {
            x: number,
            y: number,
            scale: number,
            font: number
        },
        background: {
            weight: number,
            height: number
        },
    }
    public background: {
        show: boolean
    }
    public upAndDownSprite: {
        show: boolean
    }

    constructor(header: IMenuSettings["header"], subtitle: IMenuSettings["subtitle"], background: IMenuSettings["background"], upAndDownSprite: IMenuSettings["upAndDownSprite"]) {
        this.header = header
        this.subtitle = subtitle
        this.background = background
        this.upAndDownSprite = upAndDownSprite
    }

    public setHeaderSettings(settings: IMenuSettings["header"]): void {
        this.header = settings
    }

    public setSubtitleSettings(settings: IMenuSettings["subtitle"]): void {
        this.subtitle = settings
    }

    public setBackgroundSettings(settings: IMenuSettings["background"]): void {
        this.background = settings
    }

    public setUpAndDownSpriteSettings(settings: IMenuSettings["upAndDownSprite"]): void {
        this.upAndDownSprite = settings
    }

    public getHeaderSettings(): IMenuSettings["header"] {
        return this.header
    }

    public getSubtitleSettings(): IMenuSettings["subtitle"] {
        return this.subtitle
    }

    public getBackgroundSettings(): IMenuSettings["background"] {
        return this.background
    }

    public getUpAndDownSpriteSettings(): IMenuSettings["upAndDownSprite"] {
        return this.upAndDownSprite
    }

}