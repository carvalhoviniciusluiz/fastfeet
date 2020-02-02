import Sequelize from 'sequelize';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Order from '../app/models/Order';
import Recipient from '../app/models/Recipient';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [Deliveryman, File, Order, Recipient, User];

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
