import React from 'react';
import { connect } from 'react-redux';

import { loadingStart } from '../../actions';

import { Screen } from '../presentation/Screen';
import { EmergencyOption } from './Emergency';
import { LoadingGuard } from '../presentation/LoadingGuard';

class _RootScreen extends React.Component {
  componentDidMount() {
    this.props.loadingStart();
  }
  render() {
    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="RootScreen">
          <Screen title={this.props.title}>
            <ol>
              <li><EmergencyOption /></li>
            </ol>
          </Screen>
        </div>
      </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => {
  return {
    title: gameState.systems.byName.root.title,
    loading: gameState.uiState.byName.root.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadingStart: () => dispatch(loadingStart('root', 500)),
  };
}

export const RootScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_RootScreen);
