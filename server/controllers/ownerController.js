import Owner from "../models/owner.js";
import Store from "../models/store.js";

export const createOwner = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Request Body:", req.body);
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const newOwner = new Owner({ name, email, password });
    await newOwner.save();
    res.status(201).json(newOwner);
  } catch (error) {
    console.error("Error creating owner:", error);
    res
      .status(500)
      .json({ message: "Failed to create owner", error: error.message });
  }
};

export const getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Failed to get owners" });
  }
};

export const deleteOwner = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOwner = await Owner.findByIdAndDelete(id);

    if (!deletedOwner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    console.error("Error deleting owner:", error);
    res
      .status(500)
      .json({ message: "Failed to delete owner", error: error.message });
  }
};

export const updateOwner = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const owner = await Owner.findById(id);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    if (name) owner.name = name;
    if (email) owner.email = email;
    if (password !== undefined) owner.password = password; 

    const updatedOwner = await owner.save();

    res.status(200).json(updatedOwner);
  } catch (error) {
    console.error("Error updating owner:", error);
    res.status(500).json({ message: "Failed to update owner", error: error.message });
  }
};

export const getOwnersByStoreId = async (req, res) => {
  const { id } = req.params;

  try {
  
    const store = await Store.findById(id).populate('owners');

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const owners = store.owners;

    if (owners.length === 0) {
      return res.status(404).json({ message: "No owners found for this store" });
    }

    res.status(200).json(owners);
  } catch (error) {
    console.error("Error fetching owners by store ID:", error);
    res.status(500).json({ message: "Failed to get owners", error: error.message });
  }
};