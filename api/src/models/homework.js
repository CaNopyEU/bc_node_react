// Homework
export default (sequelize, DataTypes) => {
  const Homework = sequelize.define('homeworks', {
    name: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.FLOAT
    },
    finishAt: {
      type: DataTypes.DATE
    }
  });

  Homework.associate = (models) => {
    Homework.belongsTo(models.Class, {
      foreignKey: 'classId'
    })

    Homework.belongsTo(models.User, {
      foreignKey: 'teacherId'
    })

    Homework.belongsTo(models.Lecture, {
      foreignKey: 'lectureId'
    })

  };

  return Homework;
}