export class Payment {
  constructor(
    public Payment_ID: number,
    public Payment_Type: string,
    public Payment_Amount: number,
    public Payment_Description: string,
    public Payment_Date: Date,
    public Family_ID: number,
    public Year_ID: number,
    public Date_Created: Date,
    public Last_Modified: Date
  ){}
}
