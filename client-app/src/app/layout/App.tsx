import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivitiyDashboard from "../../features/activities/dashborad/ActivitiyDashboard";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  // Get the data
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading Activities...' />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "10em" }}>
        <ActivitiyDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
