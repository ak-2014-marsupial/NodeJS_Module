const fs =require("fs");
const path=require("path");
const tmp =path.join(process.cwd(),"tmp")

fs.mkdir(tmp,{recursive:true},(err)=>{
    if(err) throw new Error();
    console.log("root folder tmp is created");
})

for(let i=1; i<5;i++){
    fs.mkdir(path.join(tmp,`dir${i}`),{recursive:true}, (err)=>{
        if(err) throw new Error();
        console.log(`folder dir${i} is created`);
    })
    fs.writeFile(path.join(tmp,`dir${i}`,`file${i}.txt`),`text${i}`,(err)=>{
        if(err) throw new Error();
        console.log(`file${i}.txt is created`);
    })
}


const recursiveTraverse=(dirPath)=>{
    const files = fs.readdirSync(dirPath);
    files.map(file=>{
        const filePath=path.join(dirPath,file);
        const stats =fs.statSync(filePath);

        if(stats.isFile()){
            console.log(`FILE:${file}`);
        } else if(stats.isDirectory()){
            console.log(`FOLDER:${file}`);
            recursiveTraverse(filePath)
        }
    })

};
recursiveTraverse(tmp);
console.log(">>>>Async:");

