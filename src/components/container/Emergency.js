import React from 'react';
import { connect } from 'react-redux';

import { Option } from '../presentation/Option';

class _EmergencyOption extends React.Component {
  render() {
    return (
      <div className="EmergencyOption">
        <Option title={this.props.title}>
          One or more systems need urgent action.
        </Option>
      </div>
    );
  }
}

const mapStateToProps = (gameState) => {
  const state = gameState.systems.byName.emergency;

  return {
    state,
    name: state.name,
    title: state.title,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export const EmergencyOption = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyOption);