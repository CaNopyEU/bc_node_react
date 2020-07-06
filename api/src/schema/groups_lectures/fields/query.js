// Imports
import {GraphQLInt, GraphQLList} from 'graphql'

// App Imports
import GroupLectureType from '../type'
import {getAll, getById} from '../resolvers'
import LectureType from "../../lectures/type";

// GroupLectures All
export const groupLectures = {
  type: new GraphQLList(LectureType),
  args: {
    id: {type: GraphQLInt}
  },
  resolve: getAll
}

// GroupLecture By ID
export const groupLecture = {
  type: GroupLectureType,
  args: {
    lectureId: {type: GraphQLInt},
    groupId: {type: GraphQLInt}
  },
  resolve: getById
}