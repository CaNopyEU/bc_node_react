// App Imports
import models from '../../models'

// Get lecture by ID
export async function getById(parentValue, {id}) {
  return await models.Lecture.findOne({where: {id}})
}

// Get all lectures
export async function getAll() {
  return await models.Lecture.findAll({order: [['createdAt', 'DESC']]})
}

// Create leacture
export async function create(parentValue, {
  lecture, lectureType
}) {
  return await models.Lecture.create({lecture, lectureType})
}

// Delete lecture
export async function remove(parentValue, {id}) {
  return await models.Lecture.destroy({where: {id}})
}
