import React from "react";
import styled from "styled-components";
import Repositories from "./Repositories";

const { Timeout } = React;

const Header = styled.h1`
  font-size: 2rem;
  margin: 0.5rem;
`;

const Input = styled.input`
  width: 10rem;
  height: 1.5rem;
`;

const Button = styled.button`
  height: 2rem;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      waitMs: 0,
      timeoutMs: 2000
    };
  }
  render() {
    return (
      <>
        <Header>Seach starred repositories</Header>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.setState(() => ({ user: this.input.value }));
          }}
        >
          <Input
            type="text"
            innerRef={e => (this.input = e)}
            placeholder="Input your Github username"
          />
          <Button>🔍</Button>
          <div>
            <label>
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={this.state.waitMs}
                onChange={({ target: { value } }) =>
                  this.setState(s => ({ ...s, waitMs: value }))
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
                  this.setState(s => ({ ...s, timeoutMs: value }))
                }
              />
              (Timeout ms: {this.state.timeoutMs})
            </label>
          </div>
        </form>
        {this.state.user && (
          <Timeout ms={this.state.timeoutMs}>
            {didExpire => {
              console.log("didExpire", didExpire);
              return didExpire ? (
                <div>loading...</div>
              ) : (
                <Repositories
                  user={this.state.user}
                  waitMs={this.state.waitMs}
                />
              );
            }}
          </Timeout>
        )}
      </>
    );
  }
}
