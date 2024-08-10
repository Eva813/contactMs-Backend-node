import express from "express";
import { ContactModel } from "../models/contact.js";

const createContact = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newContact = new ContactModel({
      name,
      email,
      phone,
      address,
      postedBy: req.user._id,
    });
    const result = await newContact.save();
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    // 在 ContactModel 中查找 postedBy 為當前用戶的所有聯繫人
    const contacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Contact id is required" });
  }
  try {
    const contact = await ContactModel.findById({ _id: id });
    return res.status(200).json({ success: true, ...contact._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Contact id is required" });
  }
  try {
    const result = await ContactModel.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json({ error: "Contact id is required" });
  }
  try {
    const contact = await ContactModel.find({ _id: id });
    if (!contact) {
      return res.status(401).json({ error: "Contact not found" });
    }
    const result = await ContactModel.findByIdAndDelete({ _id: id });
    console.log(result);
    return res.status(200).json({ success: true, ...result._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

// const deleteContact = async (req, res) => {
//   const { id } = req.params;
//   if (!id) {
//     return res.status(401).json({ error: "No Id specified" });
//   }
//   try {
//     const contact = await ContactModel.findOne({ _id: id });
//     if (!contact) {
//       return res.status(401).json({ error: "No Record Existed" });
//     }

//     const deleteRecord = await ContactModel.findByIdAndDelete({ _id: id });
//     const contacts = await ContactModel.find({ postedBy: req.user._id });
//     return res.status(200).json({ success: true, contacts });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

export { createContact, getContacts, getContactById, updateContact, deleteContact };
