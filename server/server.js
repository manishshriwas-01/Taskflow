import express from 'express'

const app=express();
const PORT=3000;

app.use(express.json());


app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/health',(req,res)=>{
    res.json({
        status: 'OK',
        message: 'TaskFlow server is running'
    })
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
