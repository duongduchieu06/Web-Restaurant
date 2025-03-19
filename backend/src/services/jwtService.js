const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const genneralAcessToken = async (payload) => {
    console.log('payload', payload)
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, {expiresIn: '30s'})

    return access_token
}

const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
      ...payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
          jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
            if(err) {
                resolve({
                    status: 'ERROR',
                    message: 'Lỗi rùi'
                })
            }
            const {payload} = user
            const access_token = await genneralAcessToken({
              id: payload?.id,
              isAdmin: payload?.isAdmin
            })  
            resolve({
              status: "-----",
              message: "THÀNH CÔNG",
              access_token
            });
          })
        } catch (e) {
          reject(e);
        }
      });
}

module.exports = {
    genneralAcessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}