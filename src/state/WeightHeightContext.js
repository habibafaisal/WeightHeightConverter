import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightHeightContext = createContext();

export const WeightHeightProvider = ({children}) => {
  const [isMetric, setIsMetric] = useState(true);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [savedData, setSavedData] = useState('');
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);

  const toggleUnit = () => {
    setIsMetric(!isMetric);
  };

  const convertWeight = value => {
    if (isMetric) {
      const kilograms = parseFloat(value);
      return (kilograms * 2.20462).toFixed(2);
    } else {
      const pounds = parseFloat(value);
      return (pounds / 2.20462).toFixed(2);
    }
  };

  const convertHeight = value => {
    console.log('val here', value);
    if (isMetric) {
      const meters = parseFloat(value);
      const feet = Math.floor(meters * 3.28084);
      const inches = Math.round((meters * 39.3701) % 12);
      return `${feet} ft ${inches} inch`;
    } else {
      // convertHeightFt();
    }
  };

  const convertHeightFt = (feet, inches) => {
    console.log('feet in function:', feet);
    console.log('inches in function:', inches);
    const meters = feet * 0.3048 + inches * 0.0254;
    console.log('result', meters);
    return meters;
  };

  const saveData = async () => {
    try {
      let dataToSave = {
        isMetric,
        weight,
        height,
      };

      // if (!isMetric) {
      //   // If the current unit is imperial, convert and save height as a formatted string
      //   const convertedHeight = convertHeightFt(feet, inches);
      //   console.log('here con new', convertedHeight);
      //   dataToSave = {
      //     ...dataToSave,
      //     height: convertedHeight,
      //   };
      // }

      await AsyncStorage.setItem(
        'weightHeightData',
        JSON.stringify(dataToSave),
      );
      setSavedData('Data saved successfully');
      console.log('saved data', dataToSave);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('weightHeightData');
      if (data !== null) {
        const parsedData = JSON.parse(data);
        setIsMetric(parsedData.isMetric);
        setWeight(parsedData.weight);

        if (parsedData.isMetric) {
          setHeight(parsedData.height);
          console.log('load data', parsedData);
        } else {
          setFeet(parsedData.feet);
          // setFeet(feet);
          setInches(inches);
          setHeight(parsedData.height);
          console.log('load data', parsedData);
        }

        setSavedData('Data loaded successfully');
        console.log('loading data', parsedData);
      }
    } catch (error) {
      console.error('Error loading data: ', error);
    }
  };

  return (
    <WeightHeightContext.Provider
      value={{
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
      }}>
      {children}
    </WeightHeightContext.Provider>
  );
};

export const useWeightHeight = () => {
  return useContext(WeightHeightContext);
};
