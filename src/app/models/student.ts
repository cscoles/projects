export class Student {
  constructor(
    public Student_ID: number,
    public Student_Last_Name: string,
    public Student_First_Name: string,
    public Student_Middle_Name: string,
    public Student_Gender: string,
    public Student_Birth_Date: Date,
    public Baptism_Check: boolean,
    public Baptism_Date: Date,
    public Baptism_Church: string,
    public Eucharist_Received: boolean,
    public Eucharist_Date: Date,
    public Eucharist_Church: string,
    public Confirmation_Received: boolean,
    public Confirmation_Date: Date,
    public Confirmation_Church: string,
    public Education_Assistance: boolean,
    public Education_Assistance_Note: string,
    public Allergy_Check: boolean,
    public Allergy_Note: string,
    public Student_Active: boolean,
    public Family_ID: string,
    public DateCreated: Date,
    public DateModified: Date
  ){}
}
