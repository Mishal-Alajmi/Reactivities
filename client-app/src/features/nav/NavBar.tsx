import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from "../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed='top' inverted>
      <Container style={{ textAlign: "right" }}>
        <Menu.Item header>
          <img src='/assets/rsz_1logo.png' alt='logo' />
          Reactivities
        </Menu.Item>
        <Menu.Item name='messages' />
        <Menu.Item>
          <Button
            positive
            content='Create Activity'
            onClick={() => activityStore.openCreateForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
