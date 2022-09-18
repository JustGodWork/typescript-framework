/*
 * Created Date: Sunday September 18th 2022
 * Author: JustGod
 * Made with ❤
 * -----
 * Last Modified: Sunday September 18th 2022 2:14:08 am
 * -----
 * Copyright (c) 2022 JustGodWork, All Rights Reserved.
 * This file is part of JustGodWork project.
 * Unauthorized using, copying, modifying and/or distributing of this file
 * via any medium is strictly prohibited. This code is confidential.
 * -----
 */

import { _UIUtils } from './Utils';
import { Menu } from "./entities/Menu";

export class _MenuManager {
    private _utils = new _UIUtils();
    private _currentMenu: Menu | undefined;
    private _offset = 0;
    private menuTick: number;
    private _menus: Menu[] = [];

    public get utils(): _UIUtils {
        return this._utils;
    }

    public set currentMenu(menu: Menu | undefined) {
        this._currentMenu = menu;
    }

    public get currentMenu(): Menu | undefined {
        return this._currentMenu;
    }

    public get offset(): number {
        return this._offset;
    }

    public set offset(offset: number) {
        this._offset = offset;
    }

    public get menus(): Menu[] {
        return this._menus;
    }

    public set menus(menus: Menu[]) {
        this._menus = menus;
    }

    public addMenu(menu: Menu): void {
        this.menus.push(menu);
    }

    public removeMenu(menu: Menu): void {
        this.menus = this.menus.filter((m) => m.id !== menu.id);
    }

    public createMenu(title: string, subtitle: string, textureDictionnary?: string, textureName?: string, position?: { x: number, y: number }): Menu {
        const menu = new Menu(title, subtitle, textureDictionnary, textureName, position);
        this.addMenu(menu);
        return menu;
    }

    private renderBanner(): void {
        if (this.currentMenu) {
            if (this.currentMenu.settings.header && this.currentMenu.settings.header.show) {
                if (this.currentMenu.sprite && this.currentMenu.sprite.dictionnary && this.currentMenu.sprite.texture) {
                    this.utils.renderSprite(
                        'commonmenu',
                        'interaction_bgd',
                        this.currentMenu.position.x / 2,
                        this.currentMenu.position.y / 2,
                        this.currentMenu.settings.header.background.weight,
                        this.currentMenu.settings.header.background.height,
                        0,
                        225,
                        225,
                        225,
                        235
                    )
                } else {
                    this.utils.renderRectangle(
                        this.currentMenu.position.x,
                        this.currentMenu.position.y,
                        this.currentMenu.settings.header.background.weight,
                        this.currentMenu.settings.header.background.height,
                        this.currentMenu.settings.header.background.colors
                    );
                }
                if (this.currentMenu.settings.header.background.glare) {
                    this.utils.updateSafeZone();
                    const currentMenu = this.currentMenu
                    const scaleformMovie = RequestScaleformMovie("MP_MENU_GLARE")
                    const glarewidth = currentMenu.settings.header.background.weight
                    const glareheight = currentMenu.settings.header.background.height
                    const glareX = currentMenu.position.x / 1920 + (currentMenu.safeZoneSize.x / 67.05)
                    const glareY = (currentMenu.position.y / 1080) + (currentMenu.safeZoneSize.y / 36.425020746888)
                    const heading = GetGameplayCamRelativeHeading()
                    this.utils.setScaleformParams(scaleformMovie, [
                        { name: "SET_DATA_SLOT", param: [ heading ] }
                    ])
                    DrawScaleformMovie(scaleformMovie, glareX, glareY, glarewidth / 430, glareheight / 100, 255, 255, 255, 255, 0)
                }
                if (this.currentMenu.title && this.currentMenu.title !== "") {
                    this.utils.renderText(
                        this.currentMenu.title,
                        this.currentMenu.position.x + this.currentMenu.settings.header.text.x,
                        this.currentMenu.position.y + this.currentMenu.settings.header.text.y,
                        this.currentMenu.settings.header.text.font,
                        this.currentMenu.settings.header.text.scale,
                        {
                            r: 255,
                            g: 255,
                            b: 255,
                            a: 255
                        },
                        "center",
                        false,
                        false,
                        0
                    );
                }
            };
        }
    }

    private renderSubtitle(): void {
        if (this.currentMenu) {
            if (this.currentMenu.subtitle && this.currentMenu.subtitle !== "") {
                if (this.currentMenu.settings.subtitle && this.currentMenu.settings.subtitle.show) {
                    this.utils.updateSafeZone();
                    this.utils.renderRectangle(
                        this.currentMenu.position.x,
                        this.currentMenu.position.y + (this.currentMenu.settings.header.background.height * 2.1),
                        this.currentMenu.settings.subtitle.background.weight,
                        this.currentMenu.settings.subtitle.background.height,
                        {
                            r: 25, 
                            g: 25, 
                            b: 25, 
                            a: 225
                        }
                    );
                    this.utils.renderText(
                        this.currentMenu.subtitle,
                        this.currentMenu.position.x + this.currentMenu.settings.subtitle.leftText.x,
                        this.currentMenu.position.y + this.currentMenu.settings.subtitle.leftText.y,
                        this.currentMenu.settings.subtitle.leftText.font,
                        this.currentMenu.settings.subtitle.leftText.scale,
                        {
                            r: 255,
                            g: 255,
                            b: 255,
                            a: 255
                        },
                        "left",
                        false,
                        false,
                        0
                    );
                }
            }
        };
    }

    public render(): void {
        if (this.currentMenu) {
            this.renderBanner();
            this.renderSubtitle();
        }
    }

    public openMenu(menu: Menu): void {
        this.currentMenu = menu;
        if (this.currentMenu && !this.currentMenu.visible) {
            this.currentMenu.visible = true;
            this.menuTick = setTick(() => {
                this.render();
            });
        }
    }

    public closeMenu(): void {
        if (this.currentMenu && this.currentMenu.visible) {
            this.currentMenu.visible = false;
            clearTick(this.menuTick);
            this.currentMenu = undefined;
        }
    }

    public toggleMenu(menu: Menu): void {
        if (this.currentMenu && this.currentMenu.visible) {
            this.closeMenu();
        } else {
            this.openMenu(menu);
        }
    }
}