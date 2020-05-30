// Imports
import {GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'

// App Imports
import ParentType from '../type'
import {create, remove} from '../resolvers'

// Parent create
export const createParent = {
  type: ParentType,
  args: {
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
    dob: {
      name: 'dob',
      type: GraphQLString
    },
    phone: {
      name: 'phone',
      type: GraphQLFloat
    },
  },
  resolve: create
}

// Parent remove
export const deleteParent = {
  type: ParentType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}