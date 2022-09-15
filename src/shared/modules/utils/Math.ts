/*
 * Created Date: Thursday September 15th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Thursday September 15th 2022 9:33:14 pm
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

export class _Math {

    public round(num: number | string, decimals = 1): number {
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
}