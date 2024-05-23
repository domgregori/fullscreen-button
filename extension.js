const Gettext = imports.gettext;
const St = imports.gi.St;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;


const {
  gettext: _,
  ngettext,
  pgettext,
} = ExtensionUtils;

class Extension {
  enable() {
      // Create a panel button
      this._indicator = new PanelMenu.Button(0.0, Me.metadata.name, false);

      // Add an icon
      const icon = new St.Icon({
          icon_name: 'view-fullscreen-symbolic',
          style_class: 'system-status-icon',
      });
      this._indicator.add_child(icon);

      Main.panel.addToStatusArea(Me.metadata.uuid, this._indicator);
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
      if (this._indicator) {
          this._indicator.destroy();
          this._indicator = null;
      }
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

function init() {
  // If the `gettext-domain` key is not set in `metadata.json`, you must
  // pass the unique Gettext domain for your extension when initializing.
  ExtensionUtils.initTranslations(Me.metadata.uuid);

  return new Extension();
}
