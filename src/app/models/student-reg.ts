export class StudentReg {
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
    public Year_ID: number,
    public Year_Description: string,
    public Preferred_Session_ID: number,
    public Preferred_Session_Name: string,
    public Session_ID: number,
    public Student_Grade_Entering: string,
    public Student_Registration_ID: number,
    public Class_ID: number,
    public Class_Grade: string,
    public Teacher_ID: number,
    public Teacher_Last_Name: string,
    public Teacher_First_Name: string,
    public DateCreated: Date,
    public DateModified: Date
  ){}
}