

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const fs = require('fs');
const multipart = require('connect-multiparty');
 const multipartMiddleware = multipart({ uploadDir : './upload/'})
//const multipartMiddleware = multipart()

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// multipartMiddleware




const ffmpeg = require('fluent-ffmpeg');
const Promise = require("bluebird");
const { basename } = require('path');


function split(startingTime, clipDuration, input, output){
    return new Promise(function(resolve, reject){
    console.log(startingTime, clipDuration)
    console.log(input, output)
    ffmpeg()
    .input(input)
    .inputOptions([ `-ss ${startingTime}`])
    .outputOptions([`-t ${clipDuration}`])
    
    .output(output)
    .on('end',() =>{ console.log("Done"); resolve({})})
    .on('error',(err) => {console.log(err);resolve({})})
    .run();
    });

    
}






app.post('/api/upload', multipartMiddleware, (req, res)=>{
  //  console.log('---',req);
    console.log(req.files);

   // res.json({'path': req.files.file.path});

   // res.json({'message':req.files});


   



   // here video is stored in upload folder we are accessing the file with path
   // path is access by file.path  ({'path': req.files.file.path});




   
 const videofile = req.files.file.path;

 const file = req.files.file.name;

 console.log(videofile);






// const videofile = req.files.filename.path;
// const file = req.files.filename.name;

//console.log(req.body, '----', req.files);

console.log("=====",file, path.extname(file));
//const extension = file.split('.');


const exten = path.extname(file);
const basename = path.basename(file,exten);





ffmpeg.ffprobe(videofile,(err,metaData)=>{
    const {duration} = metaData.format;
    const clipDuration = 3;
    var arr = []
    for(var i=1; i < duration; i +=3){
        arr.push(i);
    }
    Promise.each(arr, function(a, index, length){
    var output = "./splitedfol/"+basename+index+exten;
    return split(a, clipDuration, videofile, output).then(function(d){
        return
    })

      
    })

    res.json([arr.length]);
}) ;

   
});







app.get("/api/getfiles",(req,res)=>{
    const files= fs.readdirSync(__dirname+ '/splitedfol/');

    console.log(files);
    res.send(files);


    //res.send("welcome to my project");
});



/*
app.get("/api/splitfiles/:basename",(req,res)=>{

    var regex = new RegExp(req.query.filename);
    var basename = regex;
    const files= fs.readdir(__dirname+ '/splitedfol/'+basename ,function(err,result){
        if(err) console.log(err);
    });

    console.log(files);
    res.send(files);


    //res.send("welcome to my project");
});


*/











app.get('/api/download/:filename',(req,res)=>{

      
var file = fs.readFileSync(__dirname + '/splitedfol/'+req.params.filename, 'binary'); 
res.setHeader('Content-Length', file.length); 
res.write(file,'binary');  
  res.end();




});




app.get("/api/splitfiles/:file",(req,res)=>{
    var file = req.params.file;
    const splitfiles = fromDir(__dirname+ '/splitedfol/', file);

   
   splitfiles.then(splitvideos => { res.json (splitvideos)}); 
    




    

   
    
    

   
});





function fromDir(startPath,filter){

    //console.log('Starting from dir '+startPath+'/');


 return new Promise(function(resolve,reject){
  var splitvideos=[]

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        
        reject("rejected");
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        const bname = path.basename(filename);


        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }


        else if (filename.indexOf(filter)>=0) {

           splitvideos.push(bname);
            console.log('split videos of given video : ',bname);
        };
    };

resolve (splitvideos);


})

};










    



app.listen(PORT,(req,res)=>{
    console.log(`server listening on port ${PORT}` )
})







//const videoFile = "./Video.mp4";

// console.log(multipartMiddleware);
//const videofile = multipartMiddleware;
//const file = req.name;











  