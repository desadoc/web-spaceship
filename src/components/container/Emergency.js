import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { loadingStart } from '../../actions';

import { Screen } from '../presentation/Screen';
import { Option } from '../presentation/Option';
import { LoadingGuard } from '../presentation/LoadingGuard';

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
  componentDidMount() {
    this.props.loadingStart();
  }
  render() {
    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="EmergencyScreen">
          <Screen title={this.props.title}>
            <ol>
              <li>Emergency Screen</li>
            </ol>
          </Screen>
        </div>
      </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => {
  const state = gameState.systems.byName.emergency;
  const uiState = gameState.uiState.byName.emergency;

  return {
    state, uiState,
    name: state.name,
    title: state.title,
    loading: uiState.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadingStart: () => dispatch(loadingStart('emergency', 500)),
  };
}

export const EmergencyOption = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyOption);

export const EmergencyScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyScreen);
