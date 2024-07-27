import { Sequelize } from "sequelize-typescript";

// export const databaseProviders = [
//     {
//       provide: 'SEQUELIZE',
//       useFactory: async () => {
//         const sequelize = new Sequelize({
//             dialect: 'postgres',
//             host: process.env.DB_HOST || 'localhost',
//             username: process.env.DB_USER || 'postgres',
//             password: process.env.DB_PASSWORD || 'admin',
//             database: process.env.DB_DATABASE || 'desafio_backend',
//         });
//         sequelize.addModels([]);
//         await sequelize.sync();
//         return sequelize;
//       },
//     },
//   ];