const express= require("express");
const app=express();
const https=require("https");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res)
{

  res.sendFile(__dirname+"/index.html");
});
app.post("/forecast",function(req,res)
{
  const query=req.body.city;
  const apikey="66bee5604e8190252e2190ca5ba7023f";
  const unit="metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
  https.get(url,function(response)
  {
  console.log(response.statuscode);
  response.on("data",function(data)
  {
  const weatherdata=JSON.parse(data);
  const temp=weatherdata.main.temp;
  const desc=weatherdata.weather[0].description;
  const city=weatherdata.name;
  const ico=weatherdata.weather[0].icon;
  const IMGURL="http://openweathermap.org/img/wn/"+ico+"@2x.png"
  console.log(temp);
  console.log(desc);
  res.write("<P> The weather currently is "+desc +"</P>");
  res.write("<H1>The temprature in  "+city+ " is "+ temp+" degree celcius</H1>");
  res.write("<IMG SRC="+IMGURL+">");

  res.send();
  })
  })
})
app.listen(3000,function()
{
  console.log("server is running on port 3000");
});
