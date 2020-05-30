// Imports
import {GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'

// App Imports
import LectureType from '../type'
import {create, remove} from '../resolvers'

// Lecture create
export const crateLecture = {
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