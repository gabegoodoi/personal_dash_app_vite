import React from 'react';
import { useParams } from 'react-router-dom';
import { usePosts } from './useUser.tsx';
import { useUserContext } from './UserContext.tsx'; 
import { Container, Row, Col, Card } from 'react-bootstrap';

const AlbumDetails: React.FC = () => {
  const { userId } = useUserContext();
  const { albumId } = useParams<{ albumId: string }>();
  const { loading, error, data } = usePosts(userId);

  if (loading) return <p>...Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  const album = data.user.albums.data.find((album: any) => album.id === albumId);
  if (!album) return <p>Album not found</p>;

  return (
    <Container>
      <h1>Album: {album.title}</h1>
      <Row>
        {album.photos.data
          .filter((photo: any) => photo.url)
          .map((photo: any) => (
            <Col key={photo.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img src={photo.url} alt={photo.title} />
                <Card.Body>
                  <Card.Title>{photo.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default AlbumDetails;
