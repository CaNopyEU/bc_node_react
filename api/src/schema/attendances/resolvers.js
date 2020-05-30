// App Imports
import models from '../../models'

// Get Attendance by ID
export async function getById(parentValue, {id}) {
  return await models.Attendance.findOne({
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

// Get all Attendances
export async function getAll() {
  return await models.Attendance.findAll({
    order: [['date', 'DESC']],
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

// Create Attendance
export async function create(parentValue, {
  desc,
  date,
  pardon,
  teacherId,
  studentId
}) {
  return await models.Attendance.create({
      desc,
      date,
      pardon,
      teacherId,
      studentId
  })
}

// Delete Attendance
export async function remove(parentValue, {id}) {
  return await models.Attendance.destroy({where: {id}})
}
