// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import ClassType from '../type'
import {create, remove} from '../resolvers'

// Thought create
export const classCreate = {
  type: ClassType,
  args: {
    classType: {
      name: 'classType',
      type: GraphQLString
    },

    year: {
      name: 'year',
      type: GraphQLInt
    },

    schedule: {
      name: 'schedule',
      type: GraphQLString
    }
  },
  resolve: create
}

// Thought remove
export const classRemove = {
  type: ClassType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}