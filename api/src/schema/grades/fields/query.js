// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import GradeType from '../type'
import {getAll, getAllByStudent, getById} from '../resolvers'

// Grade All
export const grades = {
  type: new GraphQLList(GradeType),
  resolve: getAll
}

// Grades All by studen/lecture
export const gradesByStudLec = {
  type: new GraphQLList(GradeType),
  args: {
    studentId: {type: GraphQLInt},
    lectureId: {type: GraphQLInt}
  },
  resolve: getAllByStudent
}

// Grade By ID
export const grade = {
  type: GradeType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}