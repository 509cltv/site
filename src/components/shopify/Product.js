import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    
    this.findImage = this.findImage.bind(this);
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0];
    
    return (
      <div className="Product__container" >

      <div className="Product" onClick={() => this.props.history.push('/item/' + this.props.product.title, {data: JSON.stringify(this.props.product)})}>
        {this.props.product.images.length ? <img src={variantImage.src} alt={`${this.props.product.title} product shot`}/> : null}
      </div>
        <div className="Product__overlay">
          <button className="Product__buy button" onClick={() => this.props.history.push('/item/' + this.props.product.title, {data: JSON.stringify(this.props.product)})}>Quick View</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);