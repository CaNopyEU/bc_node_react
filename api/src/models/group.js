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
      foreignKey: 'groupId'
    });
    Group.belongsTo(models.Class, {
      foreignKey: 'classId',
    })

  }
  return Group
}