const express = require('express');
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
const router = new express.Router();
const requirements = require('../config/settings').requirements;
const { common: commonMessages, user: messages } = require('../services/messages');
const { isString } = require('../services/type');

function validateSignupForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';  
  if (!payload || !isString(payload.firstName) || payload.firstName.trim().length < requirements.minFirstNameLength) {
    isFormValid = false;
    errors.firstName = messages.requiredFirstNameLength(requirements.minFirstNameLength);
  }

  if (!payload || !isString(payload.lastName) || payload.lastName.trim().length < requirements.minLastNameLength) {
    isFormValid = false;
    errors.lastName = messages.requiredLastNameLength(requirements.minLastNameLength);
  }
  
  if (!payload || !isString(payload.email) || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = messages.incorrectEmail;
  }
  
  let password = (!payload || !payload.password || !isString(payload.password)) ? '' : payload.password.trim();
  if (password.length < requirements.minPasswordLength) {
    isFormValid = false;
    errors.password = messages.requiredPasswordLength(requirements.minPasswordLength);
  }

  if (!isFormValid) {
    message = messages.invalidForm;
  }

  return { success: isFormValid, message, errors };
}

function validateLoginForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || !isString(payload.email) || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = messages.requiredEmail;
  }
  
  if (!payload || !isString(payload.password) || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = messages.requiredPassword;
  }

  if (!isFormValid) {
    message = messages.invalidForm;
  }

  return { success: isFormValid, message, errors };
}

router.get('/allRegular', (_req, res) => {
  User.find({}).then(users => {
    const usersNotInAdminRole = [];
    users.forEach(user => {
      if (!user.roles.includes('Admin')) {
        usersNotInAdminRole.push(user);
      }
    });
    return res.status(200).json({
      success: true,
      message: messages.fetchedUserWithoutAdminRole,
      users: usersNotInAdminRole
    });
  }).catch(error => {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  });
});

router.post('/signin', (req, res, next) => {
  const result = validateLoginForm(req.body);
  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(200).json({
          success: false,
          message: err.message
        });
      }

      return res.status(200).json({
        success: false,
        message: messages.unprocessableForm
      });
    }

    return res.json({
      success: true,
      message: messages.loginSuccess,
      token,
      user: userData
    });
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {
  const result = validateSignupForm(req.body);
  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(200).json({
        success: false,
        message: err
      });
    }
    
    return res.status(200).json({
      success: true,
      message: messages.registerSuccess
    });
  })(req, res, next);
});

router.get('/setadmin/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id).then(user => {
    if (!user.roles.includes('Admin')) {
      user.roles.push('Admin');
      user.save().then(() => {
        return res.status(200).json({
          success: true,
          message: messages.setAdminRoleSuccessfully(user)
        });
      }).catch(error => {
        return res.status(400).json({
          success: false,
          message: error.message
        })
      });
    }
  }).catch(error => {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  });
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id).then(user => {
    return res.status(200).json({
      success: true,
      message: messages.getUser,
      user
    })
  }).catch(err => {
    return res.status(400).json({
      success: false,
      message: err.message
    })
  });
});

router.post('/addinfo/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (body) {
    const { info } = body;
    User.findById(id).then(user => {
      user.info = info;
      user.save().then(() => {
        return res.status(200).json({
          success: true,
          message: messages.addedOrEditedInfo
        });
      }).catch(err => {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      });
    }).catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    });
  } else {
    return res.status(400).json({
      success: false,
      message: commonMessages.requiredBody
    });
  }
});

module.exports = router;