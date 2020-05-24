// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql'

// Thought type
const ClassType = new GraphQLObjectType({
  name: 'Class',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    classType: {type: GraphQLString},
    year: {type: GraphQLInt},
    schedule: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString}
  })
})

export default ClassType