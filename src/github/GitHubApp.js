import React from "react";
import styled from "styled-components";
import Repositories from "./Repositories";

const { Timeout } = React;

const Header = styled.h1`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const Input = styled.input`
  width: 10rem;
  height: 1.5rem;
`;

const Button = styled.button`
  height: 2rem;
`;

const Loading = styled.div`
  font-size: 1.3rem;
  padding-top: 5px;
`;

export default class GitHubApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }
  render() {
    const { waitMs, timeoutMs } = this.props;
    return (
      <>
        <Header>Seach starred repositories</Header>
        <form
          onSubmit={e => {
            e.preventDefault();
            requestAnimationFrame(() => {
              this.setState(() => ({ user: this.input.value }));
            });
          }}
        >
          <Input
            type="text"
            innerRef={e => (this.input = e)}
            placeholder="Input your Github username"
          />
          <Button>🔍</Button>
        </form>
        {this.state.user && (
          <Timeout ms={timeoutMs}>
            {didExpire => {
              console.log("didExpire", didExpire);
              return didExpire ? (
                <Loading>loading...</Loading>
              ) : (
                <Repositories user={this.state.user} waitMs={waitMs} />
              );
            }}
          </Timeout>
        )}
      </>
    );
  }
}
