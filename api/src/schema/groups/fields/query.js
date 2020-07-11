// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import {getAll, getByClassId, getById, getByTeacher} from '../resolvers'
import GroupType from "../type";

// Group All
export const groups = {
  type: new GraphQLList(GroupType),
  resolve: getAll
}

// Group By ID
export const group = {
  type: GroupType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}


// Groups By class ID
export const groupsByClass = {
  type: new GraphQLList(GroupType),
  args: {
    classId: {type: GraphQLInt}
  },
  resolve: getByClassId
}

// Groups By class ID
export const groupsByTeacher = {
  type: new GraphQLList(GroupType),
  args: {
    teacherId: {type: GraphQLInt}
  },
  resolve: getByTeacher
}