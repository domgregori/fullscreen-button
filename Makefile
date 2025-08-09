NAME=fullscreen-button
DOMAIN=domgregori.github.com

.PHONY: all pack install clean cleanall

all: dist/extension.js

node_modules: package.json
	npm install

dist/extension.js: node_modules
	tsc

$(NAME).zip: dist/extension.js
	@cp metadata.json dist/
	@cp fullscreen.symbolic.png dist/
	@(cd dist && zip ../$(NAME).zip -9r .)

pack: $(NAME).zip

install: $(NAME).zip
	@touch ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@rm -rf ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)
	@mv dist ~/.local/share/gnome-shell/extensions/$(NAME)@$(DOMAIN)

clean:
	@rm -rf dist $(NAME).zip

cleanall:
	@rm -rf dist node_modules $(NAME).zip
