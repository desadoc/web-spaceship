import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { Option } from '../presentation/Option';

class _EmergencyOption extends React.Component {
  render() {
    return (
      <div className="EmergencyOption">
        <Option title={this.props.title}>
          One or more systems need urgent action. <Link to="/emergency">Details...</Link>
        </Option>
      </div>
    );
  }
}

class _EmergencyScreen extends React.Component {
  render() {
    return (
      <div className="EmergencyScreen">
        Emergency Screen
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

export const EmergencyScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyScreen);
