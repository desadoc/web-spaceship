import React from 'react';
import { Link } from "react-router-dom";
import * as classNames from 'classnames';

import { Title } from './Title';
import { Notifications } from '../container/Notifications';

import './Screen.scss';

export class Screen extends React.Component {
  render() {
    const classes = classNames('Screen', this.props.className);

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export class ScreenTitle extends React.Component {
  render() {
    return (
      <Title className="Screen__title">{this.props.children}</Title>
    );
  }
}

export class ScreenNotifications extends React.Component {
  render() {
    return(
      <Notifications className="Screen__notifications" />
    );
  }
}

export class ScreenItems extends React.Component {
  render() {
    return (
      <div className="Screen__items">
        {this.props.children}
      </div>
    );
  }
}

export class ScreenFooter extends React.Component {
  render() {
    const links = this.props.nav && this.props.nav.map((item, index, arr) =>
      <span className="Screen__footerNav">
        <Link to={item[1]}>{item[0]}</Link>{ ((arr.length-1) > index) ? ', ': '.'}
      </span>
    );

    return (
      <div className="Screen__footer">
        {links && <span>Back to {links}</span>}
      </div>
    );
  }
}
