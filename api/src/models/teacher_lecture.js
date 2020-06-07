// TeachersLectures
export default (sequelize) => {
  const TeacherLecture = sequelize.define('teachers_lectures', {})
  TeacherLecture.associate = (models) => {

    TeacherLecture.belongsTo(models.Lecture, {
      foreignKey: 'lectureId',
      as: 'lectures'
    })

    TeacherLecture.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teachers'
    })


  }
  return TeacherLecture;
}