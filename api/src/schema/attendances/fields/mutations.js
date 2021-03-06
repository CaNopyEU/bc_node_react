// Imports
import {GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'

// App Imports
import AttendanceType from '../type'
import {create, remove, update, active} from '../resolvers'

// Attendance create
export const createAttendance = {
    type: AttendanceType,
    args: {
        desc: {
            name: 'desc',
            type: GraphQLString
        },
        date: {
            name: 'date',
            type: GraphQLString
        },
        pardon: {
            name: 'pardon',
            type: GraphQLBoolean
        },
        teacherId: {
            name: 'teacherId',
            type: GraphQLInt
        },
        studentId: {
            name: 'studentId',
            type: GraphQLInt
        }
    },
    resolve: create
}

// Attendance update
export const updateAttendance = {
    type: AttendanceType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        },
        desc: {
            name: 'desc',
            type: GraphQLString
        },
        date: {
            name: 'date',
            type: GraphQLString
        },
        pardon: {
            name: 'pardon',
            type: GraphQLBoolean
        }
    },
    resolve: update
}

// Attendance remove
export const deleteAttendance = {
    type: AttendanceType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}

export const activateAttendance = {
    type: AttendanceType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: active
}