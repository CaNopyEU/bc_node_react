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

// Get all Attendances
export async function getAllByStudent(parentValue, {
  studentId
}) {
  return await models.Attendance.findAll({
    order: [['date', 'DESC']],
    include: [
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Student,
        where: {id: studentId}
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

// Update Attendance
export async function update(parentValue, {
  id,
  desc,
  date,
  pardon
}) {
  const Attendance = await models.Attendance.findOne({where: {id: id}})
  if (desc) {
    Attendance.desc = desc
  }
  if (date) {
    Attendance.date = date
  }
  if (pardon || pardon === false) {
    Attendance.pardon = pardon;
  }
  Attendance.save()
  return Attendance;
}

export async function active(parentValue, {id}) {
  const Attendance = await models.Attendance.findOne({where:{id: id}})
  Attendance.pardon = !Attendance.pardon;
  Attendance.save()
  return Attendance
}

// Delete Attendance
export async function remove(parentValue, {id}) {
  return await models.Attendance.destroy({where: {id}})
}
