
// Function to create an employee record from an array
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Function to create multiple employee records from an array of arrays
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  // Function to add a 'TimeIn' event to an employee's record
  function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    });
    return employeeRecord;
  }
  
  // Function to add a 'TimeOut' event to an employee's record
  function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    });
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((e) => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((e) => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100; // Convert hours
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map((e) => e.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  }
  
  // Function to calculate the total payroll for multiple employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  }
  
  // Exporting all functions for testing
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
  };
  