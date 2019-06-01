import React from "react";
import {
  StreamApp,
  NotificationDropdown,
  FlatFeed,
  Activity,
  LikeButton
} from "react-activity-feed";
import "react-activity-feed/dist/index.css";

class App extends React.Component {
  render() {
    return (
      <StreamApp
        apiKey="du8he7epvp94"
        appId="45206"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNmI4ZjRkZjAtOTVhMS00ZWY5LWI4NzAtMzBjNTc0N2RiNThlIn0.XbVHgFN9NcVBiL5sg878hFNne1RqiZTOmd2459lC41s"
      >
        <NotificationDropdown notify />
        <FlatFeed
          notify
          Activity={props => (
            <Activity
              {...props}
              Footer={() => (
                <div style={{ padding: "8px 16px" }}>
                  <LikeButton {...props} />
                </div>
              )}
            />
          )}
        />
      </StreamApp>
    );
  }
}

export default App;
