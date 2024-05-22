import GObject from 'gi://GObject';
import St from 'gi://St';
import Meta from 'gi://Meta';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init() {
        super._init(0.0, _('Fullscreen Button'));

        this.add_child(new St.Icon({
            icon_name: 'view-fullscreen-symbolic',
            style_class: 'system-status-icon',
        }));
    }
});

export default class FullscreenButtonExtension extends Extension {
    enable() {
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this._indicator);
        this._indicator.connect('touch-event', this._buttonActivated);
        this._indicator.connect('button-press-event', this._buttonActivated);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
    _buttonActivated(actor, event) {
        let activeWindow = global.display.focus_window;
        if (activeWindow) {
            activeWindow.make_fullscreen();
        }
    }
    
}


