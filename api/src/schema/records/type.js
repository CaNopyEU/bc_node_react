// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import TeacherType from "../teachers/type";
import StudentType from "../students/type";

// Thought type
const RecordType = new GraphQLObjectType({
    name: 'record',

    fields: () => ({
        id: {type: GraphQLInt},
        desc: {type: GraphQLString},
        date: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        teacher: {type: TeacherType},
        student: {type: StudentType}
    })
})

export default RecordType