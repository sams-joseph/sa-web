import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post(`${process.env.REACT_APP_API_HOST}/api/auth`, { credentials }).then(res => res.data.user),
  },
};
