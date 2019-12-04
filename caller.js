const stack = require('callsite');
const skip = {
	"handle":"",
	"next":"",
	"dispatch":"",
	"handle":"",
	"anon":"",
	"process_params":"",
	"next":"",
	"urlencodedParser":"",
	"param":""
}

class Caller {
	caller() {
		// Show only the method that called 
		let site = stack()
		const func = site[1].getFunctionName() || 'anon'
		const file = site[1].getFileName()
		const line = site[1].getLineNumber() 
		console.log( " Line: " + line + " from " + file + " ( func " + func + ")")
	}

	showStack() {
		// Show all methods involved in calling outside of default node stuff
		let ary = stack()
		ary.forEach((site, i)=>{
			if ( i > 0 ) {
				const func = site.getFunctionName() || 'anon'
				const file = site.getFileName()
				const line = site.getLineNumber() 
				if ( skip.hasOwnProperty( func )) {
					// do nothing
				} else {
					console.log( i + " Line: " + line + " from " + file + " ( func " + func + ")")
				}
			}
		});
	  }
}
module.exports={Caller}
