// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import UserType from "../users/type";
import ClassType from "../classes/type";
import LectureType from "../lectures/type";

// User type
const HomeworkType = new GraphQLObjectType({
  name: 'homework',
  description: '...',

  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    desc: {type: GraphQLString},
    finishAt: {type: GraphQLString},
    class: {type: ClassType},
    teacher: {type: UserType},
    lecture: {type: LectureType}
  })
})

export default HomeworkType