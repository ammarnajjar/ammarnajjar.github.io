---
slug: rxjs-observables
title: RxJS Series - Observables
authors: ammarnajjar
tags: [reactive]
---
import Gist from 'react-gist';

# RxJs Series

RxJS ([on Github](https://github.com/ReactiveX/rxjs)) is a reactive programming library for Javascript, and in this series, I would like to expose my way of learning it with you.

<!-- truncate -->

From [Wikipedia](https://en.wikipedia.org/wiki/Reactive_programming):

> In computing, reactive programming is a declarative programming paradigm concerned with data streams and the propagation of change. With this paradigm it is possible to express static (e.g., arrays) or dynamic (e.g., event emitters) data streams with ease, and also communicate that an inferred dependency within the associated execution model exists, which facilitates the automatic propagation of the changed data flow.

From [Angular Docs](https://angular.io/guide/rx-library):
> Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change. RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code.

I will take first the basic building blocks then the most commonly used operators.

## Building Blocks

### Observable & Observer & Subscriber

The concept of observers and observables are connected to each other, for there is no functioning observable without an observer.

Let's check the docs first:

Observer is (from [Docs](http://reactivex.io/rxjs/class/es6/MiscJSDoc.js~ObserverDoc.html)):

> An interface for a consumer of push-based notifications delivered by an Observable.

Subscriber is (from [Docs](http://reactivex.io/rxjs/class/es6/Subscriber.js~Subscriber.html<Paste>)):

> Implements the Observer interface and extends the Subscription class. While the Observer is the public API for consuming the values of an Observable, all Observers get converted to a Subscriber, in order to provide Subscription-like capabilities such as unsubscribe.

Observable is (from [Docs](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)):

> A representation of any set of values over any amount of time. This is the most basic building block of RxJS.

So the subscriber is an observer, and all observers gets converted to subscribers to support the subscribe/unsubscribe functionality.

[Go to Top](#)

#### From Scratch

The source code of an Observer look like this:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="observer.ts" />

It implements three methods:
- `next`: a callback to receive notifications of type `next`
- `error`: a callback to receive notifications of type `error`
- `complete`: a callback to receive notifications of type `complete`

The observable can just push notifications to the observer on every occasion it desires, i.e one could implement a function that does that:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="customObservable1.ts" />

So if we call our `customObservable` with an observer as a parameter:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="call_customObservable1.ts" />

The output will look like:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="out1.sh " />

This is a basic form of observable, but if it was that simple, why to need a whole framework around it? The answer is simple, try to call `next` after `complete`:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="customObservable2.ts" />

The output will look like:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="out2.sh" />

This does not really work the way wanted.

([Try on StackBlitz](https://stackblitz.com/edit/rxjs-01))

Let's take a more complex example, where the observable wraps a stream of numbers over interval:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="customObservable3.ts" />

The output will appear one value every second, like:

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="out3.sh" />

([Try on StackBlitz](https://stackblitz.com/edit/rxjs-02))

So an observable is basically a wrapper over stream or set of values, it presents it in the way required. A stream is a sequence of ongoing events ordered in time.

The relation between an observer and an observable is shown in the following animation:

![Animation](./observer-animation.gif)

The observable can emit either a value, an error or a complete notification signal, which indicate that the stream is over.
The observer captures these emitted events by defining functions to react on each event. The way an observer listens with it to an observable is called "**Subscription**"

So by defining an observer, the stream is defined, and by subscribing to it, actions for the emitted events are defined. So logically, for every observable, a subscription is needed to create actions, and that will be clear in the examples following.

As long as you have more than one set or stream of values, you can imagine how many operations one might need to apply on them.
RxJS provide many ways to create an observable with all the safety and asynchronous features that one would desire.

#### Create Observable using RxJS Static Methods

##### - [`of`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-of):

By wrapping a sequence of values with `of` returns an observable with those values where it emits the values in the sequence as given, then completes.

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="rxjs-of.ts" />

[Go to Top](#)
([Try on StackBlitz](https://stackblitz.com/edit/rxjs-03))

##### - [`range`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-range):

This reminds me with python's `range` function, it emits a sequence of numbers determined with the range parameters `(start, count)`.

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="rxjs-range.ts" />

[Go to Top](#)
([Try on StackBlitz](https://stackblitz.com/edit/rxjs-05))

##### - [`interval`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-interval):

This takes a parameter as time in milliseconds and generates a sequence of numbers every time interval. That way one gets infinite time series of numbers.

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="rxjs-interval.ts" />

[Go to Top](#)
([Try on StackBlitz](https://stackblitz.com/edit/rxjs-06))

##### - [`timer`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-timer):

This takes two parameters `(initialDelay, period)`. The initial delay could be a numbers representing time in milliseconds, or a [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object. The observable waits for the initial delay value, then it starts emitting numbers starting with `0` every period of time.

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="rxjs-timer.ts" />

[Go to Top](#)
([Try on StackBlitz](https://stackblitz.com/edit/rxjs-07))

##### - [`from`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-from):

This is a magical method, which converts so many data types into observables: Array, Array-like, Promise, iterable object, string (as an array of chars).

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="rxjs-from.ts" />


[Go to Top](#)
([Try on StackBlitz](https://stackblitz.com/edit/rxjs-04)) >> *`take` operator is used here to show the first 5 values of the infinite stream, it will be discussed later in detail*

##### - [`fromEvent`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-fromEvent):

This method is useful wile working with the DOM, for it creates observable from [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) events or Node.js [EventEmitter](https://nodejs.org/api/events.html) events.
It takes two parameters `(element: EventTarget, eventName: string)`

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="rxjs-fromEvent.ts" />

[Go to Top](#)
([Try on StackBlitz](https://stackblitz.com/edit/rxjs-08))

##### - [`create`](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#static-method-create):

This creates a custom observable which will execute the specified function when an observer subscribes to it, it also can return a function which will be executed when the observer unsubscribes. This is the most flexible way of creating an observable.

In the following example a counter is set to count once every second, and this counter is an observable which return the function which will be executed when the observer unsubscribes.

<Gist id="74e1a9696b2b685052573c1aabcf31a9" file="rxjs-create.ts" />

[Go to Top](#)
([Try on StackBlitz](https://stackblitz.com/edit/rxjs-10))

## Conclusion

By now, the most common ways of creating an observable in RxJS should be clear, and I can move to the next step in the building blocks of RxJS, which are the most used operators on observables.

Until next blog post!

 ------

More References to Observables:
- [ReactiveX Docs](http://reactivex.io/documentation/observable.html)
- [ReactiveX API](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html)

[Go to Top](#Top)