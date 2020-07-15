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
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.TEXT
    }
  })
  Student.associate = (models) => {
    Student.belongsToMany(models.Group, {
      through: models.StudentGroup,
      foreignKey: 'studentId',
      as: 'groups'
    });
    Student.belongsTo(models.User, {
      foreignKey: 'userId',
    })
    Student.belongsTo(models.Parent, {
      foreignKey: {
        name: 'parentId',
        allowNull: true
      }
    })
    Student.belongsTo(models.Class, {
      foreignKey: {
        name: 'classId',
        allowNull: true
      }
    })
    Student.hasMany(models.Grade, {
      foreignKey: {
        name: 'studentId'
      }
    })
    Student.hasMany(models.Attendance, {
      foreignKey: {
        name: 'studentId'
      }
    })
    Student.hasMany(models.Record, {
      foreignKey: {
        name: 'studentId'
      }
    })
  }
  return Student
}