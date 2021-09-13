let requestAnimationFrameAsync = ()=>{
  return new Promise((resolve, reject)=>{
    requestAnimationFrame((...args)=>{
      resolve(...args);
    });
  });
};

let observations = [];
let observation = null;

let runObservation = async() => {
  let hasListeners = false;

  do {
    observations.forEach((observed)=>{
      if (observed.listeners.length > 0) {
        hasListeners = true;
        let computedStyle = getComputedStyle(observed.element, observed.pseudo);
        observed.entries.forEach((entry)=>{
          entry.computed = computedStyle;
          entry.value = computedStyle.getPropertyValue(entry.entry); 
          if (entry.value != entry.oldValue) { observed.listeners.forEach((cb)=>{ cb(entry); }); };
          entry.oldValue = entry.value;
        });
      };
    });
    await requestAnimationFrameAsync();
  } while (observations.length > 0 && hasListeners);

  return true;
};

class ComputedStyleObserve {
  constructor(element, pseudo, entries) {
    this.element = element;
    this.entries = entries;
    this.pseudo = pseudo;
    this.listeners = [];
  }

  addListener(cb) {
    this.listeners.push(cb);
  }

  removeListener(cb) {
    const index = this.listeners.indexOf(cb);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}

class ComputedStyleEntry {
  constructor(entry, value, oldValue, computed) {
    this.entry = entry;
    this.value = value;
    this.oldValue = oldValue;
    this.computed = computed;
  }
}

//hasListeners
class ComputedStyleObserver {
  constructor(element, pseudo, entries = []) {
    let computedStyle = getComputedStyle(element, pseudo);
    observations.push(this.observed = new ComputedStyleObserve(element, pseudo, entries.map((entry)=>{
      let value = computedStyle.getPropertyValue(entry);
      return new ComputedStyleEntry(entry, value, value, computedStyle);
    })));
  }

  addListener(cb) {
    this.observed.addListener(cb);
    if (!observation) { observation = runObservation().then(()=>{ observation = null; }); };
  }

  removeListener(cb) {
    this.observed.removeListener(cb);
  }
}

export default { ComputedStyleObserver };
