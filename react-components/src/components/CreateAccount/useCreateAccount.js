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
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { useAwaitQuery, useCookieValue } from '../../utils/hooks';
import { useUserContext } from '../../context/UserContext';
import { useCartState } from '../Minicart/cartContext';

import MUTATION_MERGE_CARTS from '../../queries/mutation_merge_carts.graphql';
import QUERY_CUSTOMER_CART from '../../queries/query_customer_cart.graphql';
import MUTATION_GENERATE_TOKEN from '../../queries/mutation_generate_token.graphql';
import MUTATION_CREATE_CUSTOMER from '../../queries/mutation_create_customer.graphql';
const accountLeadText = document.querySelector('p.createAccount__lead');
export default () => {
    const [{ cartId }, cartDispatch] = useCartState();
    const [, setUserCookie] = useCookieValue('cif.userToken');
    const [, setCartCookie] = useCookieValue('cif.cart');

    const [{ isSignedIn, createAccountError }, { dispatch, setToken }] = useUserContext();
    const [inProgress, setInProgress] = useState(false);

    const [mergeCarts] = useMutation(MUTATION_MERGE_CARTS);
    const fetchCustomerCart = useAwaitQuery(QUERY_CUSTOMER_CART);
    const [createCustomer] = useMutation(MUTATION_CREATE_CUSTOMER);
    const [generateCustomerToken] = useMutation(MUTATION_GENERATE_TOKEN);

    const handleCreateAccount = async formValues => {
        setInProgress(true);
        const {
            customer: { email, firstname, lastname },
            password
        } = formValues;
        try {
            const {
                data: {
                    createCustomer: { customer }
                }
            } = await createCustomer({
                variables: { email, password, firstname, lastname }
            });
            dispatch({ type: 'createAccountEarly' });
        } catch (error) {
            dispatch({ type: 'createAccountError', error });
        } finally {
            setInProgress(false);
        }
    };

    return [{ isSignedIn, createAccountError, inProgress }, { createAccount: handleCreateAccount }];
};
