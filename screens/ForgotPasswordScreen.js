import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Formik } from 'formik'
import { sendPasswordResetEmail } from 'firebase/auth'

import { passwordResetSchema } from '../utils'
import { Images, Colors, auth } from '../config'
import { View, FormErrorMessage } from '../components'
import { Input, Image, Button } from '@rneui/themed'

export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('')

  const handleSendPasswordResetEmail = values => {
    const { email } = values

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Success: Password Reset Email sent.')
        navigation.navigate('Login')
      })
      .catch(error => setErrorState(error.message))
  }

  return (
    <View isSafe style={styles.container}>
      <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logoImage} />
          <Text style={styles.screenTitle}>Recuperação de Senha</Text>
      </View>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={passwordResetSchema}
        onSubmit={values => handleSendPasswordResetEmail(values)}
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
            {/* Email input field */}
            <Input
              name='email'
              placeholder='Digite seu e-mail'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />
            
            {errorState !== '' ? (
              <FormErrorMessage error={errorState} visible={true} />
            ) : null}
            
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar e-mail</Text>
            </Button>
          </>
        )}
      </Formik>
      
      <Button
        style={styles.borderlessButtonContainer}
        type='clear'
        title='Voltar ao login'
        onPress={() => navigation.navigate('Login')}
      />
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
