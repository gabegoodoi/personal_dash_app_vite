import { gql } from "urql";

export const GET_USER = gql`
    query GetUser($userId: ID!) {
        user(id: $userId) {
            id
            name
            email
            phone
            address {
                street,
                suite,
                city,
                zipcode
            }
            company {
                name
            }
        }
    }
`;

export const GET_POSTS = gql`
    query GetPosts($userId: ID!) {
        user(id: $userId) {
            todos {
                data {
                    id
                    title
                    completed
                }
            }
            albums {
                data {
                    id
      	            title
                    photos {
                        data {
                            id
                            title
                            url
                            thumbnailUrl
                        }
                    }
                }
            }
            posts {
                data {
                    id
                    title
                    body
                }
            }
        }
    }
`;
