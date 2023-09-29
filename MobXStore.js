import {makeAutoObservable, action, runInAction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MobXStore {
  isMetric = true;
  weight = '0';
  height = '0';
  inches = '0';
  feet = '0';

  constructor() {
    makeAutoObservable(this);
    this.loadSavedData();
  }

  @action toggleUnit = () => {
    runInAction(() => {
      this.isMetric = !this.isMetric;
      this.saveData();
    });
  };

  @action setWeight = value => {
    runInAction(() => {
      this.weight = value;
      this.saveData();
    });
  };

  @action setHeight = value => {
    runInAction(() => {
      this.height = value;
      this.saveData();
    });
  };

  @action setInches = value => {
    runInAction(() => {
      this.inches = value;
      this.convertHeight();
    });
  };

  @action setFeet = value => {
    runInAction(() => {
      this.feet = value;
      this.convertHeight();
    });
  };

  convertWeight = () => {
    if (this.isMetric) {
      const kilograms = parseFloat(this.weight);
      const pounds = kilograms * 2.20462;
      this.setWeight(pounds.toFixed(2));
    } else {
      const pounds = parseFloat(this.weight);
      const kilograms = pounds / 2.20462;
      this.setWeight(kilograms.toFixed(2));
    }
  };

  convertHeight = () => {
    if (this.isMetric) {
      const meters = parseFloat(this.height);
      const feet = Math.floor(meters * 3.28084);
      const inches = Math.round((meters * 39.3701) % 12);
      this.setFeet(`${feet} ft`);
      this.setInches(`${inches} inch`);
    } else {
      const feet = parseFloat(this.feet);
      const inches = parseFloat(this.inches);
      const meters = feet * 0.3048 + inches * 0.0254;
      this.setHeight(meters.toFixed(2));
    }
  };

  saveData = async () => {
    try {
      const data = {
        isMetric: this.isMetric,
        weight: this.weight,
        height: this.height,
        inches: this.inches,
        feet: this.feet,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  loadSavedData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data !== null) {
        const parsedData = JSON.parse(data);
        this.isMetric = parsedData.isMetric;
        this.weight = parsedData.weight;
        this.height = parsedData.height;
        this.inches = parsedData.inches;
        this.feet = parsedData.feet;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
}

const mobXStore = new MobXStore();

export const useMobXStore = () => mobXStore;

export default mobXStore;
