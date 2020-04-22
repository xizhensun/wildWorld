import { Room, Client } from "colyseus";
import {World, Monster, Player, Bubble} from "../entities/model"

export class BattleRoom extends Room<World> {
    maxClients = 4;

    onCreate (options) {
        console.log("World created!", options);

        this.setState(new World());
        this.clock.setInterval(this.serverGameLoop,100);
    }

    onAuth(client, options, req) {
        console.log(req.headers.cookie);
        return true;
    }

    onJoin (client: Client) {
        this.send(client, { hello: "world!" });
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log("BattleRoom received message from", client.sessionId, ":", data);
        let player = this.state.getPlayer(client.sessionId);
        player.updateAction(data);
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

    serverGameLoop = () => {
        // for(let i in this.state.players)
        // {
        //     let player= this.state.players[i];
        //     player.action();
        // }
        console.log("currentTime:"+ this.clock.deltaTime);
    }
}