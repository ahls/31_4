const { log } = require("console");
const fs = require("fs")
const givenPath = process.argv[2];

if(givenPath != null)
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
