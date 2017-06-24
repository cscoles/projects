export class Parent {
  constructor(
    public Parent_ID: number,
    public Parent_Last_Name: string,
    public Parent_First_Name: string,
    public Student_Relationship: string,
    public Parent_Address_1: string,
    public Parent_Address_2: string,
    public Parent_City: string,
    public Parent_State: string,
    public Parent_Zip: string,
    public Parent_Phone1: string,
    public Parent_Phone1_Type: string,
    public Parent_Phone2: string,
    public Parent_Phone2_Type: string,
    public Parent_Email: string,
    public Parent_Active: boolean,
    public Family_ID: string,
    public DateCreated: Date,
    public DateModified: Date
  ){}
}
