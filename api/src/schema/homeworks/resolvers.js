// App Imports
import models from '../../models'

// Get Homework by ID
export async function getById(parentValue, {id}) {
  return await models.Homework.findOne({
    where: {id},
    include: [
      {
        model: models.Group,
        where: {}
      },
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Lecture,
        where: {}
      }
    ]
  })

}

// Get all homeworks
export async function getAll() {
  return await models.Homework.findAll({
    order: [['deadline', 'DESC']], include: [
      {
        model: models.Group,
        where: {}
      },
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Lecture,
        where: {}
      }
    ]
  })
}

// Create Homework
export async function create(parentValue, {
  name,
  desc,
  deadline,
  groupId,
  teacherId,
  lectureId
}) {
  return await models.Homework.create({
    name,
    desc,
    deadline,
    groupId,
    teacherId,
    lectureId
  })
}

// Delete homework
export async function remove(parentValue, {id}) {
  return await models.Homework.destroy({where: {id}})
}
