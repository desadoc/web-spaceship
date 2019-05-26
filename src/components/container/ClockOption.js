
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
        <Action onClick={this.props.wait}>{this.props.waitText}</Action> :
        <Action onClick={this.props.pause}>{this.props.pauseText}</Action>;

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

  text: systemsService().clock.getText(gameState.systems),
  waitText: systemsService().clock.getWaitText(gameState.systems),
  pauseText: systemsService().clock.getPauseText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({
  wait: () => dispatch(waitStart()),
  pause: () => dispatch(waitPause()),
});

export const ClockOption = connect(
  mapStateToProps, mapDispatchToProps
)(_ClockOption);
