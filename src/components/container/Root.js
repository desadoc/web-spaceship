import React from 'react';
import { connect } from 'react-redux';

import { Screen } from '../presentation/Screen';
import { EmergencyOption } from './Emergency';

class _RootScreen extends React.Component {
  render() {
    return (
      <div className="RootScreen">
        <Screen title={this.props.title}>
          <ol>
            <li><EmergencyOption /></li>
          </ol>
        </Screen>
      </div>
    );
  }
}

const mapStateToProps = (gameState) => {
  return {
    title: gameState.systems.title,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export const RootScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_RootScreen);
