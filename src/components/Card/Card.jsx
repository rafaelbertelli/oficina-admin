import React, { Component } from "react";
import Button from "components/CustomButton/CustomButton.jsx";

export class Card extends Component {
  render () {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 className="title">{this.props.title}</h4>
              <p className="category">{this.props.category}</p>
            </div>

            {this.props.hasOnClick &&
              <div>
                <Button bsStyle="success" pullRight fill type="submit" onClick={this.props.handleClick}>
                  {this.props.btnText}
                </Button>
              </div>
            }
          </div>

        </div>
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Card;
