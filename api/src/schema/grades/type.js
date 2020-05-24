// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt} from 'graphql'
import UserType from "../users/type";
import LectureType from "../lectures/type";

// Thought type
const GradeType = new GraphQLObjectType({
  name: 'grade',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    grade: {type: GraphQLString},
    teacher: {type: UserType},
    student: {type: UserType},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    lecture: {type: LectureType},
    date: {type: GraphQLString}
  })
})

export default GradeType