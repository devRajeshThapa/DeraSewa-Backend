const { roomModel, userModel } = require("../models/index");

const getHosterRoom = async (req, res) => {
  const hosterID = await req.params.hosterID;
  const room = await roomModel.find({ userID: `${hosterID}` });
  return res.json(room);
};

const hostRoom = async (req, res) => {
  const {
    hosterID,
    anotherPhoneNumber,
    phoneNumber,
    roomCoordinate,
    address,
    flat,
    apartment,
    floorNumber,
    bedRoomNumber,
    bathRoom,
    kitchen,
    parking,
    price,
    description,
    roomPictures,
  } = await req.body;

  const user = await userModel.findById(hosterID);

  if (anotherPhoneNumber) {
    if (
      phoneNumber &&
      roomCoordinate &&
      address &&
      floorNumber &&
      bedRoomNumber &&
      price &&
      roomPictures
    ) {
      const phoneValidator = /^(\+\d{1,3}[- ]?)?\d{10}$/;
      if (phoneValidator.test(phoneNumber)) {
        const room = await roomModel.create({
          hosterID,
          hosterPhoneNumber: phoneNumber,
          roomCoordinate,
          address,
          flat,
          apartment,
          floorNumber,
          bedRoom,
          bathRoom,
          kitchen,
          parking,
          price,
          description,
          roomPictures,
        });
        return res.json({ success: "Room hosted succesfully!" });

        if (user) {
          const userData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
          hostRoomAlert(userData);
        }
      } else {
        return res.json({ error: "Invalid phone number!" });
      }
    } else {
      return res.json({ error: "All required feild must be feild!" });
    }
  } else {
    if (
      roomCoordinate &&
      address &&
      floorNumber &&
      bedRoomNumber &&
      price &&
      roomPictures
    ) {
      const room = await roomModel.create({
        hosterID,
        hosterPhoneNumber: user.phoneNumber,
        roomCoordinate,
        address,
        flat,
        apartment,
        floorNumber,
        bedRoom,
        bathRoom,
        kitchen,
        parking,
        price,
        description,
        roomPictures,
      });
      return res.json({ success: "Room hosted succesfully!" });
    } else {
      return res.json({ error: "All required feild must be feild!" });
    }
  }
};

module.exports = {
  getHosterRoom,
  hostRoom
};

