import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const ActivitiyDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  // Get the data
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading Activities...' />;

  return (
    <Grid textAlign='center'>
      <Grid.Column width={6}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={3}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivitiyDashboard);
