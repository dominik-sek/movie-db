import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieItem(params) {

    return (
        <Card style={{ width: '15rem', color: 'black', marginBottom: '2rem' }}>
            <Card.Img variant="top" src={params.movie.image} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{params.movie.title}</Card.Title>
                <Card.Text style={{ display: 'inline-block' }}>
                    {params.movie.content.length > 100 ? params.movie.content.slice(0, 100) + '...' : params.movie.content}
                </Card.Text>
                <Button variant="primary" className="mt-auto">
                    <Link
                        style={{ color: 'white' }}
                        to={`/details/${params.movie.id}`}>

                        Szczegóły
                    </Link>
                </Button>


            </Card.Body>
        </Card>

    )
};

