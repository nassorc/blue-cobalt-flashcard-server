import AppError from "./AppError"

class MissingFieldsError extends AppError {
  constructor(fields: string[], statusCode: number = 400) {
    let message = `fields ${fields.toString()} are missing` 
    super(message, statusCode)
  }
}

export default MissingFieldsError