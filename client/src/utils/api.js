import axios from 'axios';

// Export all helper functions as a property of the export object:
export default {
  
  saveStocks: (name, purchasePrice, totalWorth, numStock) => axios.post('api/stocks', { name, purchasePrice, totalWorth, numStock }),
  getPurchases: () => axios.get('api/stocks')
};
