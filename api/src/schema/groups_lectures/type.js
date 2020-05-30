// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import LectureType from "../lectures/type";
import GroupType from "../groups/type";

// GroupLectureType type
const GroupLectureType = new GraphQLObjectType({
    name: 'group_lecture',

    fields: () => ({
        lecture: {type: LectureType},
        group: {type: GroupType},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    })
})

export default GroupLectureType