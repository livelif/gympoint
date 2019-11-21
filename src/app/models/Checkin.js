import Sequelize, { Model } from 'sequelize';
import { parseISO } from 'date-fns';

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static async studentLastCheckinWas(daysAgo, studentId) {
    const lastsCheckin = await Checkin.findAll({
      limit: 5,
      where: {
        student_id: studentId,
      },
      order: [['created_at', 'DESC']],
    });

    if (lastsCheckin.length - 1 < 4) {
      return false;
    }

    const firstDay = lastsCheckin[0].createdAt;
    const lastDay = lastsCheckin[4].createdAt;

    const difInDays = (firstDay.getTime() - lastDay.getTime()) / (1000 * 3600 * 24);

    if (difInDays === daysAgo) {
      return true;
    }

    return false;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
  }
}

export default Checkin;
