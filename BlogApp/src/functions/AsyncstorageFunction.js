import React from 'react';
import { AsyncStorage } from 'react-native';

const storeData = async (key, value) => {
    try{
        await AsyncStorage.setItem(key, value);
        // alert("Data Stored Successfully!");
    } catch(error){
        alert(error);
    }
};

const storeDataJson =async(key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        // alert("Data Stored Successfully!");
      } catch (error) {
        alert(error);
      }
};

const getData = async (key) => {
    try{
        const data =await AsyncStorage.getItem(key);
        if (data!=null) {
            alert(data);
        } else {
            alert("No data assigned to the key");
        }
    } catch(error){
        alert(error);
    }
};

const getDataJson = async (key) => {
    try {
      let data = await AsyncStorage.getItem(key);
      if (data != null) {
        const jsonData = JSON.parse(data);
        return jsonData;
      } else {
        alert("No data assigned to the key");
      }
    } catch (error) {
      alert(error);
    }
};

const getAllindex= async()=>{
    let keys=[]
    try{
        keys = await AsyncStorage.getAllKeys();
            return keys;
        
    }catch(error){
        alert(error);
    }
}

const mergeData= async(key, value)=>{
    try{
        await AsyncStorage.mergeItem(key, value);
    }catch(error){
        alert(error);
    }
}

const removeData = async (key) => {
    try{
        await AsyncStorage.removeItem(key);
        alert("Data Removed Successfully");
    } catch(error){
        alert(error);
    }
};

export { storeData, storeDataJson, getData, getDataJson, getAllindex, mergeData, removeData};