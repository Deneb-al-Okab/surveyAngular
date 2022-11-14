
export class SubSurvey {

  constructor(
    public idSurvey: number,
    public idMail: string,

  ) { }
}

export class SubAnswer {

  constructor(
    public id_submitted_survey: number,
    public id_question_answer: number,

  ) { }
}
