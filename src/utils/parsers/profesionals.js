export const getProfessionalData = values => {
  return map(value => {
  return {
  profilePicture: pathOr('', ['profilePicture'], values),
  document: pathOr('', ['document'], values)
  }
  }, values)
  }