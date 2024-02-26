const mongoose= require('mongoose');


//will create the database if not existed earlier 
mongoose.connect('mongodb://localhost/playground')// returns a promise
    .then(()=>{console.log("connected to database..")})
    .catch(err=>console.log("an error occured while connecting..", err));


//schema- used to define what properties the mongodb will have 

//types of schema one can use - string , array , objectID , boolean, number, date , buffer


const courseSchema=new mongoose.Schema({
    name:{type:String,
         required:true,
         minlength :5,
         maxlength : 255        //some built-in validators
    },     //to make it a required property ->momgodb does not care about it , it is mongoose providing us these required fields unlike structured databases
    author :String,
    category:{
        type: String,
        required: true,
        enum: ['web','networking','cloud'] ,      //only these values are allowed
        // lowercase:true,
        // uppercase:true     schematype options
    },
    tags:{
        type :Array,
        isAsync:true,
        validate:{
            
            validator:function(v,callback){
                setTimeout(()=>{
                    const result= v && v.length>0;
                    callback(result);
                },2000) //implementing aynsc function
                
    
            },
            message:'A tag should have at least one value '
        }
       
    },       //custom validator 
    date:{type:Date, default:Date.now()},
    isPublished:{
        type: Boolean,
        required : function(){return this.isPublished;}
        //required if isPublished is true .. the arrow function can't be used here as it does not have "this" property 

    } ,
    price:{
        type:Number,
        get: v=>Math.round(v),
        set: v=>Math.round(v), //getter and setter for schema to round of the values of the property price
    }
})


//Models

const Course=mongoose.model('Course' , courseSchema); //(singular name of the object , the schema or the layout of the data )
//returns the class

async function createCourse(){
    //creating the objects from the class
const course= new Course({
    name :'Angular course',
    author:'Mosh',
    category:'web',
    // tags:['angular','frontend'],
    tags:null,
    isPublished:true
})


try{ 
    // await Course.validate(); 
    //to validate the document -> returns a promise or void so to get a boolean value , we need to get back with the callback approach instead of async and await



    //saving the document
//asynchronous function-> returns a promise
    const result=await course.save();
console.log(result);

}catch(err){
    console.log(err);
}

}
 createCourse();


//query
// async function getCourses(){
//     //returns a promise
//     const courses= await Course
//     // .find({author:'Mosh', isPublished:true})     //find method returns a document query
//     // .find({price:{$gte:10,$lte:20}})
//     // .find({price :{$in: [10,20,30]}})      //to find the courses whose price is either of them
//     // .find()
//     // .or([{author:'Mosh'},{isPublished:true}])   //logical operators

//     //regular expressions
//     // .find({author:/^Mosh/})          //finding courses whose author name starts with Mosh
//     .find({author:/Hemadani$/i})       //which ends with Hemadani ...i ->case insensitive
// // .find({author:/.*Mosh.*/i})              //anywhere in the name
//     .limit(10)                         //for limiting the output
//     .sort({name:1})                     //1 for ascending order and -1 for descending order
//     // .select({name:1,tags:1})            //to show only these properties
//     .count();                       //counts the documents which fulfills the criteria
//     console.log(courses);

// }
// getCourses();


//comparison operators

//eq(equal to)
//ne(not equal to)
//gt(greater than)
//gte(greater than or equal to)
//lt(less than)
//lte(less than or equal to)
//in
//nin(not in)


//logical operators

//or 
//and
