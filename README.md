# Megabot

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Você instalou o `NodeJS`.
* Você tem um banco de dados `MySQL ou PostgreSQL`.

## 🚀 Instalação

Para instalar o Megabot, siga estas etapas:

Clone o projeto:
```
git clone https://github.com/megajr/megabot.git
```

Instale as depêndencias:
```
npm install
```

Crie um arquivo `.env` com base no `.env.example` e configure os valores.

## ☕ Execução

Para colocar o Megabot online:

```
npm start
```

## 📫 Adicionando no servidor

Para adicionar o Megabot no seu servidor, acesse e copie o `CLIENT_ID` do seu bot:

```
https://discord.com/developers/applications/
```

E com o `CLIENT_ID` acesse:

```
https://discord.com/oauth2/authorize?client_id=`CLIENT_ID`&scope=bot&permissions=8
```

E adicione no servidor desejado.
