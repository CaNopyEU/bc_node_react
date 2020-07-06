// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql'
import TeacherType from "../teachers/type";
import GroupType from "../groups/type";
import StudentType from "../students/type";

// Class type
const ClassType = new GraphQLObjectType({
  name: 'Class',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    classType: {type: GraphQLString},
    year: {type: GraphQLInt},
    teacher: {type: TeacherType},
    groups: {type: new GraphQLList(GroupType)},
    students: {type: new GraphQLList(StudentType)},
    schedule: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  })
})

export default ClassType