// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import LectureType from '../type'
import {getAll, getById, getAllByStudent} from '../resolvers'

// Lectures All
export const lectures = {
  type: new GraphQLList(LectureType),
  resolve: getAll
}

// Lectures All
export const lecturesByStudent = {
  type: new GraphQLList(LectureType),
  args: {
    studentId: {type: GraphQLInt}
  },
  resolve: getAllByStudent
}

// Lecture By ID
export const lecture = {
  type: LectureType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}