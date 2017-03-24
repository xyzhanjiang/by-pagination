/*!
 * by-pagination v0.0.5
 * https://github.com/xyzhanjiang/by-pagination/
 *
 * Copyright (c) 2016-2017 xyzhanjiang<xyzhanjiang@qq.com> & contributors
 * Licensed under the MIT license
 *
 * Date: 2017-03-24T11:59:16.241Z
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

    if ($a.hasClass('by-pagination-first')) self.first();else if ($a.hasClass('by-pagination-last')) self.last();else if ($a.hasClass('by-pagination-prev')) self.prev();else if ($a.hasClass('by-pagination-next')) self.next();

    // 跳转到点击页面
    else if ($a.data('page')) self.to($a.data('page'));
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

  if (typeof page != 'number' || typeof pages != 'number') {
    throw new Error('Invalid page or pages number!');
  }

  if (page < 1 || pages < 1 || page > pages) {
    throw new Error('Invalid page or pages number!');
  }

  // 生成当前页
  this.$active = $(pageTemplate).appendTo(this.$el).addClass('by-pagination-active');

  // 生成首页和尾页按钮
  if (this.options.firstLastBtn) {
    this.$first = $(pageTemplate).insertBefore(this.$active);
    this.$first.find('a').addClass('by-pagination-first').text(this.options.firstLastTxt[0]);

    this.$last = $(pageTemplate).insertAfter(this.$active);
    this.$last.find('a').addClass('by-pagination-last').text(this.options.firstLastTxt[1]);
  }

  // 生成上一页和下一页按钮
  if (this.options.prevNextBtn) {
    this.$prev = $(pageTemplate).insertBefore(this.$active);
    this.$prev.find('a').addClass('by-pagination-prev').text(this.options.prevNextTxt[0]);

    this.$next = $(pageTemplate).insertAfter(this.$active);
    this.$next.find('a').addClass('by-pagination-next').text(this.options.prevNextTxt[1]);
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
    if (pages > i + 1) {
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

  this.render(page);
};

/*
 * @description refresh
 * @param {Number} page 页码值
 */
Pagination.prototype.refresh = function (options) {
  var page, pages;

  if (!options) return;
  page = options.page;
  pages = options.pages;

  if (typeof page != 'number' || typeof pages != 'number') {
    throw new Error('Invalid page or pages number!');
  }

  if (page < 1 || pages < 1 || page > pages) {
    throw new Error('Invalid page or pages number!');
  }
  this.options.page = page;
  this.options.pages = pages;
  this.$el.empty();

  this.init();
};

/*
 * @description to
 * @param {Number} page 页码值
 */
Pagination.prototype.to = function (page) {
  if (typeof page != 'number') {
    throw new Error('Invalid page number');
  }

  if (page < 1 || page > this.options.pages) {
    throw new Error('Invalid page number');
  }

  this.options.page = page;
  this.$el.trigger('page.by.pagination', page);
  this.$active.find('a').focus();
  this.render(page);
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

  if (pages > 1) {
    page > 1 ? this.$p1.show() : this.$p1.hide();
    page < pages ? this.$p2.show() : this.$p2.hide();
  }

  if (pages > 2) {
    this.$minus1.find('a').data('page', page - 1).text(page - 1);
    this.$plus1.find('a').data('page', page + 1).text(page + 1);
    page > 2 ? this.$minus1.show() : this.$minus1.hide();
    page < pages - 1 ? this.$plus1.show() : this.$plus1.hide();
  }

  if (pages > 3) {
    this.$minus2.find('a').data('page', page - 2).text(page - 2);
    this.$plus2.find('a').data('page', page + 2).text(page + 2);
    page > 3 ? this.$minus2.show() : this.$minus2.hide();
    page < pages - 2 ? this.$plus2.show() : this.$plus2.hide();
  }

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

  // first last
  if (this.options.firstLastBtn) {
    if (page == 1) {
      this.$first.addClass('by-pagination-disabled');
    } else {
      this.$first.removeClass('by-pagination-disabled');
    }

    if (page == pages) {
      this.$last.addClass('by-pagination-disabled');
    } else {
      this.$last.removeClass('by-pagination-disabled');
    }
  }

  // prev next
  if (this.options.prevNextBtn) {
    if (page == 1) {
      this.$prev.addClass('by-pagination-disabled');
    } else {
      this.$prev.removeClass('by-pagination-disabled');
    }

    if (page == pages) {
      this.$next.addClass('by-pagination-disabled');
    } else {
      this.$next.removeClass('by-pagination-disabled');
    }
  }
};

function Plugin(option) {
  return this.each(function () {
    var $this = $(this);
    var data = $this.data('byPagination');
    var options = $.extend({}, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

    if (!data) $this.data('byPagination', data = new Pagination(this, options));
    // 重新初始化
    else if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object') {
        if (data.options.pages != option.pages) {
          data.refresh(option);
        } else {
          if (data.options.page != option.page) data.to(option.page);
        }
      }
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
