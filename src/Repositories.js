import React from "react";
import styled from "styled-components";
import { getApiData } from "./api";

const List = styled.ul`
  padding: 0 1rem;
`;

const Repository = styled.li`
  font-size: 1rem;
  list-style: none;
  line-height: 2rem;
`;

const Repositories = ({ user, waitMs }) => {
  const data = getApiData(user, waitMs);
  return (
    <List>
      {data.map(d => (
        <Repository key={d.id}>
          <a href={d.html_url}>{d.full_name}</a>(★{d.stargazers_count})
        </Repository>
      ))}
    </List>
  );
};
export default Repositories;
