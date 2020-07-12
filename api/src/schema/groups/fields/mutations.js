// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import GroupType from '../type'
import {create, remove} from '../resolvers'

// Grade create
export const createGroup = {
  type: GroupType,
  args: {
    title: {
      name: 'title',
      type: GraphQLInt
    },
    classId: {
      name: 'classId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Group remove
export const deleteGroup = {
  type: GroupType,
  args: {
    classId: {
      name: 'classId',
      type: GraphQLInt
    },
    title: {
      name: 'title',
      type: GraphQLInt
    }
  },
  resolve: remove
}