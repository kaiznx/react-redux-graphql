const common = {
  API_URL: 'http://localhost:5000'
}

const devConfig = {
  ...common,
}

const prodConfig = {
  ...common,
}

export default (process.env.NODE_ENV === 'production') ? prodConfig : devConfig;