import React from "react";
import { getApiData } from "./api";

const { Timeout } = React;

const Repositories = () => {
  const data = getApiData();
  return (
    <ul>
      {data.map(d => (
        <li key={d.id}>
          <a href={d.html_url}>{d.full_name}</a>(★{d.stargazers_count})
        </li>
      ))}
    </ul>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <>
        <h1>Hello Suspense Demo</h1>
        <Timeout ms={5000}>
          {didExpire => {
            console.log("didExpire", didExpire);
            return didExpire ? <div>loading...</div> : <Repositories />;
          }}
        </Timeout>
      </>
    );
  }
}
