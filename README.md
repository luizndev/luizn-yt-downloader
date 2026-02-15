<p align="center">
  <a href="http://luizndev.com.br/" target="blank"><img src="https://i.imgur.com/jw52rJ2.png" width="200" alt="Luizn Logo" /></a>
</p>

<h1 align="center">Luizn YT Downloader</h1>

Um serviço robusto e escalável para download de vídeos do YouTube, construído com **NestJS**.

<div align="center">

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)

</div>

## Funcionalidades

- **Download de Áudio (MP3)**: Extração de áudio em alta qualidade.
- **Download de Vídeo (MP4)**: Baixe vídeos completos com áudio.
- **Arquitetura Modular**: Separação clara de responsabilidades (Service, Controller, Module).
- **Validação de Dados**: Uso de DTOs e `class-validator` para garantir requests seguros.
- **Tratamento de Erros**: Feedback claro para o cliente em caso de falhas.

## Tecnologias

- [NestJS](https://nestjs.com/) - Framework Node.js progressivo.
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript.
- [yt-dlp-exec](https://github.com/microlinkhq/yt-dlp-exec) - Wrapper para o poderoso `yt-dlp`.
- [ffmpeg-static](https://github.com/eugeneware/ffmpeg-static) - Binários estáticos do FFmpeg para processamento de mídia.

## Instalação

```bash
# Clone o repositório
git clone https://github.com/luizndev/luizn-yt-downloader.git

# Entre na pasta
cd luizn-yt-downloader

# Instale as dependências
npm install
```

## Executando a Aplicação

```bash
# Desenvolvimento
npm run start

# Desenvolvimento (Watch Mode)
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.

## Documentação da API

### Baixar Mídia

Endpoint para baixar vídeos ou áudios do YouTube.

**URL:** `/download/:videoId`
**Método:** `GET`

#### Parâmetros de URL

| Parâmetro | Tipo     | Descrição                                  |
| :-------- | :------- | :----------------------------------------- |
| `videoId` | `string` | **Obrigatório**. O ID do vídeo do YouTube. |

#### Query Parameters

| Parâmetro | Tipo     | Padrão | Descrição                         |
| :-------- | :------- | :----- | :-------------------------------- |
| `format`  | `string` | `mp3`  | Formato desejado: `mp3` ou `mp4`. |

### Exemplos de Uso

#### 1. Baixar MP3 (Padrão)

```http
GET http://localhost:3000/download/jNQXAC9IVRw
```

_Ou explicitamente:_

```http
GET http://localhost:3000/download/jNQXAC9IVRw?format=mp3
```

#### 2. Baixar MP4

```http
GET http://localhost:3000/download/jNQXAC9IVRw?format=mp4
```

### Exemplo via cURL

```bash
# Baixar MP3 e salvar como arquivo
curl -OJ "http://localhost:3000/download/jNQXAC9IVRw?format=mp3"

# Baixar MP4 e salvar como arquivo
curl -OJ "http://localhost:3000/download/jNQXAC9IVRw?format=mp4"
```

## Estrutura do Projeto

```
src/
├── download/
│   ├── dto/
│   │   └── download-query.dto.ts  # Validação de entrada
│   ├── download.controller.ts     # Rotas e HTTP
│   ├── download.module.ts         # Injeção de dependência
│   └── download.service.ts        # Lógica de negócio (yt-dlp)
├── app.module.ts                  # Módulo raiz
└── main.ts                        # Ponto de entrada (Configuração global)
```

## Licença

Este projeto está sob a licença [UNLICENSED](LICENSE).

---

Desenvolvido com ❤️ por **LuiznDev**.
