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
import { useEffect } from 'react';
import { addItemToCart, getCartDetails } from '../../actions/cart';
import { useCartState } from '../Minicart/cartContext';

export default ({ queries }) => {
    const {
        createCartMutation,
        addToCartMutation,
        cartDetailsQuery,
        addVirtualItemMutation,
        addSimpleAndVirtualItemMutation,
        addConfigurableItemMutation
    } = queries;

    const [{ cartId, cart, isOpen, isLoading, isEditing, errorMessage }, dispatch] = useCartState();
    useEffect(() => {
        async function fn() {
            await getCartDetails({ cartDetailsQuery, dispatch, cartId });
        }

        fn();
    }, [cartId]);

    const addItem = async event => {
        if (!event.detail) return;

        const mapper = item => {
            return {
                data: {
                    sku: item.sku,
                    quantity: item.quantity
                }
            };
        };

        let physicalCartItems = event.detail.filter(item => !item.virtual).map(mapper);
        let virtualCartItems = event.detail.filter(item => item.virtual).map(mapper);
        let parentSkuEl = document.getElementById('parentSku');
        let configurableCartItem = null;

        if (parentSkuEl) {
            let parentSku = parentSkuEl.getAttribute('data-parent-sku');
            if (physicalCartItems.length > 0) {
                configurableCartItem = [
                    {
                        parent_sku: parentSku,
                        data: {
                            quantity: physicalCartItems[0].data.quantity,
                            sku: physicalCartItems[0].data.sku
                        }
                    }
                ]

            }
        }
        dispatch({ type: 'open' });
        dispatch({ type: 'beginLoading' });

        let addItemFn = addToCartMutation;
        if (parentSkuEl && physicalCartItems.length > 0 && physicalCartItems.length < 2) {
            addItemFn = addConfigurableItemMutation;
        } else if (physicalCartItems.length > 0 && virtualCartItems.length > 0) {
            addItemFn = addSimpleAndVirtualItemMutation;
        } else if (virtualCartItems.length > 0) {
            addItemFn = addVirtualItemMutation;
        }

        await addItemToCart({
            createCartMutation,
            addToCartMutation: addItemFn,
            cartDetailsQuery,
            cart,
            cartId,
            dispatch,
            physicalCartItems,
            virtualCartItems,
            configurableCartItem
        });
        dispatch({ type: 'endLoading' });
    };

    const data = { cartId, cart, isOpen, isLoading, isEditing, errorMessage };
    const api = { addItem, dispatch };

    return [data, api];
};
