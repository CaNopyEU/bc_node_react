// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import GradeType from '../type'
import {getAll, getById} from '../resolvers'

// Thoughts All
export const grades = {
  type: new GraphQLList(GradeType),
  resolve: getAll
}

// Thought By ID
export const grade = {
  type: GradeType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}