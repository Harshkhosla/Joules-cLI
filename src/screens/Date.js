import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert, ImageBackground, Dimensions } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import { Click, Clicked, EcoMode, ScheduleMode, BalanceMode } from '../Redux/Action';
import { SetDate } from '../Redux/Action';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const containerWidth = Dimensions.get('window').width * 0.85;
const containerHeight = Dimensions.get('window').height * 0.55;

export default function Eligible({ navigation }) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [sample, setSample] = useState(false);
  const [userr, setUserDataa] = React.useState({ field1: 'eco_mode_off', field2: '' });
  const Porduct_Key = useSelector(state => state?.userReducers?.Product?.name)
  console.log(Porduct_Key);

  const [scheduleData, setScheduleData] = useState({
    Date: null,
    Time: null,
    'Charging Mode': 'Schedule_Mode',
    Porduct_Key: '',
  });
 console.log(scheduleData,"ololo");

  const onChange = (event, selectedDate) => {
    setShow(false);
    setSample(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();

    setScheduleData((prevState) => ({
      ...prevState,
      Date: fDate,
    }));
  };

  const onChangee = (event, selectedDate) => {
    setShow(false);
    setSample(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();

    setScheduleData((prevState) => ({
      ...prevState,
      Time: fTime,
    }));
  };


  const Clicke=()=>{
    // dispatch(ScheduleMode(scheduleData));
    dispatch(ScheduleMode(scheduleData,Porduct_Key));
    navigation.navigate('Navbar')
  }


  return (
    <Background>
      <Header style={styles.header}>Schedule Mode</Header>

      <View style={[styles.container, { width: containerWidth, height: containerHeight }]}>
        <View style={styles.topContent}>
          <Text style={styles.instructions}>To start the Schedule mode you need to set the given parameters</Text>
          <Text style={styles.subText}>Recommended Time to use low-cost tariffs</Text>
        </View>

        <TouchableOpacity
  style={[styles.clickableContainer, styles.inputContainer]}
  onPress={() => setShow(true)}
>
  <Text style={styles.containerText}>Set Time</Text>
  <Text style={styles.buttonText}>{scheduleData?scheduleData.Date:console.log("rjr")}</Text>
</TouchableOpacity>
        <TouchableOpacity
          style={[styles.clickableContainer, styles.inputContainer]}
          onPress={()=>setSample(true)}
        >
          <Text style={styles.containerText}>Set Time</Text>
          <Text style={styles.buttonText}>{scheduleData?scheduleData.Time:console.log("rjr")}</Text>

    
        </TouchableOpacity>

        {show==true ?
          <DateTimePicker display="spinner"   value={date} onChange={onChange} />:console.log("heheh"
          )}
     {sample==true ? <DateTimePicker display="spinner" timeZoneOffsetInSeconds={3600}  mode="time"  value={time} onChange={onChangee}/>:console.log("vewjk",time)} 

      </View>
        <Button
   mode="contained"
  onPress={Clicke}
>Okay</Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBF1CC',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    // Define your header styles here
  },
  topContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  instructions: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
  },
  clickableContainer: {
    width: 200,
    height: containerHeight * 0.2,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  inputContainer: {
    backgroundColor: 'white',
  },buttonText: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
  },
  containerText: {
    fontSize: 16,
    color: 'black',
  },
});
