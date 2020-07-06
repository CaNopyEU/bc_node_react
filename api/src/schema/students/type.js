// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList} from 'graphql'
import UserType from "../users/type";
import ParentType from "../parents/type";
import GroupType from "../groups/type";

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
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
    user: {type: UserType},
    parent: {type: ParentType},
    group: {type: new GraphQLList(GroupType)}
  })
})

export default StudentType