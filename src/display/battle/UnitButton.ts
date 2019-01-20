import * as PIXI from 'pixi.js';
import ResourceMaster from 'ResourceMaster';

/**
 * ユニット生成をリクエストするための UI 用のボタン
 */
export default class UnitButton extends PIXI.Container {
  /**
   * ボタン枠のインデックス
   */
  public slotIndex: number = -1;
  /**
   * ボタンに割り当てられたユニットの ID
   */
  public unitId: number = -1;
  /**
   * 表示するユニットコスト
   */
  public cost: number = -1;

  /**
   * ボタン画像
   */
  private button!: PIXI.Sprite;
  /**
   * コストテキスト
   */
  private text!: PIXI.Text;

  constructor(texture?: PIXI.Texture) {
    super();

    this.button = new PIXI.Sprite();
    this.text = new PIXI.Text('', {
      fontFamily: 'MisakiGothic',
      fontSize: 24,
      fill: 0xffffff,
      padding: 4
    });

    this.text.position.set(46, 88);

    if (texture) {
      this.button.texture = texture;
    }

    this.addChild(this.button);
    this.addChild(this.text);
  }

  /**
   * ボタン枠インデックスとユニット ID で初期化する
   */
  public init(slotIndex: number, unitId: number = -1, cost: number = -1): void {
    const texture = this.getTexture(unitId);
    if (!texture) {
      return;
    }

    this.slotIndex = slotIndex;
    this.unitId = unitId;
    this.button.texture = texture;
    this.text.text = (cost >= 0) ? `${cost}` : '';
  }

  public changeUnit(unitId: number = -1, cost: number = -1): void {
    const texture = this.getTexture(unitId);
    if (!texture) {
      return;
    }

    this.unitId  = unitId;
    this.button.texture = texture;
    this.text.text = (cost >= 0) ? `${cost}` : '';
  }

  private getTexture(unitId: number = -1): PIXI.Texture | null {
    const resourceId = ResourceMaster.Dynamic.UnitPanel(unitId);
    const resource = PIXI.loader.resources[resourceId];
    if (!resource || !resource.texture) {
      return null;
    }
    return resource.texture;
  }
}
