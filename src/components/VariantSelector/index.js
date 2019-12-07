import React, {Component} from 'react';
import './styles.scss'

class VariantSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "XS"
    }
  }
  render() {
    return (
      <div className="ProductSize" id="dropdown-basic-button">
         {this.props.option.values.map((value, index) => {
          
          return (
            <button className={this.state.size === value.value ? "sizeButton selected" : "sizeButton unselected"} type="button" onClick={(e) => {this.props.handleOptionChange(value.value); this.setState({size: value.value})}} value={value.value}>{value.value}</button>
          )
        })}
      </div>
    );
  }
}

export default VariantSelector;