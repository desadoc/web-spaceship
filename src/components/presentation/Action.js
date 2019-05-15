import React from 'react';
import * as classNames from 'classnames';

import './Action.scss';

export class Action extends React.Component {
  render() {
    const classes = classNames('Action', this.props.className);

    return (
      <span className={classes}>
        <a href="#" onClick={(e) => this.handleClick(e)}>{this.props.children}</a>
      </span>
    );
  }
  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
  }
}
