import React from "react";
import styled from "styled-components";

import PreloadImage from "./PreloadImage";

const { Timeout } = React;

const Header = styled.h1`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const Placeholder = styled.div`
  width: 200px;
  height: 200px;
  background-color: #ccc;
`;

class ImageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preload: false,
      shouldShow: false
    };
  }
  render() {
    const { timeoutMs, waitMs } = this.props;
    const { shouldShow } = this.state;
    return (
      <section>
        <Header>Image App</Header>
        <div>
          <button
            onClick={() =>
              requestAnimationFrame(() =>
                this.setState(s => ({ shouldShow: !s.shouldShow }))
              )
            }
          >
            {shouldShow ? "hide" : "show"}
          </button>
          &nbsp;/&nbsp;
          <label>
            <input
              type="checkbox"
              checked={this.state.prelaod}
              onChange={({ target: checked }) =>
                this.setState(() => ({ preload: checked }))
              }
            />
            preload
          </label>
        </div>
        {shouldShow && (
          <>
            <Timeout ms={timeoutMs}>
              {didExpired =>
                didExpired ? (
                  <Placeholder />
                ) : (
                  <PreloadImage
                    src="https://avatars1.githubusercontent.com/u/250407?s=400&v=4"
                    preload={this.state.preload}
                    waitMs={waitMs}
                  />
                )
              }
            </Timeout>
            <p>
              Hello, my name is koba04. This is a demo for React Suspense. React
              Suspense enables us async rendering.
            </p>
          </>
        )}
      </section>
    );
  }
}
export default ImageApp;
