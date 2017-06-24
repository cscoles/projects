export class Teacher {
	constructor(
		public Teacher_ID: number,
		public Teacher_Last_Name: string,
		public Teacher_First_Name: string,
		public Teacher_Phone1: string,
		public Teacher_Phone1_Type: string,
		public Teacher_Phone2: string,
		public Teacher_Phone2_Type: string,
		public Teacher_Email: string,
		public Protecting_Gods_Children_Check: boolean,
		public Is_A_Parent: boolean,
    public Teacher_Active: boolean,
		public Date_Created: Date,
		public Last_Modified: Date
	){}
}
