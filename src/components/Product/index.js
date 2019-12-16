import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {StyleSheet, css} from 'aphrodite';
import { fadeIn } from 'react-animations';
// import animate from './Spinner.gif';
import './styles.scss';
import Img from 'react-image';
import Preloader from '../Preloader/index';

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
    const {imageLoaded} = this.state;
    const styles = StyleSheet.create({
      fadeIn: {
        animationName: fadeIn,
        animationDuration: '1s'
      }
    });
    return (
      
      <div className="ProductContainer" >
        <div className="Product" onClick={() => this.props.history.push('/item/' + this.props.product.title, {data: JSON.stringify(this.props.product)})}>
          {/* {this.props.product.images.length ? <div className={css(styles.fadeIn)}>
            <img onLoad={() => this.setState({imageLoaded: true})} src={variantImage.src} alt={`${this.props.product.title} product shot`}/></div> 
            : null}
          <img className="overlayStyles" alt="overlayStyles" src={animate} {...imageLoaded && {style: {display: 'none'}}} /> */}
          <Img src={variantImage.src} container={children => {return <div className={css(styles.fadeIn)}>{children}</div>}} loader={<Preloader/>} alt={this.props.product.title}/>
        </div>
        <div className="ProductOverlay">
          <button className="ProductBuy button" onClick={() => this.props.history.push('/item/' + this.props.product.title, {data: JSON.stringify(this.props.product)})}>Quick View</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);