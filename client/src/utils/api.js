import axios from 'axios';

// Export all helper functions as a property of the export object:
export default {

  saveStocks: (name, purchasePrice, totalWorth, numStock, userId) => axios.post('api/stocks', { name, purchasePrice, totalWorth, numStock, userId }),
  sellStock: id => axios.delete(`api/stocks/${id}`),
  buyMoreShares: (id, totalShares, userId) => axios.put(`api/stocks/${id}/${userId}`, { totalShares }),
  getPurchases: (id) => axios.get(`api/stocks/${id}`)
};
