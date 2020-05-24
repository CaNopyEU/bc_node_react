// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import ClassType from '../type'
import {getAll, getById} from '../resolvers'

// Classes All
export const classes = {
  type: new GraphQLList(ClassType),
  resolve: getAll
}

// Class By ID
export const oneClass = {
  type: ClassType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}