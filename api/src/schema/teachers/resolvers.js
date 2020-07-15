// App Imports
import models from '../../models'

// Get Teacher by ID
export async function getById(parentValue, {id}) {
  return await models.Teacher.findOne({
    where: {id},
    include: [{
      model: models.User,
      where: {}
    },
      {
        model: models.Lecture,
        as: 'lectures'
      },
      {
        model: models.Group,
        as: 'groups'
      },
      {
        model: models.Class
      }]
  })
}

// Get Teacher by user ID
export async function getByUserId(parentValue, {id}) {
  return await models.Teacher.findOne({
    where: {userId: id},
    include: [
      {
        model: models.User,
        where: {}
      },
      {
        model: models.Lecture,
        as: 'lectures'
      },
      {
        model: models.Group,
        as: 'groups'
      },
      {
        model: models.Class
      }
    ]
  })
}

// Get all users
export async function getAll() {
  return await models.Teacher.findAll({
    order: [['last_name', 'ASC']],
    include: [
      {
        model: models.User,
        where: {}
      },
      {
        model: models.Group,
        as: 'groups'
      },
      {
        model: models.Lecture,
        as: 'lectures'
      },
      {
        model: models.Class
      }]
  })
}

// Get all teachers with class
export async function getAllwithClass() {
  const Teachers = await models.Teacher.findAll({
    order: [['last_name', 'ASC']],
    where: {main_teacher: true},
    include: [{
      model: models.Class,
      required: false,
    }]
  })
  return Teachers
}

// Create users
export async function create(parentValue, {
  first_name,
  last_name,
  title_before,
  title_after,
  email,
  city,
  street,
  street_num,
  phone,
  dob,
  main_teacher,
  userId
}) {
  try {
    first_name = first_name.trim();
    last_name = last_name.trim();
    const Teacher = await models.Teacher.create({
      first_name,
      last_name,
      title_before,
      title_after,
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

// Update users
export async function update(parentValue, {
  id,
  first_name,
  last_name,
  title_before,
  title_after,
  email,
  city,
  street,
  street_num,
  phone,
  dob,
  main_teacher
}) {
  try {
    const Teacher = await models.Teacher.findOne({where: {id: id}})
    if (first_name) {
      first_name = first_name.trim();
      Teacher.first_name = first_name;
    }
    if (last_name) {
      last_name = last_name.trim();
      Teacher.last_name = last_name;
    }
    if (title_before) {
      Teacher.title_before = title_before;
    }
    if (title_after) {
      Teacher.title_after = title_after;
    }
    if (email) {
      Teacher.email = email;
    }
    if (city) {
      Teacher.city = city;
    }
    if (street) {
      Teacher.street = street;
    }
    if (street_num) {
      Teacher.street_num = street_num;
    }
    if (phone) {
      Teacher.phone = phone;
    }
    if (dob) {
      Teacher.dob = dob;
    }
    if (main_teacher || main_teacher === false) {
      Teacher.main_teacher = main_teacher;
    }
    await Teacher.save();
    return Teacher;
  } catch (err) {
    throw err;
  }


}

// Delete users
export async function remove(parentValue, {id}) {
  return await models.Teacher.destroy({where: {id}})
}
