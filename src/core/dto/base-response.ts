export class BaseResponse<T> {
  public statusCode?: number = 200;
  public message?: string = 'Success';
  public data?: T;

  constructor(data?: T) {
    this.data = data;
  }
}
