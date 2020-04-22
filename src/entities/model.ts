import { type, Schema, MapSchema, ArraySchema } from '@colyseus/schema';

export class Player extends Schema {
    @type("number") health: number;
    @type("number") maxHealth: number;
    @type("number") mana: number;
    @type("number") posX: number;
    @type("number") posY: number;
    @type("number") maxMana: number;
    @type("number") speed: number;
    @type("number") direction: number;
    @type("string") icon: string;
    @type("number") strength: number;
    @type("boolean") invulnerable: boolean;
    
    updateAction(options){
      this.invulnerable=true;
    }
    action(){
      
    }
  }

  export class Bubble extends Schema {
    @type("number") damage: number;
    @type("number") radius: number;
    @type("number") posX: number;
    @type("number") posY: number;
    @type("string") type: string;
    @type("number") delay: number;
    @type("number") speed: number;
    @type("number") direction: number;
  }

  export class Map extends Schema {
    @type("number") damage: number;
    @type("number") radius: number;
    @type("string") type: string;
    @type("number") delay: number;
    @type("number") speed: number;
    @type("number") direction: number;
  }

  export class Monster extends Schema {
    @type("number") health: number;
    @type("number") maxHealth: number;
    @type("number") mana: number;
    @type("number") maxMana: number;
    @type("number") posX: number;
    @type("number") posY: number;
    @type("number") speed: number;
    @type("number") direction: number;
    @type("string") icon: string;
    @type("number") strength: number;
    @type("boolean") invulnerable: boolean;
  }
  
  export class World extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();
    @type({map: Monster})
    monsters = new MapSchema<Monster>();
    @type({map:Bubble})
    bubbles = new MapSchema<Bubble>();
    @type("number") width: number;
    @type("number") height: number;

    createPlayer (id: string) {
      this.players[ id ] = new Player();
    }

    removePlayer (id: string) {
      delete this.players[ id ];
    }
    getPlayer(id: string){
      return this. players[id];
    }

}