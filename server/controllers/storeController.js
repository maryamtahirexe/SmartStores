import Store from "../models/store.js";
import Owner from "../models/owner.js";
import mongoose from "mongoose";

export const createStore = async (req, res) => {
  const { name, location, owners } = req.body;

  console.log("Request Body:", req.body);

  const areValidObjectIds = owners.every((ownerId) =>
    mongoose.Types.ObjectId.isValid(ownerId)
  );

  if (!areValidObjectIds) {
    return res
      .status(400)
      .json({ message: "One or more owner IDs are invalid" });
  }

  try {
    const ownersFound = await Owner.find({ _id: { $in: owners } });

    if (ownersFound.length !== owners.length) {
      return res.status(400).json({ message: "One or more owners not found" });
    }

    const newStore = new Store({ name, location, owners });
    await newStore.save();

    res.status(201).json(newStore);
  } catch (error) {
    console.log("Error in createStore function:", error);
    res
      .status(500)
      .json({ message: "Error creating store", error: error.message || error });
  }
};

export const updateStore = async (req, res) => {
  const { id } = req.params;
  console.log("Store ID:", id);
  const { name, location, ownerIds } = req.body;

  try {
    if (!Array.isArray(ownerIds)) {
      return res.status(400).json({ message: "Invalid ownerIds format" });
    }

    const owners = await Owner.find({ _id: { $in: ownerIds } });

    if (owners.length !== ownerIds.length) {
      return res.status(400).json({ message: "One or more owners not found" });
    }

    const updatedStore = await Store.findByIdAndUpdate(
      id,
      { name, location, owners: ownerIds },
      { new: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    console.error("Error updating store:", error);
    res
      .status(500)
      .json({ message: "Error updating store", error: error.message });
  }
};

export const getStoreById = async (req, res) => {
  const { id } = req.params;

  try {
    const store = await Store.findById(id).populate("owners", "name email");

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving store", error });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find().populate("owners", "name email");
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stores", error });
  }
};

export const deleteStore = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStore = await Store.findByIdAndDelete(id);

    if (!deletedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting store", error });
  }
};

// export const getStoresWithOwners = async (req, res) => {
//   try {
//     console.log("Fetching stores with owners");

//     const stores = await Store.find().populate("owners");

//     if (!stores) {
//       return res.status(404).json({ message: "No stores found" });
//     }

//     const response = stores.map((store) => ({
//       storeName: store.name,
//       storeLocation: store.location,
//       owners: store.owners.map((owner) => ({
//         id: owner._id,
//         name: owner.name,
//         email: owner.email,
//       })),
//     }));

//     res.status(200).json({ stores: response });
//   } catch (error) {
//     console.error("Error fetching stores with owners:", error);
//     res.status(500).json({
//       message: "Failed to fetch stores and owners",
//       error: error.message,
//     });
//   }
// };
export const getStoresWithOwners = async (req, res) => {
  try {
    console.log("Fetching stores with owners");

    const stores = await Store.find().populate("owners");

    if (!stores) {
      return res.status(404).json({ message: "No stores found" });
    }

    const response = stores.map((store) => ({
      storeName: store.name,
      storeLocation: store.location,
      owners: store.owners.map((owner) => ({
        id: owner._id,
        name: owner.name,
        email: owner.email,
      })),
    }));

    res.status(200).json({ stores: response });
  } catch (error) {
    console.error("Error fetching stores with owners:", error);
    res.status(500).json({
      message: "Failed to fetch stores and owners",
      error: error.message,
    });
  }
};
