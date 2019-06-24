import axios from 'axios';

// Export all helper functions as a property of the export object:
export default {

  saveStocks: (name, purchasePrice, totalWorth, numStock) => axios.post('api/stocks', { name, purchasePrice, totalWorth, numStock }),
  sellStock: id => axios.delete(`api/stocks/${id}`),
  buyMoreShares: (id, totalShares) => axios.put(`api/stocks/${id}`, { totalShares }),
  getPurchases: () => axios.get('api/stocks')
};
