/*!
 * by-pagination v0.0.5
 * https://github.com/xyzhanjiang/by-pagination/
 *
 * Copyright (c) 2016-2016 xyzhanjiang<xyzhanjiang@qq.com> & contributors
 * Licensed under the MIT license
 *
 * Date: 2016-12-27T11:46:57.670Z
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.byPagination = factory(root.jQuery);
  }
}(this, function($) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Pagination(element, options) {
  this.$el = $(element);
  this.options = $.extend({}, Pagination.DEFAULTS, options);

  this.init();

  var self = this;

  // 绑定点击事件
  this.$el.on('click.by.pagination', 'a', function (e) {
    e.preventDefault();

    var $a = $(this);

    // 如果点击当前页则返回
    if ($a.parent().hasClass('active')) return;

    // 跳转到点击页面
    if ($a.data('page')) self.to($a.data('page'));
  });
}

// 默认配置
Pagination.DEFAULTS = {
  firstLastBtn: true,
  firstLastTxt: ['首页', '尾页'],
  pages: 1,
  page: 1,
  pageTemplate: '\n    <li>\n      <a href="#"></a>\n    </li>\n  ',
  prevNextBtn: true,
  prevNextTxt: ['上一页', '下一页']
};

/*
 * @description 初始化
 */
Pagination.prototype.init = function () {
  var page = this.options.page;
  var pages = this.options.pages;
  var pageTemplate = this.options.pageTemplate;

  // 生成当前页
  this.$active = $(pageTemplate).appendTo(this.$el).addClass('active');

  // 生成首页和尾页按钮
  if (this.options.firstLastBtn) {
    this.$first = $(pageTemplate).insertBefore(this.$active);
    this.$first.find('a').on('click.by.pagination', $.proxy(this.first, this)).text(this.options.firstLastTxt[0]);

    this.$last = $(pageTemplate).insertAfter(this.$active);
    this.$last.find('a').on('click.by.pagination', $.proxy(this.last, this)).text(this.options.firstLastTxt[1]);
  }

  // 生成上一页和下一页按钮
  if (this.options.prevNextBtn) {
    this.$prev = $(pageTemplate).insertBefore(this.$active);
    this.$prev.find('a').on('click.by.pagination', $.proxy(this.prev, this)).text(this.options.prevNextTxt[0]);

    this.$next = $(pageTemplate).insertAfter(this.$active);
    this.$next.find('a').on('click.by.pagination', $.proxy(this.next, this)).text(this.options.prevNextTxt[1]);
  }

  // 生成第一页和最后一页按钮
  if (pages > 1) {
    this.$p1 = $(pageTemplate).insertBefore(this.$active);
    this.$p1.find('a').data('page', 1).text(1);
    this.$p2 = $(pageTemplate).insertAfter(this.$active);
    this.$p2.find('a').data('page', pages).text(pages);
  }

  // 生成当前页两边的页码按钮
  for (var i = 5; i >= 1; i--) {
    if (pages >= i) {
      this['$minus' + i] = $(pageTemplate).insertBefore(this.$active);
      this['$minus' + i].find('a').data('page', page - i);
      this['$plus' + i] = $(pageTemplate).insertAfter(this.$active);
      this['$plus' + i].find('a').data('page', page + i);
    }
  }

  // 生成省略号
  if (pages > 7) {
    this.$hellip1 = $('\n      <li>\n        <span>&hellip;</span>\n      </li>\n      ').insertAfter(this.$p1);

    this.$hellip2 = $('\n      <li>\n        <span>&hellip;</span>\n      </li>\n      ').insertBefore(this.$p2);
  }

  this.render(this.options.page);
};

/*
 * @description to
 * @param {Number} page 页码值
 */
Pagination.prototype.to = function (page) {
  this.options.page = parseInt(page) || 1;
  this.$el.trigger('page.by.pagination', this.options.page);
  this.$active.find('a').focus();
  this.render(this.options.page);
};

/*
 * @description 跳转到第一页
 */
Pagination.prototype.first = function () {
  if (this.options.page == 1) return;
  this.options.page = 1;
  this.to(1);
};

/*
 * @description 上一页
 */
Pagination.prototype.prev = function () {
  if (this.options.page <= 1) return;
  this.options.page--;
  this.to(this.options.page);
};

/*
 * @description 下一页
 */
Pagination.prototype.next = function () {
  if (this.options.page >= this.options.pages) return;
  this.options.page++;
  this.to(this.options.page);
};

/*
 * @description 跳转到最后一页
 */
Pagination.prototype.last = function () {
  if (this.options.page == this.options.pages) return;
  this.options.page = this.options.pages;
  this.to(this.options.pages);
};

/*
 * @description render
 */
Pagination.prototype.render = function (page) {
  var pages = this.options.pages;

  this.$active.find('a').text(page);
  this.$minus1.find('a').data('page', page - 1).text(page - 1);
  this.$minus2.find('a').data('page', page - 2).text(page - 2);

  this.$plus1.find('a').data('page', page + 1).text(page + 1);
  this.$plus2.find('a').data('page', page + 2).text(page + 2);

  page > 2 ? this.$minus1.show() : this.$minus1.hide();
  page > 3 ? this.$minus2.show() : this.$minus2.hide();
  page < pages - 1 ? this.$plus1.show() : this.$plus1.hide();
  page < pages - 2 ? this.$plus2.show() : this.$plus2.hide();

  if (pages > 4) {
    this.$minus3.find('a').data('page', page - 3).text(page - 3);
    this.$plus3.find('a').data('page', page + 3).text(page + 3);
    page > pages - 3 && page > 4 ? this.$minus3.show() : this.$minus3.hide();
    page < 4 && page < pages - 3 ? this.$plus3.show() : this.$plus3.hide();
  }

  if (pages > 5) {
    this.$minus4.find('a').data('page', page - 4).text(page - 4);
    this.$plus4.find('a').data('page', page + 4).text(page + 4);
    page > pages - 2 && page > 5 ? this.$minus4.show() : this.$minus4.hide();
    page < 3 && page < pages - 4 ? this.$plus4.show() : this.$plus4.hide();
  }

  if (pages > 6) {
    this.$minus5.find('a').data('page', page - 5).text(page - 5);
    this.$plus5.find('a').data('page', page + 5).text(page + 5);
    page > pages - 1 ? this.$minus5.show() : this.$minus5.hide();
    page < 2 ? this.$plus5.show() : this.$plus5.hide();
  }

  // hellip
  if (pages > 7) {
    page > 4 ? this.$hellip1.show() : this.$hellip1.hide();
    page < pages - 3 ? this.$hellip2.show() : this.$hellip2.hide();
  }

  page > 1 ? this.$p1.show() : this.$p1.hide();
  page < pages ? this.$p2.show() : this.$p2.hide();

  // prev/next
  if (this.options.firstLastBtn) {
    if (page == 1) {
      this.$first.addClass('disabled');
    } else {
      this.$first.removeClass('disabled');
    }

    if (page == pages) {
      this.$last.addClass('disabled');
    } else {
      this.$last.removeClass('disabled');
    }
  }

  if (this.options.prevNextBtn) {
    if (page == 1) {
      this.$prev.addClass('disabled');
    } else {
      this.$prev.removeClass('disabled');
    }

    if (page == pages) {
      this.$next.addClass('disabled');
    } else {
      this.$next.removeClass('disabled');
    }
  }
};

function Plugin(option) {
  return this.each(function () {
    var $this = $(this);
    var data = $this.data('byPagination');
    var options = $.extend({}, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

    if (!data) $this.data('byPagination', data = new Pagination(this, options));
    if (typeof option == 'string' && typeof data[option] == 'function') data[option]();
    if (typeof option == 'number') data.to(option);
  });
}

$.fn.byPagination = Plugin;
$.fn.byPagination.DEFAULTS = Pagination.DEFAULTS;

$(window).on('load.by.pagination', function () {
  Plugin.call($('[data-init="by-pagination"]'));
});
return Plugin;
}));
