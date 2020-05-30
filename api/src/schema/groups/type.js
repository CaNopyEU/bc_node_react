// Imports
import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat} from 'graphql'
import ClassType from "../classes/type";
import GroupLectureType from "../groups_lectures/type";


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
    lectures: {type: GroupLectureType}
  })
})

export default GroupType