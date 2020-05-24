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
    Class.belongsToMany(models.Lecture, {
      through: models.LectureClass,
      foreignKey: 'classId'
    })
  }
  return Class
}
