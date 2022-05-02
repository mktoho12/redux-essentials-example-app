const firstIfArray = <T>(arrayOrSingle: T[] | T) =>
  Array.isArray(arrayOrSingle) ? arrayOrSingle[0] : arrayOrSingle

  export default firstIfArray