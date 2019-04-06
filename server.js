
const express =require('express');
const path = require('path')
const ejs = require('ejs')


const app = express();
app.set('view engine','ejs');
app.engine('html',ejs.renderFile);

app.use(express.static('build'));

app.get('/*',(req,res)=>{
    res.render(path.join(__dirname,'build/index.html'))
})
app.listen(9000,function(){
    console.log('success')
})
