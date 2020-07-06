// App Imports
import models from '../../models'

// Get GroupLecture by ID
export async function getById(parentValue, {groupId, lectureId}) {
  return await models.GroupLecture.findOne({
    where: {},
    include: [
      {
        model: models.Group,
        where: {id: groupId},
        as: 'groups'
      },
      {
        model: models.Lecture,
        where: {id: lectureId},
        as: 'lectures'
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
  try {
    await models.GroupLecture.create({
      lectureId,
      groupId
    })
    return await getById(parentValue, {groupId, lectureId})
  } catch (err) {
    throw err;
  }
}

// Delete GroupLecture
export async function remove(parentValue, {id}) {
  return await models.GroupLecture.destroy({where: {id}})
}
