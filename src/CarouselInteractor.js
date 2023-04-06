/**
 * 交互器
 */
ui.CarouselInteractor = function (comp) {
    ui.CarouselInteractor.superClass.constructor.call(this, comp);
}

def(ui.CarouselInteractor, ui.Interactor, {
    handle_mousedown: function (e) {
        this.handle_touchstart(e);
    },
    handle_touchstart: function (e) {
        var self = this,
            comp = self.getComponent();

        Default.preventDefault(e);
        if (Default.isLeftButton(e)) {
            var indicatorIndex = comp.indicatorHitTest(e);
            if (indicatorIndex >= 0) {
                if (indicatorIndex >= 0 && comp.getCurrentIndex() !== indicatorIndex) {
                    var hasAnimation = false;
                    if (comp._animation) {
                        comp._animation.stop();
                        hasAnimation = true;
                    }
                    comp.clearAutoplay();
                    comp.validate();
                    comp.startAutoplay(null, indicatorIndex, !hasAnimation);
                }
                comp.fireViewEvent({
                    kind: 'clickIndicator',
                    index: indicatorIndex,
                    nativeEvent: external
                });
            } else {
                var controller = comp.controllerHitTest(e);
                comp.setCurrentController(controller);
                if (controller) {
                    comp.setCurrentControllerState('active');
                    startDragging(self, e);
                    self._touchstart = true;
                }
            }
        }
    },
    handle_touchmove: function (e) { },
    handle_mousemove: function (e) {
        var self = this,
            comp = self.getComponent();
        var controller = comp.controllerHitTest(e);
        comp.setCurrentController(controller);
        if (controller || comp.indicatorHitTest(e)) {
            comp.getContentCanvas().style.pointerEvents = 'auto';
        }
        else {
            comp.getContentCanvas().style.pointerEvents = 'none';
        }
        if (controller) {
            if (self._touchstart) {
                comp.setCurrentControllerState('active');
            } else if (!isDragging()) {
                comp.setCurrentControllerState('hover');
            }
        } else {
            comp.setCurrentControllerState(null);
        }
        var indicator = comp.indicatorHitTest(e);
        var controller = comp.controllerHitTest(e);
        if (indicator == undefined && controller == undefined) {
            comp.setCursor(undefined);
        } else {
            comp.setCursor("pointer");
            if (indicator >= 0 && comp.getCurrentIndex() !== indicator && comp.isHoverTrigger() && !comp._animation) {
                comp.startAutoplay(null, indicator, true);
            }
        }
    },

    handle_mouseup: function (e) {
        this.handle_touchend(e);
    },
    handle_touchend: function (e) {
        var self = this, carousel = self.getComponent();
        if (self._touchstart) {
            if (ht.Default.isTouchable) {
                carousel.setCurrentControllerState(null);
            } else {
                carousel.setCurrentControllerState('hover');
            }
            var currentController = carousel.getCurrentController();
            var childrenSize = carousel.getVisibleChildren().size();
            if (currentController === 'prev') {
                if (carousel.isLoop() || carousel.getCurrentIndex() !== 0) {
                    var hasAnimation = false;
                    if (carousel._animation) {
                        carousel._animation.stop();
                        hasAnimation = true;
                    }
                    var currentIndex = carousel.getCurrentIndex();
                    currentIndex--;
                    if (currentIndex < 0) {
                        currentIndex = childrenSize - 1;
                    }
                    if (carousel._animation) {
                        carousel._animation.stop();
                    }
                    carousel.clearAutoplay();
                    carousel.validate();
                    if (hasAnimation) {
                        carousel.startAutoplay(carousel.getInterval(), currentIndex);
                    }
                    else {
                        carousel.startAutoplay(null, currentIndex, true);
                    }
                }
            } else if (currentController === 'next') {
                if (carousel.isLoop() || carousel.getCurrentIndex() !== childrenSize - 1) {
                    var hasAnimation = false;
                    if (carousel._animation) {
                        carousel._animation.stop();
                        hasAnimation = true;
                    }
                    var currentIndex = carousel.getCurrentIndex();
                    currentIndex++;
                    if (currentIndex > childrenSize - 1) {
                        currentIndex = 0;
                    }
                    carousel.clearAutoplay();
                    carousel.validate();
                    if (hasAnimation) {
                        carousel.startAutoplay(carousel.getInterval(), currentIndex);
                    }
                    else {
                        carousel.startAutoplay(null, currentIndex, true);
                    }
                }
            }
        }
    },

    handleWindowMouseMove: function (e) {
        this.handleWindowTouchMove(e);
    },
    handleWindowTouchMove: function (e) {

    },
    handleWindowMouseUp: function (e) {
        this.handleWindowTouchEnd(e);
    },
    handleWindowTouchEnd: function (e) {
        var self = this;
        self._touchstart = NULL;
    },
    handle_mouseleave: function (e) {
        var self = this,
            carousel = self.getComponent();

        if (carousel.isDisabled()) return;

        carousel.setCurrentController(NULL);
        carousel.setCurrentControllerState(NULL);


        carousel.resumeAutoplay(true);

        carousel._mouseenter = false;
    },
    handle_mouseenter: function (e) {
        var self = this,
            carousel = self.getComponent();
        carousel._mouseenter = true;
        if (!carousel._pauseAutoplay && carousel.isPauseOnHover()) carousel.pauseAutoplay(true);
    }
});