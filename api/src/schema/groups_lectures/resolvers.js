// App Imports
import models from '../../models'

// Get GroupLecture by ID
export async function getById(parentValue, {id}) {
  return await models.GroupLecture.findOne({
    where: {id},
    include: [
      {
        model: models.Group,
        where: {}
      },
      {
        model: models.Lecture,
        where: {}
      },
    ]
  })
}

// Get all GroupLectures by group
export async function getAll(parentValue, {id}) {
  return await models.GroupLecture.findAll({
    where: {groupId: id},
    include: [
      {
        model: models.Lecture
      }
    ]
  })
}

// Create GroupLecture
export async function create(parentValue, {
  lectureId,
  groupId
}) {
  return await models.GroupLecture.create({
    lectureId,
    groupId
  })
}

// Delete GroupLecture
export async function remove(parentValue, {id}) {
  return await models.GroupLecture.destroy({where: {id}})
}
