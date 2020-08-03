var Default = ht.Default,
    def = Default.def,
    ui = ht.ui,
    startDragging = Default.startDragging,
    NULL = null,
    isDragging = Default.isDragging;
Default.setImage('ui_carousel_indicator', {
  width: 16,
  height: 16,
  comps: [{
    type: 'circle',
    rect: [17, 1, 1],
    relative: true,
    background: '#EBEBEB'
  }]
});
Default.setImage('ui_carousel_activeIndicator', {
  width: 16,
  height: 16,
  comps: [{
    type: 'circle',
    rect: [17, 1, 1],
    relative: true,
    background: '#3399ff'
  }]
})
Default.setImage('ui_carousel_controller', {
  "width": 20,
  "height": 40,
  "comps": [{
      "type": "rect",
      "background": "rgba(0,0,0,0.20)",
      "rect": [
        0,
        0,
        20,
        40
      ]
    },
    {
      "type": "shape",
      "borderWidth": 1,
      "borderColor": "rgba(255, 255, 255, 0.4)",
      "rotation": 3.14159,
      "points": [
        5.98486,
        10.84151,
        14.01514,
        20.09022,
        6.14152,
        29.15849
      ]
    }
  ]
})
Default.setImage('ui_carousel_hoverController', {
  "width": 20,
  "height": 40,
  "comps": [{
      "type": "rect",
      "background": "rgba(0,0,0,0.40)",
      "rect": [
        0,
        0,
        20,
        40
      ]
    },
    {
      "type": "shape",
      "borderWidth": 1,
      "borderColor": "rgba(255, 255, 255, 0.4)",
      "rotation": 3.14159,
      "points": [
        5.98486,
        10.84151,
        14.01514,
        20.09022,
        6.14152,
        29.15849
      ]
    }
  ]
})
Default.setImage('ui_carousel_activeController', {
  "width": 20,
  "height": 40,
  "comps": [{
      "type": "rect",
      "background": "rgba(0,0,0,0.60)",
      "rect": [
        0,
        0,
        20,
        40
      ]
    },
    {
      "type": "shape",
      "borderWidth": 1,
      "borderColor": "rgba(255, 255, 255, 0.4)",
      "rotation": 3.14159,
      "points": [
        5.98486,
        10.84151,
        14.01514,
        20.09022,
        6.14152,
        29.15849
      ]
    }
  ]
})