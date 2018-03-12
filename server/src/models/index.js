import Sequelize from 'sequelize';

const sequelize = new Sequelize('tickets', 'admin', 'admin', {
  host: 'postgres',
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const models = {
  Seat: sequelize.import('./seat'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;