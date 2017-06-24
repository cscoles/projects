export class Classroom {
  constructor(
    public Class_ID: number,
    public Session_ID: number,
    public Session_Name: string,
    public Year_ID: number,
    public Year_Description: string,
    public Class_Grade: string,
    public Teacher_ID: string,
    public Teacher_Last_Name: string,
    public Teacher_First_Name: string,
    public DateCreated: Date,
    public DateModified: Date
  ){}
}
