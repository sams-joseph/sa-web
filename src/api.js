import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios
        .post(`${process.env.REACT_APP_API_HOST}/api/auth`, {
          credentials,
        })
        .then(res => res.data.user),
    confirm: token =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/auth/confirmation`, { token }).then(res => res.data.user),
    resetPassword: credentials =>
      axios
        .post(`${process.env.REACT_APP_API_HOST}/api/auth/forgot-password`, {
          credentials,
        })
        .then(res => res.data.user),
    validateToken: token => axios.post(`${process.env.REACT_APP_API_HOST}/api/auth/validate-token`, { token }),
  },
  product: {
    getProducts: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/products`, {}).then(res => res.data.products),
    getProductByID: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/products/product`, { params: { id } })
        .then(res => res.data.product),
  },
  size: {
    getSizeByProduct: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/sizes`, { params: { id } }).then(res => res.data.sizes),
    getSizeByID: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/sizes/size`, { params: { id } }).then(res => res.data.size),
  },
  design: {
    getDesignsByProduct: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/designs`, { params: { id } }).then(res => res.data.designs),
    getDesignByID: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/designs/design`, { params: { id } })
        .then(res => res.data.design),
  },
  designSize: {
    getDesignSizesById: (designID, sizeID) =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/design-sizes`, { params: { designID, sizeID } })
        .then(res => res.data.designSize)
        .catch(err => ''),
  },
  order: {
    placeOrder: payload =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/orders`, { ...payload }).then(res => res.data.order),
    addPart: payload => {
      const data = new FormData();
      data.append('orderID', payload.orderID);
      data.append('productID', payload.productID);
      data.append('sizeID', payload.sizeID);
      data.append('designID', payload.designID);
      data.append('quantity', payload.quantity);
      data.append('image', payload.image);
      data.append('portrait', payload.portrait);
      data.append('name', payload.name);
      data.append('date', payload.date);
      return axios.post(`${process.env.REACT_APP_API_HOST}/api/orders/part`, data).then(res => res.data.part);
    },
    getOrders: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/orders`, {}).then(res => res.data.orders),
    getOrder: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders`, { params: { id } })
        .then(res => res.data.order)
        .catch(err => ''),
    getOrderParts: orderID =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders`, { params: { orderID } })
        .then(res => res.data.order)
        .catch(err => ''),
  },
};
