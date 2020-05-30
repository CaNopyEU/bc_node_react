// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import ClassType from "../classes/type";

// User type
const UserType = new GraphQLObjectType({
  name: 'user',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    username: {type: GraphQLString},
    password: {type: GraphQLString},
    role: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default UserType