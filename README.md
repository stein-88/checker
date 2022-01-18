# checker

## Objetivo

Atraves desse repositório você poderá
- Verificar se existe algum erro na sintaxe dos seguintes formatos:
`HTML, CSS, JavaScript e JSON`
- Minificar todo o conteúdo dos formatos, exceto JSON.
- Atualizar em tempo real enquanto gera o código.
- Deixa seu código pronto para ser usado em `production`.

## Install

`yarn install`

## Usage

- Os arquivos HTML devem estar na pasta `filestocheck/htmls`
- Os arquivos CSS devem estar na pasta `filestocheck/csss`
- Os arquivos JSON devem estar na pasta `filestocheck/jsons`
- Os arquivos JavaScript devem estar na pasta `filestocheck/jss`

- Arquivos minificados `.html` vao para a pasta `assets/`.
- Arquivos minificados `.css` vao para a pasta `assets/style/`.
- Arquivos minificados `.js` e `.json` vao para a pasta `assets/scripts/`.

Você pode rodar os seguintes comandos:
- `yarn checkhtml` para verificar arquivos HTML.
- `yarn checkcss` para verificar arquivos CSS.
- `yarn checkjs` para verificar arquivos JavaScript.
- `yarn checkjson` para verificar arquivos JSON.
- `yarn watcher` para verificar alterações nos arquivos em tempo real.
- `yarn clean` para deletar a pasta assets, que recebe todo o conteúdo gerado a partir das verficações.
- `yarn build` limpa a pasta assets, em paralelo executa a verificação da sintaxe, minimifica os arquivos e coloca na pasta assets conforme o padrão de cada formato.
- `yarn default` executa o comando build como padrão.

Caso apresente um erro de HTML que voce deseja ignorar ultilize o arquivo .htmllintrc. Voce pode verificar a lista de exclusoes no seguinte [website](https://github.com/htmllint/htmllint/wiki/Options)

Para evitar problemas de compatibilidade nós sugerimos a criação de um arquivo `.babelrc` com a seguinte configuração.
`{
  "presets": [ "@babel/preset-env" ]
}`

Será necessário também a criação de um arquivo `.eslintrc` com a seguinte configuração.
`{}` para mais [informações](https://github.com/adametry/gulp-eslint)