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
import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';

import { Price } from '@magento/peregrine';
import { useTranslation } from 'react-i18next';

import PaymentMethodSummary from './paymentMethodSummary';
import ShippingAddressSummary from './shippingAddressSummary';
import ShippingMethodSummary from './shippingMethodSummary';
import LoadingIndicator from '../LoadingIndicator';
import Section from './section';
import Button from '../Button';
import useOverview from './useOverview';
import { useCartState } from '../Minicart/cartContext';

/**
 * The Overview component renders summaries for each section of the editable
 * form.
 */
const Overview = props => {
    const { classes } = props;
    const [t] = useTranslation('checkout');

    const [
        { shippingAddress, shippingMethod, paymentMethod, cart, inProgress },
        { placeOrder, checkoutDispatch }
    ] = useOverview();

    const ready = (cart.is_virtual && paymentMethod) || (shippingAddress && paymentMethod && shippingMethod);

    const [{ useCartShipping }] = useCartState();


    if (inProgress) {
        return <LoadingIndicator message="Placing order"></LoadingIndicator>;
    }
    const submitOrder = async () => {
        await placeOrder(cart.id);
    };

    let taxTotal = 0;
    cart.prices.applied_taxes.forEach(el => taxTotal += el.amount.value);
    // TODO figure out what to do with shipping addresses array. May need to get selected address cost different if costs are complex?
    // Currently getting cost of first address in array
    let shippingTotal = 0;
    console.log(cart);
    if (shippingMethod && cart.shipping_addresses[0].selected_shipping_method) {
        shippingTotal = cart.shipping_addresses[0].selected_shipping_method.amount.value;
    }

    return (
        <Fragment>
            <div className={classes.body}>
                {(!cart.is_virtual && useCartShipping) && (
                    <Section
                        label={t('checkout:ship-to', 'Ship To')}
                        onClick={() => {
                            checkoutDispatch({ type: 'setEditing', editing: 'address' });
                        }}
                        showEditIcon={!!shippingAddress}>
                        <ShippingAddressSummary classes={classes} />
                    </Section>
                )}
                <Section
                    label={t('checkout:pay-with', 'Pay With')}
                    onClick={() => {
                        checkoutDispatch({ type: 'setEditing', editing: 'paymentMethod' });
                    }}
                    showEditIcon={!!paymentMethod}
                    disabled={!cart.is_virtual && !shippingAddress && useCartShipping}>
                    <PaymentMethodSummary classes={classes} />
                </Section>
                {!cart.is_virtual && (
                    <Section
                        label={t('checkout:use', 'Use')}
                        onClick={() => {
                            checkoutDispatch({ type: 'setEditing', editing: 'shippingMethod' });
                        }}
                        showEditIcon={!!shippingMethod}
                        disabled={!shippingAddress}>
                        <ShippingMethodSummary classes={classes} />
                    </Section>
                )}
                <Section label={t('checkout:total', 'TOTAL')}>
                    <Price currencyCode={cart.prices.grand_total.currency} value={cart.prices.grand_total.value || 0} /> <span className="total-includes">(includes ${taxTotal} Tax, ${shippingTotal} Shipping)</span>
                    <br />
                    <span>{cart.total_quantity} Items</span>
                </Section>
            </div>
            <div className={classes.footer}>
                <Button onClick={() => checkoutDispatch({ type: 'cancelCheckout' })}>
                    {' '}
                    {t('checkout:back-to-cart', 'Back to cart')}
                </Button>

                <Button priority="high" disabled={!ready} onClick={submitOrder}>
                    {t('checkout:confirm-order', 'Place Order')}
                </Button>
            </div>
        </Fragment>
    );
};

Overview.propTypes = {
    classes: shape({
        body: string,
        footer: string
    })
};

export default Overview;
