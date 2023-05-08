import React, { useState } from 'react'
import Header from '../components/Header';
import { SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native';
import { Text, View, Linking } from 'react-native';
import Button from '../components/Button'
import Background from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import { SetDate } from '../Redux/Action';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DatePicker from 'react-native-modern-datepicker';
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { onChange } from 'react-native-reanimated';
import { Click } from '../Redux/Action';


export default function Eligible({ navigation }) {
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false)
  const [sample,setSample]=useState(false)
  
  const[storingDate,setStoringDate]=useState()
  const [storingTime,setStoringTime]=useState()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userr, setUserDataa] = React.useState({ field1: 'eco_mode_off', field2: "" });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  const [user, setUserData] = React.useState({ field1: '', field2: "" });
  console.log(user);
  
  
  const SampleClick = () => {
    fetch("http://192.168.1.1/genericArgs?username=Redmi&password=123456789", {

      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(saveData(response))
        // setSettingsData(response);/
        console.log("kj");
      })
      .catch(error => {
        // console.log(error, "joih");
      });
  }
  
  const onChange=(event, selectedDate)=>{
    setShow(false)
    setSample(false)
    const currentDate=selectedDate||date;
    setDate(currentDate)
    console.log(date);
    let tempDate =new Date(currentDate);
    let fDate =tempDate.getDate()+':'+(tempDate.getMonth()+1)+':'+tempDate.getFullYear();
    let fTime = tempDate.getHours()+":"+tempDate.getMinutes()+":"+tempDate.getSeconds();
    console.log(fDate);
    console.log(fTime);
    setStoringDate(fDate)
    setStoringTime(fTime)
    console.log(userr);
  }

  
  const Clicked= () => {   
    console.log("Button clicked");   
    const field1=    storingDate;
    const field2= storingTime;
    console.log(field1);
         fetch("https://api.thingspeak.com/update?api_key=YC54O11IV85P4S7O&field6="+ JSON.stringify({
          field1,field2
        }), {
          method: "POST",
          headers: {
            "content-type": "application/json",
          }, 
        })
          .then((response) => response.json())                
          .then((response) => {
            // toast.success(response?.toast)
            console.log(response,"casdvas")
            if (!response?.success) {
              throw Error(response.error)
            }  
          })
          .catch((err) => {
            console.log(err,"cvdsavs");         
          });
          dispatch(Click(userr))
    // dispatch(SetDate(user))
  }
  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}

     
     
     <Button
        mode="contained"
        onPress={()=>setShow(true)}
        >
     kvjnvkj
      </Button>
      <TextInput
        style={styles.input}
        onPress={()=>setShow(true)}
        // value={text}
      />
      <Button
        mode="contained"
        onPress={()=>setSample(true)}
        >
        Select time
      </Button>

     {show==true ? <DateTimePicker display="spinner" value={date} onChange={onChange}/>:console.log("vewjk")}
     {sample==true ? <DateTimePicker display="spinner" timeZoneOffsetInSeconds={3600}  mode="time" value={time} onChange={onChange}/>:console.log("vewjk")}

      <Button title="Show Date Picker" onPress={showDatePicker} />
      
      <Button
        mode="contained"
        onPress={Clicked()}
      >
        OK
      </Button>
    </Background>
  )
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 300,
    height: 50,
    padding: 10,
    margin: 10
  },

})
