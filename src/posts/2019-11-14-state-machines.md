---
title: Finite state machines
tags:
  - learning
---

Since watching the [learn state machines with David K. Piano](https://www.youtube.com/watch?v=czi24DqUfSA) on YouTube, I have been intrigued about state machinces and the issues they help alleviate.

> is a mathematical model of computation. It is an abstract machine that can be in exactly one of a finite number of states at any given time.

So it the most common example, a form can move from an idle state to a loading state and a loading state to either a successful or error state. You shouldn't get into an successful state without transitioning through the loading state. And more importantly, you shouldn't be able to hit the submit button when not in the idle state or error state.

## Concepts

Formally, finite state machines have five parts:

- A finite number of states
- A finite number of events
- An initial state
- A transition function that determines the next state given the current state and event
- A (possibly empty) set of final states

via [XState docs](https://xstate.js.org/docs/about/concepts.html#finite-state-machines)

## Resources

- [XState](https://xstate.js.org/docs/) - tool
- [XState Visualizer](https://xstate.js.org/viz/) - tool
- [Robot](https://thisrobot.life/) - tool
- [Learn State Machines](https://learnstatemachines.com/) - course
- [Introduction to XState](https://www.youtube.com/watch?v=73Ch_EL4YVc) - screencast
- [Let’s learn state machines with David K. Piano!](https://www.youtube.com/watch?v=czi24DqUfSA) - stream
- [State Machines: What Are They?](https://kyleshevlin.com/what-are-state-machines) - article
- [Reach UI Combobox stateChart](https://github.com/reach/reach-ui/blob/master/packages/combobox/src/index.js#L80) - tool
