# Node-Test
This project reads a list of employes leave and return the employees in alphabetical order along with the total number of days of leave taken.
Output will be at console in the format 
[ { name: 'name of the employee', total: 'total number of leave taken' }]


# Requirements
new.txt is the example file passed to the module test.js

new.txt needs to have a space at the end of each line except comment. If not the last day will be missed from calculating.

All dates and names should have a space.

Each line should start with the name of employee(combination of alphabets and spaces only).Error will be thrown otherwise.

Name of the employee should be followed by date in the format yyyymmdd. Error will be thrown otherwise.Leap year will be considered as well.

Lines starting with // are considered as comments.Will be ignored.

# Run command
node test_node_module.js
