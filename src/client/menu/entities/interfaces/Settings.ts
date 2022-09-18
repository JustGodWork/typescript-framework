/*
 * Created Date: Sunday September 18th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Sunday September 18th 2022 3:07:52 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

export interface IMenuSettings {
    header: {
        show: boolean,
        text: {
            x: number,
            y: number,
            scale: number,
            font: number
        },
        background: {
            weight: number,
            height: number
            colors: {
                r: number,
                g: number,
                b: number,
                a: number
            },
            glare: boolean
        }
    },
    subtitle: {
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
        }
    },
    background: {
        show: boolean,
    },
    upAndDownSprite: {
        show: boolean
    }
}