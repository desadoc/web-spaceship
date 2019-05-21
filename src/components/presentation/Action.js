import React from 'react';
import * as classNames from 'classnames';

import './Action.scss';

export class Action extends React.Component {
  render() {
    const classes = classNames('Action', this.props.className);

    return (
      <span className={classes}>
        <span className="Action__link" onClick={(e) => this.handleClick(e)}>{this.props.children}</span>
      </span>
    );
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }
}
