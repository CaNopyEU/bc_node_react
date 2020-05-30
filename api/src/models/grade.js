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

    Grade.belongsTo(models.Student, {
      foreignKey: 'studentId',
    })

    Grade.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
    })

    Grade.belongsTo(models.Lecture, {
      foreignKey: 'lectureId',
    })
  }
  return Grade
}