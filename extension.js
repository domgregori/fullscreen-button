import GObject from 'gi://GObject';
import St from 'gi://St';
import Meta from 'gi://Meta';

import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class FullscreenButtonExtension extends Extension {
    constructor(metadata) {
        super(metadata);
    }
    enable() {
        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);
        const icon = new St.Icon({
            icon_name: 'view-fullscreen-symbolic',
            style_class: 'system-status-icon',
        });
        this._indicator.add_child(icon);

        Main.panel.addToStatusArea(this.uuid, this._indicator);
        this._tapHandler = this._indicator.connect('touch-event', this._buttonActivated);
        this._clickHandler = this._indicator.connect('button-press-event', this._buttonActivated);
    }

    disable() {
        if (this._tapHandler) {
            this._indicator.disconnect(this._tapHandler);
            this._tapHandler = null;
        }
        if (this._clickHandler) {
            this._indicator.disconnect(this._clickHandler);
            this._clickHandler = null;
        }
        this._indicator?.destroy();
        this._indicator = null;
    }

    _buttonActivated() {
        let activeWindow = global.display.focus_window;
        if (activeWindow) {
            activeWindow.make_fullscreen();
        }
    }
    
}


