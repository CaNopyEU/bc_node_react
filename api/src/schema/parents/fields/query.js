// Imports
import {GraphQLInt, GraphQLList, GraphQLString} from 'graphql'

// App Imports
import ParentType from '../type'
import {getAll, getByEmail, getById} from '../resolvers'

// Parent All
export const parents = {
  type: new GraphQLList(ParentType),
  resolve: getAll
}

//Parent by email
export const parentByEmail = {
  type: ParentType,
  args: {
    email: {type: GraphQLString}
  },
  resolve: getByEmail
}

// Parent By ID
export const parent = {
  type: ParentType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}