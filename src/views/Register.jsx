import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/firebase/profiles';
import Modals from '../components/Modals';
import axios from 'axios';
import * as Yup from 'yup';
import statesMx from '../assets/statesMx.json';

const Register = () => {
  const [mexican, setMexican] = useState(true);
  const [countrys, setCountrys] = useState([]);
  let { registerId } = useParams();
  let navigate = useNavigate();
  const profile = getProfile(parseInt(registerId));

  const verifyId = () => {
    if (!profile) {
      navigate('/notfound', { replace: true });
    }
  };
  if (registerId) {
    verifyId();
  }

  const getCountrys = async () => {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');
    const listContrys = data.map((country) => country.name.common);
    setCountrys(listContrys.sort());
  };

  const [modalView, setModalView] = useState(false),
    [modalViewActive, setModalViewActive] = useState('');
  const activeModal = (modalView) => {
    setModalView(true);
    setModalViewActive(modalView);
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Nombre muy corto')
      .max(50, 'Nombre muy largo')
      .matches(/^[a-zA-Z ]*$/, 'Nombre invalido')
      .trim()
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .trim()
      .required('Required'),
    alias: Yup.string().min(2, 'Too Short!').trim().required('Required'),
    date_birth: Yup.date().max(new Date(), 'Too Long!').required('Required'),
    height: Yup.number()
      .min(50, 'Too Short!')
      .max(230, 'Too Short!')
      .required('Required'),
    reason_arrest: Yup.string().min(4, 'Too Short').trim().required('Required'),
    date_arrest: Yup.date()
      .min(new Date(1900, 1, 1), 'Too Short!')
      .max(new Date(), 'Too Long!')
      .required('Required'),
    description_arrest: Yup.string().min(50, 'Too Short!').required('Required'),
  });

  return (
    <div className='form-register'>
      <p className='txt-headers'>Registro {registerId}</p>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          alias: '',
          date_birth: '',
          height: '',
          gender: '',
          nationality: '',
          country_birth: '',
          place_birth: '',
          tattoos: '',
          date_arrest: '',
          reason_arrest: '',
          description_arrest: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
        validate={(values) => {
          if (values.nationality === 'Extranjero') {
            setMexican(false);
            getCountrys();
          } else {
            setMexican(true);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='header-register'>
              <div className='img-profile-register'>
                <div className='img-profile'>
                  <img
                    src='https://images.unsplash.com/photo-1639100618065-358723b7961d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
                    alt=''
                  />
                </div>
                <button>Cargar foto</button>
              </div>
              <div className='basic-profile'>
                <div className='row-register'>
                  <div className='name col-s-100 col-m-40'>
                    <label htmlFor='name'>Nombre</label>
                    <Field
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Nombre(s)'
                    />
                    {touched.name && <div>{errors.name}</div>}
                  </div>
                  <div className='lastName col-s-100 col-m-40'>
                    <label htmlFor='lastName'>Apellidos</label>
                    <Field
                      type='text'
                      name='lastName'
                      id='lastName'
                      placeholder='Apellidos'
                    />
                    {touched.lastName && <div>{errors.lastName}</div>}
                  </div>
                  <div className='alias col-s-100 col-m-20'>
                    <label htmlFor='alias'>alias</label>
                    <Field
                      type='text'
                      name='alias'
                      id='alias'
                      placeholder='Alias N'
                    />
                    {touched.alias && <div>{errors.alias}</div>}
                  </div>
                </div>
                <div className='row-register'>
                  <div className='birthday  col-s-100 col-m-35 col-l-25'>
                    <label htmlFor='birthday'>Fecha de nac.</label>
                    <Field type='date' name='date_birth' id='date_birth' />
                    {touched.date_birth && <div>{errors.date_birth}</div>}
                  </div>
                  <div className='height col-s-100 col-m-25'>
                    <label htmlFor='height'>Estatura</label>
                    <Field type='number' name='height' id='height' />
                    {touched.height && <div>{errors.height}</div>}
                  </div>
                  <div className='gender col-s-100 col-m-25'>
                    <label htmlFor='gender'>Sexo</label>
                    <Field as='select' name='gender' id='gender'>
                      <option value='Hombre'>Hombre</option>
                      <option value='Mujer'>Mujer</option>
                    </Field>
                  </div>
                  <div className='tattoos col-s-100 col-m-25'>
                    <label htmlFor='tattoos'>tatuajes</label>
                    <Field as='select' name='tattoos' id='tattoos'>
                      <option value='No'>No</option>
                      <option value='Si'>Si</option>
                    </Field>
                  </div>
                </div>
                <div className='row-register'>
                  <div className='nationality col-s-100'>
                    <label htmlFor='nationality'>Nacionalidad</label>
                    <Field as='select' name='nationality' id='nationality'>
                      <option value='Mexicano'>Mexicano</option>
                      <option value='Extranjero'>Extranjero</option>
                    </Field>
                  </div>
                  <div className='country_birth col-s-100'>
                    <label htmlFor='country_birth'>Pais de nacimiento</label>
                    <Field as='select' name='country_birth' id='country_birth'>
                      {mexican
                        ? ''
                        : countrys?.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                    </Field>
                  </div>
                  <div className='place_birth col-s-100'>
                    <label htmlFor='place_birth'>Ent. Fed. Nacim.</label>
                    <Field as='select' name='place_birth' id='place_birth'>
                      {mexican
                        ? statesMx.map((state) => (
                            <option key={state.abbreviation} value={state.name}>
                              {state.name}
                            </option>
                          ))
                        : ''}
                    </Field>
                  </div>
                </div>

                <div className='row-register'>
                  <div className='date_arrest col-s-100 col-m-35 col-l-25'>
                    <label htmlFor='date_arrest'>Fecha detencion</label>
                    <Field type='date' name='date_arrest' id='date_arrest' />
                    {touched.date_arrest && <div>{errors.date_arrest}</div>}
                  </div>
                  <div className='reason_arrest col-s-100 col-m-75'>
                    <label htmlFor='reason_arrest'>Motivo de detencion</label>
                    <Field
                      type='text'
                      name='reason_arrest'
                      id='reason_arrest'
                    />
                    {touched.reason_arrest && <div>{errors.reason_arrest}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className='description-register'>
              <label htmlFor='description_arrest col-s-100'>
                Descripcion del detenido y de la detencion
              </label>
              <Field
                name='description_arrest'
                id='description_arrest'
                as='textarea'
                className='col-s-100'
              />
              {touched.description_arrest && (
                <div>{errors.description_arrest}</div>
              )}
            </div>
            <div className='btns-register'>
              <button onClick={() => activeModal('Images')}>
                Cargar fotos
              </button>
              <button onClick={() => activeModal('Documentos')}>
                Cargar Documentos
              </button>
              {modalView && (
                <Modals view={modalViewActive} closeModal={setModalView} />
              )}
              <button
                type='submit'
                // onClick={() => navigate('/', { replace: true })}
                className='btn-submit'
              >
                Registrar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
