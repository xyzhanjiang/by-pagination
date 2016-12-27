# By Pagination

简单 jQuery 分页插件。

## 使用

1. 通过 npm 安装：`npm install --save by-pagination`

2. 引入 jQuery：

  ``` html
  <script src="/js/libs/jquery-1.11.2.min.js"></script>
  ```

3. 引入插件：

  ``` html
  <link rel="stylesheet" href="dist/css/by-pagination.css">
  <script src="dist/js/by-pagination.js"></script>

  <ul class="by-pagination" id="page"></ul>
  ```

4. 调用：

  ``` javascript
  $(function() {
    $('#page').byPagination({
      pages: 10,
      page: 1
    })
  })
  ```

### Options

* pages

  总页数，默认值为 1

  ``` javascript
  $('#page').byPagination({
    pages: 10
  })
  ```

  使用 `data-*` 属性传入参数：

  ``` html
  <ul data-pages="18"></ul>
  ```

* page

  当前页，默认值为 1

* firstLastBtn

  是否显示首页和尾页按钮，默认值为 true

* prevNextBtn

  是否显示上一页和下一页按钮，默认值为 true

### 事件

当分页跳转时元素将触发 `page.by.pagination` 事件：

``` javascript
$('#page').on('page.by.pagination', function(e, page) {
  console.log(page)
})
```

## Browser support

* Modern browsers
* Microsoft Internet Explorer 7.0+

## License

MIT License