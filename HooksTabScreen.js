import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useWeightHeight} from './WeightHeightContext';

const HooksTabScreen = () => {
  const {
    isMetric,
    toggleUnit,
    weight,
    setWeight,
    height,
    setHeight,
    saveData,
    loadData,
    savedData,
    convertWeight,
    convertHeight,
    convertHeightFt,
    inches,
    setInches,
    feet,
    setFeet,
  } = useWeightHeight();
  // const [feet, setFeet] = useState(0);
  // const [inches, setInches] = useState(0);
  // const [result, setResult] = useState(0);

  const toggleMetric = () => {
    toggleUnit();
    if (!isMetric) {
      // Reset height when switching to metric units
      // setHeight('0');
    }
  };

  const toggleImperial = () => {
    toggleUnit();
    if (isMetric) {
      // Convert the current metric height to imperial units
      const convertedHeight = convertHeight(height);
      const [feet, inches] = convertedHeight.split(' ');
      setFeet(feet);
      setInches(inches);
    }
  };

  const handleWeightInputChange = text => {
    setWeight(text);
  };

  const handleHeightInputChange = text => {
    setHeight(text);
  };

  const handleConvertButtonPress = () => {
    const convertedWeight = convertWeight(weight);
    const convertedHeight = convertHeight(height);
    const convertedHeightFt = convertHeightFt(feet, inches);
    setWeight(convertedWeight);

    if (isMetric) {
      setHeight(convertedHeight);
    } else {
      setHeight(convertedHeightFt);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Weight and Height Converter (Hooks)
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isMetric ? 'Enter Weight (kg)' : 'Enter Weight (lbs)'}
          keyboardType="numeric"
          value={weight}
          onChangeText={handleWeightInputChange}
        />
        {isMetric ? (
          <TextInput
            style={styles.input}
            placeholder="Enter Height (m)"
            keyboardType="numeric"
            value={height.toString()}
            onChangeText={handleHeightInputChange}
          />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter Height (ft)"
              keyboardType="numeric"
              value={feet}
              onChangeText={text => setFeet(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Height (inch)"
              keyboardType="numeric"
              value={inches}
              onChangeText={text => setInches(text)}
            />
            <Text style={styles.heightResult}>Height: {height}m</Text>
          </>
        )}
      </View>

      <View style={styles.unitButtons}>
        <TouchableOpacity
          style={[
            styles.unitButton,
            isMetric ? styles.selectedUnitButton : null,
          ]}
          onPress={toggleMetric}>
          <Text style={isMetric ? styles.selectedUnitText : null}>Metric</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.unitButton,
            !isMetric ? styles.selectedUnitButton : null,
          ]}
          onPress={toggleImperial}>
          <Text style={!isMetric ? styles.selectedUnitText : null}>
            Imperial
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={handleConvertButtonPress}>
        <Text style={styles.ButtonText}>Convert</Text>
      </TouchableOpacity>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.Button} onPress={saveData}>
          <Text style={styles.ButtonText}>Save to Disk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={loadData}>
          <Text style={styles.ButtonText}>Load from Disk</Text>
        </TouchableOpacity>
      </View>
      <Text>{savedData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heightResult: {
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    // position: 'absolute',
    // top: 10,
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
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
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 16,
    marginTop: 2,
    textAlign: 'center',
  },
  saveButtonContainer: {
    flexDirection: 'row',
    padding: '5%',
  },
  Button: {
    backgroundColor: 'gray',
    padding: '2%',
    borderRadius: 16,
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

export default HooksTabScreen;
