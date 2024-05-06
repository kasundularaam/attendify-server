const { encrypt, isDataMatch } = require("../utils/encryption.util");
const { ErrorResponse, SuccessResponse } = require("../utils/response.util");
const University = require("../models/University.model");
const sessionUtil = require("../utils/session.util");
const { SchemaTypes } = require("mongoose");

const login = async (req, res) => {
  try {
    const university = await University.findOne({ email: req.body.email });

    if (!university) {
      return new ErrorResponse(res).badRequest(
        `Account not found for the email ${req.body.email}`
      );
    }

    const isPasswordMatch = await isDataMatch(
      req.body.password,
      university.password
    );

    if (!isPasswordMatch) {
      return new ErrorResponse(res).badRequest("Invalid password");
    }

    const accessToken = sessionUtil.sign(
      new sessionUtil.Payload(
        university._id,
        university.regNo,
        university.email,
        university.name,
        "ADMIN"
      )
    );
    return new SuccessResponse(res).ok({
      accessToken: accessToken,
      university: university,
    });
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const register = async (req, res) => {
  try {
    const encryptedPassword = await encrypt(req.body.password);
    const university = await University.create({
      ...req.body,
      password: encryptedPassword,
    });
    const accessToken = sessionUtil.sign(
      new sessionUtil.Payload(
        university._id,
        university.regNo,
        university.email,
        university.name,
        "ADMIN"
      )
    );
    return new SuccessResponse(res).created({
      accessToken: accessToken,
      university: university,
    });
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;
    if (typeof id === SchemaTypes.ObjectId) {
      const university = await University.findById(id);
      return new SuccessResponse(res).ok({
        university: university,
      });
    }
    return new ErrorResponse(res).badRequest("Invalid ID provided");
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const query = req.query;
    if (query) {
      const university = await University.findOne(query);
      return new SuccessResponse(res).ok({
        university: university,
      });
    }
    const universities = await University.find();
    return new SuccessResponse(res).ok({
      businesses: universities,
    });
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const university = await University.findByIdAndUpdate(id, req.body);
    return new SuccessResponse(res).ok({
      university: university,
    });
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await University.findByIdAndDelete(id);
    return new SuccessResponse(res).ok({
      message: "Business entity removed successfully",
    });
  } catch (error) {
    return new ErrorResponse(res).badRequest(error.message);
  }
};

module.exports = {
  login,
  register,
  get,
  getAll,
  update,
  remove,
};
