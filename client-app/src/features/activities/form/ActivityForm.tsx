import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Container, Grid } from "semantic-ui-react";
import { ActivityFormValues } from "../../../app/models/activity";
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
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";

const validator = combineValidators({
  title: isRequired("title"),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "The description has to be at least 5 characters or more",
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date"),
  time: isRequired("time"),
});
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
    loadActivity,
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id) // load activity and set the local state
        .then((activity) => {
          setActivity(new ActivityFormValues(activity));
        })
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id, setLoading]);

  /**
   *
   * @param values
   *
   * either creates an activity or edits an existing one based on if values,
   * has an id(not undefined)
   */
  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
    console.log(activity);
  };

  return (
    <Grid>
      <Grid.Column width={10} verticalAlign='top'>
        <Container style={{ margin: "5em" }}>
          <Segment clearing padded='very'>
            <FinalForm
              onSubmit={handleFinalFormSubmit}
              initialValues={activity}
              validate={validator}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
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
                    disabled={loading || invalid || pristine}
                  />
                  <Button
                    floated='right'
                    type='button'
                    content='Cancel'
                    onClick={
                      activity.id
                        ? () => history.push(`/activities/${activity.id}`)
                        : () => history.push("/activities")
                    }
                    disabled={loading}
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
