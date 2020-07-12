// App Imports
import models from '../../models'

// Get TeacherLecture by ID
export async function getById(parentValue, {lectureId, teacherId}) {
  return await models.TeacherLecture.findOne({
    where: {},
    include: [
      {
        model: models.Teacher,
        where: {id: teacherId},
        as: 'teachers'
      },
      {
        model: models.Lecture,
        where: {id: lectureId},
        as: 'lectures'
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
  lectureId,
  teacherId
}) {
  try {
    await models.TeacherLecture.create({
      lectureId,
      teacherId
    })
    return await getById(parentValue, {teacherId, lectureId})
  } catch (err) {
    throw err;
  }
}

// Delete TeacherLecture
export async function remove(parentValue, {id}) {
  return await models.TeacherLecture.destroy({where: {id}})
}
