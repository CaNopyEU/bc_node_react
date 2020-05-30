// App Imports
import models from '../../models'
import bcrypt from 'bcrypt';

// Get User by ID
export async function getById(parentValue, {id}, {teacherId}) {
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

// Delete users
export async function remove(parentValue, {id}) {
  return await models.User.destroy({where: {id}})
}
