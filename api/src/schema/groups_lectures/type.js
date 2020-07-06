// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import LectureType from "../lectures/type";
import GroupType from "../groups/type";

// GroupLectureType type
const GroupLectureType = new GraphQLObjectType({
    name: 'group_lecture',

    fields: () => ({
        groups: {type: GroupType},
        lectures: {type: LectureType},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    })
})

export default GroupLectureType