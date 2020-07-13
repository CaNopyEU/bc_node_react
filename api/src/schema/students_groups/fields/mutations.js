// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import StudentGroupType from '../type'
import {create, remove} from '../resolvers'

// TeacherLecture create
export const createStudentGroup = {
    type: StudentGroupType,
    args: {
        groupId: {
            name: 'groupId',
            type: GraphQLInt
        },
        studentId: {
            name: 'studentId',
            type: GraphQLInt
        }
    },
    resolve: create
}

// TeacherLecture remove
export const deleteStudentGroup = {
    type: StudentGroupType,
    args: {
        studentId: {
            name: 'studentId',
            type: GraphQLInt
        },
        groupId: {
            name: 'groupId',
            type: GraphQLInt
        }
    },
    resolve: remove
}