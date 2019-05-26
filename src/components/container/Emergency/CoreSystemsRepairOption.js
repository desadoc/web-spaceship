
import React from 'react';
import { connect } from 'react-redux';

import { systemsService } from '../../../services/Systems';

import { Action } from '../../presentation/Action';
import { Option } from '../../presentation/Option';

export class _CoreSystemRepairOption extends React.Component {
  render() {
    const repairAvailableDetail = (
      <span>
        {this.props.repairAvailableText} <Action onClick={this.props.repairStart}
          disabled={!this.props.isNeedsRepairs}
        >
          {this.props.executeRepairActionText}
        </Action>
      </span>
    );

    const repairingDetail = (
      <span>
        {this.props.repairingText} {this.props.repairProgress}%
      </span>
    );

    const detail = this.props.isRepairing ? repairingDetail : repairAvailableDetail;

    return (
      <Option title="Core Systems Repair">
        {this.props.text} {detail}
      </Option>
    );
  }
}

const mapStateToProps = (gameState) =>({
  isNeedsRepairs: systemsService().emergency.coreSystemsRepair.isNeedsRepairs(gameState.systems),
  isRepairing: systemsService().emergency.coreSystemsRepair.isRepairing(gameState.systems),
  repairProgress: systemsService().emergency.coreSystemsRepair.getProgress(gameState.systems),

  text: systemsService().emergency.coreSystemsRepair.getOptionText(gameState.systems),
  repairAvailableText: systemsService().emergency.coreSystemsRepair.getRepairAvailableText(gameState.systems),
  executeRepairActionText: systemsService().emergency.coreSystemsRepair.getExecuteRepairActionText(gameState.systems),
  repairingText: systemsService().emergency.coreSystemsRepair.getRepairingText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({
  repairStart: () => dispatch(systemsService().emergency.coreSystemsRepair.start()),
});

export const CoreSystemsRepairOption = connect(
  mapStateToProps, mapDispatchToProps
)(_CoreSystemRepairOption);
