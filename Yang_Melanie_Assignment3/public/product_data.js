// Creaying the array of products and took this from SmartPhoneProducts3

    var necklaces = [
    {
        //Product 1
    "product": "Pearl Necklace",
    "price": 45.00,
    "image": "./images/necklace.jpg", // image is from en route jewelry webiste//
    
    },
    {
        //Product 1
    "product": "Star Necklace",
    "price": 45.00,
    "image": "./images/necklace2.png", // image is from en route jewelry webiste//
    
    },
    {
        //Product 1
    "product": "Emerald Necklace",
    "price": 45.00,
    "image": "./images/necklace3.png", // image is from en route jewelry webiste//
    
    },
    {
        //Product 1
    "product": "Chain Chocker",
    "price": 45.00,
    "image": "./images/necklace4.png", // image is from en route jewelry webiste//
    
    },
    {
        //Product 1
    "product": "Moon Necklace",
    "price": 45.00,
    "image": "./images/necklace5.png", // image is from en route jewelry webiste//
    
    }]
    var bracelets = [
        {
           //Product 1
        "product": "Pearl Bracelet",
        "price": 12.00,
        "image": "./images/bracelet.jpg" // image is from en route jewel//
        },
        {
            //Product 1
         "product": "Lucky Bracelet",
         "price": 12.00,
         "image": "./images/bracelet2.png" // image is from en route jewel//
         },
         {
            //Product 1
         "product": "Universe Bracelet",
         "price": 12.00,
         "image": "./images/bracelet3.png" // image is from en route jewel//
         },
         {
            //Product 1
         "product": "Shell Bracelet",
         "price": 12.00,
         "image": "./images/bracelet4.png" // image is from en route jewel//
         },
         {
            //Product 1
         "product": "Daisy Bracelet",
         "price": 12.00,
         "image": "./images/bracelet5.png" // image is from en route jewel//
         }]

    var earrings = [
        {
           //Product 1
        "product": "Pearl Earring",
        "price": 12.00,
        "image": "./images/earring.jpg" // image is from en route jewel//
        },
        {
            //Product 2
         "product": "Star Earring",
         "price": 12.00,
         "image": "./images/earring2.png" // image is from en route jewel//
         },
         {
            //Product 3
         "product": "Butterfly Earring",
         "price": 12.00,
         "image": "./images/earring3.png" // image is from en route jewel//
         },
         {
            //Product 4
         "product": "Gold Hoop Earring",
         "price": 12.00,
         "image": "./images/earring4.png" // image is from en route jewel//
         },
         {
            //Product 5
         "product": "Twirl Earring",
         "price": 12.00,
         "image": "./images/earring5.png" // image is from en route jewel//
         }]
    var clips = [
        {
           //Product 1
        "product": "Pearl Hair Clip",
        "price": 12.00,
        "image": "./images/clip.jpg" // image is from en route jewel//
        },
        {
            //Product 2
         "product": "Chunky Hair Clip",
         "price": 12.00,
         "image": "./images/clip2.png" // image is from en route jewel//
         },
         {
            //Product 3
         "product": "Star Hair Clip",
         "price": 12.00,
         "image": "./images/clip3.png" // image is from en route jewel//
         },
         {
            //Product 4
         "product": "Butterfly Hair Clip",
         "price": 12.00,
         "image": "./images/clip4.png" // image is from en route jewel//
         },
         {
            //Product 5
         "product": "Pastel Hair Clip",
         "price": 12.00,
         "image": "./images/clip5.png" // image is from en route jewel//
         }]
    var rings = [
            {
               //Product 1
               "product": "Pearl Ring",
               "price": 18.00,
               "image": "./images/ring.jpg" 
            }]
    var products = {
        "necklaces": necklaces , 
        "bracelets": bracelets,
         "clips": clips,
         "earrings": earrings,
         "rings": rings

    }


if(typeof module != 'undefined') { //if the type of the module is defined
    module.exports.products = products; //export the product_data
  }
