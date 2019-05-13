import React from 'react';
import * as classNames from 'classnames';

import './Title.scss';

export class Title extends React.Component {
  render() {
    const classes = classNames('Title', this.props.className);

    return (
      <div className={classes}>
        <h1>{this.props.value}</h1>
      </div>
    );
  }
}
