import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { View, FormErrorMessage } from '../components'
import { Input, Image, Button } from '@rneui/themed'
import { Images, Colors, auth } from '../config'
import { useTogglePasswordVisibility } from '../hooks'
import { signupValidationSchema } from '../utils'

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('')

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility
  } = useTogglePasswordVisibility()

  const handleSignup = async values => {
    const { email, password } = values

    createUserWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    )
  }

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* LogoContainer: consits app logo and screen title */}
        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logoImage} />
          <Text style={styles.screenTitle}>Cria sua conta!</Text>
        </View>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={signupValidationSchema}
          onSubmit={values => handleSignup(values)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur
          }) => (
            <>
              
              <Input
                name='email'
                placeholder='Digite seu email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <Input
                name='password'
                placeholder='Digite sua senha'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='newPassword'
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <Input
                name='confirmPassword'
                placeholder='Digite sua senha novamente'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType='password'
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              <FormErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              
              {errorState !== '' ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrar</Text>
              </Button>
            </>
          )}
        </Formik>
        
        <Button
          style={styles.borderlessButtonContainer}
          type='clear'
          title='Já possui conta?'
          onPress={() => navigation.navigate('Login')}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12
  },
  logoContainer: {
    alignItems: 'center'
  },
  logoImage: {
    height: 131,
    width: 154,
    marginTop: 34
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 34
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
