// App Imports
import models from '../../models'

// Get Teacher by ID
export async function getById(parentValue, {id}) {
  return await models.Teacher.findOne({
    where: {id},
    include: [{
      model: models.User,
      where: {}
    }]
  })
}

// Get Teacher by user ID
export async function getByUserId(parentValue, {id}) {
  return await models.Teacher.findOne({
    where: {userId: id},
    include: [{
      model: models.User,
      where: {}
    }]
  })
}

// Get all users
export async function getAll() {
  return await models.Teacher.findAll({
    order: [['last_name', 'ASC']],
    include: [{
      model: models.User,
      where: {}
    }]
  })
}

// Get all teachers with class
export async function getAllwithClass() {
  return await models.Teacher.findAll({
    order: [['last_name', 'ASC']],
    where: {main_teacher : true}
  })
}

// Create users
export async function create(parentValue, {
  first_name,
  last_name,
  email,
  city,
  street,
  street_num,
  phone,
  dob,
  main_teacher,
  userId
}) {
  console.log(first_name)
  console.log(last_name)
  console.log(email)
  console.log(city)
  console.log(street)
  console.log(street_num)
  console.log(phone)
  console.log(dob)
  console.log(main_teacher)
  console.log(userId)
  try {
    const Teacher = await models.Teacher.create({
      first_name,
      last_name,
      email,
      city,
      street,
      street_num,
      phone,
      dob,
      main_teacher,
      userId
    })
    return Teacher;
  } catch (err) {
    throw err;
  }


}

// Delete users
export async function remove(parentValue, {id}) {
  return await models.Teacher.destroy({where: {id}})
}
