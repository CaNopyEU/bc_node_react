// Imports
import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql'

// App Imports
import UserType from '../type'
import {getAll, getById, logUser} from '../resolvers'

// Users All
export const users = {
  type: new GraphQLList(UserType),
  resolve: getAll
}

// User By ID
export const user = {
  type: UserType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}
//login user
export const login = {
  type: new GraphQLObjectType({
    name: 'token',
    fields: () => ({
      userId: {
        name: 'userId',
        type: GraphQLInt
      },
      role: {
        name: 'role',
        type: GraphQLString
      },
      token : {
        name: 'token',
        type: GraphQLString
      },
      tokenExpiration: {
        name: 'tokenExpiration',
        type: GraphQLInt
      }
    })
  }),
  args: {
    username: {type: GraphQLString},
    password: {type: GraphQLString}
  },
  resolve: logUser
}