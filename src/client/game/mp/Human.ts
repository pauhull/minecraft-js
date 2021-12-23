import PlayerPosition from "../../../common/PlayerPosition";
import Util from "../../../common/Util";
import Vec3 from "../../../common/Vec3";
import Shader from "../../gl/Shader";
import Texture from "../../gl/Texture";
import Humanoid from "../../models/Humanoid";
import Animator from "./Animator";

class Human {

    public readonly id: number;
    public position: PlayerPosition;
    public velocity: Vec3;
    private readonly model: Humanoid;
    private readonly animator: Animator;
    private targetPosition: PlayerPosition;

    public constructor(id: number, shader: Shader, texture: Texture, position: PlayerPosition) {
        this.id = id;
        this.position = PlayerPosition.clone(position);
        this.targetPosition = PlayerPosition.clone(position);
        this.model = new Humanoid(shader, texture, position);
        this.animator = new Animator(this, this.model);
        this.velocity = new Vec3();
    }

    public setPosition(position: PlayerPosition, velocity: Vec3): void {
        this.velocity = velocity;
        this.targetPosition = position;
    }

    public delete(): void {
        this.model.delete();
    }

    public render(): void {
        this.model.render();
    }

    public update(delta: number): void {

        const mix = delta * 25;
        this.position.x = Util.lerp(this.position.x, this.targetPosition.x, mix);
        this.position.y = Util.lerp(this.position.y, this.targetPosition.y, mix);
        this.position.z = Util.lerp(this.position.z, this.targetPosition.z, mix);
        this.position.yaw = Util.lerp(this.position.yaw, this.targetPosition.yaw, mix);
        this.position.pitch = Util.lerp(this.position.pitch, this.targetPosition.pitch, mix);
        this.animator.update(delta);
        this.model.position = this.position;
        this.model.update();
    }
}

export default Human;