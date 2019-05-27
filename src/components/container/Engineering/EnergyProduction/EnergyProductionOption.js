
import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { systemsService } from "../../../../services/Systems";

import { Option } from '../../../presentation/Option';

class _EnergyProductionOption extends React.Component {
  render() {
    return(
      <span className="EnergyProductionOption">
        <Option title={this.props.title}>
          {this.props.text} <Link to="/engineering/energy-production">{this.props.linkText}</Link>
        </Option>
      </span>
    );
  }
}

const mapStateToProps = (gameState) => ({
  title: systemsService().engineering.energyProduction.getTitle(gameState.systems),
  text: systemsService().engineering.energyProduction.getOptionText(gameState.systems),
  linkText: systemsService().engineering.energyProduction.getLinkText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({

});

export const EnergyProductionOption = connect(
  mapStateToProps, mapDispatchToProps
)(_EnergyProductionOption);