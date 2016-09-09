/*!
 * Pagination.js
 * Copyright (c) 2016 xyzhanjiang & contributors
 *
 * Licensed under the MIT License.
 *
 * @author xyzhanjiang <xyzhanjiang@qq.com>
 */

function Pagination(element, options) {
  this.$el      = $(element)
  this.options  = $.extend({}, Pagination.DEFAULTS, options)
  this.$active  = this.$el.find('.by-pagination-active')
  this.$minus1  = this.$el.find('.by-pagination-minus-1')
  this.$minus2  = this.$el.find('.by-pagination-minus-2')
  this.$plus1   = this.$el.find('.by-pagination-plus-1')
  this.$plus2   = this.$el.find('.by-pagination-plus-2')

  this.$p1      = this.$el.find('.by-pagination-1')
  this.$p2      = this.$el.find('.by-pagination-2')

  this.$first   = this.$el.find('.by-pagination-first')
  this.$prev    = this.$el.find('.by-pagination-prev')
  this.$next    = this.$el.find('.by-pagination-next')
  this.$last    = this.$el.find('.by-pagination-last')

  this.$hellip1 = this.$el.find('.by-pagination-hellip-1')
  this.$hellip2 = this.$el.find('.by-pagination-hellip-2')

  this.init()

  var self = this

  this.$el.on('click.by.pagination', 'a', function(e) {
    e.preventDefault()

    var $a = $(this)
    if ($a.hasClass('by-pagination-active')) return
    else if ($a.hasClass('by-pagination-prev') || $a.hasClass('by-pagination-minus-1')) self.prev()
    else if ($a.hasClass('by-pagination-next') || $a.hasClass('by-pagination-plus-1')) self.next()
    else if ($a.hasClass('by-pagination-last') || $a.hasClass('by-pagination-2')) self.last()
    else if ($a.hasClass('by-pagination-minus-2')) self.to(self.options.page - 2)
    else if ($a.hasClass('by-pagination-plus-2')) self.to(self.options.page + 2)
    else self.first()
  })
}

Pagination.DEFAULTS = {
  pages: 1,
  page: 1
}

/*
 * @description init
 */
Pagination.prototype.init = function() {
  this.$p1.text(1)
  this.$p2.text(this.options.pages)

  this.render(this.options.page)
}

/*
 * @description to
 */
Pagination.prototype.to = function(page) {
  this.options.page = parseInt(page) || 1
  this.$el.trigger('page.by.pagination', this.options.page)
  this.$active[0].focus()
  this.render(this.options.page)
}

/*
 * @description first
 */
Pagination.prototype.first = function() {
  if (this.options.page == 1) return
  this.options.page = 1
  this.to(1)
}

/*
 * @description prev
 */
Pagination.prototype.prev = function() {
  if (this.options.page <= 1) return
  this.options.page--
  this.to(this.options.page)
}

/*
 * @description next
 */
Pagination.prototype.next = function() {
  if (this.options.page >= this.options.pages) return
  this.options.page++
  this.to(this.options.page)
}

/*
 * @description last
 */
Pagination.prototype.last = function() {
  if (this.options.page == this.options.pages) return
  this.options.page = this.options.pages
  this.to(this.options.pages)
}

/*
 * @description render
 */
Pagination.prototype.render = function(page) {
  var pages = this.options.pages

  this.$active.text(page)
  this.$minus1.text(page - 1)
  this.$minus2.text(page - 2)
  this.$plus1.text(page + 1)
  this.$plus2.text(page + 2)

  page > 2 ? this.$minus1.show() : this.$minus1.hide()
  page > 3 ? this.$minus2.show() : this.$minus2.hide()
  page < pages - 1 ? this.$plus1.show() : this.$plus1.hide()
  page < pages - 2 ? this.$plus2.show() : this.$plus2.hide()

  page > 1 ? this.$p1.show() : this.$p1.hide()
  page < pages ? this.$p2.show() : this.$p2.hide()

  page > 4 && pages > 4 ? this.$hellip1.show() : this.$hellip1.hide()
  page < pages - 3 && pages > 4 ? this.$hellip2.show() : this.$hellip2.hide()

  this.$first[page == 1 ? 'addClass' : 'removeClass']('disabled')
  this.$prev[page == 1 ? 'addClass' : 'removeClass']('disabled')
  this.$next[page == pages ? 'addClass' : 'removeClass']('disabled')
  this.$last[page == pages ? 'addClass' : 'removeClass']('disabled')
}

function Plugin(option) {
  return this.each(function() {
    var $this   = $(this)
    var data    = $this.data('byPagination')
    var options = $.extend({}, $this.data(), typeof option === 'object' && option)

    if (!data) $this.data('byPagination', (data = new Pagination(this, options)))
    if (typeof option === 'string' && typeof data[option] === 'function') data[option]()
    if (typeof option == 'number') data.to(option)
  })
}

$.fn.byPagination = Plugin

$(window).on('load.by.pagination', function() {
  Plugin.call($('[data-init="by-pagination"]'))
})
