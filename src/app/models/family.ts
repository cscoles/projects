export class Family {
  constructor(
    public Family_ID: number,
    public Emergency_Last_Name: string,
    public Emergency_First_Name: string,
    public Emergency_Phone1: string,
    public Emergency_Phone_Type1: string,
    public Emergency_Phone2: string,
    public Emergency_Phone_Type2: string,
    public Physician_Last_Name: string,
    public Physician_First_Name: string,
    public Physician_Phone: string,
    public Medical_Consent: boolean,
    public Registered_Parishioner: boolean,
    public Children_Lives_With: string,
    public Family_No_Release: string,
    public Media_Permission: string,
    public Witness_Agreement: boolean,
    public Safe_Touch_Agreement: boolean,
    public Family_Active: boolean,
    public Date_Created: Date,
    public Date_Modified: Date
  ) {}
}
