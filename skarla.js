//const puppeteer = require('puppeteer');
const readline = require('readline');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const figlet = require('figlet');
const url = require('url');
const fs = require("fs");
const sleep = (ms) => {
	return new Promise(resolve=>{
		setTimeout(resolve,ms);
	})
}
figlet("[  skarla.js  ]", function(err, data) {
	console.log("\n\n"+data+"\n\n");
});
String.prototype.startsWith = function(suffix) {
	return this.substring(0, suffix.length) === suffix
};
var RL = readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
RL.setPrompt('> ');
RL.on('line', function(chat) {
	RL.prompt();
	function getPI(n) {
		var i = 1, p = 0;
		while (i < 50000000) {
			p += 1/i - 1/(i+2);
			i += 4;
		}
		return +(4*p).toFixed(n);
	}
	function JSClock() {
		var time = new Date();
		var hour = time.getHours();
		var minute = time.getMinutes();
		var second = time.getSeconds();
		var temp = "" + ((hour > 12) ? hour - 12 : hour);
		if (hour == 0)
		temp = "12";
		temp += ((minute < 10) ? ":0" : ":") + minute;
		temp += ((second < 10) ? ":0" : ":") + second;
		temp += (hour >= 12) ? "[오후]" : "[오전]";
		return temp;
	}
	function parsing(url) {
		var rutxt = "";
		require('https').get(url, (res) => {
			res.setEncoding('utf8');
			res.on('data', function (body) {
				rutxt += String(body.toString('utf-8'));
				fs.writeFileSync('./파싱.txt', rutxt, "UTF-8");
			});
		});
	}
	const Ht = async(list) => {
		arrI = [];
		for(const data of list) {
			await sleep(1500).then(parsing(data));
			Info = fs.readFileSync("./파싱.txt");
			arrI.push((String(Info.toString('utf-8'))).replace(/\n/g, ""));
		}
		console.log(
		"[ 한강수온 ] : " + arrI[0],
		"\n\n",
		"[ 명언 ] : "+arrI[1]
		);
	}
	if(chat == ".한강수온") {
		const list = [
		"https://hangang.ivlis.kr/aapi.php?type=dgr",
		"https://hangang.ivlis.kr/aapi.php?type=text"
		];
		const ht = Ht(list);
	}
	downMedia = function(uri, filename, callback) {
		const fs = require('fs');
		const request = require('request');
		request.head(uri, function(err, res, body) {
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};
	function permutation(arr, selectNum) {
		let result = [];
		if (selectNum === 1) return arr.map((v) => [v]);
		arr.forEach((v, idx, arr) => {
			const fixer = v;
			const restArr = arr.filter((_, index) => index !== idx);
			const permuationArr = permutation(restArr, selectNum - 1);
			const combineFixer = permuationArr.map((v) => [fixer, ...v]);
			result.push(...combineFixer);
		});
		return result;
	}
	function combination(arr, selectNum) {
		const result = [];
		if (selectNum === 1) return arr.map((v) => [v]);
		arr.forEach((v, idx, arr) => {
			const fixed = v;
			const restArr = arr.slice(idx + 1);
			const combinationArr = combination(restArr, selectNum - 1);
			const combineFix = combinationArr.map((v) => [fixed, ...v]);
			result.push(...combineFix);
		});
		return result;
	}
	function pwr(arr, selectNum) { //permutation with repetition
		const result = [];
		if (selectNum === 1) return arr.map((v) => [v]);
		arr.forEach((v, idx, arr) => {
			const fixed = v;
			const restArr = arr;
			const permutationArr = permutation(restArr, selectNum - 1);
			const combineFix = permutationArr.map((v) => [fixed, ...v]);
			result.push(...combineFix);
		});
		return result;
	}
	Array.prototype.division = function (n) {
		var arr = this;
		var len = arr.length;
		var cnt = Math.floor(len / n);
		var tmp = [];
		for (var i = 0; i <= cnt; i++) {
			tmp.push("["+arr.splice(0, n)+"]");
		}
		return tmp;
	}
	function getNowTime() {
		var time = new Date(),
		times = time.getMonth() + 1,
		year = time.getFullYear(),
		hours = time.getHours();
		
		var nowtime = year+"년 " + times + "월 " + time.getDate() + "일 ";
		if(hours > 12) {
			var hour = hours - 12
			nowtime += "오후 ";
		} else {
			var hour = hours;
			nowtime += "오전 ";
		}
		
		var nowtime = nowtime + ( hour + "시 " + time.getMinutes() + "분 "+ time.getSeconds() + "초");
		return nowtime;
	}
	function getIndexOfPosFind(str, searchValue) {
		let pos = 0;
		while(true) {
			let posFind = str.indexOf(searchValue, pos);
			if(posFind === -1)
			break;
			console.log(posFind);
			pos = posFind + 1;
		}
	}
	function bmi(cm, kg) {
		var cm1 = (cm/100); //m로 변환
		var result1 = (kg/Math.pow(cm1 , 2)).toFixed(2); //Math.pow(수 , 의 n 제곱) | toFixed(n) n번째 자리까지
		var resultText = "BMI는 "+result1+"이므로 ";
		
		if(result1<18.5) {
			resultText += "저체중";
		} else if(result1<23) {
			resultText += "정상";
		} else if(result1<25) {
			resultText += "과체중";
		} else {
			resultText = "비만";
		} return (resultText += " 입니다.");
	}
	function IsDate(year,month,curDate) {
		var lastday = GetLastDay(year,month,curDate);
		if(lastday == false) {
			return false;
		} if(curDate <1 || curDate > lastday) {
			return false;
		} if(curDate > 1 || curDate < lastday) {
			return true;
		}
	}
	function GetLastDay(year,month,curDate) {
		if(month < 1 || month > 12) {
			return false;
		}
		if(13 > month > 0) {
			if(month == 2) {
				if(year%4 == 0 && year%100 != 0 || year%400 == 0) {
					lastday = 29;
				} else {
					lastday = 28;
				}
			} else if(month == 4 || month == 6 || month == 9 || month == 11) {
				lastday = 30;
			} else {
				lastday = 31;
			}
			return lastday;
		}
	}
	function simsimi(TEXT,  lc) {
		const request = require('request');
		const options = {
			uri: "https://simsimi.info/api?text="+encodeURI(TEXT)+"&lc="+encodeURI(lc)
		};
		request.get(options, function (error, response, body) {
			var data = JSON.parse(body)
			let resp = data.message;
			console.log("[ simsimi ] : "+resp);
		});
	}
	function P(d) { //Benford's law
		if((String(d)).length == 1 && d !== 0) {
			var percent = ((Math.log10(d+1) - Math.log10(d))*100);
			return (`자연에서 ${d}(이/가) 나올 확률 : \n` + String(percent)+"%");
		} else {
			return ("[ ERR ]");
		}
	}
	function translate(talk, From, To) {
		const client_id = '7RnwptYEkrzAAzcLbH7N';
		const client_secret = 'QAgMrpgs48';
		
		const query = String(talk);
		
		const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
		const request = require('request');
		var options = {
			url: api_url,
			form: {'source':From, 'target':To, 'text':query},
			headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
		};
		return new Promise(resolve => {
			request.post(options, function (error, response, body) {
				const JB = JSON.parse(response.body);
				resolve(JB["message"]["result"]["translatedText"]);
			});
		});
	}
	if (chat.startsWith(".번역 ")) {
		const talk = chat.substring(4);
		translate(talk, "ko", "en").then(result => console.log(result));
	}
	if (chat.startsWith(".sim ")) {
		const talk = chat.substring(5)
		simsimi(talk, 'ko');
	}
	if(chat.startsWith(".DC ")) { //DiseaseCode
		const code = chat.substring(4);
		const url = "https://kcdcode.kr/mobile/searchKeyword?keyword="+encodeURI(code);
		request(url, function(error, response, html) {
			if (error) { throw error };
			var $ = cheerio.load(html);
			$('.on > a').each(function() {
				CodeName = $(this).text();
				console.log(CodeName);
			});
		});
	}
	if (chat == 'exit') {
		RL.close();
	}
	if(chat.startsWith(".eval ")) {
		try {
			console.log(String(eval(chat.substring(6))));
		} catch (ev) {
			console.log(ev);
		}
	}
	if(chat == ".현재시간") {
		var time = new Date(),times = (time.getMonth() + 1),year = time.getFullYear(),hours = time.getHours();
		var nowtime = year+"년 " + times + "월 " + time.getDate() + "일";
		if(hours > 12) {
			var hour = hours - 12;
			nowtime += " 오후 ";
		} else {
			var hour = hours;
			nowtime += " 오전 ";
		}
		nowtime += ( hour + "시 " + time.getMinutes() + "분 "+ time.getSeconds() + "초");
		console.log(String(nowtime));
	}
	if(chat.startsWith(".PI ")) {
		var n = Number(chat.substring(4));
		var myPI = getPI(n);
		console.log("myPI @n:100M:", myPI);
		console.log("Math.PI :", Math.PI);
		console.log("The Diff :", Math.PI-myPI);
	}
	if (chat.startsWith(".FD ") && admin.includes(id)) {
		var link = chat.substring(4);
		var time = new Date(),
		year = time.getFullYear(),
		times = time.getMonth() + 1,
		hours = time.getHours(),
		minutes = time.getMinutes(),
		seconds = time.getSeconds();
		var FileName = String(year+times+hours+minutes+seconds)+String(Math.floor(Math.random() * (10 - 1) + 1 ));
		var extension = path.extname(link);
		var photos = [".jpg",".jpeg",".png",".gif",".bmp",".rle",".dib","tif","tiff",".raw"];
		var videos = [".mpeg",".mpg",".avi",".mp4",".m4v",".wmv",".mwa",".asf",".ts",".mkv",".mov",".webm"];
		var audios = [".wav",".mp3",".mid",".m4a"];
		var execute = [".txt",".zip",".json"];
		var etype = '';
		if (photos.includes(extension)) {
			etype += 2;
		} else if(videos.includes(extension)) {
			etype += 3;
		} else if(audios.includes(extension) || execute.includes(extension)) {
			etype += 18;
		} else {
			console.log("링크의 확장자명을 다시 확인해주세요.");
		}
		console.log("\nLINK : "+link +"\n"+ "FileName : "+FileName+extension+"\n"+"Type : "+etype+"\n");
		downMedia(link,FileName+extension)
		setTimeout(function() {
			var directory = fs.existsSync('./'+ FileName + extension);
			if (directory == false) {
				console.log("이미 파일이 삭제되었거나 이동하였습니다.");
			} else if(directory == true) {
				fs.unlink(FileName+extension, function (err) {
					if (err) throw err;
					console.log(`[ 정보 ] 저장공간을 위해 파일 ${FileName} 을 삭제했습니다.\n`); 
				});
			}
		}, 180000);
	}
	if(chat.startsWith('.bmi ')) {
		var str = chat.substring(5);
		var strc = str.split("/");
		var cm = Number(strc[0]);
		var kg = Number(strc[1]);
		console.log(bmi(cm,kg));
	}
	if (chat.startsWith(".디데이 ")) {
		var arr = chat.substring(5),arr2 = arr.split("/");
		var year = arr2[0],
		month = arr2[1],
		curDate = arr2[2];
		if (IsDate(year,month,curDate) == true) {
			var today = new Date();
			var dday = new Date(year, month - 1, curDate);
			var rt = dday.getTime() - today.getTime(); //remaining time
			var result = String(Math.ceil(rt / (1000 * 60 * 60 * 24)));
			if(result == "NaN") {
				console.log("이건 계산할 수 없습니다.\n다시 입력해주세요.");
			} else {
				console.log(year + "년 " + month + "월 " + curDate + "일까지 " + result + "일 남았습니다.");
			}
		} else if(IsDate(year,month,curDate) == false) {
			console.log("잘못 입력하셨습니다 다시 입력해주세요.");
		}
	}
	if (chat.startsWith(".등급 ")) {
		var qqq = chat.substring(4);
		var qqq1Change = qqq.split("/");
		var R = Number(qqq1Change[0]);
		var all = Number(qqq1Change[1]);
		var lvl = (((R/all)*100).toFixed(2));
		var resultTxT = '';
		
		if(lvl < 4) {
			var data = 1;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 11) {
			var data = 2;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 23) {
			var data = 3;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 40) {
			var data = 4;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 60) {
			var data = 5;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 70) {
			var data = 6;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 89) {
			var data = 7;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 96) {
			var data = 8;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else if(lvl < 100) {
			var data = 9;
			resultTxT += `당신은 ${lvl}%이므로 ${data}등급입니다.`;
		} else {
			resultTxT += `이 점수는 사람 점수가 아니군요 마늘과 쑥을 더 먹고 오십시오.`;
		}
		console.log(resultTxT);
	}
	RL.prompt()
});
//끝
RL.on('close', function() {
	process.exit();
});