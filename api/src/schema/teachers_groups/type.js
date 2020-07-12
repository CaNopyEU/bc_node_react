// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import TeacherType from "../teachers/type";
import GroupType from "../groups/type";

// Attendant type
const TeacherGroupType = new GraphQLObjectType({
  name: 'teacher_group',

  fields: () => ({
    groups: {type: GroupType},
    teachers: {type: TeacherType},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default TeacherGroupType