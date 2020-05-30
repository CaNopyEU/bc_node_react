// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean} from 'graphql'
import UserType from "../users/type";
import ClassType from "../classes/type";
import TeacherLectureType from "../teachers_lectures/type";

// Teacher type
const TeacherType = new GraphQLObjectType({
  name: 'teacher',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    email: {type: GraphQLString},
    city: {type: GraphQLString},
    street: {type: GraphQLString},
    street_num: {type: GraphQLFloat},
    phone: {type: GraphQLFloat},
    dob: {type: GraphQLString},
    main_teacher: {type: GraphQLBoolean},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    user: {type: UserType},
    class: {type: ClassType},
    lectures: {type: TeacherLectureType}
  })
})

export default TeacherType