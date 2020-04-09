// kendoGrid.kendoBind: true
dataSource.fetch(function(){
  var data = this.data();
  console.log(data.length);  // displays "77"
  console.log(data[0].ProductName); // displays "Chai"
});
