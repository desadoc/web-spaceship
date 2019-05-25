
import React from 'react';
import { connect } from 'react-redux';

import { waitStart, waitPause } from '../../actions';

import { Option } from '../presentation/Option';
import { Action } from '../presentation/Action';

import { systemsService } from '../../services/Systems';

class _ClockOption extends React.Component {
  render() {
    const action = 
      this.props.isPaused ?
        <Action onClick={this.props.wait}>Wait...</Action> :
        <Action onClick={this.props.pause}>Pause.</Action>;

    return (
      <span className="ClockOption">
        <Option title={this.props.title}>
          {this.props.text} {action}
        </Option>
      </span>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: gameState.systems.byName.clock.title,
  isPaused: gameState.systems.byName.clock.isPaused,
  text: systemsService().clock.getTimeText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({
  wait: () => dispatch(waitStart()),
  pause: () => dispatch(waitPause()),
});

export const ClockOption = connect(
  mapStateToProps, mapDispatchToProps
)(_ClockOption);
