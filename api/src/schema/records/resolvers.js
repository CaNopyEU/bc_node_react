// App Imports
import models from '../../models'

// Get record by ID
export async function getById(parentValue, {id}) {
  return await models.Record.findOne({
    where: {id},
    include: [
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Student,
        where: {}
      }
    ]
  })
}

// Get all record
export async function getAll() {
  return await models.Record.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Student,
        where: {}
      }
    ]
  })
}

// Create record
export async function create(parentValue, {
  desc,
  date,
  teacherId,
  studentId
}) {
  return await models.Record.create({
    desc,
    date,
    teacherId,
    studentId
  })
}

// Delete record
export async function remove(parentValue, {id}) {
  return await models.Record.destroy({where: {id}})
}
