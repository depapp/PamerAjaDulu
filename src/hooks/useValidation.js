import { useEffect, useState } from 'react'

const useValidation = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if (submit) {
      const isNotError = Object.keys(errors).length === 0

      if (isNotError) {
        fn()
      }

      setSubmit(false)
    }
  }, [errors])

  const handleChange = e => {
    setErrors(prev => {
      const previousErrorsWithoutCurrentField = Object.entries(prev).filter(([name]) => name !== e.target.name)
      return previousErrorsWithoutCurrentField.reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
      }), {})
    })

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleBlur = () => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmit(true)
  }

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  }
}

export default useValidation
