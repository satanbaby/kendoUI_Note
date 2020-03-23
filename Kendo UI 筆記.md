

# Kendo UI 筆記

Kendo 相依於 Jquery 函式庫，在使用前請先確保有引入 Jquery

## 初始化 DataAttribute

使用 HTML 的 DataSet 屬性創建該角色，例如想創造一個數字 textbox，可以使用 ` data-role="numerictextbox" `，

```html
<div id="container">
    <input data-role="numerictextbox" />
</div>
<script>
kendo.init($("#container"));
</script>
```

## 架構

```javascript
$("#grid").kendoGrid({
  dataSource: dataSource,// 資料來源
  navigatable: true,
  height: 600,					// 高度，若行數多會有拖曳
  filterable: true,
  pageable: {
    alwaysVisible: false,
    pageSizes: [5, 10, 20, 100]
  },
  toolbar: ["create", "save", "cancel"],
  columns: [
    "ProductName",
    { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
    { field: "UnitsInStock", title: "Units In Stock", width: 120 },
    { field: "Discontinued", width: 120, editor: customBoolEditor },
    { command: "destroy", title: "&nbsp;", width: 150 }],
  editable: true
});
```



## 資料源 Data Source

資料源可以使用 html `data-source`來綁定

```html
<div id="container">
    <input data-role="autocomplete" data-source="{data:['One', 'Two']}" />
</div>
<script>
	kendo.init($("#container"));
</script>
```

也可以調用 javascript 變數

```html
<div id="container">
    <input data-role="autocomplete" data-source="dataSource" />
</div>
<script>
var dataSource = new kendo.data.DataSource( {
    data: [ "One", "Two" ]
});
kendo.init($("#container"));
</script>
```

## 模板 Template

當一組模板可能重複使用，亦或取得資料後想自訂渲染格式，可使用 template 來規劃自訂模板，當需調用變數時，需使用`#: 變數 #`來設定變數值

```javascript
$(document).ready(function () {
  $("#grid").kendoGrid({
    columns: [{
      template: "<div class='customer-photo'" +
      "style='background-image: url(#:data.CustomerID#.jpg);'></div>" +
      "<div class='customer-name'>#: ContactName #</div>", // <= 使用到變數 ContactName、CustomerID
      field: "ContactName",
      title: "Contact Name",
      width: 240
    }]
  });
});
```

當模板結構過於複雜時，可以使用 Kendo UI 自訂模板，增加可讀性

```html
<script id="Custom-template" type="text/x-kendo-template">
    <div class='customer-photo' style='background-image: url(#:data.CustomerID#.jpg);'>
  	</div>
    <div class='customer-name'>#: ContactName #</div>
</script>
<script>
  $(document).ready(function () {
    $("#grid").kendoGrid({
      columns: [{
        template: "Custom-template",
        field: "ContactName",
        title: "Contact Name",
        width: 240
      }]
    });
  });
</script>
```

### 在不換頁的前提下渲染某區塊

此功能類似現代前端框架，可以使用 render 將自訂模板渲染至指定容器裡

```html
<div id="container"></div>
<script id="index" type="text/x-kendo-template">
        <div>Hello <input data-role="autocomplete" data-source="['foo', 'bar', 'baz']" />!</div>
</script>

<script>
  var index = new kendo.View('index');
  index.render("#container");
</script>
```

## 資料綁定

雙向資料流，只要綁定資料，當資料有變動時，會自動渲染畫面

```html
<div id="grid">
  <div>Hello <input data-role="autocomplete" data-bind="source: source" />!</div>
</div>
<script>
  kendo.bind($("#grid"), {
    source: ['foo', 'bar', 'baz'] //<= 試著改他看看
  });
</script>
```

### 選擇 checkBox

內建`this.selectedKeyNames()`選擇選取物件

```javascript
function onChange(arg) {
  kendoConsole.log("The selected product ids are: [" + this.selectedKeyNames().join(", ") + "]");
}
$(document).ready(function () {
  $("#grid").kendoGrid({
    dataSource: {
      pageSize: 10,
      transport: {
        read:  {
          url: "https://demos.telerik.com/kendo-ui/service/Products",
          dataType: "jsonp"
        }
      },
      schema: {model: {id: "ProductID"}}
    },
    pageable: true,
    scrollable: false,
    persistSelection: true,
    sortable: true,
    change: onChange,
    columns: [
      { selectable: true, width: "50px" },
      { field:"ProductName", title: "Product Name" },
      { field: "UnitPrice", title:"Unit Price", format: "{0:c}"},
      { field: "UnitsInStock", title:"Units In Stock"},
      { field: "Discontinued"}]
  });
});
```

## Column propity

- [columns.aggregates](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.aggregates) 可使用個數、平均、總和、最大最小
- [columns.attributes](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.attributes)
- [columns.columns](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.columns)
- [columns.command](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command)
- [columns.editable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editable) 可使用function自訂條件
- [columns.editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editor)
- [columns.encoded](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.encoded) 若為true=textContent,false=innerHTML
- [columns.field](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.field) 只有綁定到字段的列才可以排序或過濾。不能以數字開頭
- [columns.filterable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.filterable)
- [columns.footerAttributes](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footerattributes) footer 的屬性`footerAttributes: {"class": "table-footer-cell"}`
- [columns.footerTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.footertemplate)
- [columns.format](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.format) format: "{0: yyyy-MM-dd HH:mm:ss}"
- [columns.groupable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupable)
- [columns.groupHeaderColumnTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheadercolumntemplate)
- [columns.groupHeaderTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupheadertemplate)
- [columns.groupFooterTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.groupfootertemplate)
- [columns.headerAttributes](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.headerattributes)
- [columns.headerTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.headertemplate)
- [columns.hidden](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.hidden)
- [columns.locked](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.locked)
- [columns.lockable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.lockable)
- [columns.media](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.media)
- [columns.minResizableWidth](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.minresizablewidth)
- [columns.minScreenWidth](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.minscreenwidth)
- [columns.selectable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.selectable)可選的
- [columns.sortable](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.sortable)可排序的
- [columns.template](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template)自訂樣板，可插入變數template: "<strong>#: name # </strong>"
- [columns.title](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.title)
- [columns.width](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.width) 欄寬 可為數字或像素
- [columns.values](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.values)
- [columns.menu](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.menu) `true or false`在自訂欄位上是否可選

