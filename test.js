var fs= require('fs');

var readlines =function (filename){
employee=[]
var remaining='';
readStream=fs.createReadStream(filename)
	readStream.on('data',function(data){
		remaining = data
		var index = data.indexOf('\n');
		var last =0;
		
		// console.log(index)
		while(index > -1){
			var employeeName=''
			var total=0
			var line =remaining.toString().substring(last,index)
			var indexSpace=line.indexOf(' ')
			var last1=0
			while(indexSpace > -1){
				var word=line.substring(last1,indexSpace)
				// Check if the line is a comment. If it is a comment exit the while loop.
				if (line.substring(0,2) == '//'){
					break;
				}else{
						//If not a comment check if the word has only alphabets
						if (typeof(word) == 'string' && /^[a-zA-Z]+$/.test(word) ){
										employeeName= employeeName + word +' ';

									}else{
											//if it is not a a string of alphabets, check if the word is a number
											if(/\d/.test(word) && employeeName !=''){
													//Check if the number length is 8 
													if (word.length != 8) { 
								      				  var error ='The file is not in a correct format. length of date field is not 8'
								      				  readStream.emit('error', error) 

								    				}else{
								    					day = word.substring(6, 8);  
													    month = word.substring(4,6); 
													    year = word.substring(0, 4);
													    
													    // test year range 
													    if (year < 1000 || year > 3000 || month>12 || month ==0) { 
													        var error ='The file is not in a correct format. Year or month not in correct format'
								      				  		readStream.emit('error', error)
													    } 
													    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
													    //check if the year is a leap year and change the array accordingly
													    if( year % 4 == 0){
								        					monthLength[1] = 29;
													    }
													    //check if the day is correct and if it is correct increase the total number to leaves by 1
													    if(day > 0 && day <= monthLength[month - 1]){
													    	total =total+1
													    	// console.log(total)
													    }
								    				}


												}else{ 
													var error ='The file is not in a correct format.'
								      				  		readStream.emit('error', error)
												} 

									}
									last1=indexSpace+1;
									indexSpace=line.indexOf(' ',last1);
									// if(indexSpace > -1){
									// 	indexSpace=line.indexOf('\n',last1)
									// 	console.log(indexSpace)
									// }

				}

			}
			// only if it is not a comment push the name and total into array
			if(employeeName!=''){
				employee.push({name:employeeName,total:total})
				// console.log(total)
			}
			
			
			last=index+1
			index = remaining.indexOf('\n', last);

		}

		
	})
	readStream.on('error', (err) => {
		console.log('error ' + err)
		readStream.emit('end')
	} );
	readStream.on('end',function(){
		if (employee.length !=0){
		console.log(employee.sort((a, b) => (a['name'] || "").toString().localeCompare((b['name'] || "").toString())));
		}
		
	})
};

module.exports=readlines;
