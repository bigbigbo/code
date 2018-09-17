/* eslint-disable new-cap */
import React from 'react';
import Loadable from 'react-loadable';

export default function dynamic(component) {
  return Loadable({
    loader: component,
    loading: props => {
      if (props.error) {
        return (
          <div style={{ padding: 12, textAlign: 'center' }}>
            <p>加载失败!</p>
            <button type="button" onClick={props.retry}>
              重试
            </button>
          </div>
        );
      }
      if (props.pastDelay) {
        return <div>加载中</div>;
      }
      return null;
    }
  });
}
