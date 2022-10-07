// Слайдер

'use strict';
  var kagepisuceng = (function (config) {

  const ClassName = {
  INDICATOR_ACTIVE: 'kagepisuceng__indicator_active',
  ITEM: 'kagepisuceng__item',
  ITEM_LEFT: 'kagepisuceng__item_left',
  ITEM_RIGHT: 'kagepisuceng__item_right',
  ITEM_PREV: 'kagepisuceng__item_prev',
  ITEM_NEXT: 'kagepisuceng__item_next',
  ITEM_ACTIVE: 'kagepisuceng__item_active'
  }

  var
  _isSliding = false,
  _interval = 0,
  _transitionDuration = 700,
  _kagepisuceng = {},
  _items = {},
  _kagepisucengIndicators = {},
  _config = {
  selector: '',
  isCycling: true,
  direction: 'next',
  interval: 5000,
  pause: true
  };

  var

  _getItemIndex = function (_currentItem) {
  var result;
  _items.forEach(function (item, index) {
  if (item === _currentItem) {
  result = index;
  }
  });
  return result;
  },

  _setActiveIndicator = function (_activeIndex, _targetIndex) {
  if (_kagepisucengIndicators.length !== _items.length) {
  return;
  }
  _kagepisucengIndicators[_activeIndex].classList.remove(ClassName.INDICATOR_ACTIVE);
  _kagepisucengIndicators[_targetIndex].classList.add(ClassName.INDICATOR_ACTIVE);
  },


  _slide = function (direction, activeItemIndex, targetItemIndex) {
  var
  directionalClassName = ClassName.ITEM_RIGHT,
  orderClassName = ClassName.ITEM_PREV,
  activeItem = _items[activeItemIndex],
  targetItem = _items[targetItemIndex];

  var _slideEndTransition = function () {
  activeItem.classList.remove(ClassName.ITEM_ACTIVE);
  activeItem.classList.remove(directionalClassName);
  targetItem.classList.remove(orderClassName);
  targetItem.classList.remove(directionalClassName);
  targetItem.classList.add(ClassName.ITEM_ACTIVE);
  window.setTimeout(function () {
  if (_config.isCycling) {
  clearInterval(_interval);
  _cycle();
  }
  _isSliding = false;
  activeItem.removeEventListener('transitionend', _slideEndTransition);
  }, _transitionDuration);
  };

  if (_isSliding) {
  return;
  }
  _isSliding = true;

  if (direction === "next") {
  directionalClassName = ClassName.ITEM_LEFT;
  orderClassName = ClassName.ITEM_NEXT;
  }

  targetItem.classList.add(orderClassName);
  _setActiveIndicator(activeItemIndex, targetItemIndex);
  window.setTimeout(function () {
  targetItem.classList.add(directionalClassName);
  activeItem.classList.add(directionalClassName);
  activeItem.addEventListener('transitionend', _slideEndTransition);
  }, 0);

  },

  _slideTo = function (direction) {
  var
  activeItem = _kagepisuceng.querySelector('.' + ClassName.ITEM_ACTIVE),
  activeItemIndex = _getItemIndex(activeItem),
  lastItemIndex = _items.length - 1,
  targetItemIndex = activeItemIndex === 0 ? lastItemIndex : activeItemIndex - 1;
  if (direction === "next") {
  targetItemIndex = activeItemIndex == lastItemIndex ? 0 : activeItemIndex + 1;
  }
  _slide(direction, activeItemIndex, targetItemIndex);
  },

  _cycle = function () {
  if (_config.isCycling) {
  _interval = window.setInterval(function () {
  _slideTo(_config.direction);
  }, _config.interval);
  }
  },

  _actionClick = function (e) {
  var
  activeItem = _kagepisuceng.querySelector('.' + ClassName.ITEM_ACTIVE),
  activeItemIndex = _getItemIndex(activeItem),
  targetItemIndex = e.target.getAttribute('data-slide-to');

  if (!(e.target.hasAttribute('data-slide-to') || e.target.classList.contains('kagepisuceng__control'))) {
  return;
  }
  if (e.target.hasAttribute('data-slide-to')) {
  if (activeItemIndex === targetItemIndex) {
  return;
  }
  _slide((targetItemIndex > activeItemIndex) ? 'next' : 'prev', activeItemIndex, targetItemIndex);
  } else {
  e.preventDefault();
  _slideTo(e.target.classList.contains('kagepisuceng__control_next') ? 'next' : 'prev');
  }
  },

  _setupListeners = function () {

  _kagepisuceng.addEventListener('click', _actionClick);

  if (_config.pause && _config.isCycling) {
  _kagepisuceng.addEventListener('mouseenter', function (e) {
  clearInterval(_interval);
  });
  _kagepisuceng.addEventListener('mouseleave', function (e) {
  clearInterval(_interval);
  _cycle();
  });
  }
  };

  for (var key in config) {
  if (key in _config) {
  _config[key] = config[key];
  }
  }
  _kagepisuceng = (typeof _config.selector === 'string' ? document.querySelector(_config.selector) : _config.selector);
  _items = _kagepisuceng.querySelectorAll('.' + ClassName.ITEM);
  _kagepisucengIndicators = _kagepisuceng.querySelectorAll('[data-slide-to]');

  _cycle();
  _setupListeners();

  return {
  next: function () {
  _slideTo('next');
  },
  prev: function () {
  _slideTo('prev');
  },
  stop: function () {
  clearInterval(_interval);
  },
  cycle: function () {
  clearInterval(_interval);
  _cycle();
  }
  }
  }({
  selector: '.kagepisuceng',
  isCycling: false,
  direction: 'next',
  interval: 5000,
  pause: true
  }));

  // Таймер

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    if (t.total <= 0) {
      clearInterval(timeinterval);
      var deadline = new Date(Date.parse(new Date()) + 1800 * 1000);
      initializeClock('countdown', deadline);
    }

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 1800 * 1000);
initializeClock("countdown", deadline);

  // Плавный скролл

  $("a.scroll-to").on("click", function(e){
    e.preventDefault();
    var anchor = $(this).attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top - 60
    }, 800);
});

// Ввод цифр в номер телефона

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
