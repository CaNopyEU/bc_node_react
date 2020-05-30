// App Imports
import models from '../../models'

// Get Group by ID
export async function getById(parentValue, {id}) {
  return await models.Group.findOne({
    where: {id},
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

  return await models.Group.create({
    title,
    classId
  })
}

// Delete group
export async function remove(parentValue, {id}) {
  return await models.Group.destroy({where: {id}})
}
