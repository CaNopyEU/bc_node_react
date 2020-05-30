// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import GroupLectureType from '../type'
import {getAll, getById} from '../resolvers'

// GroupLectures All
export const groupLectures = {
  type: new GraphQLList(GroupLectureType),
  resolve: getAll
}

// GroupLecture By ID
export const groupLecture = {
  type: GroupLectureType,
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getById
}