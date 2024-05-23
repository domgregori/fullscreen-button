import St from 'gi://St';
import Gio from 'gi://Gio';

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
            style_class: 'system-status-icon',
        });
        icon.gicon = Gio.icon_new_for_string(this.path + '/icons/fullscreen.svg');
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
            if (activeWindow.is_fullscreen()) {
                activeWindow.unmake_fullscreen();
            } else {
                activeWindow.make_fullscreen();
            }
        }
    }
    
}


