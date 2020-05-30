// Homework
export default (sequelize, DataTypes) => {
  const Homework = sequelize.define('homeworks', {
    name: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.DATE
    }
  });

  Homework.associate = (models) => {
    Homework.belongsTo(models.Group, {
      foreignKey: 'groupId'
    })

    Homework.belongsTo(models.Teacher, {
      foreignKey: 'teacherId'
    })

    Homework.belongsTo(models.Lecture, {
      foreignKey: 'lectureId'
    })

  };

  return Homework;
}