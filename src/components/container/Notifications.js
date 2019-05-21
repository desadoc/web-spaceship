import React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';

import { systemsService } from '../../services/Systems';

import { Action } from '../presentation/Action';

import './Notifications.scss';

class _Notifications extends React.Component {
  render() {
    const classes = classNames('Notifications', this.props.className);

    const notificationsEl = this.getNotifications();

    return (
      <div className={classes}>
        <div className="Notifications__title"><h5>Notifications:</h5></div>
        {notificationsEl}
      </div>
    )
  }

  getNotifications() {
    const dismiss = (id) =>
    <Action onClick={() => this.props.dismiss(id)}>
      Dismiss...
    </Action>;

    const notificationItemsEl =
      this.props.notifications.length > 0 ? (
        this.props.notifications
        .map(item => <li key={item.id}>
          {item.text} {dismiss(item.id)}
        </li>)
      ) :
      <li>No new notifications.</li>;
    
    return (
      <ul>
        {notificationItemsEl}
      </ul>
    );
  }
}

const mapStateToProps = (gameState) => {
  const notifications = systemsService().notifications.getDisplayList(gameState.systems);

  return {
    notifications,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismiss: (id) => dispatch(systemsService().notifications.dismiss(id)),
  };
}

export const Notifications = connect(
  mapStateToProps, mapDispatchToProps
)(_Notifications);
