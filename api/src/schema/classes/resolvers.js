// App Imports
import models from '../../models'

// Get classes by ID
export async function getById(parentValue, {id}) {
  return await models.Class.findOne({
    where: {id},
    include: [
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Group
      },
      {
        model: models.Student
      }
    ]
  })
}

// Get all classes
export async function getAll() {
  return await models.Class.findAll({
    order: [['classType', 'ASC'], ['year', 'ASC']], include: [
      {
        model: models.Teacher,
        where: {}
      },
      {
        model: models.Group,
        where: {},
        order: ['title', 'ASC']
      },
      {
        model: models.Student
      }
    ]
  })
}

// Create class
export async function create(parentValue, {
  classType,
  year,
  schedule,
  teacherId
}) {
  const classExists = await models.Class.findOne({where: {classType: classType, year: year}})
  if (classExists) {
    throw new Error('Class already exists');
  }
  return await models.Class.create({
    classType,
    year,
    schedule,
    teacherId
  })
}

// Create class
export async function update(parentValue, {
  id,
  classType,
  year,
  schedule,
  teacherId
}) {
  const oneClass = await models.Class.findOne({
    where: {id: id},
    include: [
      {
        model: models.Teacher
      }
      ]
  })
  if( (classType || year ) && (classType !== oneClass.classType || year !== oneClass.year)){
    const classExists = await models.Class.findOne({where: {classType: classType, year: year}})
    if (classExists) {
      throw new Error('Class already exists');
    } else {
        oneClass.classType = classType
        oneClass.year = year
    }
  }

  if (schedule) {
    oneClass.schedule = schedule
  }
  if (teacherId) {
    oneClass.teacherId = teacherId
  }

  oneClass.save();
  return oneClass;
}

// Delete class
export async function remove(parentValue, {id}) {
  return await models.Class.destroy({where: {id}})
}
