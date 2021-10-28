// based on https://medium.com/dont-leave-me-out-in-the-code/nuxt-redirects-in-4-simple-steps-9a0d5cb4c0d
export default function(req, res, next) {
  const redirects = [
    {
      from: '/',
      to: '/cv'
    }
  ]
  const redirect = redirects.find(r => r.from === req.url)
  if (redirect) {
    res.writeHead(301, { Location: redirect.to })
    res.end()
  } else {
    next()
  }
}
