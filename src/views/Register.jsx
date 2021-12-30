import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/firebase/profiles';
import Modals from '../components/Modals';
import axios from 'axios';
import * as Yup from 'yup';
import statesMx from '../assets/statesMx.json';
import app from '../services/firebase/firebaseConfig';
import {
  doc,
  getFirestore,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import RfcaFacil from 'rfc-facil';
import uniqid from 'uniqid';
import { uploadImgProfile } from '../services/cloudinary/uploadImgProfile';

const Register = () => {
  // cada registro debera tener el numero de empleado que lo creo
  let uniqId = uniqid();
  const [mexican, setMexican] = useState(true);
  const [countrys, setCountrys] = useState([]);
  const [imgProfile, setImgProfile] = useState(
      'https://images.unsplash.com/photo-1639100618065-358723b7961d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    ),
    [loading, setLoading] = useState(false);
  let { registerId } = useParams();
  let navigate = useNavigate();
  const profile = getProfile(parseInt(registerId));
  const [modalView, setModalView] = useState(false),
    [modalViewActive, setModalViewActive] = useState('');
  const activeModal = (modalView) => {
    setModalView(true);
    setModalViewActive(modalView);
  };

  // Initialize firestore
  const firestore = getFirestore(app);

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

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Nombre muy corto')
      .max(50, 'Nombre muy largo')
      .matches(/^[a-zA-Z ]*$/, 'Nombre invalido')
      .trim()
      .required('Campo nombre vacio'),
    firstLastName: Yup.string()
      .min(2, 'Apellido muy corto')
      .max(50, 'Apellido muy largo')
      .trim()
      .required('Campo apellido vacio'),
    secondLastName: Yup.string()
      .matches(/^[a-zA-Z ]*$/, 'Nombre invalido')
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

  const getRfc = ({ name, firstLastName, secondLastName, date_birth }) => {
    let fullDatebirth = new Date(date_birth).toISOString();
    let day = fullDatebirth.substring(8, 10);
    let month = fullDatebirth.substring(5, 7);
    let year = fullDatebirth.substring(0, 4);

    const rfc = RfcaFacil.forNaturalPerson({
      name: name,
      firstLastName: firstLastName,
      secondLastName: secondLastName,
      day: day,
      month: month,
      year: year,
    });
    return rfc;
  };
  const setProfile = async (values, rfc) => {
    const profile = {
      img_profile: imgProfile,
      fullName: `${values.name} ${values.firstLastName} ${values.secondLastName}`,
      name: values.name,
      firstLastName: values.firstLastName || null,
      secondLastName: values.secondLastName || null,
      alias: values.alias || null,
      date_birth: values.date_birth || null,
      height: values.height || null,
      gender: values.gender || null,
      tattoos: values.tattoos || null,
      nationality: values.nationality || null,
      country_birth: values.country_birth || null,
      place_birth: values.place_birth || null,
      rfc: rfc,
      history_arrest: [
        {
          reason_arrest: values.reason_arrest || null,
          description_arrest: values.description_arrest || null,
          date_arrest: values.date_arrest || null,
        },
      ],
      timestamp: serverTimestamp(),
    };

    const profilesRef = query(
      collection(firestore, 'profilestest'),
      where('rfc', '==', rfc)
    ); // Get a reference to the collection
    const querySnapshots = await getDocs(profilesRef);
    const [profileDuplicate] = querySnapshots.docs.map((doc) => doc.id);
    if (profileDuplicate === rfc) {
      console.log(profileDuplicate);
      console.log('Ya existe un registro con ese rfc');
      // activeModal('duplicate');
    } else {
      console.log('sin coincidencias');
      await setDoc(doc(firestore, 'profilestest', `${rfc}`), profile);
      console.log('Perfil guardado');
    }
  };

  const newLine = async (values, rfc) => {
    /* const updateArrest = {
      height: values.height || null,
      tattoos: values.tattoos || null,
    }; */
    const history_arrest = [
      {
        id: uniqId,
        reason_arrest: values.reason_arrest || null,
        description_arrest: values.description_arrest || null,
        date_arrest: values.date_arrest || null,
      },
    ];
    try {
      // creamos referencia al documento
      const docRef = doc(firestore, `profilestest/${rfc}`);
      // buscamos el documento
      const docSnapshot = await getDoc(docRef);
      //  revisamos si existe el documento
      if (docSnapshot.exists()) {
        //  Agregamos el nuevo arresto al historial
        await updateDoc(docRef, {
          history_arrest: [
            ...docSnapshot.data().history_arrest,
            ...history_arrest,
          ],
        });
        console.log('Perfil actualizado');
      } else {
        // si no existe creamos el documento
        console.log('No existe el documento');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form-register'>
      <p className='txt-headers'>Registro {registerId}</p>
      <Formik
        initialValues={{
          name: '',
          firstLastName: '',
          secondLastName: '',
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
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          const rfc = getRfc(values);
          setProfile(values, rfc);
          // newLine(values, rfc);
          // resetForm();
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
            <>
              {touched.name && (
                <div className='errors-message'>{errors.name}</div>
              )}
              {touched.firstLastName && (
                <div className='errors-message'>{errors.firstLastName}</div>
              )}
              {touched.secondLastName && (
                <div className='errors-message'>{errors.secondLastName}</div>
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
                  <img src={imgProfile} alt='profile' />
                </div>
                <div className='btn-img-profile'>
                  <label
                    htmlFor='imgProfile'
                    className={loading ? 'loading' : 'img-profile'}
                  >
                    {loading ? 'Subiendo...' : 'Subir foto'}
                  </label>
                  <input
                    type='file'
                    name='imgProfile'
                    id='ImgProfile'
                    onChange={(e) => {
                      setLoading(true);
                      uploadImgProfile(e.target.files[0])
                        .then((res) => {
                          setImgProfile(res);
                          setLoading(false);
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
                    <label htmlFor='name'>Nombre</label>
                    <Field
                      type='text'
                      name='name'
                      id='name'
                      placeholder='Nombre(s)'
                    />
                  </div>
                  <div className='firstLastName col-s-100 col-m-40'>
                    <label htmlFor='firstLastName'>Apellido paterno</label>
                    <Field
                      type='text'
                      name='firstLastName'
                      id='firstLastName'
                      placeholder='Apellido paterno'
                    />
                  </div>
                  <div className='secondLastName col-s-100 col-m-40'>
                    <label htmlFor='secondLastName'>Apellido materno</label>
                    <Field
                      type='text'
                      name='secondLastName'
                      id='secondLastName'
                      placeholder='Apellidos '
                    />
                  </div>

                  <div className='alias col-s-100 col-m-20'>
                    <label htmlFor='alias'>alias</label>
                    <Field
                      type='text'
                      name='alias'
                      id='alias'
                      placeholder='Alias N'
                    />
                  </div>
                </div>
                <div className='row-register'>
                  <div className='birthday  col-s-100 col-m-35 col-l-25'>
                    <label htmlFor='birthday'>Fecha de nac.</label>
                    <Field type='date' name='date_birth' id='date_birth' />
                  </div>
                  <div className='height col-s-100 col-m-25'>
                    <label htmlFor='height'>Estatura</label>
                    <Field type='number' name='height' id='height' />
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
                    <Field
                      as='select'
                      name='country_birth'
                      id='country_birth'
                      disabled={mexican ? true : false}
                    >
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
                    <Field
                      as='select'
                      name='place_birth'
                      id='place_birth'
                      disabled={mexican ? false : true}
                    >
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
                  </div>
                  <div className='reason_arrest col-s-100 col-m-75'>
                    <label htmlFor='reason_arrest'>Motivo de detencion</label>
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
                Descripcion del detenido y de la detencion
              </label>
              <Field
                name='description_arrest'
                id='description_arrest'
                as='textarea'
                className='col-s-100'
              />
            </div>
            <div className='btns-register'>
              <button type='button' onClick={() => activeModal('Images')}>
                Cargar fotos
              </button>
              <button type='button' onClick={() => activeModal('Documentos')}>
                Cargar Documentos
              </button>
              {modalView && (
                <Modals view={modalViewActive} closeModal={setModalView} />
              )}
              <button type='submit' className='btn-submit'>
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
