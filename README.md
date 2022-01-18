# checker

## Install

`yarn install`

## Usage

- O arquivo que deseja verificar deve estar na pasta `filestocheck/`

- Arquivos minificados `.html` vao para a pasta `assets/`.
- Arquivos minificados `.css` vao para a pasta `assets/style/`.
- Arquivos minificados `.js` e `.json` vao para a pasta `assets/scripts/`.

- Rodar os seguintes comandos:
- `yarn chtml` para verificar arquivos HTML.
- `yarn ccss` para verificar arquivos CSS.
- `yarn cjs` para verificar arquivos JavaScript.
- `yarn cjson` para verificar arquivos JSON.

Caso apresente um erro de HTML que voce deseja ignorar ultilize o arquivo .htmllintrc. Voce pode verificar a lista de exclusoes no seguinte [website](https://github.com/htmllint/htmllint/wiki/Options)