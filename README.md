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
    centerRadius: 33,         // radius of the static center of the pietimer (any integer between 0 and 50)
    cssClass: 'pietimer'      // css class to apply to the injected SVG element
});
```
