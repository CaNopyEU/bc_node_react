// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import RecordType from '../type'
import {create, remove, update} from '../resolvers'

// Record create
export const createRecord = {
  type: RecordType,
  args: {
    desc: {
      name: 'lecture',
      type: GraphQLString
    },
    date: {
      name: 'date',
      type: GraphQLString
    },
    teacherId: {
      name: 'teacherId',
      type: GraphQLInt
    },
    studentId: {
      name: 'studentId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Record create
export const updateRecord = {
  type: RecordType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    desc: {
      name: 'lecture',
      type: GraphQLString
    },
    date: {
      name: 'date',
      type: GraphQLString
    }
  },
  resolve: update
}

// Record remove
export const deleteRecord = {
  type: RecordType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}