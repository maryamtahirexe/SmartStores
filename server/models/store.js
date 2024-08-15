// import mongoose from "mongoose";

// const storeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Owner" }],
//   location: { type: String, required: true },
// });

// const Store = mongoose.model("Store", storeSchema);
// export default Store;
import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  location: { type: String, required: true },
});

const Store = mongoose.model("Store", storeSchema);
export default Store;
