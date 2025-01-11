import axios from 'axios';

const apiCall = async (method, endpoint, data = null) => {
  console.log(data)
  try {
    const response = await axios({
      method: method,
      url: endpoint,
      data: data
    });
    return response.data;
  } catch (error) {
    console.error(`Error making ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

export default apiCall;