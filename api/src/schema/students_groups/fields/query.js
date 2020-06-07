// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import TeacherLecture from '../type'
import {getAll, getById} from '../resolvers'

// TeacherLecture All
export const teacherLectures = {
  type: new GraphQLList(TeacherLecture),
  resolve: getAll
}

// TeacherLecture By ID
export const teacherLecture = {
  type: TeacherLecture,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}