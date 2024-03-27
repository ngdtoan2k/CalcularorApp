import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
input: string='';
result: string='';

pressNum(num:string){


  //không cho phép nhập 1 ký tự "." trong cùng 1 số
  if(num=="."){
    if(this.input!=""){
      const  lastNum = this.getLastOperand();
      console.log(lastNum.lastIndexOf("."));
      //nếu đã tồn tại 1 dấu "." trong số cuối cùng trong phép tính thì k dc thên "." nữa
      if(lastNum.lastIndexOf(".")>=0) return;
    }
  }
//khong cho nhap số 0 đầu tiên
  if(num =="0"){
    if(this.input==""){
      return;
    }
    // không cho nhập số 0 sau phép tính
    const PrevKey= this.input[this.input.length -1];
    if(PrevKey === '/' || PrevKey === "*" || PrevKey === "-" || PrevKey === "+"){
      return;
    }

  }
  this.input = this.input + num;
  this.calcAnswer();
}
//lay số cuối cùng sau phep tính
   getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos=this.input.toString().lastIndexOf("+")
     if(this.input.toString().lastIndexOf("-")>pos)
       pos= this.input.lastIndexOf("-")
     if(this.input.toString().lastIndexOf("*")>pos)
       pos= this.input.lastIndexOf("*")
     if(this.input.toString().lastIndexOf("/")>pos)
       pos= this.input.lastIndexOf("/")
     console.log("last"+this.input.substr(pos+1))
     return this.input.substr(pos+1)
  }
  // neu trước đó là 1 phep tính thì k thêm phep tính moi vào input
  pressOperator(op:string){
    const lastKey=this.input[this.input.length -1];
    if(lastKey === '/' ||lastKey==="*" || lastKey==="-" || lastKey==="+"){
      return;
    }
    this.input = this.input + op
    this.calcAnswer();
  }
  //xoá 1 ký tự
  clear(){
    if (this.input!=""){
      this.input = this.input.substr(0,this.input.length-1)
    }
  }
  //xao het
  allClear(){
  this.input="";
  this.result="";
  }

  calcAnswer(){
  let formula = this.input;
  //nếu ký tự cuoi trong input là "." thì k input dc tính từ trước dấu "."đó
  let lastKey = formula[formula.length-1];
  if(lastKey==='.'){
    formula=formula.substr(0,formula.length-1)
  }
  // nếu ký tự cuôi là 1 phép tính thì input dc tính từ trước phép tính đó
  lastKey=formula[formula.length-1]
    if(lastKey === '/' ||lastKey==="*" || lastKey==="-" || lastKey==="+"){
      formula=formula.substr(0,formula.length-1)
    }
    console.log("fomular"+formula);
    this.result=eval(formula);
  }
  //hiển thị kết quả lên thanh input
  getAnswer(){
  this.calcAnswer();
  this.input = this.result;
  if(this.input=="0")
    this.input="";
  }
}
