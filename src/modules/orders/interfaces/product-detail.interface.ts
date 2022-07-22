export interface productDetailInterface extends Request{
    productName: string;
    productPrice: number;    
    productDescription?: string;
}