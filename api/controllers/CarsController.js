/**
 * CarsController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/cars";



module.exports = {

  /**
   * `CarsController.create()`
   */
  create: function (req, res) {
        
        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('create', {success:{message: "Record created successfully"}});

        })
 
  },


  /**
   * `CarsController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {cars: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the employees"}});
    });

  },


  /**
   * `CarsController.update()`
   */
  update: function (req, res) {

      

     /* client.get(endpoint, function (data, response) {
        return res.view('update', {cars: data});
    }).on('error', function (err) {
        return res.view('update', {error: { message: "There was an error getting the employees"}});
    });*/

      if(req.method != "POST"){
         client.get(endpoint, function (data, response) {
        return res.view('update', {cars: data});
         }).on('error', function (err) {
        return res.view('update', {error: { message: "There was an error getting the employees"}});
          });
        }else{
       

       var args = {
           data: req.body,
           headers: { "Content-Type": "application/json" }
       };
        
       client.put(endpoint + "/" + req.body.id, args, function (data, response) {
           // return res.view('create', {success: { message: "Record added successfully"}});
           if(response.statusCode != "200"){
               return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
           }

           return res.view('update', {success:{message: "Record successfully updated"}});

       })}

 //  return res.json({
  //   todo: 'update() is not implemented yet!'
  // });

    /*  if(req.method != "POST"){
         client.get(endpoint, function (data, response) {
        return res.view('update', {cars: data});
         }).on('error', function (err) {
        return res.view('update', {error: { message: "There was an error getting the employees"}});
          });
        }else{

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };

        
          var upendpoint = endpoint + "/" + req.body.id;
         
        client.put(upendpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "200"){
                return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('update', {success:{message: "Record updated successfully"}});

        })
      }*/
 
   /* return res.json({
      todo: 'update() is not implemented yet!'
    });*/
  },


  /**
   * `CarsController.delete()`
   */
  delete: function (req, res) {

     

      /* */

     if(req.method != "POST"){
         client.get(endpoint, function (data, response) {
        return res.view('delete', {cars: data});
         }).on('error', function (err) {
        return res.view('delete', {error: { message: "There was an error getting the employees"}});
          });
        }else{

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };

         
          var delendpoint = endpoint + "/" + req.body.id;
         
        client.delete(delendpoint, args, function (data, response) {
             //return res.view('delete', {success: { message: "Record added successfully"}});
            if(response.statusCode != "200"){
                return res.view('delete', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('delete', {success:{message: "Car removed successfully"}});

        })
 
   /* return res.json({
      todo: 'delete() is not implemented yet!'
    });*/
  }
}
};

