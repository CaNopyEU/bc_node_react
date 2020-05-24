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
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    email: {type: GraphQLString},
    role: {type: GraphQLString},
    city: {type: GraphQLString},
    street: {type: GraphQLString},
    street_num: {type: GraphQLFloat},
    phone: {type: GraphQLFloat},
    date: {type: GraphQLString},
    class: {type: ClassType}
  })
})

export default UserType