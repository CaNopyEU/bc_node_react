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
        model: models.Parent
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
        model: models.Parent
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

// Update student
export async function update(parentValue, {
  id,
  first_name,
  last_name,
  city,
  street,
  street_num,
  dob,
  desc,
  parentId,
  classId
}) {

  const Student = await models.Student.findOne({
    where: {id: id},
    include: [
      {
        model: models.User,
        where: {}
      },
      {
        model: models.Parent
      },
      {
        model: models.Group,
        as: 'groups'
      }]
  });
  if (first_name) {
    Student.first_name = first_name;
  }
  if (last_name) {
    Student.last_name = last_name;
  }
  if (city) {
    Student.city = city;
  }
  if (street) {
    Student.street = street;
  }
  if (street_num) {
    Student.street_num = street_num;
  }
  if (dob) {
    Student.dob = dob;
  }
  if (desc) {
    Student.desc = desc;
  }
  if (parentId) {
    Student.parentId = parentId;
  }
  if (classId && classId !== Student.classId) {
    const oldGroup = await models.Group.findOne({ where: {title: 1, classId: Student.classId}});
    await models.StudentGroup.destroy({where: {studentId: id, groupId: oldGroup.id}});
    const newGroup = await models.Group.findOne({where: {classId: classId, title: 1}})
    await models.StudentGroup.create({
      groupId: newGroup.id,
      studentId: Student.id
    })
    Student.classId = classId
  }
  await Student.save();
  return Student;
}

// Delete student
export async function remove(parentValue, {id}) {
  return await models.Student.destroy({
    where: {id}
  })
}
