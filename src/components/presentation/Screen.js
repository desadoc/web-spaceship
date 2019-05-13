import React from 'react';
import * as classNames from 'classnames';

import { Title } from './Title';

import './Screen.scss';

export class Screen extends React.Component {
  render() {
    const classes = classNames('Screen', this.props.className);

    return (
      <div className={classes}>
        <Title className="Screen__title" value={this.props.title} />
        <div className="Screen__options">
          {this.props.children}
        </div>
      </div>
    );
  }
}
