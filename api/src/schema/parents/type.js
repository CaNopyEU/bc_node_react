// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean} from 'graphql'


// Teacher type
const ParentType = new GraphQLObjectType({
  name: 'parent',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    email: {type: GraphQLString},
    dob: {type: GraphQLString},
    phone: {type: GraphQLFloat},
    title_before: {type: GraphQLString},
    title_after: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default ParentType