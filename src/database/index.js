import Sequelize from 'sequelize';

import Student from '../app/models/Student';
import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Checkin from '../app/models/Checkin';
import Help from '../app/models/Help';

import databaseConfig from '../config/database';

const models = [Student, User, Plan, Registration, Checkin, Help];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
