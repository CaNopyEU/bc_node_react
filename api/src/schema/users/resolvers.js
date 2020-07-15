// App Imports
import models from '../../models'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// Get User by ID
export async function getById(parentValue, {id}) {
  return await models.User.findOne({where: {id}})
}

// Get all users
export async function getAll() {
  return await models.User.findAll({
    order: [['createdAt', 'DESC']],
  })
}

// Create users
export async function create(parentValue, {
  username,
  password,
  role
}) {
  username = username.trim();
  password = password.trim();
  try {
    if (password.length < 5) {
      throw new Error('Heslo musí byť v rozmedzí 5 až 20 znakov');
    }
    const existingUser = await models.User.findOne({where: {username: username}})
    if (existingUser) {
      throw new Error('User exists already.');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const user = await models.User.create({
      username,
      password: hashedPassword,
      role
    })
    return user;
  } catch (err) {
    throw err;
  }
}
// Create users
export async function update(parentValue, {
  id,
  username,
  password,
  role
}) {
  try {
    const thisUser = await models.User.findOne({where: {id: id}});
    if (username) {
      username = username.trim();
      thisUser.username = username
    }
    if (password) {
      password = password.trim();
      thisUser.password = await bcrypt.hash(password, 12);
    }
    thisUser.role = role
    await thisUser.save();
    return thisUser;
  } catch (err) {
    throw err;
  }
}

//login user
export async function logUser(parentValue, {username, password}) {
  const user = await models.User.findOne({where:{username: username}})
  if (!user) {
    throw new Error('User does not exist!')
  }
  const isEqual = await bcrypt.compare(password, user.password)
  if (!isEqual) {
    throw new Error('Password is incorrect!')
  }
  if (user.active === false) {
    throw new Error('Ucet bol zablokovany')
  }
  let myId = 9999;
  let mTeacher = false;
  if (user.role === 'teacher') {
    const Teacher = await models.Teacher.findOne({where:{ userId: user.id} })
        myId = Teacher.id;
        mTeacher = Teacher.main_teacher;
    console.log('this is Teacher loging in', mTeacher)
  } else if (user.role === 'student') {
    const Student  = await models.Student.findOne({ where: {userId: user.id}})
        myId = Student.id
  }

  const token = jwt.sign({
      userId: user.id,
      role: user.role,
      myId: myId,
      mTeacher: mTeacher,
    },
    'someSuperSacretKey',
    {
      expiresIn: '1h'
    }
  )
  return {userId: user.id, role: user.role, myId: myId, mTeacher: mTeacher, token: token, tokenExpiration: 1}
}

export async function active(parentValue, {id}) {
  const user = await models.User.findOne({where:{id: id}})
  user.active = !user.active;
  user.save()
  return user
}

// Delete users
export async function remove(parentValue, {id}) {
  return await models.User.destroy({where: {id}})
}
