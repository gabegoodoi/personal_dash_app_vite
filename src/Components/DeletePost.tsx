import React from 'react';
import { useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import { DELETE_POST } from '../Queries/Mutations.ts';
import { Button, Form } from 'react-bootstrap';

const DeletePost: React.FC = () => {
    const [deletePost, { data, error, loading }] = useMutation(DELETE_POST);

    const inputId = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputId.current) {
          deletePost({
            variables: {
                id: inputId.current.value,
            },
          });
          inputId.current.value = "";
        }
      };      

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h1>Delete Post</h1>

                <Form.Group controlId="formId">
                    <Form.Label>Post ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter post ID"
                        ref={inputId}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Delete Post
                </Button>
            </Form>
            {data && data.deletePost && (
                <div>
                    <h2>Post Deleted Successfully</h2>
                </div>
            )}
        </div>
    );

};

export default DeletePost;