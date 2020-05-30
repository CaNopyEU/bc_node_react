// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import AttendanceType from '../type'
import {getAll, getById} from '../resolvers'

// Attendances All
export const attendances = {
  type: new GraphQLList(AttendanceType),
  resolve: getAll
}

// Attendance By ID
export const attendance = {
  type: AttendanceType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}