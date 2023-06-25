// Arrow function to add a specified number of days to the current date
const DAYADD = (plus) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + plus);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }; 
  
  // Arrow function to add a specified number of days to the current date using an external library (date-fns)
  const DAYADD1 = (plus) => {
    const now = new Date();
    const value = date.addDays(now, plus);
    return value;
  };
  
  // Arrow function to add a specified number of minutes to the current date
  const minutesAdd = (plus) => {
    const now = new Date();
    return new Date(now.getTime() + plus * 60000);
  }
  
  // Arrow function to get the current date and time in a specific format
  const nowd = () => {
    const date_ob = new Date();
    const day = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = ("0" + date_ob.getMinutes()).slice(-2);
    const seconds = ("0" + date_ob.getSeconds()).slice(-2);
    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateTime;
  };
  
  // Function to convert a date string from a date picker to MySQL format
  const convertDatePickerTimeToMySQLTime = (str) => {
    const inputDate = new Date(str);
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const seconds = inputDate.getSeconds();
  
    const convertedDate = new Date(year, month - 1, day, hours, minutes, seconds).toISOString();
    return convertedDate;
  };
  
  // Function to convert Unix time (in seconds) into a simple date format
  const convertUnixTimeIntoSimpleFormat = (value) => {
    const expDate = convertDatePickerTimeToMySQLTime(new Date(value * 1000).toLocaleString());
    return expDate;
  }
  
  // Arrow function to add a specified number of minutes to the current date using an alternative approach
  const minutesAdd1 = (plus) => {
    const now = new Date();
    return new Date(now.getTime() + plus * 60000);
  }
  
  // Arrow function to get the current date and time in a specific format using an alternative approach
  const nowd1 = () => {
    const date_ob = new Date();
    const day = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = ("0" + date_ob.getMinutes()).slice(-2);
    const seconds = ("0" + date_ob.getSeconds()).slice(-2);
    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateTime;
  };
  
  // Function to convert a date string from a date picker to MySQL format using an alternative approach
  const convertDatePickerTimeToMySQLTime1 = (str) => {
    var month, day, year, hours, minutes, seconds;
    var date = new Date(str);
    month = ("0" + (date.getMonth() + 1)).slice(-2);
    day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);
    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    return [mySQLDate, mySQLTime].join(" ");
  };
  
  // Function to convert Unix time (in seconds) into a simple date format using an alternative approach
  const convertUnixTimeIntoSimpleFormat1 = (value) => {
    const expDate = convertDatePickerTimeToMySQLTime(new Date(value * 1000).toLocaleString());
    return expDate;
  }
  
  // Object containing all the exported functions
  const timeexportfunction = {
    DAYADD,
    nowd,
    minutesAdd,
    convertDatePickerTimeToMySQLTime,
    convertUnixTimeIntoSimpleFormat,
    DAYADD1,
    nowd1,
    minutesAdd1,
    convertDatePickerTimeToMySQLTime1,
    convertUnixTimeIntoSimpleFormat1,
  }
  
  module.exports = timeexportfunction;
  