const { generateToken } = require("../config/jwtToken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDB");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
//Create a User :Register
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.find({ email: email });

  if (findUser.length === 0) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});
// Check Login
const checkLogin = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, send a response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // User exists, send the role in the response
    res.json({ role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error checking login" });
  }
});

//Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?.id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser.id),
    });
  } else {
    throw new Error("Invalid Informations");
  }
});
//get all users
const getallUsers = asyncHandler(async (req, res) => {
  try {
    let getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
//get a user

const getoneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Use the validateMongoDbId function
  validateMongoDbId(req.user._id);

  try {
    const getoneUser = await User.findById(id);

    res.json({
      getoneUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// ... (res
//Delete User

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteaUser = await User.findByIdAndDelete(id);

    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//Handle Refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});



//Update a User

const updateaUser = asyncHandler(async (req, res) => {
  try {
    let findUser;
    let refreshToken;

    if (!req.user || !req.user._id) {
      return res
        .status(400)
        .json({ error: "User not authenticated or missing _id" });
    }

    const { _id } = req.user || {};

    validateMongoDbId(_id);

    try {
      findUser = await User.findById(_id);
      // Assuming refreshToken is retrieved properly in your middleware
      refreshToken = await generateRefreshToken(findUser?.id);
    } catch (error) {
      throw new Error(error);
    }

    // Update the user with the new refresh token
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      { refreshToken },
      { new: true }
    );

    // Update user details
    const updatedUser = asyncHandler(async (req, res) => {
      const { _id } = req.user;
      validateMongoDbId(_id);
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
          },
          {
            new: true,
          }
        );
        res.json(updatedUser);
      } catch (error) {
        throw new Error(error);
      }
    });
    
    
    // save user Address
    
    const saveAddress = asyncHandler(async (req, res, next) => {
      const { _id } = req.user;
      validateMongoDbId(_id);
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          {
            address: req?.body?.address,
          },
          {
            new: true,
          }
        );
        res.json(updatedUser);
      } catch (error) {
        throw new Error(error);
      }
    });

    res.json({
      _id: findUser.id,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      email: findUser.email,
      mobile: findUser.mobile,
      token: accessToken,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie.refreshToken) {
    throw new Error("No refresh Token in cookies");
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // Forbidden
  }

  // Update the user to remove the refreshToken
  await User.findByIdAndUpdate(user._id, { refreshToken: "" });

  // Clear the refreshToken cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.sendStatus(204); // Forbidden
});


//Block User
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(_id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Unblock User
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(_id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      message: "User Unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Move the response part after generating and signing the token

module.exports = {
  createUser,
  loginUser,
  getallUsers,
  getoneUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  checkLogin,
};


