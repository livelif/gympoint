import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DOUBLE,
        height: Sequelize.DOUBLE,
        userId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static async studentExist(studentId) {
    const student = await Student.findByPk(studentId);

    if (!student) {
      return false;
    }

    return true;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Student;
