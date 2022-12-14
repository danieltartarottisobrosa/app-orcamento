import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { View, FormErrorMessage } from '../components'
import { Input, Image, Button } from '@rneui/themed'
import { Images, Colors, auth } from '../config'
import { useTogglePasswordVisibility } from '../hooks'
import { loginValidationSchema } from '../utils'

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('')
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility()

  const handleLogin = values => {
    const { email, password } = values
    signInWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    )
  }
  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.logoContainer}>
            <Image source={Images.logo} style={styles.logoImage} />
            <Text style={styles.screenTitle}>Orçamento</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={values => handleLogin(values)}
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
                {/* Input fields */}
                <Input
                  name='email'
                  placeholder='Digite seu e-mail'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <Input
                  name='password'
                  placeholder='Digite sua senha'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType='password'
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                
                {errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </Button>
              </>
            )}
          </Formik>
          
          <Button
            style={styles.borderlessButtonContainer}
            type="clear"
            title='Ainda não possui uma conta?'
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            style={styles.borderlessButtonContainer}
            type="clear"
            title='Esqueceu sua senha?'
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12
  },
  logoImage: {
    height: 131,
    width: 154,
    marginTop: 34
  },
  logoContainer: {
    alignItems: 'center'
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
