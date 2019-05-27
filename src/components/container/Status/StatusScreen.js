
import React from 'react';
import { connect } from 'react-redux';

import { systemsService } from '../../../services/Systems';
import { userInterfaceService } from '../../../services/UserInterface';

import { LoadingGuard } from '../../presentation/LoadingGuard';
import {
  Screen, ScreenTitle, ScreenNotifications, ScreenItems, ScreenFooter
} from '../../presentation/Screen';
import { Option } from '../../presentation/Option';

class _StatusScreen extends React.Component {
  componentDidMount() {
    this.props.loadingStart();
  }

  render() {
    const navOptions = [
      ['Home', '/'],
    ];

    return (
      <LoadingGuard enabled={this.props.loading}>
        <div className="StatusScreen">
          <Screen>
            <ScreenTitle>{this.props.title}</ScreenTitle>
            <ScreenNotifications />

            <ScreenItems>
              <ol>
                <li key="energyProduction">
                  <Option title="Energy Production">
                    {this.props.energyProductionStatusText}
                  </Option>
                </li>
              </ol>
            </ScreenItems>
            
            <ScreenFooter nav={navOptions} />
          </Screen>
        </div>
      </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: systemsService().status.getTitle(gameState.systems),
  energyProductionStatusText: systemsService().status.getEnergyProductionStatusText(gameState.systems),
  loading: userInterfaceService().isLoading(gameState.uiState, 'status'),
});

const mapDispatchToProps = (dispatch) => ({
  loadingStart: () => dispatch(userInterfaceService().loadingStart('status')),
});

export const StatusScreen = connect(
  mapStateToProps, mapDispatchToProps,
)(_StatusScreen);
