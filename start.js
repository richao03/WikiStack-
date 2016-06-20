var Sequelize = require ("sequelize")
var db = new Sequelize("postgres://localhost:5432/1606sequelize")

//what is define?
var Product = db.define('prodcut', {
  name:{
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  //to update columns (schema) provide option to sync see line 21
  in_stock:{
      type: Sequelize.BOOLEAN
    }

});

var User = db.define("user", {
  email:{
    type: Sequelize.STRING,
    //check if email is correct
    validate : {
        isEmail: true;
    },
  }
})

//all models in sequlize has sync method, will find the SQL neccessary to create a database
db.sync({force:true})  //force:true will reset all data
//db.sync will sync all prodcuts
.then (function (){
  //build method will make a new instance of a Product
  var blender = Product.build({
    name:'Blendermatic 5000x',
    price:1000,
    in_stock: true;

  });
  //save method will save the new instance of a Product to the DB
  blender.save()
  .then(function(){
     console.log("got here")
   });
  //will get all products
  Product.findAll()
  Product.findAll({
    where: {
      name: 'Blendermatic'
    }
  })
});
.catch(function (err){
  console.error(err);
});
