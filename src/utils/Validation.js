// Validate First Name
export const validateFirstName = (firstName) => {
  if (!firstName) {
    return "First name is required";
  } else if (firstName.length < 2) {
    return "First name must be at least 2 characters long";
  }
  return null;
};

// Validate Last Name
export const validateLastName = (lastName) => {
  if (!lastName) {
    return "Last name is required";
  } else if (lastName.length < 2) {
    return "Last name must be at least 2 characters long";
  }
  return null;
};

// Validate Username
export const validateUserName = async (userName, checkUsername) => {
  if (!userName) {
    return "Username is required";
  } else if (userName.length < 3) {
    return "Username must be at least 3 characters long";
  } else {
    try {
      // Check for unique username
      const isAvailable = await checkUsername(userName);
      if (!isAvailable) {
        return "Username is already taken";
      }
    } catch (error) {
      return "Error checking username availability";
    }
  }
  return null;
};

// Validate Email
export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Invalid Email";
  }
  return null;
};

// Validate Password
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
};

// Validate Confirm Password
export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return null;
};

//  chcking for  user is verified or not
export const checkUserVerified = (verified) => {
  if (verified) {
    return true;
  }
  return false;
};
