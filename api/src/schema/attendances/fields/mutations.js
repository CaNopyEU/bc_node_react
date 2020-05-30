// Imports
import {GraphQLString, GraphQLInt} from 'graphql'

// App Imports
import LectureType from '../type'
import {create, remove} from '../resolvers'

// Lecture create
export const lectureCreate = {
    type: LectureType,
    args: {
        lecture: {
            name: 'lecture',
            type: GraphQLString
        }
    },
    resolve: create
}

// Lecture remove
export const lectureRemove = {
    type: LectureType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}