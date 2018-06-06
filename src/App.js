import React from "react";
import styled from "styled-components";
import Link from "./Link";
import GitHubApp from "./github/GitHubApp";
import ImageApp from "./image/ImageApp";

const { Timeout } = React;

const Header = styled.h1`
  font-size: 2rem;
  margin: 0.5rem;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: "",
      waitMs: 100,
      timeoutMs: 5000
    };
  }
  renderApp() {
    const { waitMs, timeoutMs } = this.state;
    const props = {
      waitMs,
      timeoutMs,
      onBack: () => this.setState(() => ({ app: "" }))
    };
    switch (this.state.app) {
      case "github":
        return <GitHubApp {...props} />;
      case "image":
        return <ImageApp {...props} />;
    }
  }
  render() {
    return (
      <>
        <Header>Suspense Demo</Header>
        <div>
          <label>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={this.state.waitMs}
              onChange={({ target: { value } }) =>
                this.setState(() => ({ waitMs: +value }))
              }
            />
            (API wait ms: {this.state.waitMs})
          </label>
        </div>
        <div>
          <label>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={this.state.timeoutMs}
              onChange={({ target: { value } }) =>
                this.setState(() => ({ timeoutMs: +value }))
              }
            />
            (Timeout ms: {this.state.timeoutMs})
          </label>
        </div>
        <p>
          <Link onClick={() => this.setState(() => ({ app: "github" }))}>
            Starred GitHub Repositories
          </Link>
          &nbsp;/&nbsp;
          <Link onClick={() => this.setState(() => ({ app: "image" }))}>
            Image App
          </Link>
        </p>
        <section>{this.renderApp()}</section>
      </>
    );
  }
}
