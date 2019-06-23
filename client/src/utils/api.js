import axios from 'axios';

// Export all helper functions as a property of the export object:
export default {
  
  saveStocks: (name, totalWorth, numStock) => axios.post('api/stocks', { name, totalWorth, numStock }),
  
};
