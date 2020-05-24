// App Imports
import models from '../../models'

// Get Homework by ID
export async function getById(parentValue, {id}) {
  return await models.Homework.findOne({where: {id}})

}

// Get all homeworks
export async function getAll() {
  return await models.Homework.findAll({order: [['createdAt', 'DESC']]})
}

// Create Homework
export async function create(parentValue, {
  name,
  desc,
  finishAt,
  classId,
  teacherId,
  lectureId
}) {
  console.log(name)
  console.log(desc)
  console.log(finishAt)
  console.log(classId)
  console.log(teacherId)
  console.log(lectureId)
  return await models.Homework.create({
    name,
    desc,
    finishAt,
    classId,
    teacherId,
    lectureId
  })
}

// Delete homework
export async function remove(parentValue, {id}) {
  return await models.Homework.destroy({where: {id}})
}
