import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Container, Grid } from "semantic-ui-react";
import { IActivityFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/CategoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

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

  const [activity, setActivity] = useState<IActivityFormValues>({
    id: undefined,
    title: "",
    category: "",
    description: "",
    date: undefined,
    time: undefined,
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id) {
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
    activity.id,
  ]);

  // const handleSumbit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid(),
  //     };
  //     createActivity(newActivity).then(() => {
  //       history.push(`/activities/${activity.id}`);
  //     });
  //   } else {
  //     editActivity(activity).then(() => {
  //       history.push(`/activities/${activity.id}`);
  //     });
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10} verticalAlign='top'>
        <Container style={{ margin: "5em" }}>
          <Segment clearing padded='very'>
            <FinalForm
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    placeholder='Title'
                    value={activity.title}
                    name='title'
                    component={TextInput}
                  />
                  <Field
                    placeholder='Description'
                    value={activity.description}
                    name='description'
                    rows={3}
                    component={TextAreaInput}
                  />
                  <Field
                    placeholder='Category'
                    value={activity.category}
                    name='category'
                    options={category}
                    component={SelectInput}
                  />
                  <Form.Group widths='equal' style={{ display: "flex" }}>
                    <Field
                      name='date'
                      date={true}
                      placeholder='Date'
                      value={activity.time}
                      component={DateInput}
                      width={10}
                    />
                    <Field
                      name='time'
                      time={true}
                      placeholder='Time'
                      value={activity.date}
                      component={DateInput}
                      width={10}
                    />
                  </Form.Group>
                  <Field
                    placeholder='City'
                    value={activity.city}
                    name='city'
                    component={TextInput}
                  />
                  <Field
                    placeholder='Venue'
                    value={activity.venue}
                    name='venue'
                    component={TextInput}
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
              )}
            />
          </Segment>
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
