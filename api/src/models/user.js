// Thought
export default (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'Meno používatela može obrashovať len písmená a čísla'
        },
        len: {
          args: [5, 25],
          msg: 'Meno používatela musí byť v rozmedzí 5 až 25 znakov'
        }
      }
    },
    password: {
      type: DataTypes.STRING
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Neplatný email'
        }
      }
    },
    role: {
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
    phone: {
      type: DataTypes.FLOAT
    },
    date: {
      type: DataTypes.DATE
    }
  })

  User.associate = (models) => {
    User.belongsToMany(models.Lecture, {
      through: 'lecture_teacher',
      foreignKey: 'teacherId'
    })
    User.belongsTo(models.Class, {
      foreignKey: 'classId',
    });
  }

  return User
}
