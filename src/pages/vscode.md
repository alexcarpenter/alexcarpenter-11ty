---
layout: layouts/markdown.njk
title: VSCode
summary: My current Visual Studio Code settings and extensions.
permalink: /vscode/index.html
---

{% Figure {
  src: '/assets/images/vscode.png',
  breakout: true,
  alt: 'Screenshot of my Visual Studio Code setup',
  ratio: '1200/687'
} %}

## Theme and font family

- **Theme:**
  - Dark: [Night Owl](https://github.com/sdras/night-owl-vscode-theme)
  - Light: [Github Light Theme](https://marketplace.visualstudio.com/items?itemName=Hyzeta.vscode-theme-github-light)
- **Font family:** [Victor Mono](https://rubjo.github.io/victor-mono/)

Outside of a good theme and font family, I usually bump up the font size to `20` and increase the line-height (currently set to `50` in VSCode) which I find improves readability.

## Extensions

- [aaron-bond.better-comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- [adamwalzer.scss-lint](https://marketplace.visualstudio.com/items?itemName=adamwalzer.scss-lint)
- [alefragnani.project-manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager)
- [arcticicestudio.nord-visual-studio-code](https://marketplace.visualstudio.com/items?itemName=arcticicestudio.nord-visual-studio-code)
- [bajdzis.vscode-twig-pack](https://marketplace.visualstudio.com/items?itemName=bajdzis.vscode-twig-pack)
- [christian-kohler.path-intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [CoenraadS.bracket-pair-colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [CraigMaslowski.erb](https://marketplace.visualstudio.com/items?itemName=CraigMaslowski.erb)
- [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [eamodio.gitlens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Gruntfuggly.todo-tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [henry-li.vscode-import-formatter](https://marketplace.visualstudio.com/items?itemName=henry-li.vscode-import-formatter)
- [HookyQR.beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)
- [Hyzeta.vscode-theme-github-light](https://marketplace.visualstudio.com/items?itemName=Hyzeta.vscode-theme-github-light)
- [ionutvmi.path-autocomplete](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
- [JamesBirtles.svelte-vscode](https://marketplace.visualstudio.com/items?itemName=JamesBirtles.svelte-vscode)
- [johnpapa.vscode-peacock](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
- [killalau.vscode-liquid-snippets](https://marketplace.visualstudio.com/items?itemName=killalau.vscode-liquid-snippets)
- [luwenjiechn.nunjucks-vscode-snippets](https://marketplace.visualstudio.com/items?itemName=luwenjiechn.nunjucks-vscode-snippets)
- [mblode.twig-language-2](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language-2)
- [mkxml.vscode-filesize](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize)
- [mrmlnc.vscode-apache](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-apache)
- [mrmlnc.vscode-autoprefixer](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-autoprefixer)
- [mrmlnc.vscode-duplicate](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-duplicate)
- [ms-vsliveshare.vsliveshare](https://marketplace.visualstudio.com/items?itemName=ms-vsliveshare.vsliveshare)
- [neilding.language-liquid](https://marketplace.visualstudio.com/items?itemName=neilding.language-liquid)
- [perragnaredin.light-plus-tweaked](https://marketplace.visualstudio.com/items?itemName=perragnaredin.light-plus-tweaked)
- [PKief.material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [RobbOwen.synthwave-vscode](https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode)
- [ronnidc.nunjucks](https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks)
- [ryanbelisle.vscode-idiomatic-css-comments](https://marketplace.visualstudio.com/items?itemName=ryanbelisle.vscode-idiomatic-css-comments)
- [sdras.night-owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl)
- [suming.react-proptypes-generate](https://marketplace.visualstudio.com/items?itemName=suming.react-proptypes-generate)
- [thenikso.github-plus-theme](https://marketplace.visualstudio.com/items?itemName=thenikso.github-plus-theme)
- [tombonnike.vscode-status-bar-format-toggle](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle)
- [VisualStudioExptTeam.vscodeintellicode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)
- [vscodevim.vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
- [WallabyJs.quokka-vscode](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- [whatwedo.twig](https://marketplace.visualstudio.com/items?itemName=whatwedo.twig)
- [zeit.zeit](https://marketplace.visualstudio.com/items?itemName=zeit.zeit)
- [Zignd.html-css-class-completion](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)

---

## Generate your own extensions list:

Open up a new [Quokka buffer](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode) and paste the code snippet below. The list will then be copied to your clipboard. Thanks Kent C. Dodds for [the tip](https://github.com/kentcdodds/ama/issues/406).

```js
const {execSync, spawn} = require('child_process')

const result = execSync('code --list-extensions')

const list = String(result)
  .split('\n')
  .filter(Boolean)
  .map(
    x => `- [${x}](https://marketplace.visualstudio.com/items?itemName=${x})`
  )
  .join('\n')

const proc = spawn('pbcopy')
proc.stdin.write(list)
proc.stdin.end()
```
