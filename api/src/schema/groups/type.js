// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList} from 'graphql'
import ClassType from "../classes/type";
import GroupLectureType from "../groups_lectures/type";
import LectureType from "../lectures/type";
import TeacherType from "../teachers/type";
import StudentType from "../students/type";


// Group type
const GroupType = new GraphQLObjectType({
  name: 'group',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    title: {type: GraphQLFloat},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    class: {type: ClassType},
    lectures: {type: new GraphQLList(LectureType)},
    teachers: {type: new GraphQLList(TeacherType)},
    students: {type: new GraphQLList(StudentType)}
  })
})

export default GroupType