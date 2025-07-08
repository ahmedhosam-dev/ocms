const validate = (schema, property = 'body') => {
  return async (req, res, next) => {
    const value = await schema.validateAsync(req[property], { abortEarly: false })
    .then((result) => {
      console.log(`Validation passed ${result}`)
      next()
    })
    .catch((error) => {
      if (error.details) {
        const errorMessages = error.details.map(detail => detail.message)
        return res.status(400).json({ errors: errorMessages })
      }
      return res.status(400).json({ errors: [error.message] })
    })
  }
}

export default validate
