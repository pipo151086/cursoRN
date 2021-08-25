import * as yup from 'yup';
import localization from '../../../localization';

const required = localization['common.validacion.requerido'];

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(required),
  password: yup
    .string()
    .label('Password')
    .required(required)
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirmPassword: yup
    .string()
    .required(required)
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function(value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      value => value === true,
    ),
  crdCards: yup
    .string()
    .ensure()
    .required(required),
  options: yup.number().required(),
  lookUp: yup
    .string()
    .ensure()
    .required(required),
  textArea: yup
    .string()
    .label('Text Area')
    .required(required)
    .min(2, 'Ingrese texto...')
    .max(10, 'Texto demasiado largo'),
  onlyNumber: yup
    .number()
    .required(required)
    .min(2, 'Mínimo 2')
    .max(10, 'Máximo 10'),
  decimal: yup
    .number(required)
    .required()
    .min(2, 'Mínimo 2')
    .max(10, 'Máximo 10'),
  date: yup
    .date()
    .required(required)
    .min(new Date(2018, 1, 1), 'Error fecha1')
    .max(new Date(2018, 12, 31), 'Error fecha2'),
});
