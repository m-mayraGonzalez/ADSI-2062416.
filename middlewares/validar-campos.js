import validator from 'express-validator';
const {validationResult} = validator;

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors);

  next();
};

export { validarCampos }
