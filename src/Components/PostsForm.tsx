import React from 'react';
import { useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import { CREATE_POST } from '../Queries/Mutations.ts';
import { Button, Form } from 'react-bootstrap';

const PostsForm: React.FC = () => {
    const [createPost, { data, error, loading }] = useMutation(CREATE_POST);

    const inputTitle = useRef<HTMLInputElement>(null);
    const inputBody = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputTitle.current && inputBody.current) {
          createPost({
            variables: {
              input: {
                title: inputTitle.current.value,
                body: inputBody.current.value,
              },
            },
          });
          inputTitle.current.value = "";
          inputBody.current.value = "";
        }
      };      

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h1>Create Post</h1>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter title"
                        ref={inputTitle}
                    />
                </Form.Group>

                <Form.Group controlId="formBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter body"
                        ref={inputBody}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Post
                </Button>
            </Form>
            {data && data.createPost && (
                <div>
                    <h2>Newly created Post:</h2>
                    <p>Title: {data.createPost.title}</p>
                </div>
            )}
        </div>
    );

};

export default PostsForm;