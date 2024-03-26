// plugins/vee-validate.js

import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { configure } from 'vee-validate';


  Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
  });
  extend('confirmpassword', {
    params: ['target'],
    validate(value, { target }) {
        return value === target;
    },
    message: 'Password confirmation does not match'
});

extend('password', {
    params: ['target'],
    validate(value) {
        let pattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        return pattern.test(value);
    },
    message: 'Password must contain at least 6 characters, capital letters and numbers'
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // ...
  }
})
