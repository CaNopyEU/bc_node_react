// Imports
import {GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'

// App Imports
import UserType from '../type'
import {create, remove} from '../resolvers'

// User create
export const userCreate = {
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
    first_name: {
      name: 'first_name',
      type: GraphQLString
    },
    last_name: {
      name: 'last_name',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    },
    role: {
      name: 'role',
      type: GraphQLString
    },
    city: {
      name: 'city',
      type: GraphQLString
    },
    street: {
      name: 'street',
      type: GraphQLString
    },
    street_num: {
      name: 'street_num',
      type: GraphQLFloat
    },
    phone: {
      name: 'phone',
      type: GraphQLFloat
    },
    date: {
      name: 'date',
      type: GraphQLString
    },
    classId: {
      name: 'classId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// User remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}