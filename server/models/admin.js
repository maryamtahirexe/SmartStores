import mongoose from "mongoose";
<<<<<<< HEAD

=======
//LALALALALALLAALALL
>>>>>>> 40d9e8e09efcf3676a5f595f61a7330690205ee4
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
