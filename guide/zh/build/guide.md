
索引

* [概述](#ref_description)

---

!(#ref_description)

### 概述

`ht.ui.Carouse` 是轮播图容器，在固定空间内，循环播放图片、`Drawable`、组件。

使用此组件需要先引入 `js` 文件

    <script src="ht.js"></script>
    <script src="ht-ui.js"></script>
    <script src="ht-ui-carousel.js"></script>

示范例子：

!(#example_demo@250)

添加轮播内容的代码如下：

    carousel = new ht.ui.Carousel();
    // 添加图片
    carousel.add('1.png');            
    // 添加图片并指定位置
    carousel.add('2.png', 0);
    // 添加组件
    carousel.add(new ht.ui.Button({text: '按钮', hoverBackground:'rgba(255, 0, 0, 0.5)', activeBackground: 'rgba(0, 255, 0, 0.5)'}));
    carousel.add('3.png');
    // 添加 drawable
    carousel.add(new ht.ui.drawable.ColorDrawable('yellow'));

本质上来说，`Carousel` 是一个容器，轮播的内容只能是 `UI` 组件；通过 `add` 函数添加的图片会被自动转成 `ImageDrawable`，然后内部创建一个组件并使用此 `Drawable` 作为背景，最后把组件添加到 `Carousel` 容器中

`UI beginner guide` 中介绍了很多 `Drawable` 的转换规则，理论上来说，任何可以转换成 `Drawable` 的值都可以直接传入 `add` 函数中

`Carousel` 提供了很多可以重绘的函数，下面的例子演示了自定义绘制指示符：

!(#example_indicator@250)

    carousel.drawIndicator = function (x, y, width, height, gap, size, currentIndex, isVertical) {
        var self = this,
            g = self.getRootContext(self.getContentCanvas()),
            contentWidth = self.getContentWidth(),
            contentHeight = self.getContentHeight();
        g.beginPath();
        g.rect(contentWidth - 60, contentHeight - 36, 50, 26);
        g.fillStyle = 'rgba(0,0,0,0.2)';
        g.fill();

        g.beginPath();
        ht.Default.drawText(g, currentIndex + 1 + ' / ' + size, '14px arial', '#fff', contentWidth - 60, contentHeight - 36, 50, 26, 'center', 'middle');
    }