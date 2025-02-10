const config = {
  development: {
    filename: 'data/portfolio.db',
    options: {
      verbose: console.log,
      fileMustExist: false
    }
  },
  test: {
    filename: ':memory:',
    options: {
      verbose: console.log,
      fileMustExist: false
    }
  },
  production: {
    filename: 'data/portfolio.db',
    options: {
      fileMustExist: true
    }
  }
};

const env = process.env.NODE_ENV || 'development';
export const dbConfig = config[env]; 