// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import GroupType from "../groups/type";
import StudentType from "../students/type";

// Attendant type
const StudentGroupType = new GraphQLObjectType({
  name: 'student_group',

  fields: () => ({
    groups: {type: GroupType},
    students: {type: StudentType},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default StudentGroupType