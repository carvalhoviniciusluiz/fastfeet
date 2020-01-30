import Sequelize from 'sequelize';
import User from '../app/models/user';
import File from '../app/models/file';
import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
    this.database();
  }

  database() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
