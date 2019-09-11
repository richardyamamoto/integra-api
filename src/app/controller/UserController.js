import * as Yup from 'yup';
import { isCPF } from 'brazilian-values';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      cpf: Yup.string()
        .min(11)
        .required(),
      phone: Yup.string()
        .min(9)
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Something is missing' });
    }

    const userExists = await User.findOne({ where: { cpf: req.body.cpf } });

    if (userExists) {
      return res.status(401).json({ error: 'User already exists' });
    }

    const { cpf } = req.body;
    if (!isCPF(cpf)) {
      return res.status(401).json({ error: 'Invalid CPF' });
    }

    const { id, name, email, phone } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      cpf,
      phone,
    });
  }

  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'cpf', 'phone', 'created_at'],
    });
    return res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      cpf: Yup.string().min(11),
      phone: Yup.string().min(9),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassowrd', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, email, phone } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(401).json({ error: 'User does not exists' });
    }
    await user.destroy();
    return res.json({ message: 'User deleted' });
  }
}

export default new UserController();
