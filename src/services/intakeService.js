// src/services/intakeService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/intakes'; // Change to your backend URL

export const getIntakes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addIntake = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};
