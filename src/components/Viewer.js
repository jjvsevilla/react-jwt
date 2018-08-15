import React from 'react';

const Viewer = props => (
  <div className="api-result">
    {props.loading && <p>loading...</p>}
    {props.result &&
      <pre>{JSON.stringify(props.result, undefined, 2)}</pre>}
  </div>
)

export default Viewer;
