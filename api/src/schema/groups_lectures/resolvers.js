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

// Get all GroupLectures
export async function getAll() {
  return await models.GroupLecture.findAll({
    order: [['updatedAt', 'DESC']],
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
