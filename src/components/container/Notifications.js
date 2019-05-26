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
        <div className="Notifications__title"><h5>{this.props.title}:</h5></div>
        {notificationsEl}
      </div>
    )
  }

  getNotifications() {
    const dismiss = (id) =>
    <Action onClick={() => this.props.dismiss(id)}>
      {this.props.dismissText}
    </Action>;

    const notificationItemsEl =
      this.props.notifications.length > 0 ? (
        this.props.notifications
        .map(item => <li key={item.id}>
          {item.text} {dismiss(item.id)}
        </li>)
      ) :
      <li>{this.props.noNewNotificationsText}</li>;
    
    return (
      <ul>
        {notificationItemsEl}
      </ul>
    );
  }
}

const mapStateToProps = (gameState) => ({
  notifications: systemsService().notifications.getDisplayList(gameState.systems),

  title: systemsService().notifications.getTitle(gameState.systems),
  dismissText: systemsService().notifications.getDismissText(gameState.systems),
  noNewNotificationsText: systemsService().notifications.getNoNewNotificationsText(gameState.systems),
})

const mapDispatchToProps = (dispatch) => {
  return {
    dismiss: (id) => dispatch(systemsService().notifications.dismiss(id)),
  };
}

export const Notifications = connect(
  mapStateToProps, mapDispatchToProps
)(_Notifications);
