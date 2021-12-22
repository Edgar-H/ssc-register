import React, { useState } from 'react';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/firebase/profiles';
import Modals from '../components/Modals';

const Register = () => {
  // const [message, setMessage] = useState();
  let { registerId } = useParams();
  let navigate = useNavigate();
  const profile = getProfile(parseInt(registerId));
  /* const {
    name,
    homoclave
    num_register
    alias,
    date_birth,
    height, <- se puede actualizar
    nationality,
    country_birth,
    place_birth,
    gender,
    tattoos,
    date_arrest
    due,<- crear un nuevo registro
    reason_arrest,<- crear un nuevo registro
    description_arrest,<- crear un nuevo registro
    img_profile <- se puede actualizar
    imgages_arrest {se agregaran mas fotos}
    docs {se agregaran mas fotos}
    profile_ref
  } = profile; */

  const verifyId = () => {
    if (!profile) {
      navigate('/notfound', { replace: true });
    }
  };
  if (registerId) {
    verifyId();
  }

  const [modalView, setModalView] = useState(false),
    [modalViewActive, setModalViewActive] = useState('');
  const activeModal = (modalView) => {
    setModalView(true);
    setModalViewActive(modalView);
  };

  return (
    <div className='form-register'>
      <p className='txt-headers'>Registro {registerId}</p>
      <Formik
        initialValues={{
          name: '',
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
        validate={(values) => {
          let err = {};
          if (!values.name) {
            err.name = 'El nombre es requerido';
          } else if (
            values.name.length < 7 ||
            values.name.length > 100 ||
            !/^[a-zA-Z ]*$/.test(values.name)
          ) {
            err.name = 'Ingrese un nombre valido';
            console.log(err);
          }
          if (!values.alias) {
            err.alias = 'El alias es requerido';
            console.log(err);
          }
          return err;
        }}
        onSubmit={(values, { resetForm }) => {
          // setMessage('Registro guardado');
          resetForm();
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
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
                  <div className='name col-s-100 col-m-80'>
                    <label htmlFor='name'>Nombre completo</label>
                    <Field
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Nombre(s) Apellido Paterno Materno'
                    />
                    <ErrorMessage
                      name='name'
                      component={() => (
                        <div className='err-message-input'>{errors.name}</div>
                      )}
                    />
                  </div>
                  <div className='alias col-s-100 col-m-20'>
                    <label htmlFor='alias'>alias</label>
                    <Field
                      type='text'
                      name='alias'
                      id='alias'
                      placeholder='Alias N'
                      value={values.alias}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div className='row-register'>
                  <div className='birthday  col-s-100 col-m-35 col-l-25'>
                    <label htmlFor='birthday'>Fecha de nac.</label>
                    <input type='date' name='birthday' id='birthday' />
                  </div>
                  <div className='height col-s-100 col-m-25'>
                    <label htmlFor='height'>Estatura</label>
                    <input type='number' name='height' id='height' />
                  </div>
                  <div className='gender col-s-100 col-m-25'>
                    <label htmlFor='gender'>Sexo</label>
                    {/* <select name='gender' id='gender'>
                  <option value='Hombre'>Hombre</option>
                  <option value='Mujer'>Mujer</option>
                </select> */}
                    <input type='text' name='gender' id='gender' />
                  </div>
                  <div className='tattoos col-s-100 col-m-25'>
                    <label htmlFor='tattoos'>tatuajes</label>
                    <input type='text' name='tattoos' id='tattoos' />
                  </div>
                </div>
                <div className='row-register'>
                  <div className='nationality col-s-100'>
                    <label htmlFor='nationality'>Nacionalidad</label>
                    <Field name='nationality' id='nationality' as='select'>
                      <option value='Mexicano'>Mexicano</option>
                      <option value='Extranjero'>Extranjero</option>
                    </Field>
                  </div>
                  <div className='country_birth col-s-100'>
                    <label htmlFor='country_birth'>Pais de nacimiento</label>
                    <input
                      type='text'
                      name='country_birth'
                      id='country_birth'
                    />
                  </div>
                  <div className='place_birth col-s-100'>
                    <label htmlFor='place_birth'>Ent. Fed. Nacim.</label>
                    <input type='text' name='place_birth' id='place_birth' />
                  </div>
                </div>

                <div className='row-register'>
                  <div className='date_arrest col-s-100 col-m-35 col-l-25'>
                    <label htmlFor='date_arrest'>Fecha detencion</label>
                    <input type='date' name='date_arrest' id='date_arrest' />
                  </div>
                  <div className='reason_arrest col-s-100 col-m-75'>
                    <label htmlFor='reason_arrest'>Motivo de detencion</label>
                    <input
                      type='text'
                      name='reason_arrest'
                      id='reason_arrest'
                    />
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
              ></Field>
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
