export default class Challenge {
    id//题目id
    category//类型
    name//名称
    description//描述？
    difficuity//难度
    score//分数
    submissionList//提交的情况

    constructor(data){
        this.id=data.id
        this.category=data.category
        this.name=data.name
        this.description=data.description
        this.difficuity=data.difficuity
        this.score=data.score
        this.submissionList=data.submissionList
    }
    
}