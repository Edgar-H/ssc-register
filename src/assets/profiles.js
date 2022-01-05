let profiles = [
  {
    id: 'HEHE961024H57',
    name: 'PHedro Ponciano Ricky Solovino Don Juan',
    alias: 'Pedro N',
    date_birth: '12/05/1995',
    due: '05/1995',
    gender: 'Masculino',
    img_profile:
      'https://images.unsplash.com/photo-1636922861058-ac8d49cb5147?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80',
  },
  {
    id: 56,
    name: 'Pedro Ponciano Ricky Solovino Don Juan',
    alias: 'Pedro N',
    date_birth: '12/05/1987',
    due: '12/05/1995',
    gender: 'Masculino',
    img_profile:
      'https://images.unsplash.com/photo-1636936291087-2972edf08f14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 61164,
    name: 'Pedro Ponciano Ricky Solovino Don Juan',
    alias: 'Pedro N',
    date_birth: '12/05/1990',
    height: '168',
    nationality: 'mexicano',
    country_birth: 'mexico',
    place_birth: 'edomex',
    gender: 'masculino',
    tattoos: 'Si',
    due: '12/05/1995',
    reason_arrest: 'Robo en transporte',
    description_arrest:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia at delectus nam consectetur libero ratione esse totam voluptate asperiores fugiat! Placeat, natus vitae eaque delectus rem culpa fugit facilis? Deserunt!',
    img_profile:
      'https://images.unsplash.com/photo-1633994075523-84d1a39b9657?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80',
  },
  {
    id: 16516,
    name: 'Pedro Ponciano Ricky Solovino Don Juan',
    alias: 'Pedro N',
    date_birth: '12/05/2000',
    due: '12/05/1995',
    gender: 'Masculino',
    img_profile:
      'https://images.unsplash.com/photo-1634361178126-3d1d8e8a4af2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=685&q=80',
  },
  {
    id: 650,
    name: 'Pedro Ponciano Ricky Solovino Don Juan',
    alias: 'Pedro N',
    date_birth: '12/05/1986',
    due: '12/05/1995',
    gender: 'Masculino',
    img_profile:
      'https://images.unsplash.com/photo-1595237929392-f2c86cfdd48f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80',
  },
  {
    id: 611665,
    name: 'Pedro Ponciano Ricky Solovino Don Juan',
    alias: 'Pedro N',
    date_birth: '12/05/1979',
    due: '12/05/1995',
    gender: 'Masculino',
    img_profile:
      'https://images.unsplash.com/photo-1636922861058-ac8d49cb5147?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80',
  },
];

export function getProfiles() {
  return profiles;
}

export const getProfile = (id) => {
  return profiles.find((profile) => profile.id === id);
};
