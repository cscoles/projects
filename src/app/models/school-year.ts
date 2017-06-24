export class SchoolYear {
	constructor(
		public Year_ID: number,
		public Year_Description: string,
		public Year_Start_Date: Date,
		public Year_End_Date: Date,
		public Year_Active: boolean,
		public Year_Planning: boolean,
		public Date_Created: Date,
		public Last_Modified: Date
	){}
}
