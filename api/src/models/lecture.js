// Lecture
export default (sequelize, DataTypes) => {
  const Lecture = sequelize.define('lectures', {
    lecture: {
      type: DataTypes.STRING,
      unique: true
    },
    lectureType: {
      type: DataTypes.BOOLEAN,
    }
  })

  Lecture.associate = (models) => {
    Lecture.belongsToMany(models.Teacher, {
      through: models.TeacherLecture,
      foreignKey: 'lectureId'
    });
    Lecture.belongsToMany(models.Group, {
      through: models.GroupLecture,
      foreignKey: 'lectureId'
    })
  }

  return Lecture;
}