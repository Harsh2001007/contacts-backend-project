const asyncHandler = require("express-async-handler");

//@desc GET all contacts
//@routes GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, resp) => {
  resp.status(200).json({
    message: "GET ALL CONTACTS ...",
  });
});

//@desc POST  contacts
//@routes POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, resp) => {
  console.log("the requested body is " + req.body);
  const { email, name, phone } = req.body;

  if (!email || !name || !phone) {
    resp.status(400);
    throw new Error("All fields are mandatory");
  }
  resp.status(200).json({
    message: "CREATE CONTACT ...",
  });
});

//@desc get contact
//@routes get /api/contacts/id
//@access public
const getContact = asyncHandler(async (req, resp) => {
  resp.status(200).json({
    message: "GET CONTACT FOR ...",
  });
});

//@desc get contact
//@routes get /api/contacts/id
//@access public
const updateContact = asyncHandler(async (req, resp) => {
  resp.status(200).json({
    message: "UPDATE CONTACT FOR ...",
  });
});

//@desc get contact
//@routes get /api/contacts/id
//@access public
const deleteContact = asyncHandler(async (req, resp) => {
  resp.status(200).json({
    message: "DELETE CONTACT FOR ...",
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
