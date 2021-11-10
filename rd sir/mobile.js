let key={
	2:['a','b','c'],
	3:['d','e','f'],
	4:['g','h','i'],
	5:['j','k','l'],
	6:['m','n','o'],
	7:['p','q','r','s'],
	8:['t','u','v'],    
	9:['w','x','y','z'], 
	0:['',' ','  ']
}
let samekey=0;
let val="";
function getvalue(str){    
	for(let i=0; i<str.length; i++) {
		//console.log("str length: " + str.length);
			if(str[i]==str[i+1]) 
			{
				samekey++;
				//console.log("same key:" + samekey);
			} 
			else 
			{
				console.log("str[i]"+str[i]);
					val+=key[str[i]][samekey]
					samekey=0
					//console.log("value is :"+val);			      
			}
	}
	return val
}    
//console.log(getvalue("262660077728446663"));
console.log(getvalue("262660077728446663"));