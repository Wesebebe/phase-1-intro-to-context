// create createEmployeeRecord function populates a record from an Array
let createEmployeeRecord = function(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
// function createEmployeeRecords
let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(arr){
        return createEmployeeRecord(arr)
    })
}
//function createTimeEvent adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}
//function createTimeOut adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
let createTimeOutEvent = function(dateOf){
    let [date, hour] = dateOf.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

//function HoursWorkedOnDate calculates the hours worked when given an employee record and a date
let hoursWorkedOnDate = function(dateSought){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === dateSought
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === dateSought
    })

    return (outEvent.hour - inEvent.hour) / 100
}

//function wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
         this.payPerHour
    return parseFloat(rawWage.toString())
}

//function allWagesFor aggregates all the dates' wages and adds them together
let allWagesFor = function(){
    let datesWorked = this.timeInEvents.map(function(e){
        return e.date
    })
    let payable = datesWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

//
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

//calculates that the employees earned a certain amount of dollars  
let calculatePayroll = function(employeeRecords){
      return employeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }
