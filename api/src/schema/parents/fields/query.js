// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import ParentType from '../type'
import {getAll, getById} from '../resolvers'

// Parent All
export const parents = {
  type: new GraphQLList(ParentType),
  resolve: getAll
}

// Parent By ID
export const parent = {
  type: ParentType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}