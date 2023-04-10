

/**
 * 自定义组件
 */
ui.Carousel = function () {
    ht.ui.Carousel.superClass.constructor.call(this);
};

def('ht.ui.Carousel', ht.ui.ViewGroup, {

    // 样式属性
    ui_ac: [
        'autoplay', 'interval', 'is:loop', 'is:vertical', 'currentIndex',
        'indicatorWidth', 'indicatorHeight', 'drawable:indicator',
        'drawable:activeIndicator', 'is:indicatorVisible', 'indicatorGap',
        'drawable:controller',
        'drawable:hoverController',
        'drawable:activeController',
        'is:controllerVisible', 'controllerWidth', 'controllerHeight', 'is:autoHideController',
        "is:indicatorOutside", "is:card", "is:hoverTrigger", "is:pauseOnHover",
    ],
    ms_ac: ['currentController', 'currentControllerState'],

    __autoplay: 500,
    __interval: 3000, // 停留 5s
    __loop: true,
    __indicatorWidth: 30,
    __indicatorHeight: 2,
    __indicatorGap: 2,
    __indicator: ['ht.ui.drawable.ColorDrawable', '#F0F2F5', 4],
    __activeIndicator: ['ht.ui.drawable.ColorDrawable', '#A8ABB2', 4],
    __indicatorVisible: true,
    __controllerVisible: true,
    __controllerWidth: 24,
    __controllerHeight: 40,
    __controller: 'ui_carousel_controller_v5',
    __hoverController: 'ui_carousel_hoverController_v5',
    __activeController: 'ui_carousel_activeController_v5',
    __autoHideController: true,

    __indicatorOutside: false,
    __card: false,
    __hoverTrigger: true,
    __pauseOnHover: true,

    initView: function () {
        var self = this;
        ui.Carousel.superClass.initView.call(self, true);
        var contentCanvas = self.getContentCanvas();
        contentCanvas.style.zIndex = '1000001';
        contentCanvas.style.pointerEvents = 'none';
    },

    getInteractorClasses: function () {
        return ui.Carousel.superClass.getInteractorClasses.call(this).concat([ui.CarouselInteractor]);
    },
    onPropertyChanged: function (e) {
        var self = this;
        ui.Carousel.superClass.onPropertyChanged.call(self, e);
        switch (e.property) {
            case "children": {
                self.stopAnimation();
                self.setCurrentIndex(0);
            } break;
            case "vertical": {
                var width = self.getIndicatorWidth(),
                    height = self.getIndicatorHeight();
                if (e.newValue) {
                    self.setIndicatorWidth(height);
                    self.setIndicatorHeight(width / 2);
                } else {
                    self.setIndicatorWidth(height * 2);
                    self.setIndicatorHeight(width);
                }
            } break;
        }
    },
    add: function (img, index) {
        if (img && img.getView) {
            this.addView(img, NULL, index);
        } else {
            if (img instanceof ht.ui.drawable.Drawable) { } else {
                img = Default.toDrawable(img);
            }
            var view = new ht.ui.View({
                background: img
            });
            this.addView(view, NULL, index);
        }
    },
    clearAutoplay: function () {
        var self = this;
        clearTimeout(self._autoplayTimer);

        delete self._autoplayTimer;
    },
    resumeAutoplay: function (fromInteractor) {
        var self = this;
        if (fromInteractor) {
            if (self._pauseAutoplay === 'fromInteractor') {
                self._pauseAutoplay = false;
            }
        }
        else {
            self._pauseAutoplay = false;
        }
        self.iv();
    },
    pauseAutoplay: function (fromInteractor) {
        var self = this;
        if (fromInteractor) {
            self._pauseAutoplay = 'fromInteractor';
        }
        else {
            self._pauseAutoplay = true;
        }

        self.iv();
    },
    stopAnimation: function () {
        var self = this;
        self._ignoreIndex = true;

        self._animation && self._animation.stop();

        self._ignoreIndex = false;
    },
    startAutoplay: function (interval, targetIndex, immediate) {
        var self = this;
        var innerHeight = self.getContentHeight();
        var innerWidth = self.getContentWidth();
        var outside = self.isIndicatorOutside();
        var vertical = self.isVertical();
        if (outside) {
            if (vertical) {
                innerWidth -= 22;
            } else {
                innerHeight -= 22;
            }
        }
        if (interval == null) interval = self.getInterval();
        var timerFunc = function () {
            var children = self.getVisibleChildren(),
                childrenSize = children.size(),
                isVertical = self.isVertical(),
                currentIndex = self.getCurrentIndex(),
                currentView = children.get(currentIndex);
            if (targetIndex == null) {
                targetIndex = currentIndex + 1;
            }
            var nextView = children.get(targetIndex);
            if (!nextView) {
                nextView = children.get(0);
                targetIndex = 0;
            }
            var backwards = true;
            if (targetIndex < currentIndex) {
                backwards = false;
            }
            // last to first
            if (targetIndex === 0 && currentIndex === childrenSize - 1) {
                backwards = true;
            }
            else if (currentIndex === 0 && targetIndex === childrenSize - 1) {
                backwards = false;
            }
            self._animateIndex = currentIndex;
            if (!self.isCard()) {
                self.layoutChild(currentView, 0, 0, innerWidth, innerHeight);
                self.layoutChild(nextView, 0, 0, innerWidth, innerHeight);
                nextView.getView().style.visibility = 'visible';
                if (!isVertical) {
                    if (backwards) {
                        nextView.setX(currentView.getX() + currentView.getWidth());
                        nextView.setY(currentView.getY());
                        var nowX = nextView.getX();
                        var targetX = currentView.getX();
                        var cNowX = currentView.getX();
                        var cTargetX = currentView.getX() - currentView.getWidth();
                    }
                    else {
                        nextView.setX(currentView.getX() - currentView.getWidth());
                        nextView.setY(currentView.getY());
                        var nowX = nextView.getX();
                        var targetX = currentView.getX();
                        var cNowX = currentView.getX();
                        var cTargetX = currentView.getX() + currentView.getWidth();
                    }
                } else {
                    if (backwards) {
                        nextView.setY(currentView.getY() + currentView.getHeight());
                        nextView.setX(currentView.getX());
                        var nowY = nextView.getY();
                        var targetY = currentView.getY();
                        var cNowY = currentView.getY();
                        var cTargetY = currentView.getY() - currentView.getHeight();
                    }
                    else {
                        nextView.setY(currentView.getY() - currentView.getHeight());
                        nextView.setX(currentView.getX());
                        var nowY = nextView.getY();
                        var targetY = currentView.getY();
                        var cNowY = currentView.getY();
                        var cTargetY = currentView.getY() + currentView.getHeight();
                    }
                }
            }
            self._animation = ht.Default.startAnim({
                duration: self.isCard() ? 1 : self.getAutoplay(),
                action: function (v, t) {
                    if (!self.isCard()) {
                        if (!isVertical) {
                            nextView.setX(nowX - (nowX - targetX) * v);
                            currentView.setX(cNowX - (cNowX - cTargetX) * v);
                        } else {
                            nextView.setY(nowY - (nowY - targetY) * v);
                            currentView.setY(cNowY - (cNowY - cTargetY) * v);
                        }
                    }
                },
                finishFunc: function () {
                    if (!self._ignoreIndex) {
                        self.setCurrentIndex(targetIndex);
                    }
                    delete self._animation;
                    delete self._animateIndex;
                    self.clearAutoplay();
                    self.iv();
                }
            });
        };
        if (immediate) {
            timerFunc();
        }
        else {
            self._autoplayTimer = setTimeout(timerFunc, interval);
        }
    },

    figureIndicatorPosition: function (totalWidth, totalHeight, indicatorsWidth, indicatorsHeight, isVertical) {
        var outside = this.isIndicatorOutside();
        if (outside) {
            if (!isVertical) {
                return { x: (totalWidth - indicatorsWidth) / 2, y: totalHeight - indicatorsHeight }
            } else {
                return { x: totalWidth - indicatorsWidth, y: (totalHeight - indicatorsHeight) / 2 }
            }
        } else {
            if (!isVertical) {
                return { x: (totalWidth - indicatorsWidth) / 2, y: totalHeight - 20 - indicatorsHeight }
            } else {
                return { x: totalWidth - 20 - indicatorsWidth, y: (totalHeight - indicatorsHeight) / 2 }
            }
        }
    },
    figureControllerPosition: function (width, height, cwidth, cheight, isVertical, type) {
        var outside = this.isIndicatorOutside();
        if (outside) {
            if (!isVertical) {
                height -= 22;
            } else {
                width -= 22;
            }
        }
        if (!isVertical) {
            if (type === 'prev') {
                return { x: 8, y: (height - cheight) / 2 }
            } else {
                return { x: width - cwidth - 8, y: (height - cheight) / 2 }
            }
        } else {
            if (type === 'prev') {
                return { x: width / 2 - cwidth, y: 8 }
            } else {
                return { x: width / 2 - 16, y: height - cheight + 4 }
            }
        }
    },

    getCurrentControllerDrawable: function (state) {
        var self = this;
        var drawable = self.getControllerDrawable();
        if (state === 'hover') return self.getHoverControllerDrawable() || drawable;
        else if (state === 'active') return self.getActiveControllerDrawable() || drawable;
        else return drawable;
    },
    drawController: function (x, y, width, height, isVertical, type, state) {
        var self = this;
        var drawable = self.getCurrentControllerDrawable(state);
        var contentCanvas = self.getContentCanvas();
        var contentContext = self.getContentContext();
        var controllerRects = self._controllerRects;
        if (!isVertical) {
            if (type === 'prev') {
                drawable.draw(x, y, width, height, NULL, self, contentCanvas);
                controllerRects.prev = {
                    x: x, y: y, width: width, height: height
                }
            } else {
                contentContext.save();
                contentContext.translate(x + width / 2, y + height / 2);
                contentContext.rotate(Math.PI);
                contentContext.translate(-(x + width / 2), -(y + height / 2));

                drawable.draw(x, y, width, height, NULL, self, contentCanvas);

                contentContext.restore();
                controllerRects.next = {
                    x: x, y: y, width: width, height: height
                }
            }
        } else {
            if (type === 'prev') {
                contentContext.save();
                contentContext.translate(x + height / 2, y + width);
                contentContext.rotate(Math.PI / 2);
                contentContext.translate(-(x + height / 2), -(y + width));

                drawable.draw(x, y, width, height, NULL, self, contentCanvas);

                contentContext.restore();
                controllerRects.prev = {
                    x: x, y: y, width: height, height: width
                }
            }
            else {
                contentContext.save();
                y -= height / 2;

                var tx = x + height / 2,
                    ty = y + width;
                contentContext.translate(tx, ty);
                contentContext.rotate(-Math.PI / 2);
                contentContext.translate(-tx, -ty);

                drawable.draw(x, y, width, height, NULL, self, contentCanvas);

                contentContext.restore();

                controllerRects.next = {
                    x: x, y: y + height - width, width: height, height: width
                }
            }
        }
    },
    indicatorHitTest: function (event) {
        var self = this,
            indicatorRects = self._indicatorRects;
        if (indicatorRects) {
            var lp = (event instanceof Event) ? self.lp(event) : event;
            for (var i = 0, length = indicatorRects.length; i < length; i++) {
                if (Default.containsPoint(indicatorRects[i], lp)) {
                    return i;
                }
            }
        }
    },
    controllerHitTest: function (event) {
        var self = this,
            controllerRects = self._controllerRects;
        if (controllerRects) {
            var lp = (event instanceof Event) ? self.lp(event) : event;
            if (Default.containsPoint(controllerRects.prev, lp)) {
                return 'prev';
            }
            else if (Default.containsPoint(controllerRects.next, lp)) {
                return 'next'
            }
        }
    },
    drawIndicator: function (x, y, width, height, gap, size, currentIndex, isVertical) {
        var self = this,
            indicatorDrawable = self.getIndicatorDrawable(),
            activeIndicatorDrawable = self.getActiveIndicatorDrawable(),
            contentCanvas = self.getContentCanvas(),
            indicatorRects = self._indicatorRects;

        if (!isVertical) {
            for (var i = 0; i < size; i++) {
                indicatorRects.push({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                })
                if (currentIndex === i) {
                    activeIndicatorDrawable.draw(x, y, width, height, NULL, self, contentCanvas);
                } else {
                    indicatorDrawable.draw(x, y, width, height, NULL, self, contentCanvas);
                }
                x += gap + width;
            }
        } else {
            for (var i = 0; i < size; i++) {
                indicatorRects.push({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                })
                if (currentIndex === i) {
                    activeIndicatorDrawable.draw(x, y, width, height, NULL, self, contentCanvas);
                } else {
                    indicatorDrawable.draw(x, y, width, height, NULL, self, contentCanvas);
                }
                y += gap + height;
            }
        }
    },

    /**
     * 绘制组件
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width 
     * @param {Number} height
     * @override
     */
    validateImpl: function (x, y, width, height) {
        var self = this, children = self.getVisibleChildren(), childrenSize = children.size();
        var innerHeight = height;
        var innerWidth = width;
        var outside = self.isIndicatorOutside();
        var vertical = self.isVertical();
        if (outside) {
            if (vertical) {
                innerWidth -= 22;
            } else {
                innerHeight -= 22;
            }
        }
        if (childrenSize > 0) {
            var currentIndex = self.getCurrentIndex(), currentView = children.get(currentIndex);
            var lastIndex = (currentIndex - 1 + childrenSize) % childrenSize, lastView = children.get(lastIndex);
            var nextIndex = (currentIndex + 1) % childrenSize, nextView = children.get(nextIndex);
            var animateIndex = self._animateIndex;
            // 如果动画过程中切换了 currentIndex，立即停止动画并清除动画状态
            if (animateIndex >= 0 && animateIndex !== currentIndex) {
                self.stopAnimation();
            }
            // 动画没有在运行，要设置 children 的 visible
            if (self._animation == null) {
                if (self.isCard()) {
                    var zIndex = self.getZIndex() || 0;
                    for (var i = 0; i < childrenSize; i++) {
                        var child = children.get(i);
                        child.getView().style.visibility = 'visible';
                        child.getView().style.transition = "transform 0.4s ease-in-out";
                        if (child === currentView) {
                            child.getView().style.transform = "translateX(" + calcCardTranslate(self.isLoop() ? processIndex(i, currentIndex, childrenSize) : i, currentIndex, innerWidth) + "px) scale(" + 1 + ")";
                        } else {
                            child.getView().style.transform = "translateX(" + calcCardTranslate(self.isLoop() ? processIndex(i, currentIndex, childrenSize) : i, currentIndex, innerWidth) + "px) scale(" + 0.83 + ")";
                        }
                        if (child === currentView) {
                            child.setZIndex(zIndex + 2);
                        } else if (child === lastView || child === nextView) {
                            child.setZIndex(zIndex + 1);
                        } else {
                            child.setZIndex(zIndex);
                        }
                        self.layoutChild(child, 0, 0, innerWidth * 0.5, innerHeight);
                    }
                } else {
                    currentView.getView().style.visibility = 'visible';
                    self.layoutChild(currentView, 0, 0, innerWidth, innerHeight);
                    for (var i = 0; i < childrenSize; i++) {
                        var child = children.get(i);
                        if (child !== currentView) {
                            child.getView().style.visibility = 'hidden';
                        }
                        child.setZIndex(undefined);
                        child.getView().style.transition = "";
                        child.getView().style.transform = "";
                    }
                }
            }
            if (childrenSize > 1) {
                var autoplay = self.getAutoplay(),
                    loop = self.isLoop();
                if (!self._pauseAutoplay && autoplay > 0 && (loop || currentIndex < childrenSize - 1)) {
                    if (self._autoplayTimer == null && self._animation == null) {
                        self.startAutoplay();
                    }
                } else {
                    if (self._autoplayTimer != null) {
                        // 停止下一个动画(当前动画正常执行完)
                        self.clearAutoplay();
                    }
                }
            } else {
                if (self._autoplayTimer != null) {
                    self.clearAutoplay();
                }
            }
            self._indicatorRects = [];
            var contentContext = self.getContentContext(), isVertical = self.isVertical();
            contentContext.clearRect(0, 0, width, height);
            if (self.isIndicatorVisible()) {
                var indicatorWidth = self.getIndicatorWidth(), indicatorHeight = self.getIndicatorHeight(), indicatorGap = self.getIndicatorGap();
                if (!isVertical) {
                    var indicatorsWidth = childrenSize * indicatorWidth + (childrenSize - 1) * indicatorGap;
                    var pos = self.figureIndicatorPosition(width, height, indicatorsWidth, indicatorHeight, isVertical);
                    self.drawIndicator(pos.x, pos.y, indicatorWidth, indicatorHeight, indicatorGap, childrenSize, currentIndex, isVertical);
                } else {
                    var indicatorsHeight = childrenSize * indicatorHeight + (childrenSize - 1) * indicatorGap;
                    var pos = self.figureIndicatorPosition(width, height, indicatorWidth, indicatorsHeight, isVertical);
                    self.drawIndicator(pos.x, pos.y, indicatorWidth, indicatorHeight, indicatorGap, childrenSize, currentIndex, isVertical);
                }
            }
            self._controllerRects = {};
            if (ht.Default.isTouchable || !self.isAutoHideController() || self._mouseenter) {
                if (self.isControllerVisible()) {
                    var controllerWidth = self.getControllerWidth(), controllerHeight = self.getControllerHeight(), currentController = self.getCurrentController(), currentControllerState = self.getCurrentControllerState();
                    var prevPos = self.figureControllerPosition(width, height, controllerWidth, controllerHeight, isVertical, 'prev');
                    self.drawController(prevPos.x, prevPos.y, controllerWidth, controllerHeight, isVertical, 'prev', currentController === 'prev' ? currentControllerState : 'normal');
                    var nextPos = self.figureControllerPosition(width, height, controllerWidth, controllerHeight, isVertical, 'next');
                    self.drawController(nextPos.x, nextPos.y, controllerWidth, controllerHeight, isVertical, 'next', currentController === 'next' ? currentControllerState : 'normal');
                }
            }
        }
    },

    getSerializableProperties: function () {
        var parentProperties = ui.Carousel.superClass.getSerializableProperties.call(this);

        return Default.addMethod(parentProperties, {
            autoplay: 1,
            interval: 1,
            'is:loop': 1,
            'is:vertical': 1,
            currentIndex: 1,
            indicatorWidth: 1,
            indicatorHeight: 1,
            indicator: 1,
            indicatorDrawable: 1,
            activeIndicator: 1,
            activeIndicatorDrawable: 1,
            indicatorVisible: 1,
            indicatorGap: 1,

            prev: 1,
            prevDrawable: 1,
            hoverPrev: 1,
            hoverPrevDrawable: 1,
            activePrev: 1,
            activePrevDrawable: 1,
            controllerVisible: 1,
            controller: 1,
            controllerDrawable: 1,
            hoverController: 1,
            hoverControllerDrawable: 1,
            activeController: 1,
            activeControllerDrawable: 1,
            'is:autoHideController': 1,
            controllerWidth: 1,
            controllerHeight: 1,

            "is:indicatorOutside": 1,
            "is:card": 1,
            "is:hoverTrigger": 1,
            "is:pauseOnHover": 1,
        });
    },
    getVersion: function () {
        return "5.0"
    }
});

function processIndex(index, activeIndex, length) {
    const lastItemIndex = length - 1
    const prevItemIndex = activeIndex - 1
    const nextItemIndex = activeIndex + 1
    const halfItemIndex = length / 2
    if (activeIndex === 0 && index === lastItemIndex) {
        return -1
    } else if (activeIndex === lastItemIndex && index === 0) {
        return length
    } else if (index < prevItemIndex && activeIndex - index >= halfItemIndex) {
        return length + 1
    } else if (index > nextItemIndex && index - activeIndex >= halfItemIndex) {
        return -2
    }
    return index
}

function calcCardTranslate(index, activeIndex, parentWidth) {
    if (Math.round(Math.abs(index - activeIndex)) <= 1) {
        return (parentWidth * ((2 - 0.83) * (index - activeIndex) + 1)) / 4
    } else if (index < activeIndex) {
        return (-(1 + 0.83) * parentWidth) / 4
    } else {
        return ((3 + 0.83) * parentWidth) / 4
    }
}