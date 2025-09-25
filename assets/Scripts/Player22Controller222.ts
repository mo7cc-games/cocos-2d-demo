import {
  _decorator,
  Component,
  Node,
  input,
  Input,
  Vec3,
  EventMouse,
  Animation,
} from 'cc';
const { ccclass, property } = _decorator;

export const BLOCK_SIZE = 40; // 添加一个放大比

@ccclass('PlayerController')
export class Player22Controller222 extends Component {
  @property(Animation)
  BodyAnim: Animation = null;

  private _startJump: boolean = false; // 是否开始跳跃,是否在跳跃状态
  private _jumpStep: number = 0; // 跳跃步数,用于记录鼠标的输入
  private _curJumpTime: number = 0; // 当前跳跃时间,个数值类型的变量用于记录整个跳跃的时长
  private _jumpTime: number = 0.1; // 跳跃时间,整个跳跃的时长,累计的
  private _curJumpSpeed: number = 0; // 当前跳跃速度，用于记录跳跃时的移动速度
  private _curPos: Vec3 = new Vec3(); // 当前坐标，记录和计算角色的当前位置
  private _deltaPos: Vec3 = new Vec3(0, 0, 0); // 位移 结果
  private _targetPos: Vec3 = new Vec3(); // 目标位置，最终落脚点

  start() {
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }
  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0) {
      // 鼠标左键
      this.jumpByStep(1);
    } else if (event.getButton() === 2) {
      // 鼠标右键
      this.jumpByStep(2);
    }
  }

  jumpByStep(step: number) {
    if (this._startJump) {
      return;
    } // 如果正在跳跃中，忽略新的跳跃请求

    this._startJump = true; // 标记开始跳跃
    this._jumpStep = step; // 跳跃的步数 1 或者 2
    this._curJumpTime = 0; // 重置开始跳跃的时间

    const clipName = step == 1 ? 'oneStep' : 'twoStep'; // 根据步数选择动画
    const state = this.BodyAnim.getState(clipName); // 获取动画状态
    this._jumpTime = state.duration; // 用动画的时长作为跳跃的时长

    const jumpStep = this._jumpStep * BLOCK_SIZE; // 跳跃的步数

    this._curJumpSpeed = jumpStep / this._jumpTime; // 根据时间计算出速度
    this.node.getPosition(this._curPos); // 获取角色当前的位置  就结果赋值给 this._curPos 变量，通过参数传递可以避免频繁创建变量
    Vec3.add(this._targetPos, this._curPos, new Vec3(jumpStep, 0, 0)); // 计算出目标位置，当前位置 + 跳跃步数  this._targetPos 为结果赋值

    if (this.BodyAnim) {
      if (step === 1) {
        this.BodyAnim.play('oneStep');
      } else if (step === 2) {
        this.BodyAnim.play('twoStep');
      }
    }
  }

  update(deltaTime: number) {
    if (this._startJump) {
      // 如果在跳跃状态
      this._curJumpTime += deltaTime; // 累计总的跳跃时间
      if (this._curJumpTime > this._jumpTime) {
        // 当跳跃时间是否结束
        this.node.setPosition(this._targetPos); // 强制位置到终点
        this._startJump = false; // 清理跳跃标记
      } else {
        // tween
        this.node.getPosition(this._curPos);
        this._deltaPos.x = this._curJumpSpeed * deltaTime; //每一帧根据速度和时间计算位移
        Vec3.add(this._curPos, this._curPos, this._deltaPos); // 应用这个位移
        this.node.setPosition(this._curPos); // 将位移设置给角色
      }
    }
  }
}
