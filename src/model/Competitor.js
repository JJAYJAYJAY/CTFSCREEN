export default class Competitor {
    id//用户id
    nickname//账号名
    realname//真实名字
    rank//排名
    score//分数
    rightCount//做对的题目
    totalCount//总共的尝试
    details//提交情况（对象数组）
    
    constructor(data){
        this.id=data.id;
        this.nickname=data.nickname;
        this.realname=data.realname;
        this.rank=data.rank;
        this.score=data.score;
        this.rightCount=data.rightCount;
        this.totalCount=data.totalCount;
        this.details=data.details;
    }

    //用来排序
    compare=function(x,y){
        return x.rank-y.rank;
    }
        
}