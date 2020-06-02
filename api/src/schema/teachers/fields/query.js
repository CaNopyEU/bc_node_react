// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import {getAll, getAllwithClass, getById, getByUserId} from '../resolvers'
import TeacherType from "../type";

// Teachers all
export const teachers = {
  type: new GraphQLList(TeacherType),
  resolve: getAll
}

// Teachers all
export const teachersWith = {
  type: new GraphQLList(TeacherType),
  resolve: getAllwithClass
}

// Teacher by id
export const teacher = {
  type: TeacherType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}

// Teacher by userId
export const teacherByUser = {
  type: TeacherType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getByUserId
}