// App Imports
import models from '../../models'
import DataLoader from "dataloader";

// Get Group by ID
export async function getById(parentValue, {id}) {
  const groups = await models.Group.findOne({
    where: {id},
    include: [
      {
        model: models.Lecture,
        as: 'lectures'
      },
      {
        model: models.Teacher,
        as: 'teachers'
      },
      {
        model: models.Student,
        as: 'students'
      },
      {
        model: models.Class
      }
    ]
  })
  return groups;
}

export async function getByClassId(parentValue, {classId}) {
  return await models.Group.findAll({
    where: {classId: classId},
    order: [['title', 'ASC']],
    include: [
      {
        model: models.Class,
        where: {}
      }
    ]
  })
}

// Get all Groups
export async function getAll() {
  return await models.Group.findAll({
    order: [['createdAt', 'DESC']], include: [
      {
        model: models.Class,
        where: {}
      }
    ]
  })
}

// Create grade
export async function create(parentValue, {
  title,
  classId
}) {
  const groupExists = await models.Group.findOne({where: {title: title, classId: classId}})
  if (groupExists) {
    throw new Error('Group already exists');
  }
  return await models.Group.create({
    title,
    classId
  })
}

// Delete group
export async function remove(parentValue, {id}) {
  return await models.Group.destroy({where: {id}})
}
