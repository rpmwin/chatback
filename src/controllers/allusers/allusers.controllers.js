import { User } from "../../models/user.model.js";



const allusers = async (req, res) => {
  try {
    
    const users = await User.find({},{username:1 , email:1 });

    // console.log(users);

    return res.status(200).json(users);

  } catch (error) {
    console.log("something went wrong in the allusers controller", error);
    return res.status(500).json({ message: "Something went wrong in obtaining all the user" });
  }
}

export default allusers