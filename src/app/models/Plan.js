import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.DECIMAL,
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
  }
}

export default Plan;
