

export class Answer {
  constructor(
    public id : number,
    public id_qa : number,
    public answer: string,
  ) { }
}

export class  Question{

  constructor(
    public id: number,
    public question: string,
    public answers: Answer[],
  )
  { }

   pushNew(newAnswer : Answer){
    this.answers.push(newAnswer);
}

}





