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

/*
  Views:
      SIGNIN - the signing modal is open
      MENU - the default view
      CREATE_ACCOUNT - the create account modal
      MY_ACCOUNT - the account props modal
      ACCOUNT_CREATED - the account created success message modal
      FORGOT_PASSWORD - the forgot password modal
      CHANGE_PASSWORD - the change password modal

*/

// DOM events that are used to talk to the navigation panel
const events = {
    START_ACC_MANAGEMENT: 'aem.accmg.start',
    EXIT_ACC_MANAGEMENT: 'aem.accmg.exit'
};

// a map of the UI states so we can properly handle the "BACK" button

const startAccMgEvent = new CustomEvent(events.START_ACC_MANAGEMENT);
const exitAccMgEvent = new CustomEvent(events.EXIT_ACC_MANAGEMENT);

const navigationPanel = document.querySelector('aside.navigation__root');
const dispatchEvent = event => navigationPanel && navigationPanel.dispatchEvent(event);

const stepTitles = {
    CREATE_ACCOUNT: t => t('account:create-account', 'Create account'),
    FORGOT_PASSWORD: t => t('account:password-recovery', 'Password recovery'),
    CHANGE_PASSWORD: t => t('account:change-password', 'Change Password'),
    MY_ACCOUNT: t => t('account:my-account', 'My account'),
    ACCOUNT_CREATED: t => t('account:account-created', 'Account created'),
    UPDATE_BILLING_ADDRESS: t => t('account:change-billing-address', 'Change Billing Address'),
    UPDATE_SHIPPING_ADDRESS: t => t('account:change-shipping-address', 'Change Shipping Address'),
    ORDER_HISTORY: t => t('account:see-your-orders', 'See your orders'),
    SIGN_IN: t => t('account:sign-in', 'Sign In')
};

export const showSignIn = ({ dispatch, t }) => {
    const view = 'SIGN_IN';
    dispatchEvent(startAccMgEvent);
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
    // event for datalayer
    const showSignInEvent = new CustomEvent('sazerac.cif.show-sign-in', {
        bubbles: true,
        detail: { event: 'sazerac.cif.show-sign-in' }
    });
    document.dispatchEvent(showSignInEvent);
};

export const showMenu = ({ dispatch, t }) => {
    dispatch({ type: 'changeView', view: 'MENU' });
    dispatchEvent(exitAccMgEvent);
    // event for datalayer
    const showMenuEvent = new CustomEvent('sazerac.cif.show-menu-event', {
        bubbles: true,
        detail: { event: 'sazerac.cif.show-menu-event' }
    });
    document.dispatchEvent(showMenuEvent);
};

export const showMyAccount = ({ dispatch, t }) => {
    const view = 'MY_ACCOUNT';
    dispatchEvent(startAccMgEvent);
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
    // event for datalayer
    const showMyAccount = new CustomEvent('sazerac.cif.show-my-account', {
        bubbles: true,
        detail: { event: 'sazerac.cif.show-my-account' }
    });
    document.dispatchEvent(showMyAccount);
};

export const showUpdateCustomerBillingAddress = ({ dispatch, t }) => {
    const view = 'UPDATE_BILLING_ADDRESS';
    dispatchEvent(startAccMgEvent);
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
};

export const showUpdateCustomerShippingAddress = ({ dispatch, t }) => {
    const view = 'UPDATE_SHIPPING_ADDRESS';
    dispatchEvent(startAccMgEvent);
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
};

export const showOrderHistory = ({ dispatch, t }) => {
    const view = 'ORDER_HISTORY';
    dispatchEvent(startAccMgEvent);
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
};

export const showChangePassword = ({ dispatch, t }) => {
    const view = 'CHANGE_PASSWORD';
    dispatchEvent(startAccMgEvent);
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
};

export const showForgotPassword = ({ dispatch, t }) => {
    const view = 'FORGOT_PASSWORD';
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
};

export const showCreateAccount = ({ dispatch, t }) => {
    const view = 'CREATE_ACCOUNT';
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
};

export const showAccountCreated = ({ dispatch, t }) => {
    const view = 'ACCOUNT_CREATED';
    dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: stepTitles[view](t) } }));
    dispatch({ type: 'changeView', view });
};

export const showView = ({ dispatch, t, view }) => {
    const title = stepTitles[view];
    if (title) {
        dispatchEvent(new CustomEvent('aem.accmg.step', { detail: { title: title(t) } }));
        dispatch({ type: 'changeView', view });
    }
};
