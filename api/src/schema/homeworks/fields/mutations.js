// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import HomeworkType from '../type'
import {create, remove} from '../resolvers'

// Homework create
export const homeworkCreate = {
  type: HomeworkType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },
    desc: {
      name: 'desc',
      type: GraphQLString
    },
    deadline: {
      name: 'deadline',
      type: GraphQLString
    },
    groupId: {
      name: 'groupId',
      type: GraphQLInt
    },
    teacherId: {
      name: 'teacherId',
      type: GraphQLInt
    },
    lectureId: {
      name: 'lectureId',
      type: GraphQLInt
    }
  },
  resolve: create
}

// Homework remove
export const homeworkRemove = {
  type: HomeworkType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}