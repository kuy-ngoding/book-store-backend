export class MidtransExpiryModel {
  public start_time: Date;
  public unit: number;
  public duration: number;

  constructor(start_time: Date, unit: number, duration: number) {
    this.start_time = start_time;
    this.unit = unit;
    this.duration = duration;
  }
}
