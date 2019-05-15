import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { systemsService } from '../../services/Systems';
import { loadingStart } from '../../actions';

import { Screen } from '../presentation/Screen';
import { Option } from '../presentation/Option';
import { Action } from '../presentation/Action';
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
    const coreSystemsRepair = this.coreSystemsRepair();

    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="EmergencyScreen">
          <Screen title={this.props.title}>
            <ol>
              <li>{coreSystemsRepair}</li>
            </ol>
          </Screen>
        </div>
      </LoadingGuard>
    );
  }
  coreSystemsRepair() {
    const emergencyService = this.props.systems.emergency;

    emergencyService.coreSystemsRepairProgress(this.props.state);

    const coreSystemsRepairDetail =
      this.props.state.coreSystemsRepairProgress != null ?
      <span>
        Trying to nano repair basic systems, please wait... {
          this.props.state.coreSystemsRepairProgress
        }%
      </span> :
      <span>
        It may take a while. <Action onClick={() => emergencyService.coreSystemsRepairStart()}
          disabled={!emergencyService.isNeedsCoreSystemsRepair()}
        >
          Execute...
        </Action>
      </span>;

    return (
      <Option title="Core Systems Repair">
        Attempt to repair essential bootstrap systems. {coreSystemsRepairDetail}
      </Option>
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
    systems: systemsService(dispatch),
  };
}

export const EmergencyOption = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyOption);

export const EmergencyScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyScreen);
