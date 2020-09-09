import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <Menu size='large' fixed='top' inverted style={{ alignContent: "center" }}>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{
              maxWidth: "3em",
            }}
          />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button
            content='Activities'
            as={NavLink}
            to='/activities'
            color='facebook'
            size='massive'
            style={{ marginTop: "0.4em", marginRight: "1em", padding: "1em" }}
          />
          <Button
            positive
            content='Create Activity'
            as={NavLink}
            to='/createActivity'
            style={{ marginTop: "0.4em", marginRight: "1em", padding: "1em" }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
