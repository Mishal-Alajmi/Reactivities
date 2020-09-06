import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu fixed='top' inverted>
      <Container style={{ textAlign: "right" }}>
        <Menu.Item header as={NavLink} exact to='/'>
          Reactivities
          <img src='/assets/logo_sm.png' alt='logo' />
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to='/activities' />
        <Menu.Item>
          <Button
            positive
            content='Create Activity'
            as={NavLink}
            to='/createActivity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
