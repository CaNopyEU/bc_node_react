// App Imports
import models from '../../models'

// Get Grade by ID
export async function getById(parentValue, {id}) {
  return await models.Grade.findOne({
    where: {id}, include: [
      {
        model: models.Lecture,
        where: {}
      },
      {
        model: models.Student,
        where: {}
      },
      {
        model: models.Teacher,
        where: {}
      }
    ]
  })
}

// Get all grade
export async function getAll() {
  return await models.Grade.findAll({
    order: [['date', 'DESC']], include: [
      {
        model: models.Lecture,
        where: {}
      },
      {
        model: models.Student,
        where: {}
      },
      {
        model: models.Teacher,
        where: {}
      }
    ]
  })
}

// Create grade
export async function create(parentValue, {
  grade,
  teacherId,
  studentId,
  lectureId,
  date
}) {
  return await models.Grade.create({
    grade,
    teacherId,
    studentId,
    lectureId,
    date
  })
}

// Delete grade
export async function remove(parentValue, {id}) {
  return await models.Grade.destroy({where: {id}})
}
