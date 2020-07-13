// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import GroupLectureType from '../type'
import {create, remove} from '../resolvers'

// GroupLecture create
export const createGroupLecture = {
    type: GroupLectureType,
    args: {
        lectureId: {
            name: 'lectureId',
            type: GraphQLInt
        },
        groupId: {
            name: 'groupId',
            type: GraphQLInt
        }
    },
    resolve: create
}

// GroupLecture remove
export const deleteGroupLecture = {
    type: GroupLectureType,
    args: {
        groupId: {
            name: 'groupId',
            type: GraphQLInt
        },
        lectureId: {
            name: 'lectureId',
            type: GraphQLInt
        }
    },
    resolve: remove
}