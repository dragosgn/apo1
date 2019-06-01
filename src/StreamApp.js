import React from "react";
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  Activity,
  LikeButton,
  CommentField,
  CommentList,
  StatusUpdateForm
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";

const {
  REACT_APP_API_KEY,
  REACT_APP_APP_ID,
  REACT_APP_TOKEN,
  REACT_APP_USER_ID
} = process.env;

export default class Stream extends React.Component {
  render() {
    console.log(
      REACT_APP_API_KEY,
      REACT_APP_APP_ID,
      REACT_APP_TOKEN,
      REACT_APP_USER_ID
    );
    return (
      <StreamApp
        apiKey={REACT_APP_API_KEY}
        appId={REACT_APP_APP_ID}
        token={REACT_APP_TOKEN}
      >
        <NotificationDropdown notify />
        <StatusUpdateForm feedGroup="timeline" userId={REACT_APP_USER_ID} />
        <FlatFeed
          notify
          Activity={props => (
            <Activity
              {...props}
              Footer={() => (
                <div style={{ padding: "8px 16px" }}>
                  <LikeButton {...props} />
                  <CommentField
                    activity={props.activity}
                    onAddReaction={props.onAddReaction}
                  />
                  <CommentList activityId={props.activity.id} />
                </div>
              )}
            />
          )}
        />
      </StreamApp>
    );
  }
}
