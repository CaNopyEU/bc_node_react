// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql'

// Thought type
const LectureType = new GraphQLObjectType({
    name: 'lecture',

    fields: () => ({
        lecture: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString}
    })
})

export default LectureType