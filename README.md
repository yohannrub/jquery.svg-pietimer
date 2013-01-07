# jQuery SVG-PieTimer

jQuery SVG-PieTimer is a lightweight jQuery plugin that injects a SVG-based pie timer into a specified element.  
This plugin has accessible functions to draw, play, pause, stop and reset the timer.  
Its timer uses an actual timekeeping by polling current time (as use of setInterval only is not fully reliable for actual timekeeping).


## Usage

The SVG-based pietimer element will be injected into the specified element.

```javascript
// Will inject pietimer into #element
$('#element').pietimer();

// Will play the pietimer
$('#element').pietimer('play');

// Will pause the pietimer
$('#element').pietimer('pause');

// Will stop the pietimer
$('#element').pietimer('stop');

// Will reset the pietimer
$('#element').pietimer('reset');

// Will draw the pietimer with a ratio of 0.3 (can be any float between 0 and 1)
$('#element').pietimer('draw', 0.3);
```


## Options

Some options can be passed at initialization (the following values are defaults):

```javascript
// Will inject pietimer into #element with passed options
$('#element').pietimer({
    duration: 5000,           // duration of one revolution (in ms)
    refreshInterval: 50,      // frequency of timer refreshes (in ms)
    loop: false,              // whether to loop indefinitely (true) or not (false)
    callback: function() {},  // function to be called after each loop
    centerRadius: 33,         // radius of the static inner disc of the pietimer (any integer between 0 and 50)
    cssClass: 'pietimer'      // css class to apply to the injected SVG element
});
```


## Styling

The SVG-based pietimer element can be styled using the css class passed at initialization (defaults to 'pietimer').

It contains itself two SVG elements:

* a *path* element that draws the animated outer circle
* a *circle* element that draws the static inner disc

```css
svg.pietimer {
  width: 50px;
  height: 50px;
}
svg.pietimer path {
  fill: #cccccc;
}
svg.pietimer circle {
  fill: #cccccc;
  stroke: #ffffff;
  stroke-width: 10;
}
```
