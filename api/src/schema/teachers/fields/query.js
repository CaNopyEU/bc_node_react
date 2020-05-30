// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import {getAll, getById} from '../resolvers'
import TeacherType from "../type";

// Teachers all
export const teachers = {
  type: new GraphQLList(TeacherType),
  resolve: getAll
}

// Teacher by id
export const teacher = {
  type: TeacherType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}