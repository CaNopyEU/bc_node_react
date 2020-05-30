// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import {getAll, getById} from '../resolvers'
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