const router=require("express").Router();

router.get("/dashboard/:id",(req,res)=>{
res.json({
totalAdvisees:4,
atRisk:2,
avgCGPA:7.45,
notifications:[
{title:"Alert",text:"Low CGPA student",date:"Today"}
]
});
});

module.exports=router;