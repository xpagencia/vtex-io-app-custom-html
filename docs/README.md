📢 Use this project, [contribute](https://github.com/xpagencia/vtex-io-app-custom-html) to it or open issues to help evolve it using [Store Discussion](https://github.com/xpagencia/vtex-io-app-custom-html/issues).

# Custom Html Content

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

Recebe uma string de HTML e converte em tags HTML.
A string pode iniciar na tag "html" e fechar ou então ter apenas um trecho de dentro do body.

Essa string pode conter os elementos script, link, styles na head ou qualquer outro elemento que venha dentro do body.

Se a string tiver as tags head e body, obrigatóriamente ela precisará ter a tag html para realizar o parse correto.

## Configuração

📢 Caso o app não esteja global, é necessário clonar este repositório primeiro e realizar as seguintes configurações:

Altere o campo vendor para o nome da loja em que deseja instalar o app;

```json
"vendor": "nomedaloja"
```

Rode os seguintes comandos;

`vtex login {nomedaloja}` <br/>

`vtex use {workspace}` <br/>

`yarn install` ou `npm install` <br/>

`cd react` <br/>

`vtex setup --typings` <br/>

`cd ..` <br/>

`vtex publish` <br/>

`vtex link` <br/>

Após isso já é possível seguir com a instalação <br/> <br/>

## Instalação

1- Adicone o app no arquivo `manifest.json` de sua loja e o instale através do comando `vtex install {VENDOR}.custom-html-content@0.x`;

```json
"dependencies": {
  "{VENDOR}.custom-html-content": "0.x"
}
```

2- Declare o bloco `custom-html-content` e passe o conteudo html em formato texto.
<br/>
Exemplos de como declarar os blocos do app:

- Exemplo 1

```json
"custom-html-content": {
  "props": {
    "htmlText": "<h1>Meu titulo antigo</h1><style>.destaque{font-size:40px}</style><span class='destaque'>texto com <strong>createelement</strong> novo.</span><script>alert('fim');if(document.getElementsByClassName('destaque').length > 0){ document.getElementsByClassName('destaque')[0].style.background = 'brown';} else {alert('não deu')}</script>"
  }
}
```

- Exemplo 2

```json
"custom-html-content": {
  "props": {
    "htmlText": "<html><head><script>function teste(){document.getElementsByClassName('destaque')[0].style.background = 'yellow';}alert('oi')</script></head><body class='bodyclass'><h1>Meu titulo</h1><style>.destaque{font-size:40px}</style><span class='destaque'>texto com <strong>createelement</strong> novo.</span><script>alert('fim');if(document.getElementsByClassName('destaque').length > 0){ document.getElementsByClassName('destaque')[0].style.background = 'brown';} else {alert('não deu')}</script></body></html>"
  }
}
```

<br/>

### `custom-html-content` props

| Prop name  | Type     | Description                                   | Default value               |
| ---------- | -------- | --------------------------------------------- | --------------------------- |
| `blockClass` | `string ou Array` | Nome da classe a ser utilizada na section principal. | null |
`htmlText` | `string` | Texto com elementos html para ser convertido em tag html | `<span>Html content</span>` |

<br/>

## Customization

| CSS Handles         |
| ------------------- |
| `customHtmlContent` |

<br/>

## Contributors ✨

Thanks goes to these wonderful people:

<table>
  <tr>
    <td align="center"><a href="https://github.com/ArthurRod"><img src="https://avatars.githubusercontent.com/u/6527062" width="100px;" alt=""/><br /><sub><b>Fabio Santos</b></sub></a></td>
  </tr>
</table>
