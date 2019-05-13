import React from 'react';
import * as classNames from 'classnames';

import './Option.scss';

export class Option extends React.Component {
  render() {
    const classes = classNames('Option', this.props.className);

    return (
      <div className={classes}>
        <span className="Option__title">{this.props.title}. </span>
        {this.props.children}
      </div>
    );
  }
}
