import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre muy largo')
    .matches(/^[a-zA-Z ]*$/, 'Nombre invalido')
    .trim()
    .required('Campo nombre vacio'),
  first_last_name: Yup.string()
    .min(2, 'Apellido paterno muy corto')
    .max(50, 'Apellido paterno muy largo')
    .trim()
    .required('Campo apellido paterno vacio'),
  second_last_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, 'Apellido materno invalido')
    .trim(),
  alias: Yup.string()
    .min(2, 'Alias muy corto')
    .trim()
    .required('Campo Alias vacio'),
  date_birth: Yup.date()
    .max(new Date(), 'Fecha no valida')
    .required('Fecha de nacimiento vacia'),
  height: Yup.number()
    .min(50, 'Estatura muy corta')
    .max(230, 'Estatura muy alta')
    .required('Campo estatura requerido'),
  reason_arrest: Yup.string()
    .min(4, 'Motivvo muy corto')
    .trim()
    .required('Motivo de detencion requerido'),
  date_arrest: Yup.date()
    .min(new Date(1900, 1, 1), 'Fecha de detencion no valida')
    .max(new Date(), 'Fecha de detencion no puede ser mayor a la actual')
    .required('fehca de detencion vacia'),
  description_arrest: Yup.string()
    .min(50, 'Descripcion de detencion muy corta')
    .trim()
    .required('Descripcion de detencion requerida'),
});
