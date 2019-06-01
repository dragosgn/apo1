import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Feed from "./StreamApp";

import styled from "styled-components";

const Home = () => <p>this is home</p>;

const Root = styled.div`
  padding: 1rem;
`;

class App extends React.Component {
  render() {
    return (
      <Router>
        <Root>
          <Route exact path="/" component={Home} />
          <Route path="/feed" component={Feed} />
        </Root>
      </Router>
    );
  }
}

export default App;
