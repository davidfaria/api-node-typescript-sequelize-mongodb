# Quick guide - Sequelize (Typescript)


### Fresh migrations
```bash
yarn sequelize-ts db:migrate:undo:all && yarn sequelize-ts db:migrate
```

### Create Migrate

```bash
yarn sequelize-ts seed:generate --name user-seed
``` 

### Create Seed

```bash
yarn sequelize-ts migration:generate --name create-user-table
``` 