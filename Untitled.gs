function myFunction() {
  
// Creating object of 
// Date constructor
 const currentDate = new Date();

// Extract components of the date and time
// Getting year: 2023
const year = currentDate.getFullYear();

// Getting month 
const month = currentDate.getMonth() + 1;

// Getting day 
const day = currentDate.getDate();

// Getting hours
const hours = currentDate.getHours() -1;

// Getting minutes
const minutes = currentDate.getMinutes() -30 ;

// Getting seconds
const seconds = currentDate.getSeconds();

// Using template literal for 
// printing the date and time
// in console
console.log(`Current Date: ${day}-${month}-${year}`);
console.log(`Current Time: ${hours}:${minutes}:${seconds}`);


}
