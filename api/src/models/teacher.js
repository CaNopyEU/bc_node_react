// Teacher
export default (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teachers', {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    street: {
      type: DataTypes.STRING
    },
    street_num: {
      type: DataTypes.FLOAT
    },
    phone: {
      type: DataTypes.FLOAT
    },
    dob: {
      type: DataTypes.DATE
    },
    main_teacher: {
      type: DataTypes.BOOLEAN
    }
  })
  Teacher.associate = (models) => {
    Teacher.belongsToMany(models.Lecture, {
      through: models.TeacherLecture,
      foreignKey: 'teacherId'
    });
    Teacher.belongsTo(models.User, {
      foreignKey: {
        name: 'userId'
      },
    });
  }
  return Teacher
}