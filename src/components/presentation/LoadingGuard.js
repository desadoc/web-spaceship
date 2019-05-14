import React from 'react';
import * as classNames from 'classnames';

import './LoadingGuard.scss';

export class LoadingGuard extends React.Component {
  render() {
    const classes = classNames('LoadingGuard', this.props.className);
    const content = this.props.enabled ? 'Loading...' : this.props.children;

    return (
      <div className={classes}>
        {content}
      </div>
    );
  }
}
