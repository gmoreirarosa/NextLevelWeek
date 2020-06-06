# Ecoleta - Next Level Week (NLW)

<p align="center">
  <img src="/server/uploads/capa-nextlevelweek-ecoleta.png" width="780" height="500" />
</p>

Descrição
 - Projeto criado durante o Next Level Week de 01/06/2020 à 07/06/2020 ministrado pela @Rocketseat

O que é NLW?
- O NLW foi uma experiência online com muito conteúdo prático, desafios e hacks que me ajudaram a práticar e desenvolver skills nas tecnologias utilizadas.

O que foi feito?
- O NLW ocorreu durante a semana internacional do meio ambiente, o que motivou o tema do projeto **Ecoleta**, um marketplace que permite conectar empresas/entidades que coletam resíduos orgânicos e/ou inorgânicos a pessoas que precisam descartar estes resíduos.

# Estrutura do projeto

## Backend

Para rodar a WebApi execute os comandos:

```bash
cd server
npm install
npm run knex:migrate (Inicia o banco de dados Sqlite)
npm run knex:seed (Inclui itens de coleta default)
npm run dev
```

**Tecnologias**
- NodeJS
- Typescript
- Sqlite

---

## Frontend

Para rodar o website execute os comandos:

```bash
cd web
npm install
npm start
```

**Tecnologias**
- ReactJS
- Typescript

---

Para rodar o app mobile execute os comandos:

```bash
npm install -g expo-cli # you don't need to install if you already have it
cd mobile
npm install
npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
npm run android
npm run ios # requires an iOS device or macOS for access to an iOS simulator
npm run web
```

**Tecnologias**
- React Native
- Typescript
