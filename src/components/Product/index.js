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
    let smallImage = variantImage.src.replace(".png", "_small.png");
    const {imageLoaded} = this.state;
    
    return (
      <div className="ProductContainer" >

      <div className="Product" onClick={() => this.props.history.push('/item/' + this.props.product.title, {data: JSON.stringify(this.props.product)})}>
        {this.props.product.images.length ? 
          <img onLoad={() => this.setState({imageLoaded: true})} src={variantImage.src} alt={`${this.props.product.title} product shot`}/> 
          : null}
          <img className="overlayStyles" alt="overlayStyles" src={smallImage} {...imageLoaded && {style: {opacity: 0 }}} />
      </div>
        <div className="ProductOverlay">
          <button className="ProductBuy button" onClick={() => this.props.history.push('/item/' + this.props.product.title, {data: JSON.stringify(this.props.product)})}>Quick View</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);