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
  },
  size: {
    getSizeByProduct: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/sizes`, { params: { id } }).then(res => res.data.sizes),
  },
  design: {
    getDesignsByProduct: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/designs`, { params: { id } }).then(res => res.data.designs),
  },
  designSize: {
    getDesignSizesById: (designID, sizeID) =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/design-sizes`, { params: { designID, sizeID } })
        .then(res => res.data.designSize)
        .catch(err => ''),
  },
};
