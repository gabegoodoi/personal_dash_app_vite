import React from 'react';
import { Card, Container, InputGroup, FormControl } from 'react-bootstrap';
import { useUserContext } from './UserContext.tsx'; 
import { useUser } from './useUser.tsx';
import PostsSection from './PostsSection.tsx';

const ProfileSection: React.FC = () => {
  const { userId, setUserId } = useUserContext(); 
  const { loading, error, data } = useUser(userId);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  if (loading) return <p>...Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userExists = data?.user && userId;

  return (
    <Container>
      <h2>Select a User</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Enter User ID"
          aria-label="Enter User ID"
          value={userId}
          onChange={handleUserIdChange}
        />
      </InputGroup>

      {userExists && (
        <Container>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Welcome, {data.user.name}!</Card.Title>
              <Card.Text><b>Email:</b> {data.user.email}</Card.Text>
              <Card.Text><b>Phone:</b> {data.user.phone}</Card.Text>
              <Card.Text>
                <b>Address:</b> 
                {data.user.address?.suite && `${data.user.address.suite} `}
                {data.user.address?.street && `${data.user.address.street}, `}
                {data.user.address?.city && `${data.user.address.city}, `}
                {data.user.address?.zipcode && `${data.user.address.zipcode}`}
              </Card.Text>
              <Card.Text><b>Company:</b> {data.user.company?.name}</Card.Text>
            </Card.Body>
          </Card>
          <PostsSection userId={userId} />
        </Container>
      )}
    </Container>
  );
};

export default ProfileSection;