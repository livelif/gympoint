import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await bcrypt.hash(user.password, 8);
        console.log(user.password_hash);
      }
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static async isAdmin(userId) {
    const user = await User.findByPk(userId);

    if (user.email === 'admin@gympoint.com') {
      return true;
    }

    return false;
  }
}

export default User;
