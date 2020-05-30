// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import TeacherType from "../teachers/type";
import StudentType from "../students/type";

// Attendant type
const AttendanceType = new GraphQLObjectType({
    name: 'attendance',

    fields: () => ({
        id: {type: GraphQLInt},
        desc: {type: GraphQLString},
        date: {type: GraphQLString},
        pardon: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        teacher: {type: TeacherType},
        student: {type: StudentType}
    })
})

export default AttendanceType