// Imports
import {GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'

// App Imports
import UserType from '../type'
import {create, remove, update} from '../resolvers'

// User create
export const createUser = {
  type: UserType,
  args: {
    username: {
      name: 'username',
      type: GraphQLString
    },
    password: {
      name: 'password',
      type: GraphQLString
    },
    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: create
}
// User update
export const updateUser = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    username: {
      name: 'username',
      type: GraphQLString
    },
    password: {
      name: 'password',
      type: GraphQLString
    },
    role: {
      name: 'role',
      type: GraphQLString
    }
  },
  resolve: update
}

// User remove
export const deleteUser = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}