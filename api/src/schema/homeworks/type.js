// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import UserType from "../users/type";
import LectureType from "../lectures/type";
import GroupType from "../groups/type";
import TeacherType from "../teachers/type";

// Homework type
const HomeworkType = new GraphQLObjectType({
  name: 'homework',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    desc: {type: GraphQLString},
    deadline: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    group: {type: GroupType},
    teacher: {type: TeacherType},
    lecture: {type: LectureType},
    teacherId: {type: GraphQLInt},
    lectureId: {type: GraphQLInt}
  })
})

export default HomeworkType