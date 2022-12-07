// 发布订阅模式
class Event_Emitter {
  constructor () {
    this.handlers = new Map();
  }

  on (eventName, cb) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }

    this.handlers.get(eventName).push(cb);
  }

  emit (eventName, ...args) {
    if (this.handlers.has(eventName)) {
      const handlers = this.handlers.get(eventName).slice();
      for (let cb of handlers) {
        cb(...args);
      }
    }
  }

  off (eventName, cb) {
    const index = this.handlers.get(eventName).indexOf(cb);

    if (index !== -1) {
      this.handlers.get(eventName).splice(index, 1);
    }
  }

  once (eventName, cb) {
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, cb);
    }

    this.on(eventName, wrapper);
  }
}

const bus = new Event_Emitter();

function foo(arg) {
  console.log(arg);
}

bus.on('test', foo);

bus.emit('test', 123);

