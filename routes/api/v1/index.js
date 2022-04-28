//----------------------------------------------------------------//
//Index Root of all the V1 - API Routes//
//----------------------------------------------------------------//
//Require the existing Express
const express = require("express");
//Create an Index Router
const router = express.Router();

//Require Posts-API Router File
const postsAPIRouterFile = require("./posts");

//Access the Posts-API Router File on '/api/v1/posts' route.
router.use("/posts", postsAPIRouterFile);

//Router Loaded Successfully.
console.log("V1 - API Index Router Loaded Successfully");
//Export the Index Router
module.exports = router;