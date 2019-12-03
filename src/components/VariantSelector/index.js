import React, {Component} from 'react';
import './styles.sass'

class VariantSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: null
    }
  }
  render() {
    return (
      <div className="Product__size" id="dropdown-basic-button">
         {this.props.option.values.map((value) => {
          return (
            <input className={this.state.size === value.value ? "input__button selected" : "input__button"} type="button" key={value.value} onClick={(e) => {this.props.handleOptionChange(value.value); this.setState({size: value.value})}} value={value.value}></input>
          )
        })}
      </div>
    );
  }
}

export default VariantSelector;