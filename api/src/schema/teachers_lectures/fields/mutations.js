// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import TeacherLectureType from '../type'
import {create, remove} from '../resolvers'

// TeacherLecture create
export const createTeacherLecture = {
    type: TeacherLectureType,
    args: {
        lectureId: {
            name: 'lectureId',
            type: GraphQLInt
        },
        groupId: {
            name: 'teacherId',
            type: GraphQLInt
        }
    },
    resolve: create
}

// TeacherLecture remove
export const deleteTeacherLecture = {
    type: TeacherLectureType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}