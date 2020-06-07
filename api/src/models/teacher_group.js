// TeacherGroup
export default (sequelize) => {
  const TeacherGroup = sequelize.define('teachers_groups', {})

  TeacherGroup.associate = (models) => {

    TeacherGroup.belongsTo(models.Group, {
      foreignKey: 'groupId',
      as: 'groups'
    })

    TeacherGroup.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teachers'
    })


  }

  return TeacherGroup;
}