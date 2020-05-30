// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import LectureType from "../lectures/type";
import TeacherType from "../teachers/type";

// Attendant type
const TeacherLectureType = new GraphQLObjectType({
  name: 'teacher_lecture',

  fields: () => ({
    lecture: {type: LectureType},
    teacher: {type: TeacherType},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default TeacherLectureType