import React from "react";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <Segment.Group>
      <Segment style={{ marginBottom: "0" }}>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src='/assets/user.png' />
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Description>Hosted by Mishal</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment style={{ marginTop: "0", marginBottom: "0" }}>
        <Icon name='clock' /> {format(activity.date, "h:mm a")}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary style={{ marginTop: "0", marginBottom: "0" }}>
        Attendees will go here
      </Segment>
      <Segment
        clearing
        style={{ marginTop: "0", marginBottom: "1em", textAlign: "initial" }}>
        <span style={{ verticalAlign: "middle" }}>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
