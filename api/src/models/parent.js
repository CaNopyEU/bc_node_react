// Parent
export default (sequelize, DataTypes) => {
  const Parent = sequelize.define('parents', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE
    },
    phone: {
      type: DataTypes.FLOAT
    }
  })/*
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

  }*/
  return Parent
}