// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import HomeworkType from '../type'
import {getAll, getAllbyGroup, getById, getAllByStudent} from '../resolvers'

// Homeworks All
export const homeworks = {
  type: new GraphQLList(HomeworkType),
  resolve: getAll
}

// Homeworks by Student
export const homeworksByStudent = {
  type: new GraphQLList(HomeworkType),
  args: {
    studentId: {type: GraphQLInt}
  },
  resolve: getAllByStudent
}

// Homeworks by Group
export const homeworksByGroup = {
  type: new GraphQLList(HomeworkType),
  args: {
    groupId: {type: GraphQLInt}
  },
  resolve: getAllbyGroup
}

// Homework By ID
export const homework = {
  type: HomeworkType,
  args: {
    id: {type: GraphQLInt},
  },
  resolve: getById
}