import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import generateToken from '../utils/generateToken';
export const signup = async (req, res) => {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
        return res.status(400).json({ message: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    const token = generateToken(user._id.toString());
    res.status(201).json({ token });
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user._id.toString());
    res.json({ token });
};
export const logout = (_, res) => {
    res.json({ message: 'Logged out (client should remove token)' });
};
