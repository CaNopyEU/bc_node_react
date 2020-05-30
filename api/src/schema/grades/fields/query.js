// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import GradeType from '../type'
import {getAll, getById} from '../resolvers'

// Grade All
export const grades = {
  type: new GraphQLList(GradeType),
  resolve: getAll
}

// Grade By ID
export const grade = {
  type: GradeType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}