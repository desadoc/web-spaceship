
import React from 'react';
import { connect } from 'react-redux';

import { systemsService } from '../../../services/Systems';

import { LoadingGuard } from '../../presentation/LoadingGuard';
import { Screen } from '../../presentation/Screen';
import { Option } from '../../presentation/Option';

class _StatusScreen extends React.Component {
  render() {
    return (
      <LoadingGuard enabled={this.props.loading}>
      <div className="StatusScreen">
        <Screen title={this.props.title}>
          <ol>
            <li key="energyProduction">
              <Option title="Energy Production">
                {this.props.energyProductionStatusText}
              </Option>
            </li>
          </ol>
        </Screen>
      </div>
    </LoadingGuard>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: systemsService().status.getTitle(gameState.systems),
  energyProductionStatusText: systemsService().status.getEnergyProductionStatusText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({

});

export const StatusScreen = connect(
  mapStateToProps, mapDispatchToProps,
)(_StatusScreen);
