// Lecture
export default (sequelize, DataTypes) => {
  const Lecture = sequelize.define('lectures', {
    lecture: {
      type: DataTypes.STRING
    }
  })

  Lecture.associate = (models) => {
    Lecture.belongsToMany(models.Class, {
      through: models.LectureClass,
      foreignKey: 'lectureId'
    });
    Lecture.belongsToMany(models.User, {
      through: models.LectureTeacher,
      foreignKey: 'lectureId'
    })
  }

  return Lecture;
}