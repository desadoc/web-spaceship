
export function waitCondition(owner, condition) {
  return new Promise(resolve => {
    const conditionWrapper = (systemsState) => {
      if (condition(systemsState)) {
        resolve();
      }
    };
  
    owner.addCondition(conditionWrapper);
  });
}

export class BaseService {
  constructor() {
    this.conditions = [];
  }

  addCondition(condition) {
    this.conditions.push(condition);
  }

  processConditions(systemsState) {
    const toKeep = [];

    for (var i=0; i<this.conditions.length; i++) {
      const condition = this.conditions[i];

      if (!condition(systemsState)) {
        toKeep.push(condition);
      }
    }

    this.conditions = toKeep;
  }
  
  update() {

  }
}