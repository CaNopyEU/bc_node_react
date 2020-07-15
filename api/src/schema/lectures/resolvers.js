// App Imports
import models from '../../models'

// Get lecture by ID
export async function getById(parentValue, {id}) {
  const lectures = await models.Lecture.findOne({
    where: {id},
    include: [
      {
        model: models.Group,
        as: 'groups'
      },
      {
        model: models.Teacher,
        as: 'teachers'
      }
    ]
  })
  return lectures;
}

// Get all lectures
export async function getAll() {
  return await models.Lecture.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: models.Teacher,
        as: 'teachers'
      },
      {
        model: models.Group,
        as: 'groups'
      }
    ]
  })
}

// Get all lectures
export async function getAllByStudent(parentValue, {studentId}) {
  return await models.Lecture.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: models.Teacher,
        as: 'teachers'
      },
      {
        model: models.Group,
        where: {},
        as: 'groups',
        include : [
          {
            model: models.Student,
            as: 'students',
            where: {id: studentId}
          }
        ]
      },
    ]
  })
}

// Create leacture
export async function create(parentValue, {
  lecture, lectureType
}) {

  return await models.Lecture.create({lecture, lectureType})
}

export async function update(parentValue, {
  id, lecture, lectureType
}) {
  const thisLecture = await models.Lecture.findOne({where: {id: id}});
  if (lecture) {
    thisLecture.lecture = lecture;
  }
  if (lectureType || lectureType === false) {
    thisLecture.lectureType = lectureType;
  }
  await thisLecture.save()
  return thisLecture;
}

// Delete lecture
export async function remove(parentValue, {id}) {
  return await models.Lecture.destroy({where: {id}})
}
