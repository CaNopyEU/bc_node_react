// App Imports
import models from '../../models'

// Get Parent by ID
export async function getById(parentValue, {id}) {
  return await models.Parent.findOne({where: {id}})
}

//Get Parent by Email
export async function getByEmail(perentValue, {email}) {
  return await models.Parent.findOne({where: {email}})
}
// Get all parents
export async function getAll() {
  return await models.Parent.findAll({order: [['last_name', 'ASC']]})
}

// Create parent
export async function create(parentValue, {
  first_name,
  last_name,
  email,
  dob,
  phone,
  title_before,
  title_after
}) {
  try {
    const Parent = await models.Parent.create({
      first_name,
      last_name,
      email,
      dob,
      phone,
      title_before,
      title_after
    })
    return Parent;
  } catch (err) {
    throw err;
  }


}

// Delete parent
export async function remove(parentValue, {id}) {
  return await models.Parent.destroy({where: {id}})
}
