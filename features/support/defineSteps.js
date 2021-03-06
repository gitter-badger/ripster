import {browserWorld} from './browserWorld';

let worldCreator;
let currentWorld;

function createWorldCreator(createCallback) {
  if (worldCreator) {
    return;
  }

  worldCreator = browserWorld({
    before: createCallback('BeforeFeatures'),
    after: createCallback('AfterFeatures'),
    beforeEach: createCallback('BeforeScenario'),
    afterEach: createCallback('AfterScenario'),
  });

  createCallback('BeforeScenario')(() => {
    currentWorld = worldCreator();

    Object.keys(currentWorld)
      .forEach(key => {
        currentWorld[key] = currentWorld[key].bind(null, currentWorld);
      });
  });
}

export function defineSteps(define) {
  return function stepDefinitions() {
    const createCallback = name => handler => this.registerHandler(name, async (event, cb) => {
      try {
        await handler();
        cb();
      } catch (err) {
        cb(err);
      }
    });

    const step = (re, cb) => {
      this.Given(re, (a, b, c, d, e, f) => {
        return cb(currentWorld, a, b, c, d, e, f);
      });
    };

    createWorldCreator(createCallback);
    define(step);
  };
}
