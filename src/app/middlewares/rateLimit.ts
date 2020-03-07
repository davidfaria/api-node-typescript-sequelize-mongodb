import rateLimit from 'express-rate-limit';

// Obs. outra opção legal para trabalhar em conjunto com o express-rate-limit é
// express-slow-down

const limiter = rateLimit({
  // windowMs: 1 * 60 * 1000, // (ms)  1 minutes
  // max: 5, // limit each IP to 150 requests per windowMs
  windowMs: 20 * 60 * 1000, // (ms)  20 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  // message:
  //   'Ops..., você atingiu o limite de requisição permitido, por gentileza tente mais tarde...',
  // handler: function(req, res, next) {
  //   console.log('rate limite');
  //   next();
  // },
  handler: function(_, res) {
    // console.log(`Rate limit IP: ${req.ip}`);
    return res.status(429).json({
      error:
        'Ops..., você atingiu o limite de requisição permitido, por gentileza tente mais tarde...',
    });
  },
});

export default limiter;
