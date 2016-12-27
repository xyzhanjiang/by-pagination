# By Pagination

A jQuery pagination plugin.

## Usage

1. Installation with npm, `npm install --save by-pagination`

2. Include jQuery:

  ``` html
  <script src="/js/libs/jquery-1.11.2.min.js"></script>
  ```

3. Include plugin's code:

  ``` html
  <link rel="stylesheet" href="dist/css/by-pagination.css">
  <script src="dist/js/by-pagination.js"></script>

  <ul class="by-pagination" id="page">
    <li>
      <a class="by-pagination-first" href="#">first</a>
    </li>
    <li>
      <a class="by-pagination-prev" href="#">prev</a>
    </li>
    <li>
      <a class="by-pagination-1" href="#">1</a>
    </li>
    <li class="by-pagination-hellip-1">
      <span>&hellip;</span>
    </li>
    <li>
      <a class="by-pagination-minus-2" href="#">1</a>
    </li>
    <li>
      <a class="by-pagination-minus-1" href="#">1</a>
    </li>
    <li class="active">
      <a class="by-pagination-active" href="#">1</a>
    </li>
    <li>
      <a class="by-pagination-plus-1" href="#">1</a>
    </li>
    <li>
      <a class="by-pagination-plus-2" href="#">1</a>
    </li>
    <li class="by-pagination-hellip-2">
      <span>&hellip;</span>
    </li>
    <li>
      <a class="by-pagination-2" href="#">1</a>
    </li>
    <li>
      <a class="by-pagination-next" href="#">next</a>
    </li>
    <li>
      <a class="by-pagination-last" href="#">last</a>
    </li>
  </ul>
  ```

4. Call the plugin:

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

  Total page, default 1

  ``` javascript
  $('#page').byPagination({
    pages: 10
  })
  ```

  data attribute:

  ``` html
  <ul data-pages="18"></ul>
  ```

* page

  Current page, default 1

  data attribute:

  ``` html
  <ul data-page="5"></ul>
  ```

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