import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
const CustomChart= ({xlabels}) => {
    // Sample data (replace with your actual data)
    const ylabelData=useSelector((state)=>state?.userReducers?.CurrentPower)

    console.log("ylabelData",ylabelData);
    const data = {
      labels: xlabels,
      datasets: [
        {
          data: ylabelData || [1,2,4,5,6],
        },
      ],
    };
  
    return (
      <View>
        <LineChart
          data={data}
          width={300}
          height={200}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  };
  
  export default CustomChart