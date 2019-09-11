import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ error: 'User does not exists' });
    }

    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid passoword' });
    }

    const { id, name } = userExists;

    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, process.env.APP_SECRET, {
        expiresIn: '7d',
      }),
    });
  }
}

export default new SessionController();
