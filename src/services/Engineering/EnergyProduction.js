
export class EnergyProduction {
  *main() {

  }

  reducer(systemsState, action) {
    
  }

  getTitle(systemsState) {
    return "Energy Production";
  }

  getOptionText(systemsState) {
    return "Ship's energy generators."
  }

  getLinkText(systemsState) {
    return "Details...";
  }

  getEmergencyGeneratorText(systemsState) {
    return "Produces energy from auxiliary sources, i.e., gravity, radiation and heat. Low power only."
  }
}