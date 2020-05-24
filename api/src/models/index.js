// Imports
import Sequelize from 'sequelize'

// App Imports
import databaseConnection from '../setup/databaseConnection'

const models = {
  Thought: databaseConnection.import('./thought'),
  Lecture: databaseConnection.import('./lecture'),
  Class: databaseConnection.import('./class'),
  Grade: databaseConnection.import('./grade'),
  User: databaseConnection.import('./user'),
  Homework: databaseConnection.import('./homework')
}

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = databaseConnection
models.Sequelize = Sequelize

export default models
