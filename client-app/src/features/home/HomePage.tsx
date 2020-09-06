import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container style={{ marginTop: "10em" }}>
      <h1>Home</h1>
      <h3>
        <Link to='/activities'>Go to Activities</Link>
      </h3>
    </Container>
  );
};

export default HomePage;
