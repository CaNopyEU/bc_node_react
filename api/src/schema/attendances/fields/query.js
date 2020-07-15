// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import AttendanceType from '../type'
import {getAll, getById, getAllByStudent} from '../resolvers'

// Attendances All
export const attendances = {
  type: new GraphQLList(AttendanceType),
  resolve: getAll
}

// Attendances by userId
export const attendancesByStudent = {
  type: new GraphQLList(AttendanceType),
  args: {
    studentId: {type: GraphQLInt}
  },
  resolve: getAllByStudent
}

// Attendance By ID
export const attendance = {
  type: AttendanceType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}