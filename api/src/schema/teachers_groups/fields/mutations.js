// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import TeacherGroupType from '../type'
import {create, remove} from '../resolvers'

// TeacherLecture create
export const createTeacherGroup = {
    type: TeacherGroupType,
    args: {
        groupId: {
            name: 'groupId',
            type: GraphQLInt
        },
        teacherId: {
            name: 'teacherId',
            type: GraphQLInt
        }
    },
    resolve: create
}

// TeacherLecture remove
export const deleteTeacherLecture = {
    type: TeacherGroupType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}