'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registrationsManagement', 'student_id', {
      type: Sequelize.INTEGER,
      references: { model: 'students', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('registrationsManagement', 'student_id');
  },
};
