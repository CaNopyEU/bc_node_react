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
  console.log(username)
  console.log(password)
  console.log(role)
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
  const token = jwt.sign({
      userId: user.id,
      role: user.role
    },
    'someSuperSacretKey',
    {
      expiresIn: '1h'
    }
  )
  return {userId: user.id, role: user.role, token: token, tokenExpiration: 1}
}


// Delete users
export async function remove(parentValue, {id}) {
  return await models.User.destroy({where: {id}})
}
