import axios from 'axios';

export default {
  user: {
    getAll: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/users`).then(res => res.data.users),
    create: credentials =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/users`, credentials).then(res => res.data.user),
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
  csr: {
    getAll: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/csrs`).then(res => res.data.csrs),
    create: credentials =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/csrs`, credentials).then(res => res.data.csr),
    getCsrById: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/csrs/csr`, { params: { id } }).then(res => res.data.csr),
  },
  product: {
    getProducts: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/products`, {}).then(res => res.data.products),
    getProductByID: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/products/product`, { params: { id } })
        .then(res => res.data.product),
    create: data => axios.post(`${process.env.REACT_APP_API_HOST}/api/products`, data).then(res => res.data.product),
  },
  size: {
    getSizes: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/sizes/all`).then(res => res.data.sizes),
    getSizeByProduct: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/sizes`, { params: { id } }).then(res => res.data.sizes),
    getSizeByID: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/sizes/size`, { params: { id } }).then(res => res.data.size),
    create: data => axios.post(`${process.env.REACT_APP_API_HOST}/api/sizes`, data).then(res => res.data.size),
  },
  design: {
    getAllDesigns: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/designs/all`).then(res => res.data.designs),
    getDesignsByProduct: id =>
      axios.get(`${process.env.REACT_APP_API_HOST}/api/designs`, { params: { id } }).then(res => res.data.designs),
    getDesignByID: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/designs/design`, { params: { id } })
        .then(res => res.data.design),
    create: data => axios.post(`${process.env.REACT_APP_API_HOST}/api/designs`, data).then(res => res.data.design),
  },
  designSize: {
    getDesignSizesById: (designId, sizeId) =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/design-sizes`, { params: { designId, sizeId } })
        .then(res => res.data.designSize)
        .catch(err => ''),
    getAll: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/design-sizes/all`).then(res => res.data.designSizes),
    create: data =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/design-sizes`, data).then(res => res.data.designSize),
  },
  order: {
    placeOrder: payload =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/orders`, payload).then(res => res.data.order),
    addPart: payload =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/orders/part`, payload).then(res => res.data.part),
    getOrders: () =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders`, {})
        .then(res => res.data.orders)
        .catch(err => err),
    getOrder: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders/order`, { params: { id } })
        .then(res => res.data.order)
        .catch(err => ''),
    getOrderParts: orderID =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders/parts`, { params: { orderID } })
        .then(res => res.data.parts)
        .catch(err => ''),
    getOrderPart: id =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders/part`, { params: { id } })
        .then(res => res.data.part)
        .catch(err => ''),
    sendConfirmation: order => axios.post(`${process.env.REACT_APP_API_HOST}/api/orders/confirm`, { order }),
    getOrdersByMonth: year =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders/monthly`, { params: { year } })
        .then(res => res.data.monthlyData)
        .catch(err => ''),
    getOrdersByDesign: () =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders/parts/designs`)
        .then(res => res.data.designData)
        .catch(err => ''),
    getOrdersByProduct: () =>
      axios
        .get(`${process.env.REACT_APP_API_HOST}/api/orders/parts/products`)
        .then(res => res.data.sizeData)
        .catch(err => ''),
  },
  role: {
    getAll: () => axios.get(`${process.env.REACT_APP_API_HOST}/api/roles`).then(res => res.data.roles),
  },
};
