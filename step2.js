const { log } = require("console");
const fs = require("fs")
const axios = require('axios')
const givenPath = process.argv[2];

if(givenPath != null)
{
    if(givenPath.startsWith('http'))
    {
        GetDataFromPath(givenPath);
    }
    else
    {
        
        fs.readFile(givenPath,'utf8', (err,data)=>
        {
            if(err != null)
            {
                console.log(`given path ${givenPath} does not exist`)
            }
            else
            {
                console.log(data)
            }
        })
    }
}

async function GetDataFromPath(path)
{
    try 
    {
        const res = await axios.get(path)
        console.log(res.data)
    }
    catch(err)
    {
        console.log(`error caught while fetching data from ${path}. ${err}`)
    }
    
}