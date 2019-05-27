import React from 'react';
import * as classNames from 'classnames';

import './Title.scss';

export class Title extends React.Component {
  render() {
    const classes = classNames('Title', this.props.className);

    return (
      <div className={classes}>
        <header>
          <h1>{this.props.children}</h1>
        </header>
      </div>
    );
  }
}
