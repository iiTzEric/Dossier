import bcrypt from "bcryptjs";
import User  from "../models/User.js"
import jwt from "jsonwebtoken"


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

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !password) {
            return res.status(400).json({ message: "Email and Password are required"});
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "Server aunthentication is not configured"});
        }

        const user = await User.findOne({
             email: { $regex: `^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign(
                { userId: user._id },        // payload — what's encoded in the token
                process.env.JWT_SECRET,      // signing secret
                { expiresIn: "7d" }          // token becomes invalid after 7 days
                );
            return res.status(200).json({  token, id: user._id, fullname: user.fullname, email: user.email });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.log("error message:", error)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export async function getMe(req, res) {
    res.status(200).json({ message: "You are authorized", userId: req.userId});
}