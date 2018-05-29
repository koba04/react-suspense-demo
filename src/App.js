import React from "react";
import { createCache, createResource } from "simple-cache-provider";

const { Timeout } = React;

const asyncData = () =>
  new Promise(r => setTimeout(() => r("Async Data"), 1000));

const cache = createCache(() => {});
const fetcher = createResource(asyncData);

const Text = () => {
  const data = fetcher.read(cache);
  return <div>{data}</div>;
};

export default class App extends React.Component {
  render() {
    return (
      <>
        <h1>Hello Suspense Demo</h1>
        <Timeout ms={500}>
          {didExpire => (didExpire ? <div>loading...</div> : <Text />)}
        </Timeout>
      </>
    );
  }
}
