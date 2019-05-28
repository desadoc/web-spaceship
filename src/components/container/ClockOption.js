
import React from 'react';
import { connect } from 'react-redux';

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
  title: systemsService().clock.getTitle(gameState.systems),
  isPaused: systemsService().clock.isPaused(gameState.systems),

  text: systemsService().clock.getOptionText(gameState.systems),
  waitText: systemsService().clock.getWaitText(gameState.systems),
  pauseText: systemsService().clock.getPauseText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({
  wait: () => dispatch(systemsService().clock.start()),
  pause: () => dispatch(systemsService().clock.pause()),
});

export const ClockOption = connect(
  mapStateToProps, mapDispatchToProps
)(_ClockOption);
