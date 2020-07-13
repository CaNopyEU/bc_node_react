// Imports
import {GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean} from 'graphql'

// App Imports
import UserType from '../type'
import {create, remove, update, active} from '../resolvers'

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
    },
    active: {
      name: 'active',
      type: GraphQLBoolean
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
    },
    active: {
      name: 'active',
      type: GraphQLBoolean
    }
  },
  resolve: update
}

// User remove
export const activateUser = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: active
}