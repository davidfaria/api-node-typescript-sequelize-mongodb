import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Yup.object().shape({
      category_id: Yup.number().required(),
      name: Yup.string().required(),
      reference: Yup.string(),
      price: Yup.number(),
      amount: Yup.number(),
      service: Yup.boolean(),
      status: Yup.boolean().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messsages: error.inner });
  }
};
