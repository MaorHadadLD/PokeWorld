import axios from 'axios';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
    });
}