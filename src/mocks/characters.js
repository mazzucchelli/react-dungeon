import MarioAvatar from "../assets/characters/Background/con1.png";
import MarioneAvatar from "../assets/characters/Background/con2.png";

export const allCharacters = [
  {
    name: "mario",
    avatar: MarioAvatar,
    stats: {
      HP: 30,
      maxHP: 30,
      att: 3,
      shield: 5,
    },
    coins: 10,
    position: null,
    inventory: [],
    can_see: "front_round",
    can_move: "front_perimeter",
  },
  {
    name: "marione",
    avatar: MarioneAvatar,
    stats: {
      HP: 20,
      maxHP: 20,
      att: 5,
      shield: 0,
    },
    coins: 10,
    position: null,
    inventory: [],
    can_see: "front_round",
    can_move: "front_perimeter",
  },
];
