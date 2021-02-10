/*******************************************************************************
 *
 *    Copyright 2019 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/
import React from 'react';
import { array, shape, string } from 'prop-types';

import Product from './product';
import classes from './productList.css';

const ProductList = props => {
    const { cartItems } = props;
    let normalProducts = [];
    let normalProductsCount = 0;
    let alcoholProducts = [];
    let alcoholProductsCount = 0;
    cartItems.forEach(item => {
        if (item.product.is_alcohol_product) {
            alcoholProducts.push(item);
            alcoholProductsCount += item.quantity;
        } else {
            normalProducts.push(item);
            normalProductsCount += item.quantity;
        }
    });
    return (
        <div>
            {normalProducts.length >= 1 &&
                <div className="productList__Wrapper">
                    <div className={classes.header}>
                        <h4 className={classes.headerTitle}>Shipping</h4>
                        <span>{normalProductsCount} {normalProductsCount > 1 ? 'items' : 'item'}</span>
                    </div>
                     <ul className={classes}>
                        {normalProducts.map(item => (
                            <Product key={item.id} item={item} />
                        ))}
                    </ul>
                </div>
            }

            {alcoholProducts.length >= 1 &&
                <div className="productList__Wrapper">
                    <div className={classes.header}>
                        <h4 className={classes.headerTitle}>Curbside Pick-up</h4>
                        <span>{alcoholProductsCount} {alcoholProductsCount > 1 ? 'items' : 'item'}</span>
                    </div>
                     <ul className={classes}>
                        {alcoholProducts.map(item => (
                            <Product key={item.id} item={item} />
                        ))}
                    </ul>
                </div>
            }
        </div>

    );
};

ProductList.propTypes = {
    cartItems: array,
    classes: shape({
        root: string
    })
};

export default ProductList;
