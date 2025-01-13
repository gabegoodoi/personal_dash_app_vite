import { useQuery } from '@apollo/client';
import { GET_USER, GET_POSTS } from '../Queries/Queries.ts';


export const useUser = (userId: string) => {
    const { data, error, loading } = useQuery(GET_USER, {
        variables: { userId }
    });
    return { data, error, loading };
}

export const usePosts = (userId: string) => {
    const { data, error, loading } = useQuery(GET_POSTS, {
        variables: { userId }
    });
    return { data, error, loading };
}