// App Imports
import models from '../../models'

// Get TeacherLecture by ID
export async function getById(parentValue, {id}) {
  return await models.TeacherLecture.findOne({
    where: {id},
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

// Get all TeacherLectures
export async function getAll() {
  return await models.TeacherLecture.findAll({
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
  return await models.StudentGroup.create({
    groupId,
    studentId
  })
}

// Delete TeacherLecture
export async function remove(parentValue, {id}) {
  return await models.TeacherLecture.destroy({where: {id}})
}
