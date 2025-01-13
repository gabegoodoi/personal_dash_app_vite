import React from 'react';
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileSection from './ProfileSection.tsx';
import PostsForm from './PostsForm.tsx';
import DeletePost from './DeletePost.tsx';
import UpdatePostsForm from './UpdatePostsForm.tsx';



const Homepage: React.FC = () => {
    
    return (
        <Container>
            <h1>Home Page</h1>
            <ProfileSection/>
            
            <div className="mt-5">
                <PostsForm/>
            </div>
            
            <div className="mt-5">
                <UpdatePostsForm/>
            </div>

            <div className="mt-5">
                <DeletePost/>
            </div>
        </Container>
    );
};

export default Homepage;