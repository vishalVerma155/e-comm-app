const User = require('../../models/userModel/user.model.js');
const { hashPassword, comparePassword } = require('../../utils/bcrypt.js');
const generateJWT = require('../../utils/jwt.js')

// user register controllers
const registerUser = async (req, res) => {

    try {
        const { name, email, userName, password } = req.body;

        // check blank fields
        const isBlank = [name, email, userName, password].some(fields => fields.trim() === "");

        if (isBlank) {
            return res.status(401).json({ Message: "All fields are compulsary" });
        }

        // check if user is already existed
        const isUserExisted = await User.findOne({ $or: [{ userName }, { email }] });

        if (isUserExisted) {
            return res.status(401).json({ Message: "User is already existed. Please login or choose other user name" });
        }


        const hashedPassword = await hashPassword(password);
        // create user
        const newUser = new User({
            name,
            email,
            userName,
            password: hashedPassword
        })

        // save user
        await newUser.save();

        const user = await User.findOne({ $or: [{ userName }, { email }] });

        if (!user) {
            return res.status(404).json({ Message: "User not found. There is something problem in user data saving" });
        }

        const payload = {
            _id: user._id,
            email: user.email,
            userName: user.userName
        };

        // generate access token
        const accessToken = generateJWT(payload);

        res.cookie("AccessToken", accessToken);

        // return response
        res.status(200).json({ Message: "User has been  successfully register.", user });

    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }

};

// login user
const loginUser = async (req, res) => {

    try {
        const { userName, password } = req.body;

        // check blank fields
        const isBlank = [userName, password].some(fields => fields.trim() === "");

        if (isBlank) {
            return res.status(401).json({ Message: "All fields are compulsary" });
        }

        // check if user is existed
        const user = await User.findOne({ $or: [{ userName }, { email: userName }] });

        if (!user) {
            return res.status(401).json({ Message: "User is not existed." });
        }

        // compare password
        const isPasswordCorrect = await comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ Message: "Invalid password" });
        }


        const payload = {
            _id: user._id,
            email: user.email,
            userName: user.userName
        };

        // generate jwt token
        const accessToken = generateJWT(payload);

        res.cookie("AccessToken", accessToken);

        // return response
        res.status(200).json({ Message: "User has been  sucessfully Loged in.", user });

    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }

};

// get user profile details
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // take affiliate id from request
        const user = await User.findById(userId, { password: 0 });
        return res.status(200).json({ user }); // return response
    } catch (error) {
        return res.status(400).json({ Error: error.message });
    }
}

// // delete user profile

const deleteUserProfile = async (req, res) => {
try {
    const userId = req.user?._id; // get user id
    const { password } = req.body;
    const user = await User.findById(userId); // find user
    if (!user) {
        return res.status(404).json({ Message: "User not found" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(402).json({ Message: "Wrong password" });
    }

    await User.findByIdAndDelete(user._id); // find and delete user

    res.clearCookie("AccessToken"); // clear cookies for logout
    return res.status(200).json({ Message: "User has been sucessfully deleted" }); // return response
} catch (error) {
    return res.status(400).json({ Error: error.message });
}
}

// change User password

const changeUserPassword = async (req, res) => {
try {
    const { currentPassword, newPassword } = req.body; // take details

    if (currentPassword.trim() === "" || newPassword.trim() === "") {
        return res.status(401).json({ Message: "Please enter all fields" });
    }

    const user = await User.findById(req.user._id);


    // compare password
    const isPasswordCorrect = await comparePassword(currentPassword, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({ Message: "password is not matched" });
    }

    const newHashedPassword = await hashPassword(newPassword);
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({ Message: "Password has been chenged" });
} catch (error) {
    return res.status(400).json({ Error: error.message });
}
}

// logout affiliate
const logoutUser = (req, res) => {
    try {
        res.clearCookie("AccessToken"); // clear cookies for logout
    return res.status(200).json({
        Message: "User logedout sucessfully"
    })
    } catch (error) {
    return res.status(400).json({ Error: error.message });
    }
}


module.exports = { registerUser, loginUser, getUserProfile, changeUserPassword, deleteUserProfile, logoutUser };