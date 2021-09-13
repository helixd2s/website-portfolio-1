async function* asyncAnimationFrame () {
  const h = {}
  h.promise = new Promise(r => h.resolve = r)
  h.flipFrame = () => {
    h.resolve()
    h.promise = new Promise(r => h.resolve = r)
  }
  try {
    while (true) {
      h.idAF = requestAnimationFrame(h.flipFrame)
      yield await h.promise
    }
  } finally {
    h.resolve()
    cancelAnimationFrame(h.idAF)
  }
};

let observations = [];
let observation = null;

let runObservation = async() => {
  let hasListeners = false;
  let flamer = asyncAnimationFrame();

  do {
    observations.forEach((observed)=>{
      if (observed.listeners.length > 0) {
        hasListeners = true;
        let computedStyle = getComputedStyle(observed.element, observed.pseudo);
        observed.computed = computedStyle;
        observed.entries.forEach((entry)=>{
          entry.computed = computedStyle;
          entry.value = computedStyle.getPropertyValue(entry.entry); 
          if (entry.value != entry.oldValue) { observed.listeners.forEach((cb)=>{ cb(entry); }); };
          entry.oldValue = entry.value;
        });
      };
    });
    await flamer.next();
  } while (observations.length > 0 && hasListeners);

  return true;
};

class ComputedStyleObservation {
  constructor(element, pseudo, entries, computed) {
    this.element = element;
    this.entries = entries;
    this.pseudo = pseudo;
    this.listeners = [];
    this.computed = computed;
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
};

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
    observations.push(this.observed = new ComputedStyleObservation(element, pseudo, entries.map((entry)=>{
      let value = computedStyle.getPropertyValue(entry);
      return new ComputedStyleEntry(entry, value, value, computedStyle);
    }), computedStyle));
  }

  addListener(cb) {
    this.observed.addListener(cb);
    if (!observation) { observation = runObservation().then(()=>{ observation = null; }); };
  }

  removeListener(cb) {
    this.observed.removeListener(cb);
  }
};

export default { ComputedStyleObserver };
