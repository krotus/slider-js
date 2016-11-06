# Slider-js
Very simple carousel slider plugin javascript.

# Requirements
* jQuery

# How to use
On document ready add:
```
var slaider = new Slider({
  "images": [
    "src/res/imgs/slider1.jpg",
    "src/res/imgs/slider2.jpg",
    "src/res/imgs/slider3.jpg"
  ],
  "pagination": true,
  "delay": 3000,
});
```

The properties of the object:
* images: is an array of the images
* pagination: true or false to show the indicator pagination
* delay: the delay between hide the current image and show the next one (in milliseconds)

And add the tag where you want to place the slider:
```
<div id="slider"></div>
```
