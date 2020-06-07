// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean} from 'graphql'
import GroupType from "../groups/type";
import StudentType from "../students/type";

// Attendant type
const StudentGroupType = new GraphQLObjectType({
  name: 'student_group',

  fields: () => ({
    group: {type: GroupType},
    student: {type: StudentType},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default StudentGroupType