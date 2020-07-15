// Attendance
export default (sequelize, DataTypes) => {
  const Attendance = sequelize.define('attendances', {
    desc: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.STRING
    },
    pardon: {
      type: DataTypes.BOOLEAN
    }
  })

  Attendance.associate = (models) => {

    Attendance.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
    })

    Attendance.belongsTo(models.Student, {
      foreignKey: 'studentId',
    })

  }
  return Attendance
}