// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from '../setup/databaseConnection'

const models = {
  Lecture: databaseConnection.import('./lecture'),
  Class: databaseConnection.import('./class'),
  Grade: databaseConnection.import('./grade'),
  User: databaseConnection.import('./user'),
  Homework: databaseConnection.import('./homework'),
  Attendance: databaseConnection.import('./attendance'),
  Group: databaseConnection.import('./group'),
  Parent: databaseConnection.import('./parent'),
  Record: databaseConnection.import('./record'),
  Student: databaseConnection.import('./student'),
  Teacher: databaseConnection.import('./teacher'),
  TeacherLecture: databaseConnection.import('./teacher_lecture'),
  GroupLecture: databaseConnection.import('./group_lecture'),
  StudentGroup: databaseConnection.import('./student_group'),
  TeacherGroup: databaseConnection.import('./teacher_group')
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
