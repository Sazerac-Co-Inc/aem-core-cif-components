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
import { func } from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';

import Trigger from '../Trigger';
import { useUserContext } from '../../context/UserContext';
import classes from './createAccountSuccess.css';
import { useEffect } from 'react';

const CreateAccountSuccess = props => {
    const [t] = useTranslation('account');
    const { showSignIn } = props;
    const [{ createAccountEmail }, { dispatch }] = useUserContext();

    useEffect(() => {
        return () => {
            dispatch({ type: 'cleanupAccountCreated' });
        };
    });

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <h2 className={classes.header}>
                    {t('account:account-created-title', 'Your account was successfully created')}
                </h2>
                <div className={classes.textBlock}>
                    {/* prettier-ignore */}
                    <Trans i18nKey="account:email-confirmation-info">
                        Please click 'SIGN IN' below and log in with <b>{{ email: createAccountEmail }}</b>.
                    </Trans>
                </div>
                <div className={classes.actions}>
                    <Trigger action={showSignIn}>
                        <span className={classes.signin}>{t('account:sign-in', 'Sign In')}</span>
                    </Trigger>
                </div>
            </div>
        </div>
    );
};

CreateAccountSuccess.propTypes = {
    showSignIn: func.isRequired
};

export default CreateAccountSuccess;
