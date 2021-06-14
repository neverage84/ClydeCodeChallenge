const Router = require('koa-router');
const router = new Router();
const model = require('./rhinoceros');

router.get('/rhinoceros/:id', (ctx, next) => {
  const rhinoceros = model.getRhinoceros(ctx.params.id);
  ctx.response.body = {rhinoceros};
  });

router.get('/rhinoceros/:species?/:name?', (ctx, next) => {
//console.log(ctx.request.body);
//console.log(ctx.params);
let data = ctx.request.query;
console.log(data);
const rhinoceroses = model.getAll(data);
 ctx.response.body = { rhinoceroses };
});

router.post('/rhinoceros', (ctx, next) => {
  ctx.response.body = model.newRhinoceros(ctx.request.body);
});

router.get('/endangered', (ctx, next) => {
  const endangeredRhinos = model.getEndangeredRhinos();
  ctx.response.body = {endangeredRhinos};
});

router.delete('/rhinoceros/:id', (ctx, next) => {
  console.log(ctx.params);
  const removeRhinoceros = model.removeRhinoceros(ctx.params.id);
  ctx.response.body = { removeRhinoceros};
 });

router.put('/rhinoceros/', (ctx, next) => {
     // console.log(ctx.request.body);
    const updateRhinoceros = model.updateRhinoceros(ctx.request.body);
    ctx.response.body = {updateRhinoceros};
});
module.exports = router;
