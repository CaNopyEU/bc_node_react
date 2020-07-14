// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql'
import StudentType from "../students/type";
import TeacherType from "../teachers/type";
import LectureType from "../lectures/type";

// Grade type
const GradeType = new GraphQLObjectType({
  name: 'grade',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    grade: {type: GraphQLString},
    date: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    teacher: {type: TeacherType},
    student: {type: StudentType},
    lecture: {type: LectureType},
    lectureId: {type: GraphQLInt},
    teacherId: {type: GraphQLInt},
    studentId: {type: GraphQLInt}
  })
})

export default GradeType