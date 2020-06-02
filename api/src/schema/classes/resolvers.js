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
      }
    ]
  })
}

// Get all classes
export async function getAll() {
  return await models.Class.findAll({
    order: [['year', 'ASC']], include: [
      {
        model: models.Teacher,
        where: {}
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
})
{
  return await models.Class.create({
    classType,
    year,
    schedule,
    teacherId
  })
}

// Delete class
export async function remove(parentValue, {id}) {
  return await models.Class.destroy({where: {id}})
}
