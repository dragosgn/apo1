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

let stream = require("getstream");

// Instantiate a new client (client side)

export default class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: null
    };
  }
  async componentDidMount() {
    let client = await stream.connect(
      `yaqsvh36egt9`,
      process.env.REACT_APP_API_SECRET,
      `53030`
    );

    console.log("this is the client", client);

    let userToken = await client.createUserToken("user-one");

    console.log(client, null, userToken);
  }
  render() {
    console.log("this is the token", this.state.userToken);
    return (
      <div>
        {this.state.userToken ? (
          <StreamApp
            apiKey="qydnwc8yx2gj"
            appId="53036"
            token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlci1vbmUifQ.SN468APm3IORHsT_p_f_DjYQeLOFy5RldlO4UXSJ8gk"
          >
            <NotificationDropdown notify />
            {/* <StatusUpdateForm
          feedGroup="timeline"
          userId={process.env.REACT_APP_USER_ID}
        /> */}
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
        ) : (
          `Loading...`
        )}
      </div>
    );
  }
}
