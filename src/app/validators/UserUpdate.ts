import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string(),
      password_confirmation: Yup.string().when(
        'password',
        (password: string, field: any) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field,
      ),
      avatar_id: Yup.string(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messsages: error.inner });
  }
};
