// GroupLecture
export default (sequelize) => {
  const GroupLecture = sequelize.define('groups_lectures', {})

  GroupLecture.associate = (models) => {

    GroupLecture.belongsTo(models.Group, {
      foreignKey: 'groupId',
      as: 'groups'
    })

    GroupLecture.belongsTo(models.Lecture, {
      foreignKey: 'lectureId',
      as: 'lectures'
    })


  }

  return GroupLecture;
}