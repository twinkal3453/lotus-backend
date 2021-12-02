import Contact from "../models/contact.js";

export const getContactById = (req, res, next, id) => {
  Contact.findById(id).exec((err, contact) => {
    if (err) {
      return res.status(400).json({
        error: "Contact not found in DB",
      });
    }
    req.contact = contact;
    next();
  });
};

export const createContact = (req, res) => {
  const contact = new Contact(req.body);

  contact.save((err, contact) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save collection in DB",
      });
    }
    res.json(contact);
  });
};

export const getAllContacts = (req, res) => {
  Contact.find().exec((err, contacts) => {
    if (err) {
      return res.status(400).json({
        error: "No Contacts found!",
      });
    }
    res.json(contacts);
  });
};

export const getContact = (req, res) => {
  return res.json(req.contact);
};

export const deleteContact = (req, res) => {
  const contact = req.contact;

  contact.remove((err, contact) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this contact",
      });
    }
    res.json({
      message: `This contact ${contact} is successfully Deleted`,
    });
  });
};
