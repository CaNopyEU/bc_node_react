// Lecture
export default (sequelize, DataTypes) => {
  const Lecture = sequelize.define('lectures', {
    lecture: {
      type: DataTypes.STRING
    }
  })

  Lecture.associate = (models) => {
    Lecture.belongsToMany(models.Class, {
      through: 'lecture_class',
      foreignKey: 'lectureId'
    });
    Lecture.belongsToMany(models.User, {
      through: 'lecture_teacher',
      foreignKey: 'lectureId'
    })
  }

  return Lecture;
}