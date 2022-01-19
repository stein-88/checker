## Objetivo

Atraves desse repositório será possível.

- Deixa o código pronto para ser usado em `production`.
  - Rodando indivualmente nos seguintes formatos: `HTML, CSS, JavaScript e JSON`.
  - Ou rodando todos os formatos ao mesmo tempo.
- Utilizando o watcher, atualiza em tempo real os arquivos para produção.

## Install

`yarn install`

## Usage

- Os arquivos HTML devem estar na pasta `filestocheck/templates`
- Os arquivos CSS devem estar na pasta `filestocheck/styles`
- Os arquivos JSON devem estar na pasta `filestocheck/jsons`
- Os arquivos JavaScript devem estar na pasta `filestocheck/scripts`

Production sera gerado dessa forma:
assets/scripts/ ---> .js e .json
assets/style/ ----> .css
assets ---> html

Comandos:
- `yarn checkhtml`
  - Procura os arquivos HTML na pasta `filestocheck/templates`.
  - Verifica erros no HTML.
  - Minimifica o HTML.
  - Exporta para a pasta `assets`
  - Caso apresente um erro de HTML que deseja ignorar utilize o arquivo `.htmllintrc`. Verifique a lista de exclusões no seguinte [website](https://github.com/htmllint/htmllint/wiki/Options)

- `yarn checkcss` para verificar arquivos CSS.
  - Procura os arquivos CSS na pasta `filestocheck/styles`.
  - Verifica erros no CSS.
  - Minimifica o CSS.
  - Exporta para a pasta `assets/style`

- `yarn checkjs` para verificar arquivos JavaScript.
  - Procura os arquivos JavaScript na pasta `filestocheck/scripts`.
  - Verifica erros no JavaScript.
  - Minimifica o JavaScript.
  - Exporta para a pasta `assets/scripts`
  - Caso apresente um erro de JavaScript que deseja ignorar ou fazer alguma cofiguração, utilize o arquivo `.eslintrc`. Você pode verificar a lista de exclusões no seguinte [website](https://github.com/adametry/gulp-eslint)

- `yarn checkjson` para verificar arquivos JSON.
  - Procura os arquivos JSON na pasta `filestocheck/jsons`.
  - Verifica erros no JSON.
  - Exporta para a pasta `assets/scripts`

- `yarn watcher`
  - Acompanha em tempo real toda alteração no arquivo fonte, ou seja o arquivo original que está sendo analisado.

- `yarn clean`
  - Deleta a pasta assets.

- `yarn build`
  - Deleta a pasta assets
  - Executa a verificação da sintaxe
  - Minimifica os arquivos
  - Move os arquivos para a nova pasta assets conforme o padrão de cada formato.

- `yarn default`
  - Executa o comando build como padrão.

Caso deseja verificar a documentação do GULP em que essa documentação foi baseada verifique o seguinte [website](https://github.com/gulpjs/gulp)