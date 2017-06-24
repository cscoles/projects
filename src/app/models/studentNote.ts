export class StudentNote {
  constructor(
    public Student_Note_ID: number,
    public Student_ID: number,
    public Student_Note: string,
    public Date_Created: Date,
    public Last_Modified: Date
  ){}
}
