import { gql } from "apollo-boost";

//posts queries
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
    }
  }
`;


//users queries


//post mutations



//user mutations
