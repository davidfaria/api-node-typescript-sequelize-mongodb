import { Router } from 'express';
const routes = Router();
/**
 * Controllers
 */
import SessionController from '@controllers/SessionController';
import RegisterController from '@controllers/RegisterController';
import ConfirmEmailController from '@controllers/ConfirmEmailController';
import ForgetController from '@controllers/ForgetController';

/**
 * Validators
 */
import SessionValidator from '@validators/Session';
import RegisterValidator from '@validators/Register';
import ForgetValidator from '@validators/Forget';
import ForgetResetPasswordValidator from '@validators/ForgetResetPassword';

routes.post('/sessions', SessionValidator, SessionController.store);
routes.post('/register', RegisterValidator, RegisterController.store);
routes.post('/confirmEmail', ConfirmEmailController.store);

routes.post('/forget', ForgetValidator, ForgetController.store);
routes.put(
  '/forgetResetPassword',
  ForgetResetPasswordValidator,
  ForgetController.update,
);

export default routes;
