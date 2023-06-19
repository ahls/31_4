const fs = require("fs")
const axios = require('axios')
const args = process.argv;

function readFile(path,outputPath)
{
    fs.readFile(path,'utf8', (err,data)=>
    {
        if(err != null)
        {
            console.log(`given path ${path} does not exist`)
        }
        else
        {
            if(outputPath)
            {
                console.log(`writing file to ${outputPath}`)
                fs.writeFile(outputPath,data,{encoding:'utf8'},(err)=>
                    {
                        if(err)
                        {    console.log('something went wrong while writing file')
                        }
                        else
                        {
                            console.log("file successfully written")
                        }
                    }
                )
            }
            else
            {
                console.log(data);
            }
        }
    })
}
async function GetDataFromPath(path,outputPath)
{
    try 
    {
        const res = await axios.get(path)
        
        if(outputPath)
        {
            console.log("writing file")
            fs.writeFile(outputPath, JSON.stringify(res.data),{encoding:'utf8'},(err)=>
            {
                if(err)
                {    console.log('something went wrong while writing file')
                }
                else
                {
                    console.log("file successfully written")
                }
            }
            )
        }
        else
        {
            console.log(res.data)
        }
    }
    catch(err)
    {
        console.log(`error caught while fetching data from ${path}. ${err}`)
    }
}


if(args.length >= 3)
{
    let givenPath= args[2];
    let outputPath = null;
    //check for flags
    if(args[2] == '--out')
    {
        givenPath = args[4];
        outputPath = args[3];
    }

    if(givenPath.startsWith('http'))
    {
        GetDataFromPath(givenPath,outputPath);
    }
    else
    {
       readFile(givenPath,outputPath)
    }
}