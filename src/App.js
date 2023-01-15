import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  progress = 10;

  constructor(props) {
    super(props);
    this.state = {
      progress: this.progress,
    };
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          {/* <News setProgress={this.setProgress} country="in" category="sports"/> */}
          <Routes>
            {/* <Route path="/" exact element={<News setProgress={this.setProgress} country="in" category="general"/>} ></Route> */}
            <Route
              path="/business"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  country="in"
                  category="business"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              path="/general"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  key="genera"
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/health"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              path="/science"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  country="in"
                  category="science"
                />
              }
            ></Route>
            <Route
              path="/sports"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              path="/technology"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  country="in"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
          <Navbar />
          <LoadingBar color="#f11946" progress={this.state.progress} />
        </Router>
      </div>
    );
  }
}
