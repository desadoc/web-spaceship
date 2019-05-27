

export class StatusService {
  *main() {

  }

  reducer(systemsState, action) {

  }

  getTitle(systemsState) {
    return "Status";
  }

  getOptionText(systemsState) {
    return "General failure of all ship systems, please intervene.";
  }

  getLinkText(systemsState) {
    return "Details...";
  }

  getEnergyProductionStatusText(systemsState) {
    return "Only fallback emergency supply.";
  }
}
