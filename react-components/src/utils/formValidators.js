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
import { sendEventToDataLayer } from '../utils/dataLayer';
const SUCCESS = undefined;

export const hasLengthAtLeast = (value, values, minimumLength) => {
    if (!value || value.length < minimumLength) {
        let error = `Must contain at least ${minimumLength} character(s).`;
        sendEventToDataLayer({ event: 'sazerac.cif.validation.has-length-at-least-error', error });

        return error;
    }

    return SUCCESS;
};

export const hasLengthAtMost = (value, values, maximumLength) => {
    if (value && value.length > maximumLength) {
        let error = `Must not exceed ${maximumLength} character(s).`;
        sendEventToDataLayer({ event: 'sazerac.cif.validation.has-length-at-most-error', error });

        return error;
    }

    return SUCCESS;
};

export const hasLengthExactly = (value, values, length) => {
    if (value && value.length !== length) {
        let error = `Must contain exactly ${length} character(s).`;
        sendEventToDataLayer({ event: 'sazerac.cif.validation.has-length-exactly-error', error });

        return error;
    }

    return SUCCESS;
};

export const isRequired = value => {
    if (!(value || '').trim()) {
        let error = 'The field is required.';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.is-required-error', error });

        return error;
    }
    return SUCCESS;
};

export const validatePhoneUS = value => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!regex.test(value)) {
        let error = 'Please enter a valid phone number (Ex: xxx-xxx-xxxx).';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-phone-us', error });

        return error;
    }
    return SUCCESS;
}

export const validateEmail = value => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(value)) {
        let error = 'Please enter a valid email address (Ex: johndoe@domain.com).';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-email', error });

        return error;
    }
    return SUCCESS;
};

export const validateRegionCode = (value, values, countries) => {
    const country = countries.find(({ id }) => id === 'US');

    if (!country) {
        let error = 'Country "US" is not an available country.';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-region-code', error });

        return error;
    }
    const { available_regions: regions } = country;

    if (!(Array.isArray(regions) && regions.length)) {
        let error = 'Country "US" does not contain any available regions.';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-region-code', error });

        return error;
    }
    const region = regions.find(({ code }) => code === value.toUpperCase());
    if (!region) {
        let error = `State "${value}" is not an valid state abbreviation (Ex: LA).`;
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-region-code', error });

        return error;
    }

    return SUCCESS;
};

export const validateZip = value => {
    const regex = /^\d{5}$|^\d{5}-\d{4}$/;

    if (!regex.test(value)) {
        let error = 'Please enter a valid zip code.';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-zip', error });

        return error;
    }
    return SUCCESS;
};



export const validatePassword = value => {
    const count = {
        lower: 0,
        upper: 0,
        digit: 0,
        special: 0
    };

    for (const char of value) {
        if (/[a-z]/.test(char)) count.lower++;
        else if (/[A-Z]/.test(char)) count.upper++;
        else if (/\d/.test(char)) count.digit++;
        else if (/\S/.test(char)) count.special++;
    }

    if (Object.values(count).filter(Boolean).length < 3) {
        let error = 'A password must contain at least 3 of the following: lowercase, uppercase, digits, special characters.';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-password', error });

        return error;
    }

    return SUCCESS;
};

export const validateConfirmPassword = (value, values, passwordKey = 'password') => {
    if (value != values[passwordKey]) {
        let error = 'Passwords must match.';
        sendEventToDataLayer({ event: 'sazerac.cif.validation.validate-confirm-password', error });

        return error;
    }
    return SUCCESS;
};
