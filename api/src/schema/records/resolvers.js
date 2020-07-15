// App Imports
import models from '../../models'

// Get record by ID
export async function getById(parentValue, {id}) {
  return await models.Record.findOne({
    where: {id},
    include: [
      {
        model: models.Teacher,
      },
      {
        model: models.Student,
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
        model: models.Teacher
      },
      {
        model: models.Student
      }
    ]
  })
}

export async function getAllByStudent(parentValue, {studentId}) {
  return await models.Record.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: models.Teacher
      },
      {
        model: models.Student,
        where: {id: studentId}
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

// Update record
export async function update(parentValue, {
  id,
  desc,
  date,
}) {
  const Record = await models.Record.findOne({where: {id: id},
  include: [
    {
      model: models.Teacher
    },
    {
      model: models.Student
    }
  ]})

  if (desc) {
    Record.desc = desc;
  }
  if (date) {
    Record.desc = date;
  }
  await Record.save();
  return Record;
}

// Delete record
export async function remove(parentValue, {id}) {
  return await models.Record.destroy({where: {id}})
}
