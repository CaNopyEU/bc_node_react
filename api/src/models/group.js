// Group
export default (sequelize, DataTypes) => {
  const Group = sequelize.define('groups', {
    title: {
      type: DataTypes.FLOAT
    }
  })
  Group.associate = (models) => {
    Group.belongsToMany(models.Lecture, {
      through: models.GroupLecture,
      foreignKey: 'groupId',
      as: 'lectures'
    });
    Group.belongsToMany(models.Teacher, {
      through: models.TeacherGroup,
      foreignKey: 'groupId',
      as: 'teachers'
    });
    Group.belongsToMany(models.Student, {
      through: models.StudentGroup,
      foreignKey: 'groupId',
      as: 'students'
    });
    Group.belongsTo(models.Class, {
      foreignKey: 'classId',
    })

  }
  return Group
}