import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'

export default function Dashboard({ navigation }) {
  return (
    <Background>

      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Get Started Msg.....
      </Paragraph>
      {/* <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button> */}
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Load')
        }
      >
        Next Question
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('HomePage')
        }
      >
        Entering
      </Button>
      {/* <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Meter')
        }
      >
        Meter
      </Button> */}
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Date')
        }
      >
        Date and time
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Home')
        }
      >
        Home page
      </Button>
    </Background>
  )
}
