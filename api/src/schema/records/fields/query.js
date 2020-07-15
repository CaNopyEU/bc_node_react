// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import RecordType from '../type'
import {getAll, getById, getAllByStudent} from '../resolvers'

// Records All
export const records = {
  type: new GraphQLList(RecordType),
  resolve: getAll
}

// Record By ID
export const record = {
  type: RecordType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}

// Records All
export const recordsByStudent = {
  type: new GraphQLList(RecordType),
  args: {
    studentId: {type: GraphQLInt}
  },
  resolve: getAllByStudent
}