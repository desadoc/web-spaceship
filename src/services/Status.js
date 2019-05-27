
import { systemsService } from './Systems';
import {
  STATUS_NORMAL,
  STATUS_CRITICAL,
  STATUS_EMERGENCY,
} from './Systems';

export class StatusService {
  *main() {

  }

  reducer(systemsState, action) {

  }

  getGeneralStatus(systemsState) {
    let status = STATUS_NORMAL;

    const energyProductionService = systemsService().engineering.energyProduction;

    if (energyProductionService.getStatus(systemsState) === STATUS_CRITICAL) {
      status = STATUS_CRITICAL;
    }

    if (energyProductionService.getStatus(systemsState) === STATUS_EMERGENCY) {
      status = STATUS_EMERGENCY;
    }

    return status;
  }

  getGeneralStatusText(systemsState) {
    const status = this.getGeneralStatus(systemsState);

    const messages = {
      [STATUS_NORMAL]: "All systems normal.",
      [STATUS_CRITICAL]: "Running backup systems, critical status.",
      [STATUS_EMERGENCY]: "General failure of all ship systems, emergency procedures necessary.",
    };

    return messages[status];
  }

  getTitle(systemsState) {
    return "Status";
  }

  getOptionText(systemsState) {
    return this.getGeneralStatusText(systemsState);
  }

  getLinkText(systemsState) {
    return "Details...";
  }

  getEnergyProductionStatusText(systemsState) {
    return systemsService().engineering.energyProduction.getStatusText(systemsState);
  }
}
