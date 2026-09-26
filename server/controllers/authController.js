import User  from "../models/User.js"

export async function register(req, res) {
    const { fullname, email, password } = req.body;

    try {
        if (!email || !password || !fullname) {
            return res.status(400).json({ message: "All fields are required"})
        } 

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"})
        }

        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({ message: "Invalid email format"})
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists, please use a different one"});
        }

        const newUser = await User.create({
            email: normalizedEmail,
            fullname,
            password
        });
        return res.status(201).json({ 
            id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email 
        })
    } catch (error) {
        console.log("Error creating User:", error)
        res.status(500).json({ message: "Internal Server error"})
    }   
}