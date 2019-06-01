import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Stream from "./StreamApp";
import NavBar from "./NavBar";

const Home = () => <p>this is home</p>;

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        {/* <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stream">Stream</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr /> */}

        <Route exact path="/" component={Home} />
        <Route path="/stream" component={Stream} />

        {/* <Route path="/topics" component={Topics} /> */}
        {/* </div> */}
      </Router>
    );
  }
}

export default App;
