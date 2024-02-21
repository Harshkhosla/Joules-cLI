import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
        
const ChartRadhe = () => {
    const barData = [
        {value: 15, label: 'Jan'},
        {value: 40, label: 'Jan'},
        {value: 10, label: 'Mar'},
        {value: 30, label: 'Apr'},
        ];
        return (
        <View>
            <BarChart
            isThreeD 
             showLine
            // stepValue={10}
            maxValue={60}
            noOfSections={10}
            data={barData}
            barWidth={50}
            cappedBars
            capColor={'rgba(78, 0, 142)'}
            capThickness={6}
            showGradient
            gradientColor={'rgba(200, 100, 244,0.8)'}
            frontColor={'rgba(219, 182, 249,0.2)'}
            initialSpacing={10}
            barMarginBottom={10}
            xAxisColor={'#c919ff'}
        //   frontColor={'transparent'}
          sideColor={'#ff00d0'}
          topColor={'#ff66f4'}
          barStyle={{
            borderWidth: 4,
            borderColor: '#fc84ff',
            shadowColor: '#fc84ff',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 1,
            shadowRadius: 8,
            elevation: 10,
          }}
          
            // hideYAxisText
        //     yAxisThickness={60}
        //   xAxisThickness={6}
            />
        </View>
  )
}

export default ChartRadhe