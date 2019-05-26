
import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { systemsService } from '../../../services/Systems';

import { Option } from '../../presentation/Option';

class _EmergencyOption extends React.Component {
  render() {
    return (
      <span className="EmergencyOption">
        <Option title={this.props.title}>
          {this.props.text} <Link to="/emergency">{this.props.linkText}</Link>
        </Option>
      </span>
    );
  }
}

const mapStateToProps = (gameState) =>({
  title: gameState.systems.byName.emergency.title,
  text: systemsService().emergency.getOptionText(gameState.systems),
  linkText: systemsService().emergency.getLinkText(gameState.systems),
});

const mapDispatchToProps = (dispatch) => ({});

export const EmergencyOption = connect(
  mapStateToProps, mapDispatchToProps
)(_EmergencyOption);
