import axios from 'axios';

export default axios.create({
  baseURL: `https://xentronics.herokuapp.com/api/`
});