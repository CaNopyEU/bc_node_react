// App Imports
import models from '../../models'

// Get Grade by ID
export async function getById(parentValue, { id }) {
  return await models.Grade.findOne({ where: { id } })
}

// Get all grade
export async function getAll() {
  return await models.Grade.findAll({ order: [ ['createdAt', 'DESC'] ] })
}

// Create grade
export async function create(parentValue, { grade, teacherId, studentId, lectureId, date }) {
  console.log(grade)
  console.log(teacherId)
  console.log(studentId)
  console.log(lectureId)
  console.log(date)
  return await models.Grade.create({ grade, teacherId, studentId, lectureId, date })
}

// Delete grade
export async function remove(parentValue, {id}) {
  return await models.Grade.destroy({ where: { id } })
}
