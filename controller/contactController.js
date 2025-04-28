const asyncHandler = require("express-async-handler");
const Contact = require("./../models/contactModel");

//@desc GET all contacts
//@routes GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, resp) => {
  const contact = await Contact.find();
  resp.status(200).json({
    contact,
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

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  resp.status(200).json({
    message: "CREATE CONTACT ...",
    contact,
  });
});

//@desc get contact
//@routes get /api/contacts/id
//@access public
const getContact = asyncHandler(async (req, resp) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    resp.status(404);
    throw new Error("contact not found");
  }
  resp.status(200).json({
    contact,
  });
});

//@desc get contact
//@routes get /api/contacts/id
//@access public
const updateContact = asyncHandler(async (req, resp) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    resp.status(404);
    throw new Error("contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  resp.status(200).json({ updateContact });
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
