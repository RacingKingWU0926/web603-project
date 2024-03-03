const bodyParser = require('body-parser');
const passport = require('passport');

// local authentication on user
const User = require('../models/user.model');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.createUser = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username });

  // save an user in MongoDB
  User.register(newUser, password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/api/users/new');
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect(`/api/users/${req.params.id}`);
    });
  });
};

exports.getUser = (req, res) => {
  User
  .findById(req.params.id).select('-__v')
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: `No user found with id ${req.params.id}`,
        error: 'user not found'
      });
    }
    res.status(200).json(user)
  })
  .catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `User not found with id ${req.params.id}`,
        error: err.message
      });
    }
    return res.status(500).send({
      message: `Error retrieving the user with id ${req.params.id}`,
      error: err.message
    });
  });
};

exports.listUsers = (req, res) => {
  User
  .find()
  .select('-__v')
  .then(userInfos => {
    res.status(200).json(userInfos);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Error!',
      error: err.message
    });
  });
}

exports.deleteUser = (req, res) => {
  User
  .findOneAndDelete(req.params.id)
  .select('-__v-__id')
  .then(user => {
    if (!user) {
      res.status(404).json({
        message: `No user found with id ${req.params.id}`,
        error: 'user not found'
      });
    }
    res.status(200).json({});
  })
  .catch(err => {
    return res.status(500).send({
      message: `Error deleting the user with id ${req.params.id}`,
      error: err.message
    })
  })
}

exports.updateUser = (req, res) => {
  User
  .findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
    },
    {
      new: false
    }
  )
  .select('-__v')
  .then(user => {
    if (!user) {
      return res.status(404).send({
        message: `No user found with id ${req.params.id}`,
        error: 'user not found'
      });
    }
    res.status(200).json(user);
  })
  .catch(err => {
    return res.status(500).send({
      message: `Error updating the user with id ${req.params.id}`,
      error: err.message
    });
  });
}
