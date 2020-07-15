// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList} from 'graphql'
import UserType from "../users/type";
import ParentType from "../parents/type";
import GroupType from "../groups/type";
import GradeType from "../grades/type";
import AttendanceType from "../attendances/type";
import RecordType from "../records/type";

// Student type
const StudentType = new GraphQLObjectType({
  name: 'student',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    city: {type: GraphQLString},
    street: {type: GraphQLString},
    street_num: {type: GraphQLFloat},
    dob: {type: GraphQLString},
    desc: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    user: {type: UserType},
    parent: {type: ParentType},
    groups: {type: new GraphQLList(GroupType)},
    grades: {type: new GraphQLList(GradeType)},
    attendances: {type: new GraphQLList(AttendanceType)},
    records: {type: new GraphQLList(RecordType)},
    classId: {type: GraphQLInt}
  })
})

export default StudentType