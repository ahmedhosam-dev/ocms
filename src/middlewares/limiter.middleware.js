import rateLimit from "express-rate-limit"

const limiter = (
  windowMs = 15*60*1000,
  max = 100,
  message = `Too many requests, try again after ${windowMs/60/1000} minutes.`
) => {
  return rateLimit({
    windowMs: windowMs,
    max: max,
    message: { message: message, windowMs: windowMs }
  })
}

export default limiter
