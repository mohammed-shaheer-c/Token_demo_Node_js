
const app  = require('./app'); // Importing app.js varibale  
app.listen(process.env.PORT, () => 
{
    console.log("My application running successfully on the port number :-", +process.env.PORT);
    // Comment: Starts the server and logs a success message with the port number to the console.
});
