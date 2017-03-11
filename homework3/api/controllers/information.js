/**
 * Created by Tran on 3/9/2017.
 */
'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
 */

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

 It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
 - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
 - Or the operationId associated with the operation in your Swagger document

 In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
 we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    getGit: testGibhub
   // avault: avault
};

/*
 Functions in a127 controllers used for operations should take two parameters:

 Param 1: a handle to the request object
 Param 2: a handle to the response object
 */
function testGibhub(req, res) {

    var gitAPI = require("github");

    var github = new gitAPI({
        version: '3.0.0'
    });

    var vault = require('avault').createVault(__dirname);

    //getting the stored token and authenticating the github account
    vault.get('sigad', function(profileString){
        var token = JSON.parse(profileString);
        console.log(token);
        github.authenticate({
            type: 'oauth',
            token: token.token
        });
    });

   // responding with github account repo information
   //  github.users.get({}, function (err,resp){
   //      console.log("GOT ERR?",err);
   //      console.log("GOT RES?",resp);

        github.repos.getAll({}, function(err,resp){
            console.log("Got ERR: ",err);
            console.log("Got RES: ", resp);
            //res.send(resp);
            res.json(resp);
        });
    //});
}
/*
//using avault to store and encrypt token
function avault(){
    var vault = require('avault').createVault(__dirname);
    var keyName = 'key1';
    vault.generateKey(keyName).then(
        function(keyResponse) {
            vault.store(keyName, '{"token": "b3d5244c25a828025602a43ef56acd33186b86ea"}', 'sigad').then(
                function (storeResponse) {
                    console.log('ok', storeResponse);
                },
                function (err) {
                    console.log('Error', err);
                });
        },
        function (err){
        console.log('Error',err);
        });
}
    */