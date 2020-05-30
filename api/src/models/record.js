// Record
export default (sequelize, DataTypes) => {
  const Record = sequelize.define('records', {
    desc: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE
    }
  })

  Record.associate = (models) => {

    Record.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
    })

    Record.belongsTo(models.Student, {
      foreignKey: 'studentId',
    })

  }
  return Record
}