
import { match } from '../../reducers';

import {
  ENERGY_PRODUCTION_AUXILIAR_REPAIRED,
} from '../../actions';

import {
  STATUS_NORMAL,
  STATUS_CRITICAL,
  STATUS_EMERGENCY,
  STATUS_NEEDS_REPAIR,
} from '../Systems';

export class EnergyProduction {
  *main() {

  }

  reducer(systemsState, action) {
    match(
      action, ENERGY_PRODUCTION_AUXILIAR_REPAIRED,
      () => systemsState.byName.engineering.energyProduction.auxiliar.status = STATUS_NORMAL
    );
  }

  getTitle(systemsState) {
    return "Energy Production";
  }

  getOptionText(systemsState) {
    const statusText = this.getStatusText(systemsState);

    return `Ship's power generators. ${statusText} Power available: ${this.getPowerAvailable(systemsState)}.`;
  }

  getLinkText(systemsState) {
    return "Details...";
  }

  getStatus(systemsState) {
    let status = STATUS_EMERGENCY;

    if (this.getAuxiliarGeneratorStatus(systemsState) === STATUS_NORMAL) {
      status = STATUS_CRITICAL;
    }

    return status;
  }

  getStatusText(systemsState) {
    const status = this.getStatus(systemsState);

    const messages = {
      [STATUS_NORMAL]: "Normal power production.",
      [STATUS_CRITICAL]: "Auxiliar generator online, critical status",
      [STATUS_EMERGENCY]: "Only backup power available, immediate action required.",
    };

    return messages[status];
  }

  getPowerAvailable(systemsState) {
    let power = 0;

    if (this.getEmergencyGeneratorStatus(systemsState) === STATUS_NORMAL) {
      power += 0.05;
    }

    if (this.getAuxiliarGeneratorStatus(systemsState) === STATUS_NORMAL) {
      power += 0.25;
    }

    return power;
  }

  getEmergencyGeneratorStatus(systemsState) {
    return systemsState.byName.engineering.energyProduction.emergency.status;
  }

  getEmergencyGeneratorText(systemsState) {
    return "Produces some supply from auxiliary sources, i.e., gravity, radiation and heat."
  }

  getAuxiliarGeneratorStatus(systemsState) {
    return systemsState.byName.engineering.energyProduction.auxiliar.status;
  }

  getAuxiliarGeneratorText(systemsState) {
    const status = this.getAuxiliarGeneratorStatus(systemsState);
    const baseText = "A small fusion reactor. Usually only active during maintenances.";

    if (status === STATUS_NORMAL) {
      return `${baseText} Status: normal.`;
    }

    if (status === STATUS_NEEDS_REPAIR) {
      return `${baseText} Status: out of service.`;
    }

    return `${baseText} Status: unknown.`;
  }

}