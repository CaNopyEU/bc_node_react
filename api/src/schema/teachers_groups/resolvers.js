// App Imports
import models from '../../models'

// Get TeacherLecture by ID
export async function getById(parentValue, {teacherId, groupId}) {
  return await models.TeacherGroup.findOne({
    where: {},
    include: [
      {
        model: models.Teacher,
        where: {id: teacherId},
        as: 'teachers'
      },
      {
        model: models.Group,
        where: {id: groupId},
        as: 'groups'
      },
    ]
  })
}

// Get all TeacherLectures
export async function getAll() {
  return await models.TeacherLecture.findAll({
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: models.Teacher,
        where: {},
        as: 'teachers'
      },
      {
        model: models.Lecture,
        where: {},
        as: ''
      },
    ]
  })
}

// Create TeacherLecture
export async function create(parentValue, {
  groupId,
  teacherId
}) {
  try {
    await models.TeacherGroup.create({
      groupId,
      teacherId
    })
    return await getById(parentValue, {teacherId, groupId})
  } catch (err) {
    throw err;
  }
}

// Delete TeacherLecture
export async function remove(parentValue, {groupId, teacherId}) {
  return await models.TeacherGroup.destroy({
    where: {
      groupId: groupId,
      teacherId: teacherId
    }
  })
}
