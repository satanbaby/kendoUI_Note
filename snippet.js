// kendoGrid.kendoBind: true
dataSource.fetch(function(){
  var data = this.data();
  console.log(data.length);  // displays "77"
  console.log(data[0].ProductName); // displays "Chai"
});

// DataSource
// "average" - Only for Number.
// "count" - String, Number and Date.
// "max" - Number and Date.
// "min" - Number and Date.
// "sum" - Only for Number.
aggregate: [
  { field: "age", aggregate: "sum" }
]
