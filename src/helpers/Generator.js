import shortid from "shortid";

import { allItems } from "../mocks/items";
import { allEggs } from "../mocks/eggs";
import { allMonsters } from "../mocks/monsters";
import { allPotions } from "../mocks/potions";
import { shuffle } from "./utilities";

const modes = {
  items: allItems,
  eggs: allEggs,
  fight: allMonsters,
  potions: allPotions,
};

class Generator {
  constructor(mode) {
    this.currentMode = mode;
    this.list = modes[mode] || null; // all items based on what's requested
    this.stack = []; // stack of items
    this.cached = []; // items generated
    this.slugs = []; // list of slugs for generated items, used to filter out item from stack when max qty is reached
    this.maxQuantities = {}; // map of quantities by slug
    this.picked = []; // list of items picked (only slugs)

    if (mode) this.init();
  }

  /**
   * append tile data based on current mode
   */
  handleData(el) {
    // console.log("enter", this.currentMode, el);
    switch (this.currentMode) {
      case "items":
        this.cached.push({
          id: shortid.generate(),
          ...el,
        });
        break;
      case "shop":
        this.cached.push({
          id: shortid.generate(),
          ...el,
          items: [generators.ItemAPI.getItem()]
        });
        break;
      case "eggs":
        this.cached.push({
          id: shortid.generate(),
          ...el,
        });
        break;
      case "potions":
        // const params = {};
        // for (const [key, value] of Object.entries(el.params)) {
        //   const splittedValues = value.split("|");
        //   const min = splittedValues[0].trim() * 1;
        //   const max = splittedValues[1].trim() * 1;
        //   params[key] = Math.floor(Math.random() * max) + min;
        // }

        // this.cached.push({
        //   id: shortid.generate(),
        //   ...el,
        //   ...params
        // });
        this.cached.push({
          id: shortid.generate(),
          ...el,
        });
        break;
      case "fight":
        const stats = {};
        for (const [key, value] of Object.entries(el.stats)) {
          if (typeof value === "string" && value.includes("|")) {
            const splittedValues = value.split("|");
            const min = splittedValues[0].trim() * 1;
            const max = splittedValues[1].trim() * 1;
            stats[key] = Math.floor(Math.random() * max) + min;
          } else {
            stats[key] = value;
          }
        }

        const rewards = {};
        for (const [key, value] of Object.entries(el.rewards)) {
          rewards[key] = value;
        }

        this.cached.push({
          id: shortid.generate(),
          ...el,
          stats,
          rewards,
        });

        // console.log('cached', this.cached)
        break;
      default:
        break;
    }
  }

  /**
   * create a new stack based on current mode
   */
  generateStack() {
    // console.log(this.currentMode, "generating new stack");
    this.list.forEach((el) => {
      for (let i = 0; i < el.probability * el.quantity; i++) {
        if (!this.slugs.includes(el.slug)) {
          this.slugs.push(el.slug);
          this.maxQuantities[el.slug] = el.quantity;
        }
        this.handleData(el);
      }
    });
    this.stack = shuffle(this.cached);
    // console.log(this.currentMode, "stack", this.stack);
  }

  /**
   * shuffle stack data
   */
  shuffleStack() {
    if (!this.stack.length) {
      this.resetStack();
    }
    this.stack = shuffle(this.stack);
  }

  /**
   * reset
   */
  resetStack() {
    this.counter = 0;
    this.stack = [];
    this.cached = [];
    this.slugs = [];
    this.picked = [];
    this.generateStack();
  }

  /**
   * @return {Object} random item from stack
   */
  getItem() {
    this.shuffleStack();
    // console.log(this.currentMode, this.stack.length);
    const res = this.stack[0];

    // console.log("availables", this.stack);

    const { slug } = res;
    this.picked.push(slug);

    // console.log("pickeds", this.picked);

    const pickedLenght = this.picked.filter((el) => el === slug).length;
    if (pickedLenght === this.maxQuantities[slug]) {
      this.stack = this.stack.filter((el) => el.slug !== slug);
      // console.log("removing all", slug, this.stack);
    } else {
      this.stack.splice(0, 1);
      // console.log("removing single", slug, this.stack);
    }

    return res;
  }

  /**
   * @return {Object} empty tile mock data
   */
  getEmpty() {
    return {
      name: "empty",
      type: "empty",
      background: "#414141",
      discovered: false,
      available: false,
      completed: false,
    };
  }

  /**
   * generate stack of requested tiles if mode provided
   * .. else, create the class to invoke common methods like getEmty() or getVoid()
   */
  init() {
    this.generateStack();
    // console.log("potions", JSON.stringify(this.cached));
  }
}

const generators = {
  GeneratorAPI: new Generator(),
  ItemAPI: new Generator("items"),
  EggAPI: new Generator("eggs"),
  FightAPI: new Generator("fight"),
  PotionAPI: new Generator("potions"),
};

export default generators;
