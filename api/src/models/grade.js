// Grade
export default (sequelize, DataTypes) => {
  const Grade = sequelize.define('grades', {
    grade: {
      type: DataTypes.FLOAT
    },
    date: {
      type: DataTypes.DATE
    },
  })
  Grade.associate = (models) => {

    Grade.belongsTo(models.User, {
      foreignKey: 'teacherId',
    })

    Grade.belongsTo(models.User, {
      foreignKey: 'studentId',
    })

    Grade.belongsTo(models.Lecture, {
      foreignKey: 'lectureId',
    })

  }
  return Grade
}