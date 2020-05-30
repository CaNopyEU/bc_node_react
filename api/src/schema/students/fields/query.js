// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import {getAll, getById} from '../resolvers'
import StudentType from "../type";

// Students All
export const students = {
  type: new GraphQLList(StudentType),
  resolve: getAll
}

// Student By ID
export const student = {
  type: StudentType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}