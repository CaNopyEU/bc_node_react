// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import GradeType from '../type'
import {create, remove} from '../resolvers'

// Grade create
export const gradeCreate = {
  type: GradeType,
  args: {
    grade: {
      name: 'grade',
      type: GraphQLInt
    },

    teacherId: {
      name: 'teacherId',
      type: GraphQLInt
    },

    studentId: {
      name: 'studentId',
      type: GraphQLInt
    },

    lectureId: {
      name: 'lectureId',
      type: GraphQLInt
    },

    date: {
      name: 'date',
      type: GraphQLString
    }
  },
  resolve: create
}

// Grade remove
export const gradeRemove = {
  type: GradeType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}