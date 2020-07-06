// App Imports
import models from '../../models'

// Get Student by ID
export async function getById(parentValue, {id}) {
  return await models.Student.findOne({
    where: {id},
    include: [
      {
        model: models.User,
        where: {}
      },
      {
        model: models.Parent,
        where: {}
      },
      {
        model: models.Group,
        as: 'groups'
      }]
  })
}
// Get Student by user ID
export async function getByUserId(parentValue, {id}) {
  return await models.Student.findOne({
    where: {userId: id},
    include: [
      {
        model: models.Parent,
        where: {}
      },
      {
        model: models.Group,
        as: 'groups'
      }]
  })
}


// Get all students
export async function getAll() {
  return await models.Student.findAll({
    order: [['last_name', 'ASC']],
    include: [
      {
        model: models.User,
        where: {}
      },
      {
        model: models.Parent,
        where: {}
      },
      {
        model: models.Group,
        as: 'groups'
      }]
  })
}

// Create student
export async function create(parentValue, {
  first_name,
  last_name,
  city,
  street,
  street_num,
  dob,
  desc,
  userId,
  parentId,
  classId
}) {

  const Student = await models.Student.create({
    first_name,
    last_name,
    city,
    street,
    street_num,
    dob,
    desc,
    userId,
    parentId,
    classId
  })
  return Student;
}

// Delete student
export async function remove(parentValue, {id}) {
  return await models.Student.destroy({
    where: {id}
  })
}
