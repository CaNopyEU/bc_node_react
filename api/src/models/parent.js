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
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.FLOAT
    }
  })
  return Parent
}