import Sequelize, { Model } from 'sequelize';

class Helps extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.TEXT,
        answer: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }

  static async getQuestionsNotAnsweredOf(studentId) {
    const helps = await Helps.findAll({
      where: {
        student_id: studentId,
        answer: null,
      },
    });

    return helps;
  }
}

export default Helps;
