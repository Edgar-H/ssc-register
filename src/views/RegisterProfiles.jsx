import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import Modals from '../components/Modals';
import statesMx from '../assets/statesMx.json';
import { uploadImgProfile } from '../services/cloudinary/uploadImgProfile';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProfile } from '../services/firebase/getProfile';
import { getCountrys } from '../helpers/getCounrys';
import { getRfc } from '../helpers/getRFC';
import { setProfile } from '../services/firebase/setProfile';
import { updateProfile } from '../services/firebase/updateProfile';
import { finishLoading, startLoading } from '../redux/actions/ui';
import { SignupSchema, SignupSchemaUpdate } from '../helpers/SignupSchema';

const Register = () => {
  // ! cada registro debera tener el numero de empleado que lo creo
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const [mexican, setMexican] = useState(true);
  const [countrys, setCountrys] = useState([]);
  const [imgProfile, setImgProfile] = useState(
    'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  );
  const [modalView, setModalView] = useState(false);
  const [modalViewActive, setModalViewActive] = useState('');
  const [profileExists, setProfileExists] = useState();

  const { rfcProfile } = useParams();

  useEffect(() => {
    if (rfcProfile) {
      dispatch(startLoading());
      getProfile(rfcProfile)
        .then((profile) => {
          if (profile === null) {
            navigate('/notfound', { replace: true });
            dispatch(finishLoading());
          }
          setProfileExists(profile);
          dispatch(finishLoading());
        })
        .catch((err) => {
          console.log(err);
          navigate('/notfound', { replace: true });
        });
    }
  }, [dispatch, navigate, rfcProfile]);

  const handleSaveProfile = (values) => {
    if (profileExists) {
      updateProfile(values, rfcProfile)
        .then(() => {
          // navigate('/profile', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const rfc = getRfc(values);
      setProfile(values, rfc, imgProfile);
    }
  };

  const validationInputs = profileExists ? SignupSchemaUpdate : SignupSchema;

  return (
    <div className='form-register'>
      <p className='txt-headers'>Registro {rfcProfile}</p>
      <Formik
        initialValues={{
          name: '',
          first_last_name: '',
          second_last_name: '',
          alias: '',
          date_birth: '',
          height: '',
          gender: 'Hombre',
          tattoos: 'no',
          nationality: 'Mexicano',
          country_birth: '',
          place_birth: 'Ciudad de Mexico',
          date_arrest: '',
          reason_arrest: '',
          description_arrest: '',
        }}
        validationSchema={validationInputs}
        validate={(values) => {
          if (values.nationality === 'extranjero') {
            setMexican(false);
            getCountrys().then((item) => {
              setCountrys(item);
            });
          } else {
            setMexican(true);
          }
        }}
        onSubmit={(values) => {
          handleSaveProfile(values);
        }}
      >
        {({ errors, touched, handleSubmit, values }) => (
          <Form onSubmit={handleSubmit}>
            {isLoading ? (
              <p>Loding...</p>
            ) : (
              <>
                <>
                  {touched.name && (
                    <div className='errors-message'>{errors.name}</div>
                  )}
                  {touched.first_last_name && (
                    <div className='errors-message'>
                      {errors.first_last_name}
                    </div>
                  )}
                  {touched.second_last_name && (
                    <div className='errors-message'>
                      {errors.second_last_name}
                    </div>
                  )}
                  {touched.alias && (
                    <div className='errors-message'>{errors.alias}</div>
                  )}
                  {touched.date_birth && (
                    <div className='errors-message'>{errors.date_birth}</div>
                  )}
                  {touched.height && (
                    <div className='errors-message'>{errors.height}</div>
                  )}
                  {touched.reason_arrest && (
                    <div className='errors-message'>{errors.reason_arrest}</div>
                  )}
                  {touched.date_arrest && (
                    <div className='errors-message'>{errors.date_arrest}</div>
                  )}
                  {touched.description_arrest && (
                    <div className='errors-message'>
                      {errors.description_arrest}
                    </div>
                  )}
                </>
                <div className='header-register'>
                  <div className='img-profile-register'>
                    <div className='img-profile'>
                      <img
                        src={profileExists?.img_profile || imgProfile}
                        alt='profile'
                      />
                    </div>
                    <div className='btn-img-profile'>
                      <label
                        htmlFor='imgProfile'
                        className={isLoading ? 'loading' : 'img-profile'}
                      >
                        {isLoading ? 'Subiendo...' : 'Subir foto'}
                      </label>
                      <input
                        type='file'
                        name='imgProfile'
                        id='ImgProfile'
                        onChange={(e) => {
                          startLoading();
                          uploadImgProfile(e.target.files[0])
                            .then((res) => {
                              setImgProfile(res);
                              finishLoading();
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      />
                    </div>
                  </div>
                  <div className='basic-profile'>
                    <div className='row-register'>
                      <div className='name col-s-100 col-m-40'>
                        <label htmlFor='name'>nombre</label>
                        <Field
                          type='text'
                          name='name'
                          id='name'
                          placeholder='Nombre(s)'
                          disabled={profileExists ? true : false}
                          value={
                            profileExists ? profileExists?.name : values.name
                          }
                        />
                      </div>
                      <div className='col-s-100 col-m-40'>
                        <label htmlFor='first_last_name'>
                          apellido paterno
                        </label>
                        <Field
                          type='text'
                          name='first_last_name'
                          id='first_last_name'
                          placeholder='apellido paterno'
                          disabled={profileExists ? true : false}
                          value={
                            profileExists?.first_last_name ||
                            values.first_last_name
                          }
                        />
                      </div>
                      <div className='col-s-100 col-m-40'>
                        <label htmlFor='second_last_name'>
                          apellido materno
                        </label>
                        <Field
                          type='text'
                          name='second_last_name'
                          id='second_last_name'
                          placeholder='apellidos'
                          disabled={profileExists ? true : false}
                          value={
                            profileExists?.second_last_name ||
                            values.second_last_name
                          }
                        />
                      </div>

                      <div className='alias col-s-100 col-m-20'>
                        <label htmlFor='alias'>alias</label>
                        <Field
                          type='text'
                          name='alias'
                          id='alias'
                          placeholder='alias n'
                          disabled={profileExists ? true : false}
                          value={profileExists?.alias || values.alias}
                        />
                      </div>
                    </div>
                    <div className='row-register'>
                      <div className='birthday  col-s-100 col-m-35 col-l-25'>
                        <label htmlFor='birthday'>fecha de nac.</label>
                        <Field
                          type='date'
                          name='date_birth'
                          id='date_birth'
                          disabled={profileExists ? true : false}
                          value={profileExists?.date_birth || values.date_birth}
                        />
                      </div>
                      <div className='height col-s-100 col-m-25'>
                        <label htmlFor='height'>estatura</label>
                        <Field type='number' name='height' id='height' />
                      </div>
                      <div className='gender col-s-100 col-m-25'>
                        <label htmlFor='gender'>sexo</label>
                        <Field
                          as='select'
                          name='gender'
                          id='gender'
                          disabled={profileExists ? true : false}
                        >
                          {profileExists ? (
                            <option value={profileExists.gender}>
                              {profileExists.gender}
                            </option>
                          ) : (
                            <>
                              <option value='Hombre'>Hombre</option>
                              <option value='Mujer'>Mujer</option>
                            </>
                          )}
                        </Field>
                      </div>
                      <div className='tattoos col-s-100 col-m-25'>
                        <label htmlFor='tattoos'>tatuajes</label>
                        <Field
                          as='select'
                          name='tattoos'
                          id='tattoos'
                          disabled={profileExists ? true : false}
                        >
                          {profileExists ? (
                            <option value={profileExists.tattoos}>
                              {profileExists.tattoos}
                            </option>
                          ) : (
                            <>
                              <option value='no'>no</option>
                              <option value='si'>si</option>
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className='row-register'>
                      <div className='nationality col-s-100'>
                        <label htmlFor='nationality'>nacionalidad</label>
                        <Field
                          as='select'
                          name='nationality'
                          id='nationality'
                          disabled={profileExists ? true : false}
                        >
                          {profileExists ? (
                            <option value={profileExists.nationality}>
                              {profileExists.nationality}
                            </option>
                          ) : (
                            <>
                              <option value='mexicano'>mexicano</option>
                              <option value='extranjero'>extranjero</option>
                            </>
                          )}
                        </Field>
                      </div>
                      <div className='country_birth col-s-100'>
                        <label htmlFor='country_birth'>
                          pais de nacimiento
                        </label>
                        <Field
                          as='select'
                          name='country_birth'
                          id='country_birth'
                          disabled={
                            profileExists ? true : mexican ? true : false
                          }
                        >
                          {profileExists ? (
                            <option value={profileExists.country_birth}>
                              {profileExists.country_birth}
                            </option>
                          ) : (
                            !mexican &&
                            countrys?.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))
                          )}
                        </Field>
                      </div>
                      <div className='place_birth col-s-100'>
                        <label htmlFor='place_birth'>ent. fed. nacim.</label>
                        <Field
                          as='select'
                          name='place_birth'
                          id='place_birth'
                          disabled={
                            profileExists ? true : mexican ? false : true
                          }
                        >
                          {profileExists ? (
                            <option value={profileExists.place_birth}>
                              {profileExists.place_birth}
                            </option>
                          ) : (
                            mexican &&
                            statesMx.map((state) => (
                              <option
                                key={state.abbreviation}
                                value={state.name}
                              >
                                {state.name}
                              </option>
                            ))
                          )}
                        </Field>
                      </div>
                    </div>

                    <div className='row-register'>
                      <div className='date_arrest col-s-100 col-m-35 col-l-25'>
                        <label htmlFor='date_arrest'>fecha detencion</label>
                        <Field
                          type='date'
                          name='date_arrest'
                          id='date_arrest'
                        />
                      </div>
                      <div className='reason_arrest col-s-100 col-m-75'>
                        <label htmlFor='reason_arrest'>
                          motivo de detencion
                        </label>
                        <Field
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
                    descripcion del detenido y de la detencion
                  </label>
                  <Field
                    name='description_arrest'
                    id='description_arrest'
                    as='textarea'
                    className='col-s-100'
                  />
                </div>
                <div className='btns-register'>
                  <button
                    type='button'
                    onClick={() => {
                      setModalView(true);
                      setModalViewActive('Images');
                    }}
                  >
                    Cargar fotos
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setModalView(true);
                      setModalViewActive('Documentos');
                    }}
                  >
                    Cargar Documentos
                  </button>
                  {modalView && (
                    <Modals view={modalViewActive} closeModal={setModalView} />
                  )}
                  <button type='submit' className='btn-submit'>
                    Registrar
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
