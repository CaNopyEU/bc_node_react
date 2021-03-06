// App Imports
import models from '../../models'

// Get StudentGroup by ID
export async function getById(parentValue, {studentId, groupId}) {
  return await models.StudentGroup.findOne({
    where: {},
    include: [
      {
        model: models.Student,
        where: {id: studentId},
        as: 'students'
      },
      {
        model: models.Group,
        where: {id: groupId},
        as: 'groups'
      },
    ]
  })
}

// Get all StudentGroup
export async function getAll() {
  return await models.StudentGroup.findAll({
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Lecture,
        where: {}
      },
    ]
  })
}

// Create TeacherLecture
export async function create(parentValue, {
  groupId,
  studentId
}) {
  try {
    await models.StudentGroup.create({
      groupId,
      studentId
    })
    return await getById(parentValue, {studentId, groupId})
  } catch (err) {
    throw err;
  }

}

// Delete TeacherLecture
export async function remove(parentValue, {studentId, groupId}) {
  return await models.StudentGroup.destroy({
    where: {
      studentId: studentId,
      groupId: groupId
    }
  })
}
