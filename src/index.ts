import express from 'express';
import cors from 'cors'
import gigRouter from './Resources/gigs/gigs.router';
import AuthRouter from './Resources/auth/auth.router';
import submissionRouter from './Resources/submit/submit.router';


const app = express();
app.use(cors());


app.use(express.json());
app.use('/', gigRouter);
app.use('/', gigRouter);
app.use('/', AuthRouter);
app.use('/', submissionRouter);


app.listen(3001,()=>{
    console.log("server up at port 3001")
})

