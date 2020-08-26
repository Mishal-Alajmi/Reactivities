import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container style={{ textAlign: "right" }}>
        <Menu.Item header>
          <img src="/assets/rsz_1logo.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="messages" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => openCreateForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
