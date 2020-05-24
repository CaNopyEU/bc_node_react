// App Imports
import models from '../../models'

// Get classes by ID
export async function getById(parentValue, { id }) {
  return await models.Class.findOne({ where: { id } })
}

// Get all classes
export async function getAll() {
  return await models.Class.findAll({ order: [ ['createdAt', 'DESC'] ] })
}

// Create class
export async function create(parentValue, { classType, year, schedule }) {
  console.log(classType)
  console.log(year)
  console.log(schedule)
  return await models.Class.create({ classType, year, schedule })
}

// Delete class
export async function remove(parentValue, {id}) {
  return await models.Class.destroy({ where: { id } })
}
