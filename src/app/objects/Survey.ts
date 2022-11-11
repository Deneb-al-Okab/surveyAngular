
export class Category {
  constructor(
    public id : number,
    public name: string,
  ) { }
}

export class Survey {

  constructor(
    public idMail: string,
    public category: Category,
    public name: string,
    public description: string,
    public publishDate: string,
    public endingDate:string,


  ) { }
}
