// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import ClassType from '../type'
import {create, remove, update} from '../resolvers'

// Class create
export const createClass = {
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
    },
    teacherId: {
      name: 'teacherId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Class update
export const updateClass = {
  type: ClassType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
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
    },
    teacherId: {
      name: 'teacherId',
      type: GraphQLInt
    }
  },
  resolve: update
}

// Class remove
export const deleteClass = {
  type: ClassType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}