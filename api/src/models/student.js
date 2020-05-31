// Student
export default (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    street: {
      type: DataTypes.STRING
    },
    street_num: {
      type: DataTypes.FLOAT
    },
    dob: {
      type: DataTypes.DATE
    },
    desc: {
      type: DataTypes.TEXT
    }
  })
  Student.associate = (models) => {

    Student.belongsTo(models.User, {
      foreignKey: 'userId',
    })

    Student.belongsTo(models.Parent, {
      foreignKey: {
        name: 'parentId',
        allowNull: true
      }
    })

    Student.belongsTo(models.Group, {
      foreignKey: {
        name: 'groupId',
        allowNull: true
      }
    })

  }
  return Student
}