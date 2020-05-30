// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import TeacherLectureType from "../teachers_lectures/type";
import GroupLectureType from "../groups_lectures/type";

// Lecture type
const LectureType = new GraphQLObjectType({
    name: 'lecture',

    fields: () => ({
        id: {type: GraphQLInt},
        lecture: {type: GraphQLString},
        lectureType: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        teachers: {type: TeacherLectureType},
        groups: {type: GroupLectureType}
    })
})

export default LectureType