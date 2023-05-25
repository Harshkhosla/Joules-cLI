import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import CheckBox from '../components/CheckBox'
import Elegiblity from '../components/Elegiblity'

export default function Flat({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [isChecked, setIsChecked] = useState(false) 

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('Home')
  }

  return (
    <Background>
      <Logo />
      <BackButton goBack={navigation.goBack} />
      <Elegiblity/>
      <Header>Where do You live?</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
        
      />
      
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Done
      </Button>
    </Background>
  )
}
