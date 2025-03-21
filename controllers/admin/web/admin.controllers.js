const Admin = require('../../../models/admin/admin.model.js');
const {hashPassword, comparePassword} = require("../../../utils/bcrypt.js");
const {generateJWT} = require("../../../utils/jwt.js");

//  Admin Registration
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || username && username.trim() === "" || !password || password && password.trim() === ""){
         return res.status(404).json({ success: false , error : "user name or password not found " });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.find();
        if (existingAdmin.length > 0) return res.status(400).json({ success: false , error : "Admin is already existed." });

        const hashedPassword = await hashPassword(password);
        // Create new admin
        const newAdmin = new Admin({ username, password : hashedPassword });
        await newAdmin.save();

        const payload = {
            _id : newAdmin._id,
            username : newAdmin.username
        }

        const accessToken = generateJWT(payload);
        res.cookie("AccessToken", accessToken);

        return res.status(201).json({success: true, message: 'Admin registered successfully', admin : newAdmin, token : accessToken });
    } catch (error) {
        res.status(500).json({success: false, error: error.message });
    }
};

//  Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || username && username.trim() === "" || !password || password && password.trim() === ""){
            return res.status(404).json({ success: false , error : "user name or password not found " });
           }
   
        const admin = await Admin.findOne({ username });

        if (!admin) return res.status(404).json({success: false , error: 'Admin not found' });

        // Compare password
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) return res.status(401).json({ success: false, error: 'Invalid credentials' });

        const payload = { 
            _id: admin._id, 
            username: admin.username };
        // Generate JWT Token
        const accessToken = generateJWT(payload);

        // Set cookie (optional)
        res.cookie('AccessToken', accessToken );
        
       return res.json({ success: true, message: 'Login successful',admin, token : accessToken });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Get Admin Profile (Protected)
const getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { registerAdmin, loginAdmin, getAdminProfile };
