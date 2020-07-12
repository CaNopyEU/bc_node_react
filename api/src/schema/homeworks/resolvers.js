// App Imports
import models from '../../models'

// Get Homework by ID
export async function getById(parentValue, {id}) {
  return await models.Homework.findOne({
    where: {id},
    include: [
      {
        model: models.Group,
        where: {}
      },
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Lecture,
        where: {}
      }
    ]
  })

}

// Get all homeworks
export async function getAll() {
  return await models.Homework.findAll({
    order: [['deadline', 'DESC']], include: [
      {
        model: models.Group
      },
      {
        model: models.Teacher
      },
      {
        model: models.Lecture
      }
    ]
  })
}

// Create Homework
export async function create(parentValue, {
  name,
  desc,
  deadline,
  groupId,
  teacherId,
  lectureId
}) {
  return await models.Homework.create({
    name,
    desc,
    deadline,
    groupId,
    teacherId,
    lectureId
  })
}

// Update Homework
export async function update(parentValue, {
  id,
  name,
  desc,
  deadline,
  lectureId
}) {
  const Homework = await models.Homework.findOne({
    where: {id: id},
    include: [{
      model: models.Lecture
    }]
  });
  if (name) {
    Homework.name = name;
  }
  if (desc) {
    Homework.desc = desc;
  }
  if (deadline) {
    Homework.deadline = deadline;
  }
  if (lectureId) {
    Homework.lectureId = lectureId;
  }
  await Homework.save();
  return Homework
}

// Delete homework
export async function remove(parentValue, {id}) {
  return await models.Homework.destroy({where: {id}})
}
