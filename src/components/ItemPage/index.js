import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.scss';
import { connect } from 'react-redux';
import store from '../../store';
import VariantSelector from '../VariantSelector/index';

class ItemPage extends Component {

  constructor(props) {
    super(props);
    this.data = JSON.parse(this.props.history.location.state.data);
    let defaultOptionValues = {};
    this.data.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = {selectedVariantQuantity: 1,
                  selectedOptions: defaultOptionValues,
                  imageChoice: this.data.images[0].src,
                  selected: this.data.images[0].id};
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.variantForOptions = this.variantForOptions.bind(this);
    this.findImage = this.findImage.bind(this);

  }
  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  variantForOptions(product, options) {
    return product.variants.find(function (variant) {
      return variant.selectedOptions.every(function (selectedOption) {
        return options[selectedOption.name] === selectedOption.value.valueOf();
      });
    });
  }

  handleOptionChange(event) {
    let selectedOptions = this.state.selectedOptions;
    selectedOptions["Size"] = event;
    const selectedVariant = this.variantForOptions(this.data, selectedOptions)
    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.image
    });
  }

  handleQuantityChange(event, id) {
    event.preventDefault();
    let prev = this.state.selectedVariantQuantity;
    if (id === "plus") {
      this.setState({
        selectedVariantQuantity: prev + 1
      });
    } else {
      if (prev > 1) {
        this.setState({
          selectedVariantQuantity: prev - 1
        })
      }
    }
  }

  addVariantToCart(variantId, quantity) {
    const state = store.getState(); // state from redux store
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: {isCartOpen: true, checkout: res}});
    });
  }

  render() {
    let variant = this.state.selectedVariant || this.data.variants[0]
    let variantSelectors = this.data.options.map((option) => {
      return (
        <VariantSelector
          handleOptionChange={(e) => this.handleOptionChange(e)}
          key={option.id.toString()}
          option={option}
        />
      );
    });
    return (
      <div className="itemPageWrapper">
        <div className="itemImgWrapper" >
          <div className="itemImages">
            <img src={this.state.imageChoice} alt={`${this.data.title} product shot`}/>
            <div className="underImageContainer">
              {this.data.images.map((image) => {
                let smallImage = image.src.replace(".png", "_small.png");
                return(
                  <button className="underImageButton" type="submit" onClick={() => this.setState({imageChoice: image.src, selected: image.id})}>
                    <img className={this.state.selected === image.id ? "underImage selected" : "underImage"} src={smallImage} alt="alternative"/>
                  </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="itemInfoWrapper">
        <Link className="backLink" to="/all">
            <span className="small">
              <svg fill="#000000" height="13" viewBox="0 0 18 15" width="13" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </span>All Items
          </Link>
          <h3 className="itemName">{this.data.title}</h3>
          <p className="itemDescription">
            {this.data.description}
          </p>
          <p className="itemCost frm">${variant.price}</p>
          <div className="itemOptions">
            {this.state.selectedOptions.Title ? <div></div> : <div className="optionsFlex">
              <label className="ProductOption">
                Select a size
              </label>
              {variantSelectors}
            </div>}
            <div className="optionsFlex">
              <label className="ProductOption">
              </label>
              <button className="ProductBuy itemPage" onClick={(e) => this.addVariantToCart(variant.id, this.state.selectedVariantQuantity)}>Add to cart</button>
            </div>
            <div className="optionsFlex">
              <div className="faqs" onClick={() => { const cur = this.state.fit; this.setState({fit: !cur})}}>Size & Fit</div>
              <div className={this.state.fit ? "details active" : "details"}>
                This is true to size
              </div>
            </div>
            <div className="optionsFlex">
              <div className="faqs" onClick={() => { const cur = this.state.fabric; this.setState({fabric: !cur})}}>Fabric & Care</div>
              <div className={this.state.fabric ? "details active" : "details"}>
                This is a test
              </div>
            </div>
            <div className="optionsFlex">
              <div className="faqs" onClick={() => { const cur = this.state.other; this.setState({other: !cur})}}>Other</div>
              <div className={this.state.other ? "details active" : "details"}>
                This is a test
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect((state) => state)(ItemPage));
