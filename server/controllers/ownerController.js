import Owner from "../models/owner.js";

export const createOwner = async (req, res) => {
  const { name, email, password } = req.body;

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
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      owner.password = hashedPassword;
    }

    const updatedOwner = await owner.save();

    res.status(200).json(updatedOwner);
  } catch (error) {
    console.error("Error updating owner:", error);
    res
      .status(500)
      .json({ message: "Failed to update owner", error: error.message });
  }
};
