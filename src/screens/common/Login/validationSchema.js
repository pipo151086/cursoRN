import * as yup from 'yup';
import localization from '../../../localization';

const required = localization['common.validacion.requerido'];

export const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .min(2, 'Longitud minina 2')
    .label('userName')
    .max(50, 'Longitud máxima 50')
    .required(required),
  password: yup
    .string()
    .min(2, 'Longitud minina 2')
    .max(50, 'Longitud máxima 50')
    .required(required)
    .label('password'),
});
