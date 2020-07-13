// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean} from 'graphql'

// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    username: {type: GraphQLString},
    password: {type: GraphQLString},
    role: {type: GraphQLString},
    active: {type: GraphQLBoolean},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default UserType