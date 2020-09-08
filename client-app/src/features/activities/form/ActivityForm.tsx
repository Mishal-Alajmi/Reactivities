import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Container, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";

interface IDetailsParams {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<IDetailsParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length,
  ]);

  const handleSumbit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Container style={{ margin: "5em" }}>
          <Segment clearing padded='very'>
            <Form onSubmit={handleSumbit}>
              <Form.Input
                placeholder='Title'
                value={activity.title}
                name='title'
                onChange={handleInputChange}
              />
              <Form.TextArea
                rows={2}
                placeholder='Description'
                value={activity.description}
                name='description'
                onChange={handleInputChange}
              />
              <Form.Input
                placeholder='Category'
                value={activity.category}
                name='category'
                onChange={handleInputChange}
              />
              <Form.Input
                onChange={handleInputChange}
                name='date'
                type='datetime-local'
                placeholder='Date'
                value={activity.date}
              />
              <Form.Input
                placeholder='City'
                value={activity.city}
                name='city'
                onChange={handleInputChange}
              />
              <Form.Input
                placeholder='Venue'
                value={activity.venue}
                name='venue'
                onChange={handleInputChange}
              />
              <Button
                loading={submitting}
                floated='right'
                positive
                type='submit'
                content='Submit'
              />
              <Button
                floated='right'
                type='button'
                content='Cancel'
                onClick={() => history.push("/activities")}
              />
            </Form>
          </Segment>
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
