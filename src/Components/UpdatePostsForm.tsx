import React from 'react';
import { useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import { UPDATE_POST } from '../Queries/Mutations.ts';
import { Button, Form } from 'react-bootstrap';

const UpdatePostsForm: React.FC = () => {
    const [updatePost, { data, error, loading }] = useMutation(UPDATE_POST);

    const inputTitle = useRef<HTMLInputElement>(null);
    const inputBody = useRef<HTMLInputElement>(null);
    const inputId = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputTitle.current && inputBody.current && inputId.current) {
          updatePost({
            variables: {
                id: inputId.current.value,
                input: {
                    title: inputTitle.current.value,
                    body: inputBody.current.value,
              },
            },
          });
          inputId.current.value = "";
          inputTitle.current.value = "";
          inputBody.current.value = "";
        }
      };      

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <h1>Update Post</h1>

                <Form.Group controlId="formId">
                    <Form.Label>Post ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="enter post ID"
                        ref={inputId}
                    />
                </Form.Group>

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
                    Update Post
                </Button>
            </Form>
            {data && data.updatePost && (
                <div>
                    <h2>Newly updated Post:</h2>
                    <p>ID: {data.updatePost.id}</p>
                    <p>Title: {data.updatePost.title}</p>
                    <p>Body: {data.updatePost.body}</p>
                </div>
            )}
        </div>
    );

};

export default UpdatePostsForm;