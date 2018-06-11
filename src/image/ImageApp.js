import React from "react";
import styled from "styled-components";

import PreloadImage from "./PreloadImage";

const { Timeout } = React;

const Header = styled.h1`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const Placeholder = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #ccc;
`;

const imageWidth = 600;
const imageHeight = imageWidth * 0.75;

const ImageWrapperWithTimeout = props => (
  <div>
    <Header>image wrapper</Header>
    <div>
      <Timeout ms={1000}>
        {didExpired =>
          didExpired ? (
            <Placeholder width={props.width} height={props.height} />
          ) : (
            <PreloadImage {...props} />
          )
        }
      </Timeout>
    </div>
  </div>
);

const ImageWrapper = props => (
  <div>
    <Header>image wrapper</Header>
    <div>
      <PreloadImage {...props} />
    </div>
  </div>
);

class ImageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preload: false,
      shouldShow: false,
      shouldFixImageSize: false
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
          &nbsp;/&nbsp;
          <label>
            <input
              type="checkbox"
              checked={this.state.shouldFixImageSize}
              onChange={({ target: checked }) =>
                this.setState(() => ({ shouldFixImageSize: checked }))
              }
            />
            fix the image size
          </label>
        </div>
        {shouldShow && (
          <>
            <Timeout ms={timeoutMs}>
              {didExpired =>
                didExpired ? (
                  <Placeholder width={imageWidth} height={imageHeight} />
                ) : (
                  <PreloadImage
                    src="sushi.jpg"
                    preload={this.state.preload}
                    shouldFixImageSize={this.state.shouldFixImageSize}
                    width={imageWidth}
                    height={imageHeight}
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
