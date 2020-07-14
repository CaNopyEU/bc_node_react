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
      },
      {
        model: models.Homework,
        as: 'homeworks'
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
      },
      {
        model: models.Teacher,
        as: 'teachers'
      },
      {
        model: models.Lecture,
        as: 'lectures'
      },
      {
        model: models.Student,
        as: 'students'
      },
      {
        model: models.Homework,
        as: 'homeworks',
      }
    ]
  })
}


export async function getByTeacher(parentValue, {teacherId}) {
  return await models.Group.findAll({
    order: [['title', 'ASC']],
    include: [
      {
        model: models.Class,
        where: {}
      },
      {
        model: models.Teacher,
        as: 'teachers',
        where: {id: teacherId}
      },
      {
        model: models.Lecture,
        as: 'lectures'
      },
      {
        model: models.Student,
        as: 'students'
      },
      {
        model: models.Homework,
        as: 'homeworks'
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
      },
      {
        model: models.Teacher,
        as: 'teachers'
      },
      {
        model: models.Lecture,
        as: 'lectures'
      },
      {
        model: models.Student,
        as: 'students'
      },
      {
        model: models.Homework,
        as: 'homeworks'
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
export async function remove(parentValue, {classId, title}) {
  return await models.Group.destroy({where: {classId: classId, title: title}})
}
