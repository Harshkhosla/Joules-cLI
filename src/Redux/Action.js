export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_EMAIL = "SET_USER_EMAIL";

export const setName = (house_voltage) => {
    console.log(house_voltage);
    return {
        type: SET_USER_NAME,
        payload: house_voltage
    }
}

export const setEmail = email => dispatch => {
    dispatch({
        type: SET_USER_EMAIL,
        payload: email
    })
}

export const Click = (user) => {
    // debugger;
    return (dispatch) => {
        // console.log(user,"ekvhjwejh");
        const { field1, field2 } = user;
        fetch("https://api.thingspeak.com/update?api_key=YC54O11IV85P4S7O&field1=" + JSON.stringify({
            field1,
        }), {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                toast.success(response?.toast)
                console.log(response, "casdvas")
                if (!response?.success) {
                    throw Error(response.error)
                }
            })
            .catch((err) => {
                console.log(err, "cvdsavs");
            });
    }
}

export const SetDate = (user) => {
    return (dispatch) => {

        const { field1, field2 } = user;
        fetch("https://api.thingspeak.com/update?api_key=YQVCR2JG4XJJO80B&field1=" + JSON.stringify({
            field1, field2
        }), {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                toast.success(response?.toast)
                console.log(response, "casdvas")
                if (!response?.success) {
                    throw Error(response.error)
                }
            })
            .catch((err) => {
                console.log(err, "cvdsavs");
            });
    }
}

export const CarDetails = (value) => {
    return (dispatch) => {
        console.log(value);
        const [{ Battery_Pack: batteryPack }, { Car: car }, { House_voltage: house_Ampere}] = value;
        fetch("https://api.thingspeak.com/update?api_key=YC54O11IV85P4S7O&field2=" + JSON.stringify({
            batteryPack, car, house_Ampere
        }), {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                toast.success(response?.toast)
                console.log(response, "casdvas")
                if (!response?.success) {
                    throw Error(response.error)
                }
            })
            .catch((err) => {
                console.log(err, "cvdsavs");
            });
    }
}