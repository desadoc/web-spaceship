
import React from 'react';
import { connect } from 'react-redux';

import { userInterfaceService } from '../../../services/UserInterface';

import { CoreSystemsRepairOption } from './CoreSystemsRepairOption';

import {
  Screen, ScreenTitle, ScreenNotifications, ScreenItems, ScreenFooter
} from '../../presentation/Screen';
import { LoadingGuard } from '../../presentation/LoadingGuard';

class _EmergencyScreen extends React.Component {
  componentDidMount() {
    this.props.loadingStart();
  }

  render() {
    const navOptions = [
      ['Home', '/'],
    ];

    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="EmergencyScreen">
          <Screen>
            <ScreenTitle>{this.props.title}</ScreenTitle>

            <ScreenItems>
              <ol>
                <li key="coreSystemRepair"><CoreSystemsRepairOption /></li>
              </ol>
            </ScreenItems>

            <ScreenFooter nav={navOptions} />
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
    name: state.name,
    title: state.title,
    loading: userInterfaceService().isLoading(gameState.uiState, 'emergency'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadingStart: () => dispatch(userInterfaceService().loadingStart('emergency')),
});

export const EmergencyScreen = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyScreen);
