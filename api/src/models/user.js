// User
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
    role: {
      type: DataTypes.STRING
    }
  })
  return User
}
