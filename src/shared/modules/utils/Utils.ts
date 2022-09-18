/*
 * Created Date: Thursday September 15th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Thursday September 15th 2022 9:38:31 pm
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { _Math } from "./Math";

export class Utils {
    public math: _Math = new _Math();

    uuid(): string {
        const str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        return str.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}