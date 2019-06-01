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

export default class Stream extends React.Component {
  render() {
    console.log("process.env", process.env);
    return (
      <StreamApp
        apiKey="9nktx8a34w6u"
        appId="53032"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.t3zgKqFUYR-CYzdL5jyA6ITl3xu8HZ-gT7FgnyAWR3s"
      >
        <NotificationDropdown notify />
        <StatusUpdateForm
          feedGroup="timeline"
          userId="6b8f4df0-95a1-4ef9-b870-30c5747db58e"
        />
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
