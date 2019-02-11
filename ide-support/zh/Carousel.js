/**
 * 轮播组件<br>
 * 样式属性(不含从父类继承)：autoplay, interval, loop, vertical, currentIndex,
 *       indicatorWidth, indicatorHeight, indicator, indicatorDrawable,
 *       activeIndicator, activeIndicatorDrawable, indicatorVisible, indicatorGap,
 *       controller, controllerDrawable, 
 *       hoverController, hoverControllerDrawable,
 *       activeController, activeControllerDrawable,
 *       controllerVisible, controllerWidth, controllerHeight, autoHideController
 * @constructor
 * @extends {ht.ui.ViewGroup}
 */
ht.ui.Carousel = function() {}

/**
 * 获取切换动画的运行时间，单位毫秒
 * @return {Number} 
 */
ht.ui.Carousel.prototype.getAutoplay = function() {}

/**
 * 设置切换动画的运行时间
 * @param {Number} autoplay 运行时间，单位毫秒
 */
ht.ui.Carousel.prototype.setAutoplay = function(autoplay) {}

/**
 * 获取动画与动画之间的停留时间
 * @return {Number}
 */
ht.ui.Carousel.prototype.getInterval = function() {}

/**
 * 设置动画与动画之间的停留时间
 * @param {Number} interval 停留时间
 */
ht.ui.Carousel.prototype.setInterval = function(interval) {}


/**
 * 是否循环播放
 * @return {Boolean}
 */
ht.ui.Carousel.prototype.isLoop = function() {}

/**
 * 设置是否循环播放
 * @param {Boolean} loop
 */
ht.ui.Carousel.prototype.setLoop = function(loop) {}



/**
 * 是否纵向滚动
 * @return {Boolean}
 */
ht.ui.Carousel.prototype.isVertical = function() {}

/**
 * 设置是否纵向滚动
 * @param {Boolean} vertical
 */
ht.ui.Carousel.prototype.setVertical = function(vertical) {}


/**
 * 获取当前的播放下标
 * @return {Number}
 */
ht.ui.Carousel.prototype.getCurrentIndex = function() {}

/**
 * 设置当前的播放下标
 * @param {Number} index
 */
ht.ui.Carousel.prototype.setCurrentIndex = function(index) {}


/**
 * 获取指示器图标的宽度
 * @return {Number}
 */
ht.ui.Carousel.prototype.getIndicatorWidth = function() {}

/**
 * 设置指示器图标的宽度
 * @param {Number} width
 */
ht.ui.Carousel.prototype.setIndicatorWidth = function(width) {}


/**
 * 获取指示器图标的高度
 * @return {Number}
 */
ht.ui.Carousel.prototype.getIndicatorHeight = function() {}

/**
 * 设置指示器图标的高度
 * @param {Number} height
 */
ht.ui.Carousel.prototype.setIndicatorHeight = function(height) {}


/**
 * 获取指示器图标
 * @return {Object}
 */
ht.ui.Carousel.prototype.getIndicator = function() {}

/**
 * 设置指示器图标，可以是颜色或者图片等；此值最终会被转换为 Drawable 对象
 * @param {Object} indicator
 */
ht.ui.Carousel.prototype.setIndicator = function(indicator) {}


/**
 * 获取指示器图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @return {ht.ui.drawable.Drawable}
 */
ht.ui.Carousel.prototype.getIndicatorDrawable = function() {}

/**
 * 设置指示器图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @param {ht.ui.drawable.Drawable} drawable
 */
ht.ui.Carousel.prototype.setIndicatorDrawable = function(drawable) {}



/**
 * 获取当前显示的指示器的图标
 * @return {Object}
 */
ht.ui.Carousel.prototype.getActiveIndicator = function() {}

/**
 * 设置当前显示的指示器的图标，可以是颜色或者图片等；此值最终会被转换为 Drawable 对象
 * @param {Object} indicator
 */
ht.ui.Carousel.prototype.setActiveIndicator = function(indicator) {}


/**
 * 获取当前显示的指示器的图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @return {ht.ui.drawable.Drawable}
 */
ht.ui.Carousel.prototype.getActiveIndicatorDrawable = function() {}

/**
 * 设置当前显示的指示器的图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @param {ht.ui.drawable.Drawable} drawable
 */
ht.ui.Carousel.prototype.setActiveIndicatorDrawable = function(drawable) {}



/**
 * 指示器是否可见
 * @return {Boolean}
 */
ht.ui.Carousel.prototype.isIndicatorVisible = function() {}

/**
 * 设置指示器是否可见
 * @param {Boolean} visible
 */
ht.ui.Carousel.prototype.setIndicatorVisible = function(visible) {}


/**
 * 获取指示器之间的间距
 * @return {Number}
 */
ht.ui.Carousel.prototype.getIndicatorGap = function() {}

/**
 * 设置指示器之间的间距
 * @param {Number} gap
 */
ht.ui.Carousel.prototype.setIndicatorGap = function(gap) {}



/**
 * 获取控制器图标
 * @return {Object}
 */
ht.ui.Carousel.prototype.getController = function() {}

/**
 * 设置控制器图标，此图标按照水平展示时左侧的控制器方向来设计即可，绘制到其他位置时会自动旋转
 * @param {Object} controller
 */
ht.ui.Carousel.prototype.setController = function(controller) {}


/**
 * 获取控制器图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 controller 转换
 * @return {ht.ui.drawable.Drawable}
 */
ht.ui.Carousel.prototype.getControllerDrawable = function() {}

/**
 * 设置控制器图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @param {ht.ui.drawable.Drawable} drawable
 */
ht.ui.Carousel.prototype.setControllerDrawable = function(drawable) {}


/**
 * 获取 hover 状态的的控制器的图标
 * @return {Object}
 */
ht.ui.Carousel.prototype.getHoverController = function() {}

/**
 * 设置 hover 状态的控制器的图标，可以是颜色或者图片等；此值最终会被转换为 Drawable 对象
 * @param {Object} controller
 */
ht.ui.Carousel.prototype.setHoverController = function(controller) {}


/**
 * 获取 hover 状态的控制器的图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @return {ht.ui.drawable.Drawable}
 */
ht.ui.Carousel.prototype.getHoverControllerDrawable = function() {}

/**
 * 设置 hover 状态的控制器的图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @param {ht.ui.drawable.Drawable} drawable
 */
ht.ui.Carousel.prototype.setHoverControllerDrawable = function(drawable) {}



/**
 * 获取 active 状态的的控制器的图标
 * @return {Object}
 */
ht.ui.Carousel.prototype.getActiveController = function() {}

/**
 * 设置 active 状态的控制器的图标，可以是颜色或者图片等；此值最终会被转换为 Drawable 对象
 * @param {Object} controller
 */
ht.ui.Carousel.prototype.setActiveController = function(controller) {}


/**
 * 获取 active 状态的控制器的图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @return {ht.ui.drawable.Drawable}
 */
ht.ui.Carousel.prototype.getActiveControllerDrawable = function() {}

/**
 * 设置 active 状态的控制器的图标 Drawable 对象；渲染时优先使用此 Drawable 对象，如果为空，再用 indicator 转换
 * @param {ht.ui.drawable.Drawable} drawable
 */
ht.ui.Carousel.prototype.setActiveControllerDrawable = function(drawable) {}



/**
 * 控制器是否可见
 * @return {Boolean}
 */
ht.ui.Carousel.prototype.isControllerVisible = function() {}

/**
 * 设置控制器是否可见
 * @param {Boolean} visible
 */
ht.ui.Carousel.prototype.setControllerVisible = function(visible) {}


/**
 * 获取控制器图标的宽度
 * @return {Number}
 */
ht.ui.Carousel.prototype.getControllerWidth = function() {}

/**
 * 设置控制器图标的宽度
 * @param {Number} width
 */
ht.ui.Carousel.prototype.setControllerWidth = function(width) {}


/**
 * 获取控制器图标的高度
 * @return {Number}
 */
ht.ui.Carousel.prototype.getControllerHeight = function() {}

/**
 * 设置控制器图标的高度
 * @param {Number} height
 */
ht.ui.Carousel.prototype.setControllerHeight = function(height) {}


/**
 * 是否自动隐藏控制器
 * @return {Boolean}
 */
ht.ui.Carousel.prototype.isAutoHideController = function() {}

/**
 * 设置是否自动隐藏控制器
 * @param {Boolean} autoHideController
 */
ht.ui.Carousel.prototype.setAutoHideController = function(autoHideController) {}


/**
 * 暂停轮播
 */
ht.ui.Carousel.prototype.pauseAutoplay = function() {}

/**
 * 继续轮播
 */
ht.ui.Carousel.prototype.resumeAutoplay = function() {}


/**
 * 添加轮播内容
 * @param {Object} content 轮播内容，值为：可转换为 drawable 的值或者 drawable 对象或者 UI 组件
 * @param {Number} [index] 插入位置
 */
ht.ui.Carousel.prototype.add = function(content, index) {}