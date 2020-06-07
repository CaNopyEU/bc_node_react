// StudentGroup
export default (sequelize) => {
  const StudentGroup = sequelize.define('students_groups', {})

  StudentGroup.associate = (models) => {

    StudentGroup.belongsTo(models.Group, {
      foreignKey: 'groupId',
      as: 'groups'
    })

    StudentGroup.belongsTo(models.Student, {
      foreignKey: 'studentId',
      as: 'students'
    })

  }

  return StudentGroup;
}