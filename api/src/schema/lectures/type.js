// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList} from 'graphql'
import GroupType from "../groups/type";
import TeacherType from "../teachers/type";

// Lecture type
const LectureType = new GraphQLObjectType({
    name: 'lecture',

    fields: () => ({
        id: {type: GraphQLInt},
        lecture: {type: GraphQLString},
        lectureType: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
        teachers: {type:  new GraphQLList(TeacherType)},
        groups: {type: new GraphQLList(GroupType)}
    })
})

export default LectureType