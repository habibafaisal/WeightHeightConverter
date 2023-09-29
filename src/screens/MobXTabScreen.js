import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {observer} from 'mobx-react';
import {useMobXStore} from '../state/MobXStore';

const MobXTabScreen = observer(() => {
  const mobXStore = useMobXStore();

  const convertWeight = () => {
    if (mobXStore.isMetric) {
      const kilograms = parseFloat(mobXStore.weight);
      const pounds = kilograms * 2.20462;
      mobXStore.setWeight(pounds.toFixed(2));
    } else {
      const pounds = parseFloat(mobXStore.weight);
      const kilograms = pounds / 2.20462;
      mobXStore.setWeight(kilograms.toFixed(2));
    }
  };

  const convertHeight = () => {
    if (mobXStore.isMetric) {
      const meters = parseFloat(mobXStore.height);
      const feet = Math.floor(meters * 3.28084);
      const inches = Math.round((meters * 39.3701) % 12);
      mobXStore.setHeight(`${feet} ft ${inches} inch`);
    } else {
      const meters = mobXStore.feet * 0.3048 + mobXStore.inches * 0.0254;
      mobXStore.setFeet(meters.toFixed(2));
      mobXStore.setInches(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Weight and Height Converter (MobX)</Text>
      <Text style={styles.unitText}>
        Selected Units: {mobXStore.isMetric ? 'Metric' : 'Imperial'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={
          mobXStore.isMetric ? 'Enter Weight (kg)' : 'Enter Weight (lbs)'
        }
        keyboardType="numeric"
        value={mobXStore.weight}
        onChangeText={text => mobXStore.setWeight(text)}
      />
      {mobXStore.isMetric ? (
        <TextInput
          style={[styles.input, styles.roundedInput]}
          placeholder="Enter Height (m)"
          keyboardType="numeric"
          value={mobXStore.height}
          onChangeText={text => mobXStore.setHeight(text)}
        />
      ) : (
        <View style={styles.heightContainer}>
          <TextInput
            style={[styles.input, styles.roundedInput]}
            placeholder="Enter Height (ft)"
            keyboardType="numeric"
            value={mobXStore.feet}
            onChangeText={text => mobXStore.setFeet(text)}
          />
          <TextInput
            style={[styles.input, styles.roundedInput]}
            placeholder="Enter Height (inch)"
            keyboardType="numeric"
            value={mobXStore.inches}
            onChangeText={text => mobXStore.setInches(text)}
          />
        </View>
      )}
      <View style={styles.unitButtons}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            mobXStore.isMetric ? styles.selectedUnitButton : null,
          ]}
          onPress={() => mobXStore.toggleUnit()}>
          <Text style={mobXStore.isMetric ? styles.selectedUnitText : null}>
            Metric
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.unitButton,
            !mobXStore.isMetric ? styles.selectedUnitButton : null,
          ]}
          onPress={() => mobXStore.toggleUnit()}>
          <Text style={!mobXStore.isMetric ? styles.selectedUnitText : null}>
            Imperial
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          convertWeight();
          convertHeight();
        }}>
        <Text style={styles.ButtonText}>Convert</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          /* Add your save function here */
        }}>
        <Text style={styles.ButtonText}>Save to Disk</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'#343541'
  },
  header: {
    position: 'absolute',
    top: '5%',
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
  },
  unitText: {
    margin: 20,
  },
  unitButtons: {
    flexDirection: 'row',
    margin: 10,
    width: '80%',
  },
  unitButton: {
    padding: '4%',
    flex: 1,
    justifyContent: 'space-between',
    // marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  selectedUnitButton: {
    backgroundColor: 'green',
  },
  selectedUnitText: {
    color: 'white',
  },
  inputContainer: {
    width: '80%',
    margin: 5,
  },
  input: {
    width: '80%',
    // height: 40,
    borderColor: 'gray',
    padding: '2%',
    borderWidth: 1,
    marginVertical: 10,
    // paddingHorizontal: 10,
    borderRadius: 16,
    marginTop: 2,
    textAlign: 'center',
  },
  saveButtonContainer: {
    // marginVertical: 10,
    // flex:1,
    // height:'50%',
    flexDirection: 'row',
    padding: '5%',
    // backgroundColor:'black'
    // justifyContent:'space-around',
    // alignSelf:'center'
    // columnGap:'5%s'
  },
  Button: {
    backgroundColor: 'gray',
    padding: '2%',
    borderRadius: 16,
    // columnGap:'5%'
    marginTop: 5,
    padding: '5%',
    backgroundColor: 'black',
    margin: 5,
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
export default MobXTabScreen;
