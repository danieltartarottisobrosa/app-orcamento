import * as Yup from 'yup'
import { pt } from 'yup-locale-pt'

Yup.setLocale(pt)

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('E-mail'),
  password: Yup.string().required().min(6).label('Senha')
})

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('E-mail'),
  password: Yup.string().required().min(6).label('Senha'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'A confirmação de senha precisa ser igual à senha')
    .required('Confirmação de senha é obrigatória')
})

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required('Por favor digite um e-mail registrado')
    .label('E-mail')
    .email('Digite um e-mail válido')
})
