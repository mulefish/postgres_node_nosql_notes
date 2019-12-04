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
		const absoluteFile = site.getFileName()
		const ary = absoluteFile.split("\/")
		const relativeFile = ary[ary.length - 1] 

		const line = site[1].getLineNumber() 
		console.log( " Line: " + line + " from '" + relativeFile + "' ( func " + func + ")")
	}

	showStack() {
		// Show all methods involved in calling outside of default node stuff
		let ary = stack()
		ary.forEach((site, i)=>{
			if ( i > 0 ) {
				const func = site.getFunctionName() || 'anon'
				const absoluteFile = site.getFileName()
				const ary = absoluteFile.split("\/")
				const relativeFile = ary[ary.length - 1] 
				

				const line = site.getLineNumber() 
				if ( skip.hasOwnProperty( func )) {
					// do nothing
				} else {
					console.log( i + " Line: " + line + " from '" + relativeFile + "' ( func " + func + ")")
				}
			}
		});
	  }
}
module.exports={Caller}
