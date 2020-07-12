// Imports
import {GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'

// App Imports
import LectureType from '../type'
import {create, remove, update} from '../resolvers'

// Lecture create
export const createLecture = {
    type: LectureType,
    args: {
        lecture: {
            name: 'lecture',
            type: GraphQLString
        },
        lectureType: {
            name: 'lectureType',
            type: GraphQLBoolean
        }
    },
    resolve: create
}
export const updateLecture = {
    type: LectureType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        },
        lecture: {
            name: 'lecture',
            type: GraphQLString
        },
        lectureType: {
            name: 'lectureType',
            type: GraphQLBoolean
        }
    },
    resolve: update
}

// Lecture remove
export const deleteLecture = {
    type: LectureType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}