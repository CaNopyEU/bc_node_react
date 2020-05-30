// Class
export default (sequelize, DataTypes) => {
  const Class = sequelize.define('classes', {
    classType: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.FLOAT
    },
    schedule: {
      type: DataTypes.STRING
    }
  })
  Class.associate = (models) => {
    Class.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
    })
  }
  return Class
}
