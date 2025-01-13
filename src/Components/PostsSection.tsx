import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO, DELETE_TODO } from '../Queries/Mutations.ts';
import { usePosts } from './useUser.tsx';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useUserContext } from './UserContext.tsx';  

interface PostsSectionProps {
  userId: string;
}

const PostsSection: React.FC<PostsSectionProps> = () => {
    const { userId } = useUserContext();  
    const { loading, error, data } = usePosts(userId);
    const [searchPosts, setSearchPosts] = useState('');
    const [searchAlbums, setSearchAlbums] = useState('');
    const [searchTodos, setSearchTodos] = useState('');
    const [updateTodo] = useMutation(UPDATE_TODO);
    const [deleteTodo] = useMutation(DELETE_TODO);

    if (loading) return <p>...Loading</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filterByQuery = (items: any[], key: string, query: string) =>
        items.filter(item => item[key]?.toLowerCase().includes(query.toLowerCase()));

    const filteredPosts = filterByQuery(data.user.posts.data, 'title', searchPosts);
    const filteredAlbums = filterByQuery(data.user.albums.data, 'title', searchAlbums);
    const filteredTodos = filterByQuery(data.user.todos.data, 'title', searchTodos);

    const completedTodos = filteredTodos.filter((todo: any) => todo.completed);
    const incompleteTodos = filteredTodos.filter((todo: any) => !todo.completed);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = e.target.value;
        if (type === 'posts') setSearchPosts(value);
        else if (type === 'albums') setSearchAlbums(value);
        else if (type === 'todos') setSearchTodos(value);
    };

    // Handler to mark a todo as completed
    const handleMarkAsComplete = (id: string) => {
        updateTodo({
            variables: { id, completed: true },
            refetchQueries: ['GetPosts'],
        }).catch((error) => {
            console.error("Error updating todo:", error);
        });
    };

    const handleDeleteTodo = (id: string) => {
        deleteTodo({
            variables: { id },
            refetchQueries: ['GetPosts'],
        });
    };

    return (
        <Container>
            <h1>Search Posts</h1>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchPosts}
                onChange={(e) => handleSearchChange(e, 'posts')}
                style={{ marginBottom: '20px', width: '100%' }}
            />

            <h1>Posts List</h1>
            <Row>
                {filteredPosts.map((post: any) => (
                    <Col key={post.id}>
                        <Card id={post.id} style={{ width: "18rem" }}>
                            <Card.Body>
                                <Card.Title>POST {post.id}: {post.title}</Card.Title>
                                <Card.Body>{post.body}</Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h1>Search Albums</h1>
            <input
                type="text"
                placeholder="Search albums..."
                value={searchAlbums}
                onChange={(e) => handleSearchChange(e, 'albums')}
                style={{ marginBottom: '20px', width: '100%' }}
            />

            <h1>Albums List</h1>
            <Row>
                {filteredAlbums.map((album: any) => (
                    <Col key={album.id}>
                        <Link to={`/${album.id}`}>
                            <Card id={album.id} style={{ width: "18rem" }}>
                                <Card.Body>
                                    <Card.Title>ALBUM {album.id}: {album.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

            <h1>Search Todos</h1>
            <input
                type="text"
                placeholder="Search todos..."
                value={searchTodos}
                onChange={(e) => handleSearchChange(e, 'todos')}
                style={{ marginBottom: '20px', width: '100%' }}
            />

            <h1>Todos List</h1>
            <h2>Incomplete Todos</h2>
            <Row>
                {incompleteTodos.map((todo: any) => (
                    <Col key={todo.id}>
                        <Card id={todo.id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{todo.title}</Card.Title>
                                <div>Status: Pending</div>
                                <Button 
                                    variant="success" 
                                    onClick={() => handleMarkAsComplete(todo.id)}
                                >
                                    Mark as Complete
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDeleteTodo(todo.id)} 
                                    className="ms-2"
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h2>Completed Todos</h2>
            <Row>
                {completedTodos.map((todo: any) => (
                    <Col key={todo.id}>
                        <Card id={todo.id} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{todo.title}</Card.Title>
                                <div>Status: Completed</div>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PostsSection;
