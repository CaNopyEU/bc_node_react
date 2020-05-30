// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import LectureType from '../type'
import {getAll, getById} from '../resolvers'

// Lectures All
export const lectures = {
  type: new GraphQLList(LectureType),
  resolve: getAll
}

// Lecture By ID
export const lecture = {
  type: LectureType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}