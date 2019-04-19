module.exports = {
  common: {
    requiredBody: 'Request should have body!',
    requiredParametes: 'Request should have parameters!'
  },
  user: {
    requiredFirstNameLength: (count) => `First name must be at least ${count} characters long`,
    requiredLastNameLength: (count) => `Last name must be at least ${count} characters long`,
    incorrectEmail: 'Please provide a correct email address',
    requiredPasswordLength: (count) => `Password must be at least ${count} characters long`,
    invalidForm: 'Check the form for errors.',
    requiredEmail: 'Please provide your email address.',
    requiredPassword: 'Please provide your password.',
    registerSuccess: 'You have successfully signed up!',
    unprocessableForm: 'Could not process the form.',
    loginSuccess: 'You have successfully logged in!',
    fetchedUserWithoutAdminRole: 'Successfully fetched all user without \'Admin\' role',
    setAdminRoleSuccessfully: (user) => `Successfully set admin role to ${user.firstName} ${user.lastName}`,
    addedOrEditedInfo: 'Successfully added/edited info!',
    getUser: 'Successfully get user!'
  },
  post: {
    createdPost: 'Successfully created post!',
    editedPost: 'Successfully edited post!',
    deletedPost: 'Successfully delete post!',
    getAll: 'Successfully get all posts!',
    get: (id) => `Successfully get post with id ${id}`,
    searchedPosts: (count) => `Successfully fetched ${count} posts`
  },
  comment: {
    createdComment: 'Successfully created comment!',
    deletedComment: 'Successfully deleted comment!',
    editedComment: 'Successfully edited comment!',
    getComment: 'Successfully get comment!'
  }
};