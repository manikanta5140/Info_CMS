import { checkUsernameAvailability } from "../Api/services/authService";

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
export const validateUserName = async (userName) => {
  if (!userName) {
    return "Username is required";
  } else if (userName.length < 3) {
    return "Username must be at least 3 characters long";
  } else {
    try {
      // Check for unique username
      const isAvailable = await checkUsernameAvailability(userName);
      if (!isAvailable) {
        return "Username is already taken";
      }
    } catch (error) {
      console.error("Error in username validation:", error); // Log the error
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

//validate Phone Number
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return "Phone number is required";
  }
  const isValid = /^\d{10}$/.test(phoneNumber);
  if (!isValid) {
    return "Phone number must be exactly 10 digits";
  }
  return null;
};

//validate Dob
export const validateDOB = (dob) => {
  if (!dob) {
    return "Date of birth is required";
  }

  // Convert the input date to a JavaScript Date object
  const inputDate = new Date(dob);

  // Get the current date without time (only year, month, and day)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to ignore time part

  if (inputDate > today) {
    return "Date of birth cannot be in the future";
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
