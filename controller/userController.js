const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

//@desc user registration
//@routes Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, resp) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    resp.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    resp.status(400);
    throw new Error(`user with ${email} is already registered`);
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log("user created", user);

  if (user) {
    resp.status(201).json({ _id: user.id, email: user.email });
  } else {
    resp.status(400);
    throw new Error("User data is not valid");
  }
});

//@desc user login
//@routes POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    resp.status(400);
    throw new Error("email && password both are mandatory");
  }

  const user = await User.findOne({ email });

  //compare password with hashed-password

  // password -> from client(req.body) && user.password -> from database(hashed pass)
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2m" }
    );
    resp.status(200).json({ accessToken });
  } else {
    resp.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc GET current user
//@routes GET /api/users/current
//@access public
const currentUser = asyncHandler(async (req, resp) => {
  resp.status(200).json({
    message: "this is current user",
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
