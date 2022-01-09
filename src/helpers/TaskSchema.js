import * as Yup from 'yup';

export const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Titulo muy corto')
    .max(50, 'Titulo muy largo')
    .trim()
    .required('Campo titulo vacio'),
  date: Yup.date()
    .min(new Date(), 'Fecha no valida')
    .required('Campo fecha vacia'),
  hours: Yup.number().min(0, 'Hora no valida').required('Campo hora vacio'),
  description: Yup.string()
    .min(2, 'Descripcion muy corta')
    .trim()
    .required('Descripcion vacia'),
});
