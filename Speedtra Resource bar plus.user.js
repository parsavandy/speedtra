// ==UserScript==
// @name           Speedtra Resource bar plus
// @description    Shows travian resources (for Travian Legends and Travian Path to Pandora)
// @author         Parsa Swift (based on Travian Resource bar plus version 2.8.14 by Serj_LV)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=56E2JM7DNDHGQ&item_name=T4.4+script&currency_code=EUR
// @include        *://*.speedtra.*
// @include        *://*/*.speedtra.*
// @exclude     *://*.speedtra*.*/hilfe.php*
// @exclude     *://*.speedtra*.*/log*.php*
// @exclude     *://*.speedtra*.*/index.php*
// @exclude     *://*.speedtra*.*/anleitung.php*
// @exclude     *://*.speedtra*.*/impressum.php*
// @exclude     *://*.speedtra*.*/anmelden.php*
// @exclude     *://*.speedtra*.*/gutscheine.php*
// @exclude     *://*.speedtra*.*/spielregeln.php*
// @exclude     *://*.speedtra*.*/links.php*
// @exclude     *://*.speedtra*.*/geschichte.php*
// @exclude     *://*.speedtra*.*/tutorial.php*
// @exclude     *://*.speedtra*.*/manual.php*
// @exclude     *://*.speedtra*.*/ajax.php*
// @exclude     *://*.speedtra*.*/ad/*
// @exclude     *://*.speedtra*.*/chat/*
// @exclude     *://forum.speedtra*.*
// @exclude     *://board.speedtra*.*
// @exclude     *://shop.speedtra*.*
// @exclude     *://*.speedtra*.*/activate.php*
// @exclude     *://*.speedtra*.*/support.php*
// @exclude     *://help.speedtra*.*
// @exclude     *://*.answers.speedtra*.*
// @exclude     *.css
// @exclude     *.js

// @version        2.12.38
// ==/UserScript==

(function () {
var RunTime = [Date.now()];

function allInOneOpera () {
var version = '2.12.38';

notRunYet = false;

var audiofile = 'http://soundsplanet.com/authors/1001/tracks/touch_tone1.mp3';
var bgcolor = ['#66ff66','yellow','red']; //resource bar colors
var vHColor = '#777777'; //hints (second name) color
var cnColors = ['#F8FFD8','#FFE85B','#FF8888','#F0B8FF','#A0F0A0']; //Center Number colors
var market_all = [];
var market_fc = [];
var market_ftd = [];
var income = [];
var incomepersecond = [];
var iresNow = [];
var resNow = [];
var fullRes = [];
var wfl = false;
var rpFL = false;
var abFL = false;
var triFL = true;
var nextFL = true;
var stopRPFL = true;
var mapFL = false;
var plusAccount = false;
var timerRB = [];
var timerP = [];
var lastTimerP = [0,0,0];
var lastTimerB = 0;
var timerB = [];
var timerB3 = [];
var timerF = [];
var timerOv = [];
var timerN = [];
var villages_id = [];
var village_aid = 0;
var village_aNum = 0;
var villages_count = 0;
var linkVSwitch = [];
var sumPPH = [0,0,0,0];
var merchInWork = 0;
var progressbar_time = 0;
var lastAlert = RunTime[0];
var aClockTimer = 0;
var loadServerTime = 0;
var langs = ['auto','English (en)','???????? (ar)','?????????????????? (bg)','Bosanski (bs)','Deutsch (de)','???????????????? (el)','Espa??ol (es)','?????????? (fa)','Fran??ais (fr)','Hrvatski (hr)','Magyar (hu)','Italiano (it)','Nederlands (nl)','Polski (pl)','Portugu??s (pt)','Rom??n?? (ro)','?????????????? (ru)','???????????? (sr)','Svenska (sv)','T??rk??e (tr)','???????????????????? (ua)','Ti???ng Vi???t (vi)','?????? (zh)'];
var allCookies = ['vPPH','mf','next','Dorf1','Dorf2','Dorf11','Dorf12','Dorf13','Dorf14','RBSetup','xy','VV','OV','Mem','Dict','DictFL','DictTR','DictRp','DictRpFL','ln','ln2','ln3','src','vHint','tropsI','tropsDic','vList','Att','trFL','AC','AS','bodyH','vBMn'];
var crtPath = window.location.href;
var lMap = '';
var crtName = crtPath.match(/^.*\/\/(.+?)\//)[1];
var fullName = crtPath.match(/^.*\/\/.+\/+?/)[0];
var crtLang = crtName.split('.'); crtLang = crtLang[crtLang.length-1];
var srv = document.title.substring(8);
var flinks = new Object();
var windowID = []; // 0-Setup, 1-Overview, 2-distanceTips, 3-notes, 4-Reports, 5-links, 6-editLink, 7-editAnalyzers, 8-seveLog, 9-troopRes

var pageElem42 = [
	'side_info', // 0- include profile.
	'content', // 1- main block in center
	'sidebarAfterContent', // 2- right side. include village list, links, quest.
	'servertime' // 3- server time
	];

var pageElem = pageElem42.slice();

var docDir = ['left', 'right'];
var ltr = true;
if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") == 'rtl') { docDir = ['right', 'left']; ltr = false; }
var coordDir = 'ltr';

var sK = 0;
var sM = 1;
var sC = [1.6,1000];
if( /[xyz]3|speed/i.test(crtPath) ) { sM = 3; sC = [16/3,100]; }
if( /[xyz]2|t1|final/i.test(crtPath) ) { sM = 2; sC = [8,100]; }
if( /[xyz]5/i.test(crtPath) ) { sM = 5; sC = [3.2,100]; }
if( /[xyz]10/i.test(crtPath) ) { sM = 10; sC = [1.6,100]; }

var RB = new Object();
	RB.village_dorf1 = [0];
	RB.village_dorf11 = [0];
	RB.village_dorf12 = [0];
	RB.village_dorf13 = [0];
	RB.village_dorf14 = [0];
	RB.village_Dorf2 = [0,0,0,0,0,0,0];
	RB.village_Var = [0,0,0];
	RB.village_PPH = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	RB.overview = [-1,'0'];
	RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
//						1		2				3				4			5					6				7			8		9			10		11		12	  13, 14	15		16				17				18				19				20					21			22		23		24				25
	RB.dictionary = [0,'Ally','Merchants','Tournament Square','Duration','resource balance','Rally point','Marketplace','Barracks','Stable','Workshop','Buy','Attacks',0,'at ','Map','Reinforcement','Attack: Normal','Attack: Raid','Culture points','Crop consumption','capacity','farm-list','','Great Barracks','Great Stable'];
	RB.dictFL = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	RB.dictTR = ['none',
		'Legionnaire','Praetorian','Imperian','Equites Legati','Equites Imperatoris','Equites Caesaris','Battering Ram','Fire Catapult','Senator','Settler',
		'Clubswinger','Spearman','Axeman','Scout','Paladin','Teutonic Knight','Ram','Catapult','Chief','Settler',
		'Phalanx','Swordsman','Pathfinder','Theutates Thunder','Druidrider','Haeduan','Ram','Trebuchet','Chieftain','Settler',
		'Slave Militia','Ash Warden','Khopesh Warrior','Sopdu Explorer','Anhur Guard','Resheph Chariot','Ram','Stone Catapult','Nomarch','Settler',
		'Mercenary','Bowman','Spotter','Steppe Rider','Marksman','Marauder','Ram','Catapult','Logades','Settler'];
	RB.dictRp = ["Won as attacker without losses.","Won as attacker with losses.","Lost as attacker.",
		"Won as defender without losses.","Won as defender with losses.","Lost as defender with losses.","Lost as defender without losses.",
		"Spying was successful and not detected.","Spying was successful, but detected.","Spying failed.","Spying was stopped successfully.","Spying could not be stopped."];
	var iReports = [1,2,3,4,5,6,7,15,16,17,18,19];
	RB.dictRpFL = Array(12);
	RB.market_fi = [0,0,0,0,0,0,0,0,0,0,0,0];
	RB.tropsI = new Array(500);
	RB.trFL = new Array(51);
	RB.XY = [
		200, 10, // 0-Setup
		700, 430, // 1-Resource bar
		200, 100, // 2-Overview
		5, 400, // 3-Links
		400, 50, // 4-Report&Messages
		400, 130, // 5-Notes
		100, 50, // 6-Alerts
		10, 30, // 7-vlist
		10, 250, // 8-BIGicons
		200, 100, // 9-LinkEdit
		10, 250, // 10-attackInfo
		200, 100 // 11-attackFilter
		];
	RB.vHint = [];
	RB.vList = [];
	RB.attackList = [RunTime[0]];
	RB.bodyH = [0,0,0]; // 0-resourcebar,1-vlist,2-links
	RB.ln3 = []; // links for village
	RB.vBMn = [];

DICT = {
	en: {
		// ingame messages
		ok : "Ok",
		cancel : "Cancel",
		close : "Close",
		save : "Save",
		reset : "Reset",
		overview : "villages overview",
		svers : "script version",
		settings : "settings",
		notes : "notes",
		res90 : "resources to % filling",
		refresh : "refresh",
		warehouse : "Warehouse",
		resources : "Resources",
		troops : "Troops",
		links : "Links",
		linkname : "link name",
		linkdel : "delete link",
		name2 : "second name",
		archive : "Archive",
		arena : "Tournament Square",
		addcur : "add current",
		del : "Delete",
		edit : "edit",
		unpin : "unpin",
		pin : "pin",
		total : "Total",
		noplace : "There is no place!",
		hunger : "hunger",
		duration : "duration",
		deficit : "deficit",
		aclock : "Alarm clock\nhh:mm:ss , hh:mm , mm (from now)",
		consnegat : "Crop consumption in this village is negative. How many minutes needed reserve?",
		bmove : "Move buildings",
		neighbors : "neighbors",
		// settings
		none : "None",
		auto : "auto",
		info : "Information",
		yourrace : "Your tribe",
		sspeed : "Server speed",
		sspeedh : "0 - auto, 1 (1x), 2 (2x), 3 (3x aka speed), ... etc.",
		servertype : "Travian Server Type",
		servertypeh : "Server types: Travian Legends, Travian Path to Pandora",
		servertypeo : ['update','Path to Pandora','Legends'],
		speedart : "Speed artefact",
		racelist : ['Romans','Teutons','Gauls','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "Yellow level of cranny (percent)",
		crannyh : 'normal 80, 70 for classic or artefact plunder',
		builtin : "Built-in tools",
		builtinh : 'red color - most needed resources, green - less needed resources',
		normalize : 'Normalize production',
		normal : "normal",
		banalyze : "Built-in battle analyzer",
		cropfind : "Built-in crop finder",
		adetect : "Attack detector",
		adetecto : ['off','w/o freeze','on'],
		adetecth : "makes hidden requests to the server, violating the rules. may result in punishment.",
		adetectt : "Period of attack detect",
		adetectth : "The first check is always after 5 minutes. Next checks will be after the configured time period.",
		buildhint : "Construction tips",
		onallp : "All pages",
		buildand : "Show building countdown and attack",
		buildandh : 'In the list of villages',
		buildands : ['off','on','wide'],
		sendres : "Show &laquo;send resource/troops&raquo; icons",
		sendmess : "Show &laquo;send message&raquo; icons",
		analyzer : "World analyzer",
		bigicon : "Show Rally Point icon",
		addvtable : "Show additional village table",
		addvtableo : ['off','on','stick'],
		opennote : "Automatically open Notes window",
		notesize : "Size of Notes window",
		openoview : "Automatically open villages overview",
		resbar : "Resource bar",
		showres : "Show resource bar in window",
		redbl : "red (in hours)",
		yellowbl: "yellow (in hours)",
		marketpl : "Marketplace",
		mfilter : "Filter",
		mfiltero : ['off','only rate','only filter','full'],
		npcsum : "Summary for NPC",
		npcsumh : 'in marketplace and buildings',
		bidinc : "Auctions bid increment",
		bidinch : 'Put a value of 0 to disable the function',
		show3x : "Predict the flow of resources at sending with 2x and 3x",
		show3xh : 'may show incorrect data',
		rpandmp : "Rally Point and Marketplace",
		incomres : "Incoming resources info",
		incomreso : ['off','on','with summary','WW mode'],
		troopsI : "Information about troops",
		troopsIo : ['off','on','update'],
		defRP : "Default action for rally point",
		showls : "Show links",
		showAsSN : "Use links as second name",
		showlso : ['off','on','in window'],
		savedls : "Saved links",
		savedd : "Saved data",
		saveddh : 'including Links and Second name. If an Account deleted, or not your computer.',
		savedelall : "Delete all saved data",
		savedelallh : 'Are you sure you want to delete all data, including the links and the second name?',
		scrlang : "Script language",
		youlang : "Browser language",
		notifi : "Notification",
		notification : "notification after construction",
		method : "Method",
		audiourl : "URL of audio file",
		audiotest : "Audio test",
		colorCustomize : "Color options",
		colorHint : "leave empty for the default colors",
		color0 : "Upgrade available",
		color1 : "Upgrade via NPC",
		color2 : "Upgrade not possible <br/>(not enough resources)",
		color3 : "Upgrade not possible <br/>(not enough capacity of granaries/warehouses)",
		color4 : "Final level"
	},
	ru: {
		// ?????????????????? ?? ????????
		cancel : "????????????",
		close : "??????????????",
		overview : "?????????? ????????????????",
		svers : "???????????? ??????????????",
		settings : "??????????????????",
		notes : "??????????????",
		res90 : "?? % ???????????????????? ????????????",
		refresh : "????????????????",
		warehouse : "????????????",
		resources : "????????????",
		troops : "????????????",
		links : "????????????",
		linkname : "???????????????? ????????????",
		linkdel : "?????????????? ????????????",
		name2 : "???????????? ??????",
		archive : "??????????",
		arena : "??????????",
		addcur : "???????????????? ?????? ??????????????",
		del : "??????????????",
		edit : "????????????????",
		unpin : "??????????????????",
		pin : "??????????????????",
		total : "??????????",
		noplace : "?????? ??????????!",
		hunger : "?????????????????????? ????????????",
		duration : "??????????????????????????????????",
		deficit : "??????????????",
		consnegat : "?????????????????????? ?? ???????? ?????????????? ??????????????????????????. ???? ?????????????? ?????????? ?????????? ???????????",
		bmove : "?????????????????????? ????????????",
		neighbors : "????????????",
		// ??????????????????
		none : '??????',
		auto : "????????.",
		info : "?????????? ????????????????????",
		yourrace : "?????? ??????????",
 		sspeed : "???????????????? ??????????????",
		sspeedh : "0 - ????????, 1 (1x), 2 (2x), 3 (3x ?????? ????????????????????), ...",
		ancientC : "AC ????????????",
		ancientCh : "???????????? AC (Ancient Cities) (?????????? ???????? ?????????????? ?????????? ????????????????)",
		speedart : "???????????????? ????????????????",
		racelist : ['??????????????','????????????????','??????????','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "???????????? ?????????????? ?????????????????? ?????????????? (????????????????)",
		crannyh : '?????????? - 80, 70 ?????? ?????????????????????????? ?????????????? ?????? ?????? ?????????????????? ??????????????????',
		builtin : "???????????????????? ??????????????????????",
		builtinh : '?????? ?????????????????????? ????????????????????????: ?????????????? ???????? - ?????????? ?????????????????????? ????????????, ?????????????? - ???????????? ????????????????????????',
		normalize : '???????????????????? ????????????????????????',
		normal : "??????????????",
		banalyze : "???????????????????? ???????????????????? ??????",
		cropfind : "???????????????????? ?????????? ?????????????????? ?????????????? ????????????",
		adetect : "?????????????????????? ??????????????????",
		adetecto : ['????????.','?????? ??????????????????','????????????????'],
		adetecth : "???????????? ?????????????? ?????????????????? ?? ??????????????, ?????????????? ??????????????. ?????????? ?????????????? ??????????????????.",
		adetectt : "???????????? ??????????????????????",
		buildhint : "?????????????????? ?????????????????????? ????????????????????????",
		onallp : "???? ???????? ????????????????????",
		buildand : "???????????????????? ???????????? ???????????????? ?? ??????????",
		buildandh : '???????????????????????? ?????? ???????????? ?? ???????????? ????????????????',
		buildands : ['??????','????','??????????????'],
		sendres : "???????????????????? ???????????? &laquo;???????????????? ??????????????/????????????&raquo;",
		sendmess : "???????????????????? ???????????? &laquo;???????????????? ??????????????????&raquo;",
		analyzer : "???????????????????? ????????",
		bigicon : "???????????????????? ?????????? ?????????? ????????",
		addvtable : "???????????????????? ???????????????????????????? ?????????????? ????????????????",
		addvtableo : ['??????','????','??????????????????'],
		opennote : "?????????????????????????? ?????????????????? ??????????????",
		notesize : "???????????? ???????? ??????????????",
		openoview : "?????????????????????????? ?????????????????? ?????????? ????????????????",
		resbar : "?????????????? ????????????????",
		showres : "???????????????????? ?????????????? ???????????????? ?? ????????",
		redbl : "?????????????? (?? ??????????)",
		yellowbl: "???????????? (?? ??????????)",
		marketpl : "??????????",
		mfilter : "???????????? ??????????????????????",
		mfiltero : ['??????','???????????? ??????????????','???????????? ????????????','????????????'],
		npcsum : "?????????? ???????????????? ?????? NPC",
		npcsumh : '???? ?????????? ?? ????????????????',
		bidinc : "?????? ????????????",
		bidinch : '?????? ?????????????????? ?????????????? ???????????? 4',
		show3x : "???????????????????? ???????????????? ???????????????? ????????????",
		show3xh : '?????????????? ?????????????????????? ?????????????????????? ???????????????? ?????? 3x ?? 2x ????????????????',
		rpandmp : "?????????? ?????????? ?? ??????????",
		incomres : "???????????????????? ?? ?????????????????????? ????????????????",
		incomreso : ['??????','????????','?? ??????????????','???????? ??????????'],
		troopsI : "???????????????????? ?? ??????????????",
		troopsIo : ['??????','????','????????????????'],
		defRP : "???????????????? ???? ?????????????????? ?????? ???????????? ??????????",
		showls : "???????????????????? ????????????",
		showAsSN : "???????????????????????? ???????????? ?????? ???????????? ??????",
		showlso : ['??????','????','?? ????????'],
		savedls : "?????????????????????? ????????????",
		savedd : "?????????????????????? ????????????",
		saveddh : '?????????????? ???????????? ?? ???????????? ?????? ????????????????. ???????? ?????????????? ???????????? ?????????????????? ?????? ?????? ???? ?????? ??????????????????.',
		savedelall : "?????????????? ?????? ????????????",
		savedelallh : '???? ??????????????, ?????? ???????????? ?????????????? ?????? ????????????, ?????????????? ???????????? ?? ???????????? ?????? ?????????????????',
		scrlang : "???????? ??????????????",
		youlang : "?????? ????????",
		notifi : "??????????????????????",
		notification : "???????????????????? ?????????? ??????????????????????????",
		method : "??????????",
		audiourl : "URL ?????????????????? ??????????",
		audiotest : "?????????????????? ????????",
		colorCustomize : "?????????????????? ??????????",
		colorHint : "???????????????? ???????????? ?????? ?????????? ???? ??????????????????",
		color0 : "???????????????? ????????????????",
		color1 : "???????????????? ???????????????? ?? NPC",
		color2 : "???????????????? ???????????????????? <br/>(???????????????????????? ????????????????)",
		color3 : "???????????????? ???????????????????? <br/>(?????????????????????????? ?????????????????????? ????????????/????????????)",
		color4 : "???????????????????????? ??????????????"
	},
	ua: { fb : "ru",
		cancel : "??????????????????",
		close : "??????????????",
		overview : "?????????? ????????????????",
		svers : "???????????? ??????????????",
		settings : "????????????????????????",
		notes : "??????????????",
		res90 : "?? % ???????????????????? ????????????",
		refresh : "??????????????",
		warehouse : "????????????",
		resources : "????????????",
		troops : "??????????????",
		links : "??????????????????",
		linkname : "?????????? ??????????????????",
		linkdel : "???????????????? ??????????????????",
		name2 : "?????????? ????'??",
		archive : "??????????",
		addcur : "???????????? ???? ??????????????????",
		del : "????????????????",
		edit : "??????????????",
		unpin : "????????????????????",
		pin : "??????????????????",
		total : "????????????",
		noplace : "???????? ??????????!",
		hunger : "???????????? ??????????",
		duration : "????????????????????",
		deficit : "??????????????",
		consnegat : "???????????????????? ?? ?????????? ?????????????????? ??????'????????. ???? ?????????????? ???????????? ???????????????? ???????????",
		bmove : "?????????????????????? ????????????????",
		neighbors : "????????????",
		// ??????????????????
		none : '????????',
		auto : "????????.",
		info : "???????????????? ????????????????????",
		yourrace : "?????? ??????????",
 		sspeed : "?????????????????? ??????????????",
		sspeedh : "0 - ????????, 1 (1x), 2 (2x), 3 (3x ?????? ????????????????????), ...",
		ancientC : "AC ????????????",
		ancientCh : "?????????????? AC/AE/EU (Ancient Cities). ?????????? ?????? ?????????????????? ?????????? ??????????????????)",
		speedart : "???????????????? ??????????????????",
		racelist : ['??????????????','????????????????','??????????','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "???????????? ???????????? ???????????????????? ???????????????? (????????????????)",
		crannyh : '?????????? - 80, 70 ?????? ???????????????????? ?????????????? ?????? ?????? ?????????????????? ????????????',
		builtin : "?????????????????? ??????????????????????",
		builtinh : '?????? ?????????????????????? ??????????????????????: ???????????????? ?????????? - ?????????? ???????????????????? ????????????, ?????????????? - ???????????????????? ??????????????????????',
		normalize : '?????????????????? ??????????????????????',
		normal : "??????????????",
		banalyze : "???????????????????? ??????",
		cropfind : "?????????? ?????????????? ?????????????? ????????????",
		adetect : "?????????????????? ????????????",
		adetecto : ['????????????????','?????? ??????????????????','??????????????????'],
		adetecth : "???????????? ???????????? ?????????????????? ???? ??????????????, ?????????????? ??????????????. ???????? ?????????????????? ??????????????????.",
		adetectt : "???????????? ??????????????????",
		buildhint : "???????????????? ???????????????????? ??????????????????????",
		onallp : "???? ???????? ??????????????????",
		buildand : "?????????????????????? ???????????? ?????????????????????? ?? ??????????",
		buildandh : '???????????????????????????? ???? ???????????? ?? ???????????? ????????????????',
		buildands : ['????','??????','??????????????'],
		sendres : "?????????????????????? ???????????? &laquo;?????????????????? ??????????????/????????????&raquo;",
		sendmess : "?????????????????????? ???????????? &laquo;?????????????????? ??????????&raquo;",
		analyzer : "???????????????????? ??????????",
		bigicon : "?????????????????????? ?????????? ?????????? ????????",
		addvtable : "?????????????????????? ?????????????????? ?????????????? ????????????????",
		addvtableo : ['????','??????','??????????????????'],
		opennote : "?????????????????????? ???????????????????? ??????????????",
		notesize : "???????????? ?????????? ??????????????",
		openoview : "?????????????????????? ???????????????????? ?????????? ????????????????",
		resbar : "?????????????? ????????????????",
		showres : "?????????????????????? ?????????????? ???????????????? ?? ????????",
		redbl : "???????????????? (?? ??????????????)",
		yellowbl: "???????????? (?? ??????????????)",
		marketpl : "??????????",
		mfilter : "???????????? ???????????????????? (T3.6)",
		mfiltero : ['??i','???????????? ??????????????','???????????? ????????????','????????????'],
		npcsum : "???????? ???????????????? ?????? NPC",
		npcsumh : '???? ?????????? ???? ????????????????????????',
		bidinc : "???????? ????????????",
		bidinch : '?????? ?????????????????? ?????????????? ???????????? 4',
		show3x : "?????????????????????? ?????????????? ?????????? ??????????????????",
		show3xh : '???????????? ?????????????????????? ???????????????????? ???????????????? ?????? 3x ?? 2x ????????????????????',
		rpandmp : "?????????? ?????????? ???? ??????????",
		incomres : "???????????????????? ?? ???????????????????? ????????????????",
		incomreso : ['????','??????','?? ????????????????????','???????? ??????????'],
		troopsI : "???????????????????? ???? ??????????????",
		troopsIo : ['????','??????','??????????????'],
		defRP : "?????? ???? ?????????????????????? ?????? ???????????? ??????????",
		showls : "?????????????????????? ??????????????????",
		showAsSN : "?????????????????????????????? ?????????????????? ???? ?????????? ?????????",
		showlso : ['????','??????','?? ????????'],
		savedls : "?????????????????? ??????????????????",
		savedd : "?????????????????? ??????????",
		saveddh : '?????????????? ?????????????????? ?? ?????????? ????????? ??????????????????. ???????? ?????????????????? ?????????? ???????????????????? ?????? ???? ???? ?????? ???????????????????.',
		savedelall : "???????????????? ?????? ??????????",
		savedelallh : '???? ????????????????, ???? ?????????????? ???????????????? ?????? ??????????, ?????????????????? ?????????????????? ?? ?????????? ????????? ?????????????????',
		scrlang : "???????? ??????????????",
		youlang : "???????? ????????",
		notifi : "??????????????????????",
		notification : "???????????????????? ?????????? ??????????????????????",
		method : "??????????",
		audiourl : "URL ?????????????????? ??????????",
		audiotest : "???????????????????? ????????",
		colorCustomize : "???????????????????????? ??????????????",
		colorHint : "?????????????? ???????????????? ?????? ?????????????? ???? ??????????????????????",
		color0 : "???????????????? ????????????????",
		color1 : "???????????????? ???????????????? ?? NPC",
		color2 : "???????????????? ???????????????????? <br/>(?????????????????????? ????????????????)",
		color3 : "???????????????? ???????????????????? <br/>(???????????????????? ?????????????? ????????????/????????????)",
		color4 : "???????????????????????? ????????????"
	},
	hu: { // Hungarian language. thx mrzed :)
		// ingame messages
		cancel : "M??gse",
		close : "Bez??r",
		overview : "??ttekint??s",
		svers : "szkript verz??",
		settings : "be??ll??t??sok",
		notes : "jegyzetek",
		res90 : "nyersanyagokat %-ig felt??lteni",
		refresh : "friss??t",
		warehouse : "Rakt??r??p??let",
		resources : "Nyersanyagok",
		troops : "Csapatok",
		links : "Linkek",
		linkname : "link n??v",
		linkdel : "link t??rl??se",
		name2 : "m??sodik n??v",
		archive : "Arch??vum",
		arena : "Gyakorl??t??r",
		total : "??sszesen",
		// settings
		none : "Nincs",
		info : "Inform??ci??k",
		yourrace : "N??p",
		speedart : "Sebess??g ereklye",
		racelist : ['R??mai','Germ??n','Gall','Nature','Natars','Egyptians','Huns','detect'],
		onallp : "Minden oldal",
		buildand : "Visszasz??ml??l??k megjelen??t??se",
		buildandh : 'A faluk list??j??ban (??p??tkez??sek, csapatmozg??sok)',
		sendres : "Nyersanyag-/csapatk??ld??s ikonok megjelen??t??se",
		sendmess : "??zenetk??ld??s ikonok megjelen??t??se",
		bigicon : "Gy??lekez??t??r ikon megjelen??t??se",
		opennote : "Jegyzetek automatikus megnyit??sa",
		resbar : "Nyersanyagkijelz??",
		showres : "Nyersanyagkijelz?? k??l??n ablakban",
		redbl : "piros (??r??ban)",
		yellowbl: "s??rga (??r??ban)",
		marketpl : "Piact??r",
		mfilter : "sz??r??",
		mfiltero : ['nincs','csak ar??ny','csak sz??r??','teljes'],
		rpandmp : "Gy??lekez??t??r ??s piact??r",
		incomres : "Inform??ci?? az ??rkez?? nyersanyagokr??l",
		incomreso : ['ki','be','??sszefoglal??','WW mode'],
		troopsI : "Csapatinform??ci??k",
		showls : "Linkek megjelen??t??se",
		showlso : ['ki','be','ablakban'],
		savedls : "Mentett linkek",
		scrlang : "Szkript nyelve",
		youlang : "Az ??n nyelve"
		//version = verzi??
		//Rally point = Gy??lekez??t??r
	},
	fa: { // Persian, thx Reza Moghadam
		// ingame messages
		ok : "????????????",
		cancel : "??????",
		close : "????????",
		overview : "???????? ??????",
		svers : "???????? ??????????????",
		settings : "??????????????",
		notes : "??????",
		res90 : "% ?????????? ???? ??????",
		warehouse : "??????????",
		resources : "??????????",
		troops : "??????????????",
		links : "???????? ????",
		archive : "??????????",
		arena : "?????????? ??????????",
		// settings
		info : "??????????????",
		yourrace : "???????? ?? ??????",
		speedart : "???????? ????????????",
		racelist : ['???????? ????','???????? ????','???? ????','Nature','Natars','Egyptians','Huns','detect'],
		onallp : "?????? ?? ??????????",
		buildand : "?????????? ?????????? ?????????? ?????????????? ?? ????????",
		buildandh : '???? ???????? ?????????? ????',
		sendres : "?????????? ?????????? ?????? ?????????? ??????????/??????????????",
		sendmess : "?????????? ?????????? ?????? ?????????? ????????",
		bigicon : "?????????? ?????????? ??????????????",
		opennote : "???????????? ???????????? ?????? ????",
		resbar : "???????? ??????????",
		showres : "?????????? ???????? ?????????? ???? ??????????",
		redbl : "???????? (???? ????????)",
		yellowbl: "?????? (???? ????????)",
		marketpl : "??????????",
		mfilter : "??????????",
		mfiltero : ['??????????','???????? ??????????????','?????? ??????????','????????'],
		rpandmp : "?????????????? ?? ??????????",
		incomres : "???????????? ?????????????? ??????????",
		incomreso : ['??????????','????????','??????????','WW mode'],
		showls : "?????????? ?????????? ????",
		showlso : ['??????????','????????','???? ??????????'],
		savedls : "?????????? ???????? ???????? ????"
	},
 ar: { // Arabic, thx ww_start_t
		// ingame messages
		ok : "??????????",
		cancel : "?????????? ??????????",
		close : "??????????",
		overview : "???????? ???????? ?????? ???????? ??????????",
		svers : "?????????? ??????????????",
		settings : "??????????????????",
		notes : "???????? ??????????????????",
		res90 : "?????????????? ?????? % ???????? ????????????",
		refresh : "??????????",
		warehouse : "????????????",
		resources : "??????????????",
		troops : "????????????",
		links : "??????????????",
		linkname : "?????? ????????????",
		linkdel : "?????? ????????????",
		name2 : "?????????? ????????????",
		archive : "??????????????",
		arena : "???????? ??????????????",
		addcur : "??????????",
		del : "????????",
		edit : "??????????",
		unpin : "???? ?????? ????????????",
		pin : "???? ????????????",
		total : "??????????????",
		noplace : "???????????? ??????!",
		hunger : "??????",
		duration : "??????????",
		deficit : "????????????",
		aclock : "????????????\nhh:mm:ss , hh:mm , mm (???? ?????????? ????????????)",
		consnegat : "?????????????? ?????????? ???????? ???????????? ????????. ???? ?????????? ???????????????? ????????????",
		bmove : "?????????? ??????????????",
		neighbors : "??????????????",
		// settings
		none : "??????????",
		auto : "??????",
		info : "??????????????????",
		yourrace : "????????????",
		speedart : "????????????",
		racelist : ['??????????????','??????????????','??????????????','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "???????????? ???????? ???????????? ???????????? (????????????)",
		crannyh : '?????????????????? 80, 70 ????????????????',
		builtin : "??????????????-??????????????",
		builtinh : '?????????? ?????????? ??????????????: ?????????? ???????????? - ?????????? ??????????, ?????????? ???????????? - ???????????? ??????????',
		normalize : '?????????? ??????????????',
		normal : "??????????????????",
		banalyze : "???????? ?????? - ?????????? ??????????????",
		cropfind : "???????? ?????? - ???????? ???? ?????????? ??????????????",
		adetect : "???????? ??????????????(?????? ????????????)",
		adetecto : ['????????','?????????? ?????? ?????????? ????????????','??????????'],
		adetecth : "???????? ?????????? ?????????? ?????? ??????????????, ?????? ???????????? ???????????? ????????????. ?????? ?????? ?????????? ??????????.",
		adetectt : "???????? ???????? ????????????",
		buildhint : "?????????? ????????????",
		onallp : "?????????????? ???????? ???????? ?????? ???????? ??????????????",
		buildand : "?????????? ?????? ?????????????? ???????????????? ?????????? ?????????? ?????????? ",
		buildandh : '???? ?????????? ??????????',
		sendres : "?????????? ?????????????? ?????????? ?????????? ??????????",
		sendmess : "?????? ???????????? ?????????? ?????????? ?????????? ???? ????????",
		analyzer : "???????? ??????????????",
		bigicon : "?????????? ?????????? ???????? ????????????",
		addvtable : "?????? ???????? ??????????",
		addvtableo : ['????????','??????????','??????????'],
		opennote : "?????? ???????? ?????????????????? ??????????",
		notesize : "?????? ???????? ??????????????????",
		openoview : "?????? ?????????? ???????? ???????? ??????????",
		resbar : "???????? ??????????????",
		showres : "?????? ???????? ?????????????? ???? ?????????? ????????????",
		redbl : "?????????? ???????????? (?????? ????????)",
		yellowbl: "?????????? ???????????? (?????? ????????)",
		marketpl : "??????????",
		mfilter : "????????????",
		mfiltero : ['??????????','?????? ????????????','?????? ????????????','?????? ????????'],
		npcsum : "???????? ???????? ????????????????",
		npcsumh : '???? ?????????? ????????????????',
		bidinc : "???????????????? ??????????????",
		bidinch : '???????????????? ????????????4',
		show3x : "???? ?????????? ?????? ???????????????? ???????? ????????",
		show3xh : '?????????? ???????????? ?????? ???????? ???????? ???? ?????????????? ?????? ?????????? ?????????? 3 ???????? ???? ??????????',
		rpandmp : "???????? ???????????? ?? ??????????",
		incomres : "?????? ?????????????? ???? ?????????????? ??????????????",
		incomreso : ['????????','??????????','???? ????????????','?????? ?????????? ????????????'],
		troopsI : "?????????????????? ?????? ????????????",
		troopsIo : ['????????','??????????','???????????? ???? ??????????'],
		defRP : "?????????????? ?????????????????? ?????????? ????????????",
		showls : "?????? ??????????????",
		showAsSN : "???????????? ?????????? ???????????? ???? ?????????? ??????????????????",
		showlso : ['????????','??????????','?????????? ???? ??????????'],
		savedls : "?????????????? ????????????????",
		savedd : "???????????????? ????????????????",
		saveddh : '?????? ???? ?????? ?????????????? ???????????? ????????????. ?????? ???????? ????????????, ???? ?????? ?????????????????? ?????????? ????.',
		savedelall : "?????? ???????? ???????????????? ????????????????",
		savedelallh : '???? ?????? ?????????? ???? ?????? ???????? ???????????????? ????????????????, ?????? ???? ?????? ?????????????? ???????????? ??????????????',
		scrlang : "?????? ??????????????",
		youlang : "????????",
		notifi : "??????????????",
		notification : "???????????? ?????? ???????????? ???????????? ???? ????????????",
		method : "??????????????",
		audiourl : "???????????? ?????????? ????????????",
		audiotest : "???????????? ??????????",
		colorCustomize : "?????????????? ??????????????",
		colorHint : "???????? ???????????? ???????? ?????????????? ?????????? ??????????????",
		color0 : "?????????????? ????????",
		color1 : "???????? ?????????????? ???? ???????? ???????? ???????????????? NPC",
		color2 : "???????????? ?????????????? (???????????? ?????????? ??????????)",
		color3 : "???????????? ?????????????? (?????? ?????? ?????????? ???????? ???????????? ???? ????????????)",
		color4 : "?????????? ???? ???????? ?????????? ????????????"
	},
	fr: { // French translation , thx azukae09
		// ingame messages
		ok : "Ok",
		cancel : "Annuler",
		close : "Fermer",
		overview : "R??sum??",
		svers : "Version du script",
		settings : "configuration",
		notes : "notes",
		res90 : "Ressources ?? % de la capacit??",
		refresh : "rafraichir",
		warehouse : "Entrep??t",
		resources : "Ressources",
		troops : "Troupes",
		links : "Liens",
		linkname : "nom du lien",
		linkdel : "supprimer lien",
		name2 : "deuxi??me nom",
		archive : "Archive",
		arena : "Place du tournoi",
		addcur : "ajouter celui pr??sent",
		del : "supprimer",
		edit : "??diter",
		total : "Total",
		// settings
		none : 'Aucun',
		info : "Information",
		yourrace : "Votre peuple",
		speedart : "Artefact de vitesse",
		racelist : ['Romains','Germains','Gaulois','Nature','Natars','Egyptians','Huns','detect'],
		onallp : "Toutes les pages",
		buildand : "Montrer le compte ?? rebours pour les constructions et les attaques",
		buildandh : 'Dans la liste des villages',
		sendres : "Afficher les ic??nes &laquo;envoyer ressources/troupes&raquo;",
		sendmess : "Afficher les ic??nes &laquo;envoyer message&raquo;",
		analyzer : "Outils et statistiques",
		bigicon : "Afficher le Place de rassemblement ic??ne",
		opennote : "Ouvrir automatiquement les notes",
		resbar : "Barre des ressources",
		showres : "Montrer la barre des ressources dans une fen??tre",
		redbl : "Rouge (en heures)",
		yellowbl: "Jaune (en heures)",
		marketpl : "Place du march??",
		mfilter : "Filtre",
		mfiltero : ['aucun','que le taux','que les filtres','tout'],
		rpandmp : "Place du rassemblement et place du march??",
		incomres : "Info sur les ressources arrivant",
		incomreso : ['Non','Oui','Avec r??sum??','WW mode'],
		showls : "Afficher les liens",
		showlso : ['Non','Oui','Dans une fen??tre'],
		savedls : "Sauver les liens",
		scrlang : "Choix de la langue",
		youlang : "Langue du navigateur",
		noplace : "Plus de place!",
		hunger : "Faim",
		duration : "Dur??e",
		deficit : "D??ficit",
		cranny : "Niveau jaune pour la cachette (pourcentage)",
		crannyh : 'Normal 80, 70 pour classique or artefact de pillage',
		builtin : "Outils integr??s",
		builtinh : 'Pour normaliser la production; rouge ressource la plus demand??e, vert, ressource la moins necessaire',
		normalize : 'Normalisation de la production',
		normal : "Normal",
		banalyze : "Analiseur int??gr?? de bataille",
		cropfind : "Recherche int??gr??e de champs",
		adetect : "Detection des attaques",
		adetecto : ['off','sans freeze','on'],
		adetecth : "Fait des requetes masqu??es au serveur, ce qui viole les r??gles et peut ocasionner une sanction",
		adetectt : "P??riode de d??tection des attaques",
		addvtable : "afficher le tableau additionnel des villages",
		npcsum : "R??sum?? pour le marchand pnj",
		npcsumh : 'Dans les march??s et batiments',
		bidinc : "Incr??ment d'ench??re",
		bidinch : 'Pour les ench??res dans travian4',
		savedelallh : 'Etes vous sur d\'effacer les donn??es sauvegard??es (y compris les liens et le second nom)',
		notification : "Notification apr??s construction",
		method : "M??thode",
		audiourl : "URL de fichier audio",
		audiotest : "test audio"
	},
	hr: { // Croatian translation, thx semiRocket
		// ingame messages
		ok : "U redu",
		cancel : "Odustani",
		close : "Zatvori",
		overview : "Pregled",
		svers : "Verzija skripte",
		settings : "Postavke",
		notes : "Zabilje??ke",
		res90 : "Resursi do % ispunjenja",
		refresh : "Osvje??i",
		warehouse : "Skladi??te",
		resources : "Resursi",
		troops : "Vojska",
		links : "Poveznice",
		linkname : "Ime poveznice",
		linkdel : "Izbri??i poveznicu",
		name2 : "Drugi naziv",
		archive : "Arhiva",
		arena : "Arena",
		addcur : "Dodaj trenutno",
		del : "Izbri??i",
		edit : "Uredi",
		unpin : "Skini",
		pin : "Pri??vrsti",
		total : "Ukupno",
		noplace : "Nema mjesta!",
		hunger : "glad",
		duration : "trajanje",
		deficit : "manjak",
		aclock : "Alarm \nhh:mm:ss , hh:mm , mm (unazad)",
		consnegat : "Potro??nja hrane u naselju je negativna. Koliko minuta ??elite pri??uve?",
		bmove : "Premje??tanje gra??evina",
		neighbors : "susjedi",
		// settings
		none : 'Ni??ta',
		auto : "automatsko",
		info : "Informacije",
		yourrace : "Tvoja jedinica",
		speedart : "Artefakt za brzinu",
		racelist : ['Rimljani','Teutonci','Gali','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "??uta razina ??itnice (postotak)",
		crannyh : 'Normalno 80, 70 za klasi??ne plja??ke ili artefakt',
		builtin : "Ugra??eni alati",
		builtinh : 'Normalizacija produkcije: crveno najvi??e potrebni, a zeleno manje potrebni resursi',
		normalize : 'Normalizacija produkcije',
		normal : "Normalno",
		banalyze : "Ugra??eni analizator bitke",
		cropfind : "Ugra??ena tra??ilica ??itnih (crop) polja",
		adetect : "Detektiranje napada",
		adetecto : ['Isklju??eno','Bez zamrzavanja','Uklju??eno'],
		adetecth : "Radi skrivene zahtjeve prema poslu??itelju kr??e??i pravila. Mo??e dovesti do kazni.",
		adetectt : "Razdoblje detektiranja napada",
		buildhint : "Savjeti za gradnju",
		onallp : "Sve stranice",
		buildand : "Prika??i odbrojavanje izgradnje i napada",
		buildandh : 'Prikazuje se u listi naselja',
		buildands : ['Isklju??eno','Uklju??eno','Prostrano'],
		sendres : "Prika??i ikonice ????alji resurse/vojska??",
		sendmess : "Prika??i ikonicu ????alji poruku??",
		analyzer : "Analizator svijeta",
		bigicon : "Prika??i Okupljali??te ikona",
		addvtable : "Prika??i dodatnu tablicu naselja",
		addvtableo : ['Isklju??eno','Uklju??eno','Zalijepljeno'],
		opennote : "Automatski otvori zabilje??ke",
		notesize : "Veli??ina prozora za zabilje??ke",
		openoview : "Automatski otvori pregled naselja",
		resbar : "Grafikon resursa",
		showres : "Prika??i grafikon u zasebnom prozoru",
		redbl : "Crveno (u satima)",
		yellowbl: "??uto (u satima)",
		marketpl : "Tr??nica",
		mfilter : "Filter",
		mfiltero : ['Isklju??eno','Samo omjer','Samo filter','Potpuno'],
		npcsum : "Sa??etak za NPC",
		npcsumh : 'Prikaz u tr??nici i zgradama',
		bidinc : "Pove??anje ponude",
		bidinch : 'Koristi se za aukcije (Travian 4)',
		show3x : "Predvi??anje kretanja kod 2x i 3x",
		show3xh : 'Poku??ava predvijeti kretanje resursa kod slanja 2x i 3x (Mo??e prikazati neispravne podatke)',
		rpandmp : "Okupljali??te i Tr??nica",
		incomres : "Informacije o dolaze??im resursima",
		incomreso : ['Isklju??eno','Uklju??eno','S kratkim pregledom','WW mod'],
		troopsI : "Informacije o trupama",
		troopsIo : ['Isklju??eno','Uklju??eno','Skeniraj upute'],
		defRP : "Predpostavljena akcija za slanje vojske",
		showls : "Prika??i poveznice",
		showAsSN : "Koristi naziv poveznice kao drugo ime lokacije",
		showlso : ['Isklju??eno','Uklju??eno','U zasebnom prozoru'],
		savedls : "Spremljene poveznice",
		savedd : "Pohranjeni podaci",
		saveddh : 'Uklju??uje linkove i druge nazive naselja. Korisno ako se ra??un bri??e ili ne koristi na Va??em ra??unalu.',
		savedelall : "Izbri??i sve pohranjene podatke",
		savedelallh : 'Jeste li sigurni da ??elite izbrisati sve pohranjene podatke, uklju??uju??i linkove i druge nazive naselja?',
		scrlang : "Jezik skripte",
		youlang : "Tvoj jezik",
		notifi : "Obavijest",
		notification : "obavijest nakon gradnje",
		method : "Metoda",
		audiourl : "URL audio datoteke",
		audiotest : "Testiraj audio",
		colorCustomize : "Opcije boja",
		colorHint : "Pustiti prazno za predpostavljenu boju",
		color0 : "Nadogradnja dostupna",
		color1 : "Nadogradnja dostupna putem NPC-a",
		color2 : "Nadogradnja nije dostupna <br/>(Manjak resursa)",
		color3 : "Nadogradnja nije dostupna <br/>(Nedovoljna razina Skladi??ta/??itnica)",
		color4 : "Nadogra??eno do kraja"
	},
	bs: { fb : "hr", // Bosnian
		arena : "Mejdan",
		marketpl : "Pijaca",
		npcsumh : 'Prikaz na pijaci i zgradama',
		rpandmp : "Mjesto okupljanja i Pijaca",
		color3 : "Nadogradnja nije dostupna (Nedovoljna razina Skladi??ta/Silosa)"
	},
	de: { // German language, thx proll007
		// ingame messages
		ok : "Ok",
		cancel : "Abbrechen",
		close : "Schliessen",
		overview : "Ueberblick",
		svers : "Script Version",
		settings : "Einstellungen",
		notes : "Notizen",
		res90 : "Ressourcen zu % gefuellt",
		refresh : "Refresh",
		warehouse : "Warenhaus",
		resources : "Ressourcen",
		troops : "Einheiten",
		links : "Links",
		linkname : "Linkname",
		linkdel : "Link loeschen",
		name2 : "Zweiter Name",
		archive : "Archiv",
		arena : "Arena",
		addcur : "aktuelle hinzufuegen",
		del : "loeschen",
		edit : "bearbeiten",
		total : "Total",
		// settings
		info : "Information",
		yourrace : "Deine Rasse",
		speedart : "Geschwindigkeitsartefakt",
		racelist : ['Roemer','Teutonen','Gaulier','Nature','Natars','Egyptians','Huns','detect'],
		onallp : "Alle Seiten",
		buildand : "Zeige den Countdown fuer Gebaeude und Einheiten",
		buildandh : 'In der Liste der Doerfer',
		sendres : "Zeige &laquo;sende Ressourcen/Truppen&raquo; Icons",
		sendmess : "Zeige &laquo;sende Nachricht&raquo; Icons",
		analyzer : "World-Analyzer",
		bigicon : "Zeige Versammlungsplatz Icon",
		opennote : "Oeffne Notizen automatisch",
		resbar : "Ressourcenleiste",
		showres : "Zeige Ressourcenleiste im Fenster",
		redbl : "Rot (in Stunden)",
		yellowbl: "Gelb (in Stunden)",
		marketpl : "Marktplatz",
		mfilter : "Filter",
		mfiltero : ['aus','nur Rate','nur Filter','voll'],
		rpandmp : "Versammlungsplatz und Marktplatz",
		incomres : "eingehende Ressourceninfo",
		incomreso : ['aus','an','mit Summe','WW mode'],
		showls : "Zeige Links",
		showlso : ['aus','an','im Fenster'],
		savedls : "Gespeicherte Links",
		scrlang : "Scriptsprache",
		youlang : "Deine Sprache",

		// add by Cyrusx
		none : 'Nichts',
		hunger : "Hunger",
		duration : "Dauer",
		deficit : "Mangel",

		troopsI : "Information ??ber Truppen",
		troopsIo : ['aus','an','scan Hilfe'],
		notification : "Benachrichtigung wenn Bau komplett",
		method : "Methode",
		audiourl : "URL der Audiodatei",
		audiotest : "Audiotest",
		auto : "auto",

		builtin : "Eingebaute Tools",
		builtinh : 'zur Vereinheitlichung der Produktion: Rot - meist ben??tigte Ressource, Gr??n - am wenigsten ben??tigte Ressource',
		normalize : 'Vereinheitlichung der Produktion',
		normal : "Normal",
		banalyze : "Eingebaute Kampfanalyse",
		cropfind : "Eingebauter Getreidefinder",
		addvtable : "Zeige zus??tzliche Dorf??bersicht",
		npcsum : "NPC ??bersicht",
		npcsumh : 'Im Marktplatz und Geb??uden',
		bidinc : "Gebotserh??hung",
		bidinch : 'F??r Auktionen in Travian4',
		defRP : "Voreinstellung f??r Versammlungsplatz",
		savedd : "gespeichert",
		saveddh : 'gespeicherte Links sowie Name, falls Account gel??scht oder nicht Dein Computer',
		savedelall : "L??sche alle gespeicherten Dateien",
		savedelallh : 'Wirklich alles L??schen, inkl. Links und Name?',
		notifi : "Benachrichtigung"
	},
	pt: { // Portuguese language, thx Kendra
		//traduzido por Miguel & Sam - br7
		// mensagens no jogo
		ok : "Ok",
		cancel : "Cancelar",
		close : "Fechar",
		overview : "Resumo",
		svers : "Vers??o do Script",
		settings : "Defini????es",
		notes : "notas",
		res90 : "% de recursos para encher",
		refresh : "atualizar",
		warehouse : "Armaz??m",
		resources : "Recursos",
		troops : "Tropas",
		links : "Links",
		linkname : "nome do link",
		linkdel : "apagar link",
		name2 : "segundo nome",
		archive : "Arquivo",
		arena : "Pra??a de Torneios",
		addcur : "adicionar atual",
		del : "apagar",
		edit : "editar",
		unpin : "soltar",
		pin : "fixar",
		total : "Total",
		noplace : "N??o tem mais espa??o!",
		hunger : "fome",
		duration : "dura????o",
		deficit : "em falta",
		aclock : "Alarme\nhh:mm:ss , hh:mm , mm (a partir de agora)",
		consnegat : "O consumo na aldeia est?? negativo. Quantos minutos precisar?? de reserva?",
		bmove : "Mover Edificio",
		neighbors : "vizinhos",
		// defini????es
		none : "Nenhum",
		auto : "autom??tico",
		info : "Informa????o",
		yourrace : "Sua ra??a",
		sspeed : "Servidor speed",
		sspeedh : "0 - autom??tico, 1 (1x), 2 (2x), 3 (3x), ... etc.",
		speedart : "Velocidade do artefato",
		racelist : ['Romanos','Teut??es','Gauleses','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "N??vel do cereal por celeiro (Porcentagem)",
		crannyh : 'Pr??-definido com 80%, 70% para pilhagem normal ou artefato',
		builtin : "Ferramentas Internas",
		builtinh : 'Para equilibrar a produ????o: a cor Vermelha - recursos que mais precisam; Verde - recursos que menos precisam',
		normalize : 'Equilibrar a produ????o',
		normal : "normal",
		banalyze : "Analisador de Ataque",
		cropfind : "Localizador de Crop's",
		adetect : "Detectar ataques",
		adetecto : ['Desligado','Modo Congelado','Ligado'],
		adetecth : "Esta op????o utiliza a????es ocultas no servidor, violando as regras. Poder?? levar a puni????o do jogo.",
		adetectt : "periodo de detectar ataques",
		buildhint : "Dicas de Constru????o",
		onallp : "Todas as p??ginas",
		buildand : "Mostrar constru????o em contagem regressiva e atacar",
		buildandh : 'Na lista das aldeias',
		buildands : ['Desligado','Ligado','Amplo'],
		sendres : "Mostrar &laquo;Enviar refor??os/tropas&raquo; icons",
		sendmess : "Mostrar &laquo;Enviar mensagem&raquo; icons",
		analyzer : "Site de ferramenta de analise",
		bigicon : "Mostrar Ponto de encontro ??cone",
		addvtable : "Mostrar tabela de aldeias",
		addvtableo : ['Desligado','Ligado','Bloqueado'],
		opennote : "Abrir notas automaticamente",
		notesize : "Tamanha da janela para notas",
		openoview : "Abrir vis??o detalhada das aldeias",
		resbar : "Barra de Recursos",
		showres : "Mostrar barra de recursos na janela",
		redbl : "vermelho (em horas)",
		yellowbl: "amarelo (em horas)",
		marketpl : "Mercado",
		mfilter : "filtro",
		mfiltero : ['desligado','taxa ??nica','somente filtro','cheio'],
		npcsum : "Resumo para NPC",
		npcsumh : 'Apare??e nos mercado e nos edificios',
		bidinc : "Valor aumentado automaticamente no leil??o",
		bidinch : 'S?? disponivel para a vers??o Travian 4',
		show3x : "Fluxo de recursos",
		show3xh : 'Tentativa de prever o fluxo de recursos no envio de 2x e 3x (Pode mostrar dados incorretos)',
		rpandmp : "Ponto de encontro e Mercado",
		incomres : "informa????es de recursos recebidos",
		incomreso : ['desligado','ligado','com sum??rio','Modo WW'],
		troopsI : "Informa????es sobre as tropas",
		troopsIo : ['Desligado','Ligado','Actualizado'],
		defRP : "A????o pr??-definida no envio de tropas",
		showls : "Mostrar links",
		showAsSN : "Usar links como segundo nome",
		showlso : ['desligado','ligado','na janela'],
		savedls : "Links salvos",
		savedd : "Salvar dados",
		saveddh : 'incluindo links e segundo nome. Se uma conta exclu??da, ou n??o o seu computador.',
		savedelall : "Apagar todos os dados salvos",
		savedelallh :  'Tem certeza que deseja apagar todos os dados, incluindo os links e o segundo nome?',
		scrlang : "Idioma do Script",
		youlang : "Seu idioma",
		notifi : "Notifica????es",
		notification : "notifica????o ap??s a constru????o",
		method : "M??todo",
		audiourl : "Link do ficheiro de audio",
		audiotest : "Testar Audio",
		colorCustomize : "Op????es de Cores",
		colorHint : "Deixe em branco para a cor padr??o",
		color0 : "Pronto para evoluir",
		color1 : "Evoluir fazendo NPC",
		color2 : "N??o ?? poss??vel evoluir <br/>(Falta de recursos)",
		color3 : "N??o ?? poss??vel evoluir <br/>(N??o tem armazem e/ou celeiro suficiente)",
		color4 : "Completamente Evoluido"
	},
	bg: { // Bulgarian language, thx Dushevadeca
		// ingame messages
		ok : "????????????????",
		cancel : "????????????",
		close : "??????????????",
		overview : "?????????????? ???? ????????????",
		svers : "???????????? ???? ??????????????",
		settings : "??????????????????",
		notes : "??????????????",
		res90 : "?????????????? ???? %-???? ?????????????????? ???? ????????????",
		refresh : "??????????????",
		warehouse : "??????????",
		resources : "??????????????",
		troops : "????????????",
		links : "?????????? ??????????????",
		linkname : "?????? ???? ??????????????????",
		linkdel : "???????????? ??????????????????",
		name2 : "???????????????????????? ??????",
		archive : "??????????",
		arena : "??????????",
		addcur : "???????????? ????????????????",
		del : "????????????",
		edit : "????????????????",
		unpin : "???????????????????? ????????????????????",
		pin : "??????????????",
		total : "????????",
		noplace : "?????? ???????? ??????????!",
		hunger : "??????????????????",
		duration : "??????????????????????????????",
		deficit : "??????????????",
		aclock : "???????????? ??\nhh:mm:ss , hh:mm , mm (???? ????????)",
		consnegat : "???????????????????????? ???? ???????? ?? ??????????????????. ???? ?????????? ???????????? ?????????? ?????? ???????????",
		bmove : "???????????????? ????????????????",
		neighbors : "????????????",
		// settings
		none : "????????",
		auto : "??????????????????????",
		info : "????????????????????",
		yourrace : "???????????? ??????????",
		speedart : "?????????????????? ????????????????",
		racelist : ['??????','????????????????','????????','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "??????????????????????????????(??????????) ???????? ???? ?????????????????? ???? ???????????????????????? (?? ????????????????)",
		crannyh : '????????????????- 80, 70- ???? ???????????????????? ?????????????? ?????? ?? ?????????????????????? ????????????????',
		builtin : "???????????????? ??????????????????????",
		builtinh : '???? ???????????????????????? ???? ????????????????????????????: ?????????????? - ??????-???????????????????????? ??????????????, ???????????? - ??????-?????????? ??????????',
		normalize : '???????????????????????? ???? ????????????????????????????',
		normal : "???? ??????????????",
		banalyze : "?????????????? ???????????????????? ???? ??????????????",
		cropfind : "???????????????? ???????????????? ???? ?????????? ????????",
		adetect : "?????????????????? ???? ??????????",
		adetecto : ['????????.','?????? ????????????????????','??????.'],
		adetecth : "?????????????? ???????????? ???????????? ?????? ??????????????, ?? ?????????????????? ???? ?????????????????? - ???????? ???? ???????????? ???? ??????????????????!",
		adetectt : "???????????????? ???? ???????????????? ???? ??????????",
		buildhint : "?????????????????? ???? ????????????????????????",
		onallp : "???????????? ????????????????",
		buildand : "???????????????? ?????????????? ???????????? ???? ???????????? ?? ??????????",
		buildandh : '?? ?????????????? ???? ????????????',
		sendres : "???????????????? ???????????? ???????????????? ????????????/??????????????",
		sendmess : "???????????????? ???????????? ???????????????? ????????????????????",
		analyzer : "???????????????????? ???? ?????????????? ????????",
		bigicon : "???????????????? ???????????? ?????????? ????????",
		addvtable : "???????????????? ???????????????????????? ?????????????? ?????? ????????????",
		addvtableo : ['????????','??????','????????????'],
		opennote : "?????????????????????? ???????????????? ???? ??????????????????",
		notesize : "???????????? ???? ?????????????????? ?? ??????????????????",
		openoview : "?????????????????????? ???????????????? ???? ?????????????? ???? ????????????",
		resbar : "???????????????? ??????????",
		showres : "???????????????? ???????????????????? ?????????? ?? ????????????????",
		redbl : "?????????????? (?? ????????????)",
		yellowbl: "?????????? (?? ????????????)",
		marketpl : "??????????",
		mfilter : "???????????? ???? ????????????????",
		mfiltero : ['????????','???????? ??????????????????????','???????? ????????????','??????????'],
		npcsum : "???????? ?????????????? ???? NPC",
		npcsumh : '???? ???????????? ?? ?????? ??????????????',
		bidinc : "???????????????? ???????????????????? ???? ???????????????? ??",
		bidinch : '???? ???????????????????? ?? travian4',
		show3x : "???? ?????????????? ???? ???????????????? ?????????????? ??????????",
		show3xh : '???? ???????????? ???? ?????????????????? ?????????????????????????? ???? ?????????????? ?????? 3-???? ?? 2-???? ??????????????????',
		rpandmp : "???????????? ?????????? ?? ??????????",
		incomres : "???????????????????? ???? ?????????????????????????? ???? ??????????????",
		incomreso : ['????????','??????','?? ??????????????????????','????????-??????????'],
		troopsI : "???????????????????? ???? ????????????",
		troopsIo : ['????????','??????','????????????????????'],
		defRP : "???????????????? ???? ???????????????????????? ???? ????. ??????????",
		showls : "???????????? ??????????????",
		showAsSN : "?????????????????? ?????????????? ???????? ?????????? ??????",
		showlso : ['????????','??????','?? ????????????????'],
		savedls : "?????????????????? ??????????????",
		savedd : "?????????????????? ??????????",
		saveddh : '??????. ?????????????????? ?? ???????????????????????????? ?????????? ???? ????????????. ?? ????????????, ???? ???????????????? ?????????????? ?????? ???????? ???? ?? ?????? ????????????????.',
		savedelall : "?????????????????? ???? ?????????????????????? ???????????????????? ?? ??????????????????",
		savedelallh : '?????????????? ??????, ???? ???????????? ???? ???????????????? ??????????????, ??????. ?????????????? ?? ???????????????????????????? ?????????? ???? ?????????',
		scrlang : "???????? ???? ??????????????",
		youlang : "???????????? ????????",
		notifi : "??????????????????????",
		notification : "?????????????????????? ???????? ?????????????????????? ???? ????????????",
		method : "??????????",
		audiourl : "URL ???? ???????????? ????????",
		audiotest : "?????????????????? ??????????",
		colorCustomize : "?????????????? ??????????????????",
		colorHint : "???????????????? ???????????? ???? ???????? ???? ????????????????????????",
		color0 : "???????????????? ??????????????????????",
		color1 : "?????????????????????? ?? NPC-????????????????",
		color2 : "???????????????????? ??????????????????????(???????????????????????? ??????????????)",
		color3 : "???????????????????? ??????????????????????(???????????????????????? ?????????????????? ???? ??????????/????????????)",
		color4 : "???????????????? ????????"
	},
	ro: { // Romanian language, thx bubulu
		// ingame messages
		ok : "Ok",
		cancel : "Anuleaz??",
		close : "??nchide",
		overview : "privire general??",
		svers : "versiune script",
		settings : "set??ri",
		notes : "note",
		res90 : "resurse p??na la %",
		refresh : "re??mprospatare",
		warehouse : "Hambar",
		resources : "Resurse",
		troops : "Trupe",
		links : "Link-uri",
		linkname : "nume link",
		linkdel : "??terge link",
		name2 : "al doilea nume",
		archive : "Arhiv??",
		arena : "Nivel aren??",
		addcur : "adaug?? curent",
		del : "??terge",
		edit : "editeaz??",
		unpin : "anuleaz?? fixarea",
		pin : "fixeaz??",
		total : "Total",
		noplace : "nu este loc!",
		hunger : "foame",
		duration : "durat??",
		deficit : "deficit",
		aclock : "Alarm?? ceas\nhh:mm:ss , hh:mm , mm (din acest moment)",
		consnegat : "Consumul de hran?? ??n acest sat este negativ. Pentru c??te minute este nevoie de rezerv?? de hran???",
		bmove : "Mut?? cl??dirile",
		neighbors : "vecini",
		// settings
		none : 'None',
		auto : "auto",
		info : "Informa??ii",
		yourrace : "Tribul dvs.",
		sspeed : "Viteza server-ului",
		sspeedh : "0 - auto, 1 (1x), 2 (2x), 3 (3x aka speed), ... etc.",
		servertype : "Tipul serverului de Travian",
		servertypeh : "Tipuri de servere: Travian Legends, Travian Path to Pandora",
		servertypeo : ['update','Path to Pandora','Legends'],
		speedart : "Artefact de vitez??",
		racelist : ['Romani','Barbari','Daci','Natura','Natari','Egipteni','Huni','detectaz??'],
		cranny : "Culoarea galben?? la beci (??n procente)",
		crannyh : 'normal 80%, 70% pentru server clasic',
		builtin : "Unelte incluse",
		builtinh : 'pentru normalizarea produc??iei: culoarea ro??ie - cea mai mare nevoie de resurse, verde - cea mai mic?? nevoie de resurse',
		normalize : 'Normalizarea produc??iei',
		normal : "normal",
		banalyze : "Analizor de lupt?? integrat",
		cropfind : "C??ut??tor de c15 integrat",
		adetect : "Detector de atacuri",
		adetecto : ['off','f??r?? blocare','on'],
		adetecth : "face cereri ascunse la server, care ??ncalc?? regulile. poate duce la penalizare.",
		adetectt : "Perioada de detectare a atacurilor",
		buildhint : "Sfaturi pentru construc??ii (culori)",
		onallp : "Toate paginile",
		buildand : "Arat?? num??r??toarea invers?? pentru construc??ii ??i atacuri",
		buildandh : '??n lista satelor',
		buildands : ['off','on','detaliat'],
		sendres : "Arat?? icoana &laquo;trimite resurse/trupe&raquo;",
		sendmess : "Arat?? icoana &laquo;trimite mesaj&raquo;",
		analyzer : "Analizor server",
		bigicon : "Arat?? icoana pentru Adunare",
		addvtable : "Arat?? lista suplimentar?? cu sate",
		addvtableo : ['off','on','fix'],
		opennote : "Deschide fereastra de noti??e automat",
		notesize : "Dimensiunea ferestrei de noti??e",
		openoview : "Deschide fereastra cu privirea general?? automat",
		resbar : "Bara de resurse",
		showres : "Afi??eaz?? bara de resurse ??n fereastr??",
		redbl : "ro??u (??n ore)",
		yellowbl: "galben (??n ore)",
		marketpl : "T??rg",
		mfilter : "Fitru",
		mfiltero : ['off','doar rate','doar filtru','complet'],
		npcsum : "Sumar pentru NPC",
		npcsumh : 'la t??rg ??i la cl??diri',
		bidinc : "M??re??te oferta licita??iilor cu (??n argin??i)",
		bidinch : 'Introdu 0 pentru a dezactiva func??ia',
		show3x : "Prezice fluxul de resurse la trimiterea cu 3x ??i 2x",
		show3xh : 'poate afi??a informa??ii imprecise',
		rpandmp : "Adunare ??i T??rg",
		incomres : "Informa??ii resurse ce sosesc",
		incomreso : ['off','on','cu sumar','mod WW'],
		troopsI : "Informa??ii despre trupe",
		troopsIo : ['off','on','scan help'],
		defRP : "Ac??iune implicit?? la adunare",
		showls : "Arat?? link-uri",
		showAsSN : "Folosi??i link-urile cu numele secundar",
		showlso : ['off','on','??n fereastr??'],
		savedls : "link-uri salvate",
		savedd : "Date salvate",
		saveddh : 'inclusiv link-urile ??i numele secundare ale satelor. If an Account deleted, or not your computer.',
		savedelall : "??terge toate datele",
		savedelallh : 'E??ti sigur c?? vrei s?? ??tergi toate datele, inclusiv link-urile ??i numele secundare ale satelor?',
		scrlang : "Limb?? script",
		youlang : "Limba browser-ului",
		notifi : "Notific??ri",
		notification : "notificare dup?? construc??ie",
		method : "Metoda",
		audiourl : "URL of audio file",
		audiotest : "Test audio",
		colorCustomize : "Op??iuni culori",
		colorHint : "las?? gol pentru culorile implicite",
		color0 : "Upgrade disponibil",
		color1 : "Upgrade via NPC",
		color2 : "Upgrade-ul nu este posibil <br/>(nu sunt suficiente resurse)",
		color3 : "Upgrade-ul nu este posibil <br/>(gr??narele / hambarele nu au capacitatea suficient??)",
		color4 : "Nivel final"
	},
	sr: { // Serbian language, thx jokusaet
		// ingame messages
		ok : "Ok",
		cancel : "????????????",
		close : "??????????????",
		overview : "??????????????",
		svers : "?????????????? ??????????????",
		settings : "????????????????????",
		notes : "??????????????",
		res90 : "?????????????? ???? % ??????????????????????",
		refresh : "????????????",
		warehouse : "??????????????????",
		resources : "??????????????",
		troops : "????????????????",
		links : "??????????????",
		linkname : "?????? ??????????",
		linkdel : "???????????? ????????",
		name2 : "?????????? ??????",
		archive : "????????????",
		arena : "?????????????? ??????????",
		addcur : "?????????? ???????????????? ????????????",
		del : "????????????",
		edit : "????????????",
		total : "????????????",
		noplace : "???????? ?????????????? ??????????!",
		hunger : "????????",
		duration : "??????????????",
		deficit : "??????????????",
		// settings
		none : "??????????",
		auto : "????????",
		info : "????????",
		yourrace : "?????????? ????????",
		speedart : "???????????????? ??????????",
		racelist : ['??????????????','????????????????','????????','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "???????? ???????? ???????????? (????????????????)",
		crannyh : '???????????????? 80, 70 ???? ???????????????? ?? ????????????????',
		builtin : "???????????????? ??????????",
		builtinh : '???? ?????????????????????????? ????????????????????: ???????????? ???????? - ?????????????????????????? ??????????????, ???????????? - ???????? ???????????????? ??????????????',
		normalize : '?????????????????????????? ????????????????????',
		normal : "????????????????",
		banalyze : "?????????????? ???????????????????? ??????????",
		cropfind : "???????????????? ?????????????????????? ??????????????",
		onallp : "?????? ????????????",
		buildand : "???????????? ?????????????????????? ?????????????????? ?? ??????????",
		buildandh : '?? ?????????? ????????',
		sendres : "?????????????? &laquo;???????????? ??????????????/????????????????&raquo; ??????????",
		sendmess : "?????????????? &laquo;???????????? ????????????&raquo; ??????????",
		analyzer : "World analyzer",
		bigicon : "?????????????? ?????????? ???????????????? ??????????",
		addvtable : "?????????????? ?????????????? ???????????? ???? ???????????? ????????",
		opennote : "???????????????????? ???????????? ??????????????",
		resbar : "???????????? ???? ??????????????????",
		showres : "?????????????? ???????????? ???? ?????????????????? ?? ??????????????",
		redbl : "???????????? (?? ????????????)",
		yellowbl: "???????? (?? ????????????)",
		marketpl : "????????????",
		mfilter : "????????????",
		mfiltero : ['????????????????','???????? ??????????','???????? ????????????','????????'],
		npcsum : "???????? ???? ??????",
		npcsumh : '?? ???????????? ?? ????????????????',
		bidinc : "???????????????? ???????????? ???? ??????????",
		bidinch : '???? ?????????????? ???? ??4',
		rpandmp : "?????????? ???????????????? ?? ????????????",
		incomres : "???????? ?? ?????????????????? ??????????????????",
		incomreso : ['????????????????','??????????????','???? ??????????','WW ??????'],
		troopsI : "?????????????????????? ?? ????????????????????",
		troopsIo : ['??????????????????','????????????????','?????????? ?????? ??????????????????'],
		defRP : "?????????????????????????? ???????????? ?? ?????????? ????????????????",
		showls : "?????????????? ??????????????",
		showlso : ['??????????????????','????????????????','?? ??????????????'],
		savedls : "???????????????? ??????????????",
		savedd : "???????????????? ????????????",
		saveddh : '???????????????????? ?????????????? ?? ?????????? ??????. ?????????????? ???? ?????????? ??????????????, ?????? ???????? ???????? ??????????????????.',
		savedelall : "???????????? ?????? ???????????????? ??????????????",
		savedelallh : '???? ???? ???? ?????????????? ???? ?????????? ???? ?????????????? ?????? ???????????????? ??????????????, ???????????????????? ?? ?????????????? ?? ?????????? ???????',
		scrlang : "?????????? ????????????",
		youlang : "???????? ??????????",
		notifi : "????????????????????????",
		notification : "???????????????????????? ???? ????????????????",
		method : "????????????",
		audiourl : "?????? ?????????? ??????????",
		audiotest : "???????????????? ??????????",
		// thx Stevan
		neighbors : "????????????",
		colorCustomize : "???????????? ????????",
		colorHint : "???????????? ???????????? ???? ?????????????????????????? ????????",
		color0 : "???????????????????? ????????????",
		color1 : "???????????????????? ???????? ??????",
		color2 : "???????????????????? ???????? ????????????<br/>(???????? ?????????????? ??????????????)",
		color3 : "???????????????????? ???????? ????????????<br/>(?????????????????? ?????????????????? ????????????/??????????????????)",
		color4 : "???????????????? ????????"
	},
	pl: { // Polish translation, thx aren
		// ingame messages
		ok : "Ok",
		cancel : "Anuluj",
		close : "Zamknij",
		overview : "Przegl??d",
		svers : "wersja skryptu",
		settings : "ustawienia",
		notes : "notatki",
		res90 : "??rodk??w na % nape??niania",
		refresh : "od??wie??",
		warehouse : "Magazyn",
		resources : "Surowce",
		troops : "Jednostki",
		links : "Linki",
		linkname : "nazwa linka",
		linkdel : "usu?? link",
		name2 : "druga nazwa",
		archive : "Archiwum",
		arena : "Plac Turniejowy",
		addcur : "dodaj bie????cy",
		del : "usu??",
		edit : "edytuj",
		total : "Razem",
		noplace : "Nie ma miejsca!",
		hunger : "g????d",
		duration : "czas trwania",
		deficit : "deficyt",
		// settings
		none : "Brak",
		auto : "auto",
		info : "Informacja",
		yourrace : "Twoja rasa",
		speedart : "Pr??dko???? artefaktu",
		racelist : ['Rzymianie','Germanie','Galowie','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "??????ty poziom kryj??wki (procent)",
		crannyh : 'normalny 80, 70 do grabie??y na klasycznym lub artefakcie',
		builtin : "Wbudowane narz??dzia",
		builtinh : 'dla normalizacji produkcji: kolor czerwony - najwi??cej ??rodk??w potrzeba, zielony - potrzeba mniej zasob??w',
		normalize : 'normalizacja produkcji',
		normal : "normalny",
		banalyze : "Wbudowany analizator bitwy",
		cropfind : "Wbudowany poszukiwacz crop??w",
		onallp : "Wszystkie strony",
		buildand : "Pokaz odliczanie budynku i ataku",
		buildandh : 'Na li??cie osad',
		sendres : "Pokaz &laquo;wy??lij surowce/jednostki&raquo; ikony",
		sendmess : "Pokaz &laquo;wy??lij wiadomo????&raquo; ikony",
		analyzer : "World analyzer",
		bigicon : "Pokaz Miejsce zbi??rki ikona",
		addvtable : "Pokaz dodatkowa tablice osad",
		opennote : "Automatycznie otw??rz notatnik",
		resbar : "Tabela surowc??w",
		showres : "Pokaz tabele surowc??w w oknie",
		redbl : "czerwony (w godzinach)",
		yellowbl: "??????ty (w godzinach)",
		marketpl : "Rynek",
		mfilter : "filter",
		mfiltero : ['off','tylko stawki','tylko filter','wszystko'],
		npcsum : "podsumowanie dla NPC",
		npcsumh : 'na rynku i budynkach',
		bidinc : "przebicie oferty",
		bidinch : 'na aukcji travian4',
		rpandmp : "Miejsce zbi??rki i Rynek",
		incomres : "informacja o przychodz??cych surowcach",
		incomreso : ['off','on','z podsumowaniem','WW mode'],
		troopsI : "Informacja o jednostkach",
		troopsIo : ['off','on','scan help'],
		defRP : "domy??lna akcja dla Miejsca zbi??rki",
		showls : "Pokaz linki",
		showlso : ['off','on','w oknie'],
		savedls : "zapisane linki",
		savedd : "zapisane dane",
		saveddh : 'w tym Linki i Druga nazwa. Je??li konto usuni??te, albo nie tw??j komputer.',
		savedelall : "usun???? wszystkie zapisane dane",
		savedelallh : 'Czy na pewno chcesz usun???? wszystkie dane, w tym linki i druga nazwe?',
		scrlang : "J??zyk skryptu",
		youlang : "tw??j j??zyk",
		notifi : "powiadomienie",
		notification : "powiadomienia po zako??czeniu budowy",
		method : "metoda",
		audiourl : "Adres URL pliku audio",
		audiotest : "test audio"
	},
	sv:{ // Swedish translation, thx Dragon from the future
		// Meddelande,
		ok : "Ok",
		cansel : "Avbryt",
		close : "St??ng",
		Overview : "??verblick",
		svers : "script version",
		setting : "inst??llningar",
		notes : "Anteckningar",
		res90 : "Resurser ??ver 90 %",
		refresh : "Uppdatera",
		warehouse : "Magasin",
		resources : "R??varor",
		troops : "Soldater",
		links : "L??nkar",
		linkname : "L??nknamn",
		linkdel : "Radera l??nk",
		name2 : "Andra namn",
		archive : "Arkiv",
		arena : "Torneplats",
		addcur : "L??gg till nuvarande",
		del : "radera",
		edit : "??ndra",
		total : "Totalt",
		noplace : "Det finns ingen plats",
		hunger : "Sv??lt",
		duration : "Varaktighet",
		deficit : "Underskott",
		// inst??llningar
		none : "Inga",
		auto : "auto",
		info : "Information",
		yourrace : "Din stam",
		speedart : "Titanskor",
		racelist : ['Romare','Germaner','Galler','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "Gul niv?? p?? grotta (procent)",
		crannyh : "Normal 80, 70 f??r klssisk eller artefakt-plundrare",
		builtin : "Inbyggda hj??lpmedel",
		builtinh : "F??r att ??terst??lla produktionen: r??d f??rg - Beh??vs mest resurser, green - beh??vs mindre resurser",
		normalize : "??terst??ll produktionen",
		normal : "normal",
		banalyze : "inbyggd analysator f??r slag",
		cropfins : "inbyggd veteby-finnare",
		onallp : "Alla sidor",
		buildand : "Visa byggnings och attack nedr??kning",
		buildandh : "I bylistan",
		sendres : "Visa &laquo;s??nd r??varor/trupper&raquo; ikoner",
		sendmess : "Visa Skicka meddelande ikoner",
		analyzer : "V??rldsanalysator",
		bigicon : "Visa samlingsplats ikoner",
		addvtable : "Visa extra bylista",
		opennote : "??ppnar automatisk anteckningar",
		resbar : "R??varor-f??lt",
		showres : "Visa r??varor-f??ltet i ett eget f??nster",
		redbl : "r??d (i timmar)",
		yellowbl : "yellow (i timmar)",
		marketpl : "Marknadsplats",
		mfilter : "Filter",
		mfiltero : ['av','Endast v??rde','Endast filter','full'],
		npcsum : "summering f??r NPC",
		npcsumh : "I marknadsplats och och byggnader",
		incomres : "ikommande r??varo-info",
		incomreso : ['av','p??','med sammanfattning','V??rldsunder'],
		troppsl : "Information om soldaterna",
		troopslo : ['av','p??','i f??nster'],
		defRP : "F??rvald attacktyp p?? samlingsplats",
		showls : "Visa l??nkar",
		showlso : ['av','p??','i f??nster'],
		savedls : "sparade l??nkar",
		savedd : "sparad data",
		saveddh : 'Inkluderar l??nkar och andra-namn. ??r ett konto raderat, eller inte din dator.',
		savedelall : "Radera all sparad data",
		savedelallh : '??r du s??ker p?? att du vill radera all data, l??nkar och andra namnp?? byar?',
		scrlang : "Script spr??k",
		youlang : "ditt spr??k",
		notifi : "notifikation",
		notification : "Notifikation efter byggande",
		method : "metod",
		audiourl : "URL f??r ljudfil",
		audiotest : "ljudtest"
	},
	it: { // Italian translation , Dragonflame
		// ingame messages
		ok : "Ok",
		cancel : "Cancella",
		close : "Chiudi",
		overview : "Mostra",
		svers : "Versione dello script",
		settings : "Configurazione",
		notes : "Blocco note",
		res90 : "Risorse a % della capacit??",
		refresh : "Aggiorna",
		warehouse : "Magazzino",
		resources : "Risorse",
		troops : "Truppe",
		links : "Links",
		linkname : "Nome del link",
		linkdel : "Cancella link",
		name2 : "Secondo Nome",
		archive : "Archivio",
		arena : "Arena",
		addcur : "Aggiungi corrente",
		del : "Cancella",
		edit : "Modifica",
		total : "Totale",
		noplace : "Non c'?? posto!",
		hunger : "Fame",
		duration : "Durata",
		deficit : "Deficit",
		// settings
		none : 'Nessuno',
		auto : "auto",
		info : "Informazioni",
		yourrace : "La tua Trib??:",
		speedart : "Artefatto velocit??",
		racelist : ['Romani','Teutoni','Galli','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "Livello giallo della capacit?? del deposito segreto (%)",
		crannyh : 'Normalmente 80; Per il server classico o per artefatto del Ladro 70;',
		builtin : "Strumenti Integrati",
		builtinh : 'Per la produzione ottimizzata: Rosso = Servono pi?? risorse; Verde = servono meno risorse;',
		normalize : 'Produzione ottimizzata',
		normal : "Risorse",
		banalyze : "Analizzatore di Battaglia integrato",
		cropfind : "Trova Canarini integrato",
		adetect : "Rilevatore d'attacchi",
		adetecto : ['Spento','Senza Blocco','Acceso'],
		adetecth : "Fa richieste al server di nascosto, violando le regole. Punibile.",
		adetectt : "Periodo di rilevamento attacco",
		onallp : "Su tutte le pagine",
		buildand : "Mostra il conto alla rovescia per gli edifici e gli attacchi",
		buildandh : 'Nella lista dei villaggi',
		sendres : "Mostra le icone ??invia risorse / truppe??",
		sendmess : "Mostra icone ??invia messaggio??",
		analyzer : "World analyzer",
		bigicon : "Mostra icone di Base Militare",
		addvtable : "Mostra una tabella villaggi aggiuntiva ",
		opennote : "Aprire il blocco note automaticamente",
		resbar : "Tabella delle Risorse",
		showres : "Mostra la tabella delle risorse in una finestra",
		redbl : "Rosso (in ore)",
		yellowbl: "Giallo (in ore)",
		marketpl : "Mercato",
		mfilter : "Filtri",
		mfiltero : ['Nessuno','Solo tasso','Solo filtro','Tutti'],
		npcsum : "Riepilogo per NPC",
		npcsumh : 'Nel mercato e negli edifici',
		bidinc : "Incremento dell'offerta",
		bidinch : 'Per le aste travian4',
		rpandmp : "Base Militare e Mercato",
		incomres : "Info sulle risorse in arrivo",
		incomreso : ['No','Si','Con risultati','Modalit?? Meraviglia'],
		troopsI : "Informazioni sulle truppe",
		troopsIo : ['Spento','Acceso','Scansione di aiuto'],
		defRP : "Azione predefinita per ??Invia truppe??",
		showls : "Mostra link",
		showlso : ['No','Si','In una finestra'],
		savedls : "Salva link",
		savedd : "Salva Dati",
		saveddh : 'Incluso Links e Secondo nome. Se un Account viene cancellato, o non ?? il tuo computer.',
		savedelall : "Cancella tutti i dati",
		savedelallh : 'Sei sicuro di voler cancellare tutti dati, incluso i links ed i Secondi nomi?',
		scrlang : "Scelta della lingua",
		youlang : "Lingua del browser",
		notifi : "Notifiche",
		notification : "Notifica dopo il completamento della construzione",
		method : "Metodo",
		audiourl : "URL del file audio",
		audiotest : "test audio"
	},
	es: {// Spanish translation. neonsp
		// ingame messages
		ok : "Ok",
		cancel : "Cancelar",
		close : "Cerrar",
		overview : "Vista previa aldeas",
		svers : "Versi??n Script",
		settings : "Ajustes",
		notes : "notass",
		res90 : "recursos hasta % llenado",
		refresh : "actualizar",
		warehouse : "Almacen",
		resources : "Recursos",
		troops : "Tropas",
		links : "Enlaces",
		linkname : "Nombre enlace",
		linkdel : "Borrar enlace",
		name2 : "Segundo nombre",
		archive : "Archivo",
		arena : "Plaza de torneos",
		addcur : "a??adir actual",
		del : "borrar",
		edit : "editar",
		unpin : "unfix",
		pin : "fix",
		total : "Total",
		noplace : "No hay sitio!",
		hunger : "Hambre",
		duration : "duraci??n",
		deficit : "Deficit",
		aclock : "Alarma Reloj\nhh:mm:ss , hh:mm , mm (desde ahora)",
		consnegat : "El consumo en esta aldea es negativoive. Cuantos minutos necesita de reserva?",
		bmove : "Mover edificios",
		neighbors : "vecinos",
		// settings
		none : "Ninguno",
		auto : "auto",
		info : "Informaci??n",
		yourrace : "Raza",
		speedart : "Artefacto de velocidad",
		racelist : ['Romanos','Germanos','Galos','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "Nivel amarillo para el granero ( porcentaje )",
		crannyh : 'normal 80, 70 para cl??sico o artefacto de saqueo',
		builtin : "Herramientas adjuntas",
		builtinh : 'Para normalizar la producci??n: Rojo - M??s recursos necesarios, Verde - menos recursos necesarios',
		normalize : 'Normalizado de la producci??n',
		normal : "normal",
		banalyze : "Analizador de batallas",
		cropfind : "Buscador de cerealeras",
		adetect : "Detectar ataques",
		adetecto : ['No','Sin pausa','Si'],
		adetecth : "realiza peticiones en segundo plano al servidor, violando las normas. Puedes ser sancionado por ello.",
		adetectt : "Frecuencia de detecci??n de ataques",
		buildhint : "Consejos de construcci??n",
		onallp : "Todas las p??ginas",
		buildand : "Mostrar cuenta atr??s de construcciones y ataques",
		buildandh : 'En la lista de aldeas',
		buildands : ['Si','No','Ancho'],
		sendres : "Mostrar iconos de &laquo;enviar recursos/tropas&raquo; ",
		sendmess : "Mostrar iconos de &laquo;enviar mensaje&raquo; ",
		analyzer : "Analizador del Mapa",
		bigicon : "Mostrar Plaza de reuniones icono",
		addvtable : "Mostrar tabla adicional de aldea",
		addvtableo : ['Si','No','Fijado'],
		opennote : "Abrir autom??ticamente las notas",
		notesize : "Tama??o de la ventana de notas",
		openoview : "Abrir autom??ticamente visi??n general de aldeas",
		resbar : "Barra de recursos",
		showres : "Mostrar recursos en la ventana",
		redbl : "Rojo (en horas)",
		yellowbl: "Amarillo (en horas)",
		marketpl : "Mercado",
		mfilter : "Filtro",
		mfiltero : ['Si','Solo ratio','Solo filtro','Completo'],
		npcsum : "Resumen para NPC",
		npcsumh : 'en mercado y edificios',
		bidinc : "Aumento de puja",
		bidinch : 'Para subastas de Travian4',
		show3x : "Intentar predecir el flujo de recrusos con doble y triple envio",
		show3xh : 'Puede ser incorrecto',
		rpandmp : "Plaza de reuniones y mercado",
		incomres : "Informaci??n de recursos entrantes",
		incomreso : ['Si','No','Con resumen','Modo maravilla'],
		troopsI : "Information about the troops",
		troopsIo : ['Si','No','Ayuda de escaneo'],
		defRP : "Acci??n por defecto en plaza reuniones",
		showls : "Mostrar enlaces",
		showAsSN : "Usar enlaces con el segundo nombre",
		showlso : ['Si','No','en ventana'],
		savedls : "Enlaces guardados",
		savedd : "Datos guardados",
		saveddh : 'Incluyendo enlaces y segundo nombre. If an Account deleted, or not your computer.',
		savedelall : "Borrar todos los datos almacenados",
		savedelallh : '??Realmente deseas borrar todo los datos, incluyendo los enlaces y segundos nombres?',
		scrlang : "Idioma del Script",
		youlang : "Tu idioma",
		notifi : "notificaci??n",
		notification : "Notificaci??n al finalizar construci??n",
		method : "M??todo",
		audiourl : "URL del archivo de audio",
		audiotest : "prueba del audio",
		colorCustomize : "Opciones de colores",
		colorHint : "dejar en blanco para el color por defecto",
		color0 : "mejora disponible",
		color1 : "mejorar mediante NPC",
		color2 : "Mejora imposible <br/>(Recursos insuficientes)",
		color3 : "Mejora imposible <br/>(Capacidad de granero o almacenes insuficiente)",
		color4 : "M??ximo nivel"
	},
	zh: {// Chinese (Taiwan) (tw and cn and hk) translation. atg008782
		// ????????????(ingame messages)
		ok : "??????",
		cancel : "??????",
		close : "??????",
		overview : "????????????",
		svers : "????????????",
		settings : "??????",
		notes : "??????",
		res90 : "?????? % ??????",
		refresh : "??????",
		warehouse : "??????",
		resources : "??????",
		troops : "??????",
		links : "??????",
		linkname : "????????????",
		linkdel : "????????????",
		name2 : "????????????",
		archive : "??????",
		arena : "?????????",
		addcur : "??????",
		del : "??????",
		edit : "??????",
		unpin : "?????????",
		pin : "??????",
		total : "??????",
		noplace : "????????????!",
		hunger : "??????",
		duration : "??????",
		deficit : "??????",
		aclock : "????????????\nhh:mm:ss , hh:mm , mm (????????????)",
		consnegat : "????????????????????????????????????. ????????????????????????????",
		bmove : "????????????",
		// ??????(settings)
		none : "???",
		auto : "??????",
		info : "??????",
		yourrace : "????????????",
		speedart : "???????????????",
		racelist : ['??????','??????','??????','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "??????????????? (?????????)",
		crannyh : '?????? 80, 70 ????????????????????????',
		builtin : "????????????",
		builtinh : '????????????????????????-???????????????????????????-?????????????????????',
		normalize : '????????????',
		normal : "??????",
		banalyze : "?????????????????????",
		cropfind : "???????????????",
		adetect : "????????????",
		adetecto : ['??????','w/o??????','??????'],
		adetecth : "?????????????????????????????????????????????????????????.",
		adetectt : "??????????????????",
		buildhint : "????????????",
		onallp : "????????????",
		buildand : "?????????????????????????????????",
		buildandh : '????????????',
		sendres : "?????? ??????/?????? ????????????",
		sendmess : "???????????????????????? ",
		analyzer : "????????????",
		bigicon : "??????????????????",
		addvtable : "????????????????????????",
		addvtableo : ['??????','??????','??????'],
		opennote : "??????????????????",
		notesize : "??????????????????",
		openoview : "????????????????????????",
		resbar : "?????????",
		showres : "?????????????????????",
		redbl : "???(?????????)",
		yellowbl: "???(?????????)",
		marketpl : "??????",
		mfilter : "??????",
		mfiltero : ['??????','????????????','????????????','??????'],
		npcsum : "??????????????????(NPC)",
		npcsumh : '??????????????????',
		bidinc : "????????????",
		bidinch : ' travian 4 ??????',
		show3x : "??????????????????????????????",
		show3xh : '??????????????? 3??? ??? 2??? ???????????????',
		rpandmp : "????????? ??? ??????",
		incomres : "??????????????????",
		incomreso : ['??????','??????','????????????','????????????'],
		troopsI : "????????????",
		troopsIo : ['??????','??????','????????????'],
		defRP : "???????????????",
		showls : "????????????",
		showAsSN : "??????????????????",
		showlso : ['??????','??????','????????????'],
		savedls : "????????????",
		savedd : "????????????",
		saveddh : '?????????????????????????????????,??????????????????????????????????????????',
		savedelall : "????????????????????????",
		savedelallh : '??????????????????????????????????????????????????????????????????',
		scrlang : "????????????",
		youlang : "????????????",
		notifi : "??????",
		notification : "??????????????????",
		method : "??????",
		audiourl : "????????????",
		audiotest : "????????????"
	},
	tr: { // Turkish language. xpugur
		// ingame messages
		ok : "Tamam",
		cancel : "iptal",
		close : "Kapat",
		overview : "K??ylerin genel g??r??n??m??",
		svers : "kod versiyonu",
		settings : "ayarlar",
		notes : "notlar",
		res90 : "kaynaklar doluyor % ",
		refresh : "yenile",
		warehouse : "Depo",
		resources : "Kaynaklar",
		troops : "Askerler",
		links : "Ba??lant??lar",
		linkname : "ba??lant?? ad??",
		linkdel : "ba??lant??y?? sil",
		name2 : "ikinci ad",
		archive : "Ar??iv",
		arena : "Turnuva alan??",
		addcur : "mevcutu ekle",
		del : "sil",
		edit : "ayarla",
		unpin : "d??zeltme",
		pin : "d??zelt",
		total : "Toplam",
		noplace : "Yer yok!",
		hunger : "a??l??k",
		duration : "s??re",
		deficit : "eksiklik",
		aclock : "Alarm saati\nhh:mm:ss , hh:mm , mm (??uandan itibaren)",
		consnegat : "Bu k??yde t??ketim eksilerde. Ka?? dakika gerekiyor rezervlerin dolmas?? i??in?",
		bmove : "Binalar?? ta????",
		// settings
		none : "Yok",
		auto : "otomatik",
		info : "Bilgi",
		yourrace : "Irk??n",
		speedart : "H??z eseri",
		racelist : ['Romanl??lar','Cermenler','Galyal??lar','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "s??????nak sar?? seviyesi (y??zde)",
		crannyh : 'normal 80, klasik veya eser ya??mas?? i??in 70 ',
		builtin : "Entegre ara??lar",
		builtinh : '??retimi normalle??tirmek i??in: k??rm??z?? renk - en gerekli kaynak, ye??il - en az gerekli kaynak',
		normalize : '??retimi normalle??tirmek i??in',
		normal : "normal",
		banalyze : "Dahili sava?? analizcisi",
		cropfind : "Dahili tarla bulucu",
		adetect : "Sald??r??lar?? alg??la",
		adetecto : ['kapa','w/o dondur','a??'],
		adetecth : "Server a gizli istekler g??nderir, kural ihlalidir. Ceza gelebilir.",
		adetectt : "sald??r?? alg??lama zaman aral??klar??",
		buildhint : "in??aat ipu??lar??",
		onallp : "T??m sayfalar",
		buildand : "in??aat gerisay??m??n?? ve sald??r??lar?? g??ster",
		buildandh : 'K??y listelerinde',
		sendres : "i??aretleri g??ster: ?send resource/troops? ",
		sendmess : "i??aretleri g??ster: ?send message? ",
		analyzer : "D??nya analizcisi",
		bigicon : "Git-gel noktas?? simgesi g??ster",
		addvtable : "Ek k??y tablosunu g??ster",
		addvtableo : ['kapa','a??','sabitle'],
		opennote : "Otomatik olarak notlar?? a??",
		notesize : "Notlar i??in pencere boyutu",
		openoview : "Otomatik olarak k??ylerin genel g??r??????n?? a??",
		resbar : "Kaynaklar ??ubu??u",
		showres : "Kaynaklar ??ubu??unu pencerede g??ster",
		redbl : "k??rm??z?? (saat olarak)",
		yellowbl: "sar?? (saat olarak)",
		marketpl : "Market",
		mfilter : "filtre",
		mfiltero : ['kapa','sadece oran','sadece filtre','dolu'],
		npcsum : "NPC i??in ??zet",
		npcsumh : 'binalarda ve markette',
		bidinc : "teklif artt??r",
		bidinch : 'travian4 a????k-artt??rmalar?? i??in',
		show3x : "yanl???? veri g??sterebilir",
		show3xh : '3x ve 2x ile g??nderilen kaynak ak??????n?? tahmin etmeye ??al????',
		rpandmp : "Marketteki git-gel noktas??",
		incomres : "gelen kaynak bilgisi",
		incomreso : ['kapa','a??','??zetle','WW modu'],
		troopsI : "Askerler hakk??nda bilgi",
		troopsIo : ['kapa','a??','yard??m ara'],
		defRP : "git-gel noktas?? i??in standart hareket",
		showls : "Ba??lant??alr?? g??ster",
		showAsSN : "Ba??lant??lar?? ikinci isim olarak kullan",
		showlso : ['kapa','a??','pencerede'],
		savedls : "kaydedilmi?? ba??lant??lar",
		savedd : "kaydedilmi?? veriler",
		saveddh : 'ba??lant??lar ve ikinci ismi i??eren. Hesap silindiyse, yada kendi bilgisayar??n??z de??ilse.',
		savedelall : "kaydedilmi?? t??m verileri sil",
		savedelallh : 'ikinci isim ve ba??lant??lar?? i??eren, t??m verileri silmekte emin misiniz?',
		scrlang : "Kod dili",
		youlang : "Kendi diliniz",
		notifi : "bilgilendirmeler",
		notification : "in??aattan sonra bilgilendirmeler",
		method : "method",
		audiourl : "ses dosyas??n??n URL si",
		audiotest : "test sesi"
	},
	vi: { // VietNamese translation by Nguy???n Duy Thanh
		// ingame messages
		ok : "?????ng ??",
		cancel : "Hu??? b???",
		close : "????ng",
		overview : "t???ng quan l??ng",
		svers : "Phi??n b???n scripts(translator thanhgola):",
		settings : "C??i ?????t",
		notes : "ghi ch??",
		res90 : "T??i nguy??n c???n ????? ?????y %",
		refresh : "l??m t????i",
		warehouse : "nh?? kho",
		resources : "T??i nguy??n",
		troops : "L??nh",
		links : "Li??n k???t",
		linkname : "t??n li??n k???t",
		linkdel : "xo?? li??n k???t",
		name2 : "t??n ph???",
		archive : "L??u tr???",
		arena : "V?? ????i",
		addcur : "th??m li??n k???t hi???n t???i",
		del : "xo??",
		edit : "s???a",
		unpin : "g???",
		pin : "s???a",
		total : "T???ng",
		noplace : "Kh??ng c?? ch???!",
		hunger : "????i",
		duration : "Th???i gian",
		deficit : "Th??m h???t",
		aclock : "?????ng h??? b??o\nhh:mm:ss , hh:mm , mm ( t??nh t??? b??y gi???)",
		consnegat : "M???c ti??u th??? ??m. C???n bao nhi??u ph??t ????? d??? tr????",
		bmove : "D???i c??ng tr??nh",
		// settings
		none : "Kh??ng",
		auto : "t??? ?????ng",
		info : "Th??ng tin",
		yourrace : "Ch???ng t???c c???a b???n",
		speedart : "C??? xe c???a Helios",
		racelist : ['Romans','Teutons','Gauls','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "B??o m??u v??ng khi ???ng t??i nguy??n ?????t (%)",
		crannyh : 'th??ng th?????ng l?? 80, 70 cho l??ng b??nh th?????ng ho???c l??ng c?? B??nh r?????u c???a Dionysus',
		builtin : "C??ng c??? c??ng tr??nh",
		builtinh : 'Chu???n ho?? s???n l?????ng t??i nguy??n: m??u ????? -lo???i t??i nguy??n c???n nh???t, m??u xanh - lo???i t??i nguy??n ??t c???n',
		normalize : 'Chu???n ho?? s???n l?????ng t??i nguy??n',
		normal : "chu???n",
		banalyze : "Ch???c n??ng - ph??n t??ch tr???n chi???n",
		cropfind : "Ch???c n??ng - t??m l??ng nhi???u ru???ng l??a",
		adetect : "Ph??t hi???n t???n c??ng",
		adetecto : ['t???t','w/o m???c ?????nh','m???'],
		adetecth : "???n c??c h??nh vi c?? th??? d???n ?????n h??nh ph??t",
		adetectt : "Th???i gian ph??t hi???n t???n c??ng",
		buildhint : "M???o x??y d???ng",
		onallp : "T???t c??? trang",
		buildand : "Hi???n th??? th???i gian x??y d???ng v?? t???n c??ng",
		buildandh : 'Trong danh s??ch l??ng',
		sendres : "Hi???n bi???u t?????ng ??G???i t??i nguy??n/G???i l??nh??",
		sendmess : "Hi???n bi???u t?????ng <<g???i>>",
		analyzer : "Ph??n t??ch th??? gi???i",
		bigicon : "Hi???n bi???u t?????ng Binh tr?????ng",
		addvtable : "Hi???n th??? danh s??ch l??ng b??? sung",
		addvtableo : ['t???t','m???','d??nh'],
		opennote : "T??? ?????ng m??? ghi ch??",
		notesize : "K??ch th?????c c???a s??? ghi ch??",
		openoview : "T??? ?????ng m??? t???ng qu??t l??ng",
		resbar : "Thanh t??i nguy??n",
		showres : "Hi???n thanh t??i nguy??n tr??n c???a s???",
		redbl : "????? (gi???)",
		yellowbl: "V??ng (gi???)",
		marketpl : "Khu ch???",
		mfilter : "B??? l???c",
		mfiltero : ['t???t','ch??? t??? l???','ch??? b??? l???c','?????y ?????'],
		npcsum : "T??m t???t cho NPC",
		npcsumh : 'ch??? v?? c??ng tr??nh',
		bidinc : "T??ng ?????u gi??",
		bidinch : '?????u gi?? c???a travian4',
		show3x : "C?? th??? hi???n th??? d??? l???u kh??ng ch??nh x??c",
		show3xh : 'c??? g???n d??? ??o??n c??c lu???n t??i nguy??n sever 2x v?? 3x ??ang g???i',
		rpandmp : "Binh tr?????ng v?? ch???",
		incomres : "Th??ng tin t??i nguy??n ??ang ?????n",
		incomreso : ['t???t','m???','v???i t??m t???t','ch??? ????? WW'],
		troopsI : "Th??ng tin v??? qu??n ?????i",
		troopsIo : ['t???t','m???','t??m tr??? gi??p'],
		defRP : "H??nh ?????ng m???t ?????nh khi g???i l??nh",
		showls : "Hi???n li??n k???t",
		showAsSN : "S??? d???ng li??n k???t nh?? t??n ph???",
		showlso : ['t???t','m???','trong c???a s???'],
		savedls : "L??u li??n k???t",
		savedd : "Li??n k???t ???? l??u",
		saveddh : 'g???m li??n k???t v?? li??n k???t ph???. N???u t??i kho???ng xo?? ho???c ????y kh??ng ph???i m??y t??nh c???a b???n.',
		savedelall : "xo?? t???t c??? d??? li???u ???? l??u",
		savedelallh : 'b???n c?? ch???c mu???n xo?? h???t d??? li???u, bao g???m c??? li??n k???t v?? t??n ph??? cu??? n???',
		scrlang : "Ng??n ng??? Script",
		youlang : "Ng??n ng??? c???a b???n",
		notifi : "Th??ng b??o",
		notification : "th??ng b??o sau khi x??y d???ng xong",
		method : "Ph????ng ph??p",
		audiourl : "URL c???a t???p nh???c",
		audiotest : "Th??? nh???c",
		neighbors : "T??m ki???m",
		colorCustomize : "C??i ?????t m??u s???c",
		colorHint : "????? tr???ng ????? cho m??u m???c ?????nh",
		color0 : " S???n s??n n??n c???p ",
		color1 : "N??n c???p th??ng qua NPC",
		color2 : "Kh??ng th??? n??n c???p<br>(do kh??ng ????? t??i nguy??n)",
		color3 : "kh??ng th??? n??n c???p<br>(do nh?? kho/ kho l??a kh??ng ????? s???c ch???a)",
		color4 : "Ho??n th??nh n??n c???p"
	},
	el: {// Greek translation by Tasos el malo
		// ingame messages
		ok : "??????????????",
		cancel : "??????????????",
		close : "????????????",
		overview : "???????????????????? ????????????",
		svers : "???????????? script",
		settings : "??????????????????",
		notes : "????????????????????",
		res90 : "?????????? ?????? ?????? ?????????????? %",
		refresh : "????????????????",
		warehouse : "??????????????",
		resources : "??????????",
		troops : "??????????????????????",
		links : "??????????????????",
		linkname : "?????????? ??????????????????",
		linkdel : "???????????????? ??????????????????",
		name2 : "2?? ??????????",
		archive : "????????????",
		arena : "?????????????? ??????????????????",
		addcur : "???????????????? ??????????????????",
		del : "????????????????",
		edit : "??????????????????????",
		unpin : "unfix",
		pin : "fix",
		total : "????????????",
		noplace : "?????? ?????????????? ??????????!",
		hunger : "??????????",
		duration : "????????????????",
		deficit : "????????????????",
		aclock : "?????????? ????????????????????\nhh:mm:ss , hh:mm , mm (?????? ????????)",
		consnegat : "?? ???????????????????? ?????? ?????????? ?????????? ????????????????. ???????? ?????????? ???????????????????? ???????????????",
		bmove : "???????????????????? ????????????",
		neighbors : "????????????????",
		// settings
		none : "????????????",
		auto : "????????????????",
		info : "??????????????????????",
		yourrace : "?? ???????? ??????",
		speedart : "???????????????? ????????????????????????",
		racelist : ['??????????????','????????????????','??????????????','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "?????????????? ?????????????? ???????????????? (??????????????)",
		crannyh : '???????????????? 80, 70 ?????? ?????????????? ?? ?????????????????????? ??????????????????',
		builtin : "???????????????????????? ????????????????",
		builtinh : '?????? ?????????????????????? ??????????????????: ?????????????? ?????????? - ???????????????????? ???????????? ??????????, ?????????????? - ???????????????? ???????????? ??????????',
		normalize : '?????????????????????? ??????????????????',
		normal : "????????????????",
		banalyze : "?????????????????????????? ???????????????? ??????????",
		cropfind : "???????????????????????? ???????????? ??????????????????????",
		adetect : "???????????????????? ????????????????",
		adetecto : ['????????????????','?????????? ??????????????????????????','????????????'],
		adetecth : "?????????? ?????????? ???????????????? ???????? ??????????????????????, ?????????????????????????? ???????? ??????????????. ???????????? ???? ???????????????? ???? ??????????????.",
		adetectt : "???????????????? ???????????????????? ????????????????",
		buildhint : "???????????????? ????????????????????",
		onallp : "???????? ???? ??????????????",
		buildand : "???????????????? ?????????????????????? ???????????????? ?????????????? ?????? ????????????????",
		buildandh : '???????? ?????????? ?????? ????????????',
		sendres : "???????????????? ?????????????? ????????/???????????????????????? ??????????????????",
		sendmess : "???????????????? ?????????????? ?????????????? ??????????????????",
		analyzer : "World analyzer",
		bigicon : "???????????????? ?????????????? ???????????????????????? ??????????",
		addvtable : "???????????????? ???????????????? ???????????? ????????????",
		addvtableo : ['????????????????','????????????','??????????????????'],
		opennote : "???????????? ???????????????? ??????????????????????????",
		notesize : "?????????????? ?????????????????? ????????????????????????????",
		openoview : "???????????? ???????????????? ?????? ???????????????? ????????????",
		resbar : "?????????? ??????????",
		showres : "???????????????? ?????? ?????????? ?????????? ???? ????????????????",
		redbl : "?????????????? (???? ????????)",
		yellowbl: "?????????????? (???? ????????)",
		marketpl : "??????????",
		mfilter : "????????????",
		mfiltero : ['????????????????','???????? ??????????????','???????? ????????????','????????????'],
		npcsum : "???????????? ?????? NPC",
		npcsumh : '???????? ?????????? ?????? ?????? ????????????',
		bidinc : "?????????????? ????????????????",
		bidinch : '?????? ?????????????????????? travian4',
		show3x : "???????????? ???? ?????????????????? ???????????????????? ????????????????",
		show3xh : '???????????????? ???????? ?????? ?????????? ???? 3x ?????? 2x ????????????????',
		rpandmp : "?????????????? ???????????????????????? ?????? ??????????",
		incomres : "?????????????????????? ???????????????????????? ??????????",
		incomreso : ['????????????????','????????????','???? ????????????','?????? ??????????'],
		troopsI : "?????????????????????? ?????? ???? ??????????????????????",
		troopsIo : ['????????????????','????????????','?????????????? ??????????????'],
		defRP : "?????????????????????????? ???????????????? ?????? ?????? ?????????????? ????????????????????",
		showls : "???????????????? ????????????????????",
		showAsSN : "?????????????????????????? ???????????????????? ???? ?????????????? ??????????",
		showlso : ['????????????????','????????????','???? ????????????????'],
		savedls : "?????????????????????????? ??????????????????",
		savedd : "???????????????????????? ????????????????",
		saveddh : '?????????????????????????????????????? ?????? ?????????????????? ?????? ?????? ???????????????? ????????????????. ???? ???????? ?????????????????????? ??????????????????, ?? ?????? ?? ?????????????????????? ??????.',
		savedelall : "???????????????? ???????? ?????? ?????????????????????????? ??????????????????",
		savedelallh : '?????????? ???????????????? ?????? ???????????? ???? ???????????????????? ?????? ???? ????????????????, ?????????????????????????????????????? ?????? ?????????????????? ?????? ???? ?????????????? ???????????',
		scrlang : "???????????? Script",
		youlang : "?? ???????????? ??????",
		notifi : "????????????????????",
		notification : "???????????????????? ???????? ?????? ??????????????????",
		method : "??????????????",
		audiourl : "URL ?????? ???????????? ????????",
		audiotest : "???????????? ????????",
		colorCustomize : "???????????????? ????????????????",
		colorHint : "?????????? ???????? ?????? ?????????????????????????? ??????????",
		color0 : "?????????????????? ????????????????????",
		color1 : "???????????????????? ???????? NPC",
		color2 : "???????????????????? ?????? ?????????? ???????????? <br/>(?????? ?????????????? ??????????)",
		color3 : "???????????????????? ?????? ?????????? ???????????? <br/>(?????? ???????????? ???????????????????????? ????????????????/??????????????????????)",
		color4 : "?????????????? ??????????????"
	},
	nl: {
		// ingame messages
		ok : "Ok",
		cancel : "Annuleren",
		close : "Sluiten",
		overview : "dorpen overzicht",
		svers : "script versie",
		settings : "instellingen",
		notes : "notities",
		res90 : "grondstoffen voor tot % vullen",
		refresh : "herlaad",
		warehouse : "Warenhuis",
		resources : "Grondstoffen",
		troops : "Troepen",
		links : "Links",
		linkname : "link naam",
		linkdel : "verwijder link",
		name2 : "tweede naam",
		archive : "Archiveer",
		arena : "Toernooiveld",
		addcur : "Voeg huidige toe",
		del : "verwijder",
		edit : "wijzig",
		unpin : "losmaken",
		pin : "vastzetten",
		total : "Totaal",
		noplace : "Er is geen plaats!",
		hunger : "honger",
		duration : "duur",
		deficit : "tekort",
		aclock : "Alarmklok\nhh:mm:ss , hh:mm , mm (van nu)",
		consnegat : "Consumptie in dit dorp is negatief. Hoeveel minuten reserve nodig?",
		bmove : "Verplaats gebouwen",
		neighbors : "buren",
		// settings
		none : "Geen",
		auto : "automatisch",
		info : "Informatie",
		yourrace : "Jouw ras",
		speedart : "Snelheids artefact",
		racelist : ['Romeinen','Germanen','Galli??rs','Nature','Natars','Egyptians','Huns','detect'],
		cranny : "geel niveau van schuilplaats (procent)",
		crannyh : 'normaal 80, 70 voor klassieke servers of artefact plunderen',
		builtin : "Ingebouwde hulpmiddelen",
		builtinh : 'voor normalisatie van productie: rode kleur - meest benodigde grondstoffen, groen - minder benodigde grondstoffen',
		normalize : 'Normalisatie van productie',
		normal : "normaal",
		banalyze : "Ingebouwde gevechts analysator",
		cropfind : "Ingebouwde cropper zoeker",
		adetect : "Detecteer aanval",
		adetecto : ['uit','zonder stilzetten','aan'],
		adetecth : "maakt de verborgen verzoeken aan de server, overtreed de regels. kan in bestraffing resulteren.",
		adetectt : "periode van aanvals detectie",
		buildhint : "Tips voor constructie",
		onallp : "Alle pagina's",
		buildand : "Laat aftelling van gebouwen en aanvallen zien",
		buildandh : 'In de dorpen lijst',
		sendres : "Laat ??stuur grondstoffen/troepen?? iconen zien",
		sendmess : "Laat ??stuur bericht?? iconen zien",
		analyzer : "Wereld analysator",
		bigicon : "Laat verzamelplaats icoon zien",
		addvtable : "Laat extra dorpen tabel zien",
		addvtableo : ['uit','aan','vastzetten'],
		opennote : "Automatisch notities openen",
		notesize : "Grootte van scherm voor notities",
		openoview : "Automatisch dorpen overzicht weergeven",
		resbar : "Grondstoffen balk",
		showres : "Laat grondstoffen balk zien in een los scherm",
		redbl : "rood (in uren)",
		yellowbl: "geel (in uren)",
		marketpl : "Marktplaats",
		mfilter : "filter",
		mfiltero : ['uit','alleen ratio','alleen filter','alles'],
		npcsum : "opsomming voor NPC",
		npcsumh : 'in marktplaats en gebouwen',
		bidinc : "bod toenemening",
		bidinch : 'voor travian4 veilingen',
		show3x : "kan incorrecte data weergeven",
		show3xh : 'probeer de grondstoffenstroom te voorspellen bij 3x en 2x versturen',
		rpandmp : "Verzamelnplaats en Marktplaats",
		incomres : "binnenkomende grondstoffen info",
		incomreso : ['uit','aan','met opsomming','WW modus'],
		troopsI : "Informatie over de troepen",
		troopsIo : ['uit','aan','scan hulp'],
		defRP : "standaard actie voor verzamelplaats",
		showls : "Laat links zien",
		showAsSN : "Gebruik links als tweede naam",
		showlso : ['uit','aan','in apart scherm'],
		savedls : "opgeslagen links",
		savedd : "opgeslagen data",
		saveddh : 'inclusief links en tweede naam. Voor als een account is verwijderd, of dit niet jouw pc is.',
		savedelall : "verwijder alle opgeslagen data",
		savedelallh : 'Weet je zeker dat je alle data wilt verwijderen, inclusief links en tweede naam?',
		scrlang : "Script taal",
		youlang : "jouw taal",
		notifi : "notificatie",
		notification : "notificatie na bouw",
		method : "methode",
		audiourl : "URL van geluidsbestand",
		audiotest : "test geluidsbestand",
		colorCustomize : "Kleuren opties",
		colorHint : "laat leeg voor standaard kleur",
		color0 : "verbetering beschikbaar",
		color1 : "verbetering via NPC",
		color2 : "verbetering niet beschikbaar <br/>(niet genoeg grondstoffen)",
		color3 : "verbetering niet beschikbaar <br/>(niet genoeg capaciteit van warenhuis of graansilo)",
		color4 : "laatste niveau"
	}
};

var img_igm = "data:image/gif;base64,R0lGODlhCwAIAIABAH9/f////yH5BAEKAAEALAAAAAALAAgAAAIUDI5oEO3L2ItSmnYw1bdTO31JVgAAOw==";
var img_car = "data:image/gif;base64,R0lGODlhEgAMAIQWAKuZY+DUr8q6iol4RWJTKPLpzPz79fn05sC2l9bNs8vCqdTOvOzm1dzTutvQsLWphrmvkdvVwuTdyKeacPr37efk2v///////////////////////////////////////yH5BAEAAB8ALAAAAAASAAwAAAVW4Cd+DTAQAjOua2CigMPO7hAIpjm3LkEAuEFlJyoUfrbgYkcpBAa4mwkyMxhdN+lgEGEdnNmA1ITwgsXiIGHCMgjQN9zrMZMABfIXQbFLAP4mJwRlIiEAOw==";
var img_def = "data:image/gif;base64,R0lGODlhEgAMAOMMAHJWAIpQAIFhAIxyH5l6AMeLAL2fAJmusNWzANStcOjMANDh4////////////////yH5BAEKAA8ALAAAAAASAAwAAARP8MmzpLXrXLkI+OBHVBtAEIahKOkJbI+JqqzhwnK6th48nLraaQBDmIItAAJWEMx2NkEB9igAkAbAFJYICLCCQGLT7V53ALH4spaELF1JBAA7";
var img_att = "data:image/gif;base64,R0lGODlhEgAMAIQeALzO0P/SAIGXmeTLptStcPL390RSU5R4TdXEqMLU1ujw8dClY6a0tt7AXIaNjnqLjeTHXL/S1IVRAMGymeXSmbt+IK/CxGU+AJmusOO2AN7q672OAHGIitDh4////////yH5BAEKAB8ALAAAAAASAAwAAAVX4Cd+QDeeXwegqaCwimCyiXx2NisC3KxxK93IwtFoBBYhiiPgYJQiSubzw3A+GYqQsgl0rIbARiusbKYfcUVJkFzOmc1FsmYNKhdRAyKaD1gIB0ITCCIhADs=";
var img_pref = "data:image/gif;base64,R0lGODlhEAAMAOMJAAAzZjMzmTNmmWZmzGaZzJmZmZnMmczMmczMzP///////////////////////////yH5BAEKAA8ALAAAAAAQAAwAAARB8ElAgbyvFPwAQtZVIFo3JaBInlSChiUGuDQYc1WbclcQaLMdJ0Ag/HShXlFgPAmJBMEgIHtJoE2c9SHo8iaURwQAOw==";
var img_refr = "data:image/gif;base64,R0lGODlhEAAQAOMKACtVgCtVqiuAqlWAqlWA1ICAqoCqqoCq1Kqq1KrU1P///////////////////////yH5BAEKAA8ALAAAAAAQABAAAARW8MkHap14ghCGD4CmcV5xnFZIbVaHvMOhtuOBJMkMEEEGnIhZRgIYJG6q4SqlYyqJL8QgiZklUJnAYUo8ImRJwXQmfW2ZFwoIYDgUPpxkugIHVX0pTAQAOw==";
var img_view = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAQAAADIBVVwAAAAAXNSR0IArs4c6QAAAPBJREFUGNNtkbEuBFEYhb+ZSHYjSgoFQaFbmSdQiWSbfYN5HYVWo9No9IqNeINtRYNssjRsITFEYu3/KWbGDNlTneLcc+/9DgCquZlL7zzl/he1yhgeh2pfxi4KV2ZyrRGqZmaqdt21Y31D1bfvV4QaGjdBkctboX56WEUpO47qOkNdn/N6Oi/9ZdWPajo9//OigcRLeTAe3JiqprQk8FjZFZ4Bki6xDJAC7K1OUEgYsUmf22B2wI53wJi1JthjyDcCJ8DQ+4+8M5qRFIYX9BqKNR49EzFTM7e8clB95ZdkDTzcbgHPG4rtbcoJMxfuwg8RxTrpF3oYEQAAAABJRU5ErkJggg==";
var img_del = "data:image/gif;base64,R0lGODlhEAAMAIABAP8AAP///yH5BAEKAAEALAAAAAAQAAwAAAIfTICmu5j8lAONMuOwvTLzun3HJI5WBKGotrYrlpZBAQA7";
var img_edit = "data:image/gif;base64,R0lGODlhEAAMAKEAAP///3HQAHV8bf///yH5BAEKAAMALAAAAAAQAAwAAAIinH+iyBnyGoIwREntE/hpilUe11QZWX5X+qEl5b6LNMVSAQA7";
var img_notes = "data:image/gif;base64,R0lGODlhEAAMAIQcAAAkkrYkANskAG1JAElJbf8kAJJJAABt29tJJJJtAG1tbW1tkrZtAACS/ySS222SkpKSkpKSttuSALa2tra227bb27bb///bSdvb2//b/9v/////2////////////////yH5BAEKAB8ALAAAAAAQAAwAAAVq4PdJIjmWoghFTMS6LcsJwfdwBofruX4UGcSNQOEQjcWDhVMI3HRQqFLjaD6jPgu1AfgsOJhwmDN1cEVfbEJrBkzQnIq8wklc2hyFSKHebC4AOnoffBSGdRsDA1CDBAqPChMDCRMTkAQiIQA7";
var img_save = "data:image/gif;base64,R0lGODlhLgAUAKUoAAAAABw5OTk5ORw5qjk5VTk5cTk5jjk5qhxVqjlVjlVVVTlVqlVVcTlVxlVVjlVVqlVVxlVxjlVxxnFxjnFxxnFx445xxo5x43GOjo6O446O/6qO46qO/3HGAKqqxqqq46qq/8aq/8bGxsbG48bG/8bj4+Pj4+P//////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAD8ALAAAAAAuABQAAAb+wJ/w1ykaj8ikclkcDouoqHRKrVqv0aawg+16v53tN/opmzeZdMZCoYxRYe77Q9JYT5DH422CzkkZVScmDQR7Y31yY3SBU4MmCxeHX4lvKHQVjiYmJQsUk16VbxskblGPJSMDEqBYm35jGSQSp5upqhAOiKKxISAQwA0LCwMDwAm7sF8ZIM1qF23AD8iUvCfX2NnXFs4M3t4ReQsG2uXXr3Lm5RQgaQwAAiUlEcMH5OrYm5X6/P2bFBzcCZiwCcOBgwb8KTQhoshChRTSIAjgwYMIEQoOHijwsF9DIh35TWCl54GDBAkMqCzAMSTDMCBdypR58eOWDjVz6tzJs6cKTi1OmAgdusRJEAA7";
var img_underline = "data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=";
var img_stat = "data:image/gif;base64,R0lGODlhMQAxAKUtADdJkklJpFtbW0lbpFtbpFtbtm1tbW1tgFtttm1tklttyG1tpG1ttm1tyG2ApICAgG2AyICAkm2A24CApICAtoCA24CA7ZKSkpKSpICS7YCS/5KS25KS7ZKS/6SkpJKk7ZKk/6Sk7aSk/6S2tra2tra2yKS2/7a2/8jIyLbI/9vb29vb7e3t7f///////////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAxADEAAAb+wJ9wSCwKWy0WCkXyeC5O0pLVMlqv2F+Seel6v14pNUsutlQosHp9QamQ5axS/Xh06/i6GjWOG1UkawICXYOGg3ZgJG9+Q2dPbJGRHox+j5KYbJRVcSqQbAYGXaGkpaYGdptlnph6F3mwsYmqWYGZt5EkfVZpuL5rKJxGLLiho6fIpxcqVi29ma6y0rBtwkfEv9lrLGbP2t9tZrYXEwUDCaCiF8mliWskwkldEwQBEh0FEWvR03iSzEfSFLDXoWCGAfrAZQp2hMSAABkKSswQYB6FBuYCBAAAIMCAAQUaUIjQz101LSxASlzZQQLIAAUUSJCQISKIDhksSMAIc8H+gUOH1F2Ap4WCApYsXRa4txKE06cgRHSooGAAAwySPCBpUYBBAwRgETSgmUFDy48RC0J9KqJtWw4YKUzaCrKBXbthxY49GEDDWrZuRZgYzAHBVTZ0Q95dvHimx79RAw8efMIEhMNgtCIhoJixZ7sKCkAN3HayiROoT0CQmznx3Y8aN3os0Jn2B6ekTadGHYLABEVbOdulvVJDBglVNS4190Gy7t0nUlRgYDIYkgWxCSLt4LRlgwEACjQvPRl69BQfClQ/sqLEgQN9kf51m6ECecrmU6Q4EQCVF25DEGNAAPLN59xzqemnYH+JEEUECQ8AkJZaBh5o3nkKngCAfyf+EaHCBRJSuBZpgiGImoIohrBhIrsMgQIA90BGommn7YYiih8AgAhDf0iYQYVumRgdhik2oKMolZgBQAcW/AjYgTXaeKN+H9i1ooNGtACAWTlxN6OQU+5XgVgIbLiMNUS0EB9ONI13X5QJ3njCmHohEMADuqDpyFISGSeBBc0JSeQJG3zF2EAe8KHnERA0wFJNM1WQAQclpmbCBxtU8JVejHEmxqJarDDAhAbVVN9Mny3WKGN2evDpFUhsgABSptZaXwW4ziQBBKt2OgEJr8LKwkVmGWScrbdWoOuuvB7qALButGjGGRjwWaqtuCqrLK/c3oWAb9AqCuoRLazgQUxtFuCEbLa5ztQtRgRgAKwY0jbDAgsl0LMUsskqy+xXBfg2Qrgq1IvFvYBggF0BYkWaa6MIBBzAAhgMHO694wqLBhMYTLBARhx5lMACE3hgMcEGN/LDxkzM6/LLUixRcMoqD8HyEjjnLPO9AGYRBAA7";
var img_info = "data:image/gif;base64,R0lGODlhDAAKAIABAH9/f////yH5BAEAAAEALAAAAAAMAAoAAAIVjA1wi82eFJP0RIhD1Xn77mhKIhoFADs=";
var img_tinfo = "data:image/gif;base64,R0lGODlhDAAMAMIEAACAgICAgICA/4D//////////////////yH5BAEKAAcALAAAAAAMAAwAAAMkeBohwio2R4OkhNQzqX9dplVf9pUjiaWgZ26TOALXR0fcBCkJADs=";
var img_hide = "data:image/gif;base64,R0lGODlhDAAYAIABAExMTP///yH5BAEKAAEALAAAAAAMABgAAAIrjI8Hy20NQXIpxCmXlY/rXX1VNypcKZbqGlEtE55jGtfgDWr0FdOIvwoUAAA7";
var img_cp = "data:image/gif;base64,R0lGODlhCwAOAIABAAAAAP///yH5BAEKAAEALAAAAAALAA4AAAIbjA2nB7nsXmhxpSYdtuzFioTeZFEeBU5mlgYFADs=";
var img_clipIn = "data:image/gif;base64,R0lGODlhEAAMAKECAGZmZrq6AP///////yH5BAEKAAIALAAAAAAQAAwAAAIblI+pFrHZontS0tqWBMDCyHkfdpFl9CBZyh4FADs=";
var img_clipOut = "data:image/gif;base64,R0lGODlhEAAMAKECAGZmZrq6AP///////yH5BAEKAAIALAAAAAAQAAwAAAIelH+By6Hc3INGypasW1tP7lHVJRrAVgrAWK4Z5aYFADs=";
var img_up = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIXjA1we8mb3AtRvSohZjjq3nQeJTrlKRYAOw==";
var img_down = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIXhI+pF8vtQJhu0mUvyvrxzXWhZYyklBUAOw==";
var img_updown = "data:image/gif;base64,R0lGODlhDAAMAIABAHm94P///yH5BAEKAAEALAAAAAAMAAwAAAIajGGXB6jZ4gux0jUvdjlzuHxKJT1kCDUbahQAOw==";
var img_bmove = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAAAgCAMAAABkSNU7AAAAAXNSR0IArs4c6QAAAGNQTFRFaAAAAAAAAABVVQAAVQBVqgAAAFUAAFVVVVUAVVVVVVWqqlUAqlVVqlWq/1UA/1VVVaoAVapVVaqqqqoAqqpVqqqq/6oA/6pV/6qqVf8Aqv8Aqv9Vqv+qqv////9V//+q////3pvvvAAAAAF0Uk5TAEDm2GYAAANUSURBVEjHrZaLktMwDEXXmAYJGxpTqQm7aez//0qu5LTZB+xrUGfSSeoeXz2du7s3rD21u0+btn+bfgzV3mefgKmqcNmMWXD/IeQOEia3IiJXoJTBnxr4Hcgby/+UUqBWF5hKTofZfinS7MEixahSX0NuLFt5Ok3rNE0UZMmHzdL2rUsV8X0MetX5d9qlOAsG3JpCpMWkucFtiVkEcvHYeBWXQlfXX9YG3DydVxMGO08Sw6/AbXP4YCDuzsIDBwK5lFq46LMastsKGmRtOJcXiIL2gLmROA6BuAELNlQe5IlEp1siHSQbkCJc4ag3nJBrxVamUA2omQW8wKQ70BPH83rexcESqeU50lN5iu3W1fJvAVDsyNBC1CVeYyfcJKV1lZ2IIrOS4Ehll1dVVjcQouik8yysWsAl2WLozrYqhVPaFaYYKbMLpF2e9uTDmLgdZ51VhLksuLjL3VsEA2GSdK2WSc7E8ARMQ+7RE+8O7JMzATc7ULEWPDhuAjtPBXuc3EtPy4kMRrYKkarX6HGiq3E+ttSOLc9Zg23BxSPoPCxHxjQQpJGVIWoZ2uzDg/N6ch/M1UCyorhzmzOICUQeRxpc35UnBE4LQSVNkiNHEwY12HgYCnikXm3ASWBLiswtzU6bo4wP97/HzlPPhw5WuhyahiDTGeGwYgkBX0PQiiYwn0cDpS+czIu5HZqCly6HPIwPD1s+XCB+jvZf431pGtMJhWU4e2a90HNSwJsIPJlUZkltTqizljLd34+3AuxAxIpOYvpaNV0AAWcFmGSTt2ACJvghlARuZtb5Z5t+tpw57PW8DQMMvPN0zpq/o5VDrTee5Zd6141jGUeMaKUhzscWy3S8cDIePR4JfeCUYRhRxycBCvI2ntULqqt3//AVlVHtDBhJv+WoOSE71kLPTim/XZBKCj+yTqhBMDuv/EI/LZclJUHpqo09dF2xBbxgHGK/sryYgNvgRhiLhQ7mzkpFJ2Ci4tKnKgaquw6ozTjM6CJ/H/rb0ypWw94+5nRmI+V8Ax5ssPbh93jet9eOI2tun0jwz9R6dDKokHa5ACTPzqP29tlbtXQql6HYgbmdwv24fHxeto+8G9jIlP0EfnGet//4uvGxlyN9laT/6y3rLdAf9yuedFIpoQQAAAAASUVORK5CYII=";


/*********************** common library ****************************/

var useDOMs = typeof window.localStorage == 'undefined' ? false : true;

function RB_addStyle(css) {
  var head = document.getElementsByTagName('head')[0];
  if (head) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild($t(css));
    head.appendChild(style);
  }
}
function RB_getValue ( key, defaultValue ) {
	if( useDOMs ) {
		var value = window.localStorage.getItem(key);
		if( value == null ) value = defaultValue;
		return value;
	}
}
function RB_setValue( key, value ) {
	if( useDOMs )
		window.localStorage.setItem( key, value );
}
function RB_deleteValue( key ) {
	if( useDOMs )
		window.localStorage.removeItem( key );
}
function $xf(xpath, xpt, startnode, aDoc) {
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	if (!aDoc) aDoc = document;
	if (!startnode) startnode = document;
	var xpres = XPFirst;
	switch (xpt) {
		case 'i': xpres = XPIterator; break;
		case 'l': xpres = XPList; break;
		case 'r': xpres = XPResult; break;
	};
	var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
	return (xpres == XPFirst ? ret.singleNodeValue : ret);
};
function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
	var aR = new XMLHttpRequest();
	aR.onreadystatechange = function() {
		if( aR.readyState == 4 && (aR.status == 200 || aR.status == 304))
			onSuccess(aR);
		else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);
	};
	aR.open(aMethod, url, true);
	if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	aR.send(param);
};
Number.prototype.NaN0 = function(){return isNaN(this)?0:this;}
String.prototype.trim = function(){return this.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g,'');}
String.prototype.onlyText = function(){return this.replace(/([\u2000-\u20ff])/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[\s\S]+?>/g,'');}
String.prototype.firstText = function(){return this.replace(/&lt;/,'<').split('<')[0].trim();}
function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);}
function $gn(aID) {return (aID != '' ? document.getElementsByName(aID) : null);}
function $gt(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByTagName(str); }
function $gc(str,m) { return (typeof m == 'undefined' ? document:m).getElementsByClassName(str); }
function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};}//Acr111-addAttributes
function $t(iHTML) {return document.createTextNode(iHTML);}
function $e(nElem, att) {var Elem = document.createElement(nElem); $at(Elem, att); return Elem;}
function $ee(nElem, oElem, att) {var Elem = $e(nElem, att); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; return Elem;}
function $c(iHTML, att) { return $ee('TD',iHTML,att); }
function $a(iHTML, att) { return $ee('A',iHTML,att); }
function $am(Elem, mElem) { if (mElem !== undefined) for(var i = 0; i < mElem.length; i++) { if( typeof(mElem[i]) == 'object' ) Elem.appendChild(mElem[i]); else Elem.appendChild($t(mElem[i])); } return Elem;}
function $em(nElem, mElem, att) {var Elem = $e(nElem, att); return $am(Elem, mElem);}
function offsetPosition ( el ) {var oL=0,oT=0; do {oL+=el.offsetLeft;oT+=el.offsetTop;} while(el=el.offsetParent ); return [oL,oT];}
function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));}
function isNumeric(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
function insertAfter(node, rN) {rN.parentNode.insertBefore(node, rN.nextSibling);}
function ajaxNDIV(aR) {var ad = $ee('div',aR.responseText,[['style','display:none;']]); return ad;}
function $ib(node, rN) {rN.parentNode.insertBefore(node, rN);}
function dummy() {return;}
jsVoid = 'javaScript:void(0)';
jsNone = 'return false;';
function esc(str) { return str.toString().replace(/@/g, "%40"); }
function unesc(str) { return str.replace(/%40/g, "@"); }
function newOption (node,text,value) { node.appendChild($ee('OPTION',text,[['value',value]])); }

function formatTime(secc, aFormat){
	//aFormat: 0 = h:mm:ss (h = 0->... can be more than 24); 1 = days, h:mm:ss; 2 = h:mm:ss (h = 0->23:59:59 = only time); 3 = h:mm (h = 0->... can be more than 24); 4 = days h:mm; 5 = h:mm
	if( isNaN(secc) || secc === Infinity ) return '--:--';
	var ht = secc < 0 ? "-" : "";
	var sec = Math.abs(secc);
	var h = Math.floor(sec/3600);
	var m = Math.floor(sec/60) % 60;
	var s = parseInt(sec % 60);
	switch (aFormat) {
		case 4:
		case 1: var d = Math.floor(h/24); h = h - d * 24; if( d > 0 ) ht += d + " "; break;
		case 2:
		case 5: h = h % 24; break;
	}
	ht += h + ":" + (m > 9 ? m: '0' + m);
	if( aFormat < 3 ) ht += ":" + (s > 9 ? s : '0' + s);
	h = null; m = null; s = null; d = null;
	return ht;
}

function toSeconds(hTime) {
	var p = hTime.match(/(\d+):(\d+):(\d+)/);
	return p ? (p[1] >= 0 ? 1:-1) * ( (Math.abs(p[1]) * 3600) + (p[2] * 60) + (p[3] * 1)): 0;
}

function getRandom ( x, y ) {
	return x+Math.round(Math.random()*y);
}

/********************* travian library *****************************/

function id2xy(vid) {
	var arrXY = new Array;
	var ivid = parseInt(vid);
	arrXY[0] = ((ivid-1) % mapWidth) - mapRadius;
	arrXY[1] = mapRadius - Math.floor((ivid-1) / mapWidth);
	return arrXY;
}

function xy2id(x, y) {
	return (1 + (parseInt(x) + mapRadius) + (mapWidth * Math.abs(parseInt(y) - mapRadius)));
}

function getVid ( hr ) {
	if (hr == null) return 0;
	var vIdH = hr.match(/[&\?][zd]=(\d+)/);
	if( vIdH ) vId = vIdH[1];
	else {
		vIdH = hr.match(/[&\?]x=(-?\d+)&y=(-?\d+)/);
		vId = vIdH ? xy2id(vIdH[1], vIdH[2]) : 0;
	}
	return vId;
}

function getVidFromCoords ( txt ) {
	var xy = new Array;
	if( /coordinateX/.test(txt) ) {
		txt = txt.replace(/([\u2000-\u20ff])/g,'');
		txt = txt.replace(/(\u2212)/g,'-');
		xy[1] = txt.match(/coordinateX.+?(-?\d{1,3})/)[1];
		xy[2] = txt.match(/coordinateY.+?(-?\d{1,3})/)[1];
	} else
		xy = txt.match(/\((-?\d{1,3})\D+?(-?\d{1,3})\)/);
	return xy ? xy2id(xy[1],xy[2]): -1;
}

function printCoords ( vID ) {
	var xy = id2xy( vID );
	return '('+xy[0]+'|'+xy[1]+')';
}

function calcDistance ( id1, id2 ) {
	var myXY = id2xy( id1 );
	var dXY = id2xy( id2 );
	dX = Math.min(Math.abs(dXY[0] - myXY[0]), Math.abs(mapWidth - Math.abs(dXY[0] - myXY[0])));
	dY = Math.min(Math.abs(dXY[1] - myXY[1]), Math.abs(mapWidth - Math.abs(dXY[1] - myXY[1])));
	return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
}

function getTTime(dist, speed, arena, artefact, shoes) {
	var artSp = [1,0.33,0.5,0.67,1.5,2,3];
	var shK = shoes ? shoes: 0;
	var abonus = (RB.Setup[46] == 1 ? 0.2 : 0.1); //if Travian Path to Pandora server then double the Tournament Square bonus
	speed *= artSp[artefact];
	var aradius = 20;
	if( ( arena > 0 || shK > 0 ) && dist > aradius ) {
		return Math.round((dist-aradius)/(speed*(1+arena*abonus+shK))*3600+aradius/speed*3600);
	} else {
		return Math.round(dist/speed*3600);
	}
}

function getUserID() {
	try {
		return $gt('img',$g('heroImageButton'))[0].src.match(/uid=(\d+)/)[1];
	} catch(e) { return null; }
}

var initRes = true;
function getResources () {
	if( initRes ) {
		try { var resources={};
			var fullScr = $xf('//script[contains(text(),"resources.production")]').innerHTML;
			var r1 = fullScr.match(/resources.production\s=[\s\S]+};/);
			eval(r1[0]);
		} catch(e) { loadVCookie('vPPH', 'village_PPH'); }
		for( var i = 0; i < 4; i++ ) {
			var wholeRes = $g("l" + (1+i));
			if( ! wholeRes ) return false;
			if( typeof resources != 'undefined' )
				income[i] = resources.production['l'+(1+i)];
			else {
				var resT = $g('production');
				if( resT ) {
					income[i] = resT.rows[1+i].cells[2].innerHTML.match(/-?\d+/)[0];
				} else {
					income[i] = RB.village_PPH[i];
				}
			}
			incomepersecond[i] = income[i] / 3600;
			iresNow[i] = parseInt(toNumber(wholeRes.textContent));
			fullRes[i] = resources.maxStorage['l'+(1+i)];
		}
		resNow = iresNow.slice();
		initRes = false;
		saveVCookie('vPPH', income.concat(resNow).concat(fullRes).concat(Math.round(Date.now()/1000)));
	} else {
		var tnow = Date.now();
		for( var i = 0; i < 4; i++ ) {
			resNow[i] = Math.round(((tnow-RunTime[0])/1e3)*incomepersecond[i] + iresNow[i]);
			if( resNow[i] > fullRes[i] ) resNow[i] = fullRes[i];
			if( resNow[i] < 0 ) resNow[i] = 0;
		}
	}
	return true;
}

function getServerTime() {
	if( loadServerTime == 0 ) loadServerTime = toSeconds($xf('//*[@id="servertime"]/span','f',$g(pageElem[3])).innerHTML);
	return loadServerTime + Math.round((Date.now() - RunTime[0])/1e3);
}

function getTimeOffset () {
	return (new Date().getHours()) - parseInt($xf('//*[@id="servertime"]/span','f',$g(pageElem[3])).innerHTML.match(/\d+/)[0]);
}

function absTime( time , stime ) {
	var serverTime = stime || getServerTime();
	var tTime =  Math.abs(time) + serverTime;
	if( Math.abs(time) < 86400 ) if( tTime > 86400 ) tTime -= 86400;
	return tTime;
}

function $eT( tO, time, ft, att ) { // tO-type of Object, time - relative time, ft - time format, att - attributes
	var tTime = absTime(time);
	var dstr = tTime > 86400 ? (new Date((Math.abs(time)+getTimeOffset()*3600)*1e3+(Date.now()))).toDateString()+' ':'';
	var att2 = [['title',dstr + formatTime(tTime, 2)]];
	if( att !== undefined ) att2 = att.concat( att2 );
	return $ee(tO, formatTime(time,ft), att2);
}

function showRunTime() {
	var ltime = $g(pageElem[3]);
	if( ! (ltime) ) {
		ltime = $ee('DIV',$e('BR'),[['style','position:absolute; left:'+(ltr?10:document.body.clientWidth-100)+'px;top:'+(xyBody[1]+2)+'px;color:black;background-color:cyan;padding:1px 5px;border-radius: 2em;z-index:1000;']]);
		document.body.appendChild(ltime);
	}
	var fts = " RB:<b>" + (Date.now()-RunTime[0]) + "</b>ms";
	ltime.insertBefore($ee("span",fts), $gt('br',ltime)[0]);
}

/************* CSS & ID *****************/

var allIDs = [
	'mbuyf', // 0-mbuyf
	'resoursebar', // 1-resourcebar
	'progressbar', // 2-progressbar (class)
	'rb_tooltip', // 3-rb_tooltip
	'flDIV', // 4-flDIV (class)
	'newDd', // 5-newDd (class)
	'RBSetup', // 6-RBSetup
	'gnTable', // 7-gnTable (class)
	'rbOverview', // 8-rbOverview
	'rbLinks', // 9-rbLinks
	'pbOview', // 10-pbOview(123) (class)
	'rb_sum', // 11-rb_sum
	'rb_sum2', // 12-rb_sum2
	'redLine', // 13-redLine (class)
	'flDIV', // 14-flDIV(num)
	'buttons', // 15- buttons (class)
	'progressbar-completed', // 16-progressbar-completed
	'rbOtime', // 17-rbOtime
	'sf', // 18-sf
	'bordered', // 19-bordered
	'total', // 20-total
	'invisT', // 21-invisT
	'audio', // 22-audio alerts
	'attAlert', // 23-attack alert
	'FreezePaneOff', // 24-FreezePaneOff (class)
	'FreezePaneOn', // 25-FreezePaneOn (class)
	'InnerFreezePane', // 26-InnerFreezePane
	'FreezePane',  // 27-FreezePane
	'alarmClock', // 28-alarmClock
	'existT',	// 29-mark for links (class)
	'res_sum',	// 30-res_sum
	'ww_res_sum',	// 31-ww_res_sum
/* images */
	'hide',	// 32-img_hide (class)
	'car',	// 33- cargo
	'def',	// 34- defender
	'att',	// 35- attack
	'igm',	// 36- igm
	'info',	// 37- user info
	'edit',	// 38- edit
	'del',	// 39- delete
	'clipin',	// 40- clip in
	'clipout',	// 41- clip out
/* no images */
	'TMbuildingtags',	// 42- (class)
	'tm_uplevel',	// 43- (class) - now vacant!
	'marketWW',	// 44- template for merchant-tables (id)
	'mrgn', // 45- padding for image
	'selected', // 46- selected elements
	'tinfo', // 47- img_tinfo
	'vl',	// 48- village list icons
	'closeBtn'	//49- close button
	];

function randomizeIDs () {
	function replacer ( n ) {
		return rtStr[parseInt(n)];
	}
			//    0   1   2   3   4   5   6   7   8   9
	var rtStr = ['d','h','w','l','y','m','t','a','b','i'];
	var UUIDs = '';
	for( var i = 0; i < allIDs.length; i++ ) {
		do {
			var rID_num = (Math.round(Math.random()*Math.pow(10,Math.random()*3+5) + 1e3)).toString();
			var rID = rID_num.replace(/\d/g, replacer);
			var Rej = new RegExp(rID);
		} while( Rej.test(UUIDs) )
		UUIDs += rID + ',';
		allIDs[i] = rID;
	}
}
randomizeIDs();

acss = "table#"+allIDs[0]+" {width:100%; border-collapse:collapse; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#"+allIDs[0]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[0]+" td."+allIDs[18]+" {background-color:#FFE4B5;}" +
	"table#"+allIDs[1]+" {border-collapse:collapse; text-align:left; background-color:white; padding:0px; margin:0px;}" +
	"table#"+allIDs[1]+" tr {height:18px;border-collapse:collapse; text-align:left;}" +
	"table#"+allIDs[1]+" td {font-size:8pt;overflow:visible;white-space:nowrap;background-color:transparent; border:1px solid silver; padding:0px;}" +
	"table#"+allIDs[1]+" td."+allIDs[11]+" {font-size:8pt;background-color:#FFFFAF; text-align:right;}" +
	"table#"+allIDs[1]+" td."+allIDs[12]+" {background-color:#FFFFAF;height:18px; text-align:center; font-size:11px;}" +
	"table#"+allIDs[1]+" th {border:1px solid silver;height:18px;text-align:left;direction:ltr;white-space:nowrap;}" +
	"table#"+allIDs[1]+" th a {color:black; font-size:11px;}" +
	"."+allIDs[2]+" {width: 210px; }" +
	"div#"+allIDs[3]+" {position:absolute;z-index:10000;border:1px solid silver;text-align:center;background-color:#FFFFE0;}" +
	"."+allIDs[4]+" {position:absolute;border:1px solid silver;text-align:center;background-color:white;border-radius:5px;overflow:hidden;}" +
	"."+allIDs[5]+" {width:100%;height:7px;text-align:center;background-color: #D0D0FF;cursor:move;font-size:6pt;}"+
	"table#"+allIDs[6]+" {width:auto;border-collapse:collapse; text-align:left; background-color:#F0F0F0; margin:1px;}" +
	"table#"+allIDs[6]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[6]+" td input {width:150px;text-align:right}" +
	"."+allIDs[7]+" {width:auto;border-collapse:collapse; text-align:left; background-color:transparent; margin:1px;}" +
	"."+allIDs[7]+" td {background-color:transparent; border:1px solid silver; padding:0px 2px;text-align:right;}" +
	"."+allIDs[7]+" td img {margin:0px 3px;}" +
	"table#"+allIDs[8]+" {min-width:350px;width:auto;border-collapse:collapse; text-align:left; background-color:#F8F8F8; margin:1px;}" +
	"table#"+allIDs[8]+" tr {border-collapse:collapse; text-align:left;} table#"+allIDs[8]+" tbody tr:hover {background-color:#E5E5F0;}" +
	"table#"+allIDs[8]+" td {overflow:visible;white-space:nowrap;background-color:transparent;padding:0px 5px 1px;}" +
	"table#"+allIDs[8]+" td a {color:black;} table#"+allIDs[8]+" thead td {text-align:center;}" +
	"table#"+allIDs[8]+" td."+allIDs[17]+" {text-align:right;font-size:8pt;}" +
	"table#"+allIDs[8]+" td."+allIDs[10]+" {font-size:11px;width:54px;border:1px solid silver;background-color:transparent;padding:0px;}" +
	"table#"+allIDs[9]+" {width:auto;border-collapse:collapse; background-color:white; margin:0px;}" +
	"table#"+allIDs[9]+" tr {border-collapse:collapse;} table#"+allIDs[9]+" tbody tr:hover {background-color:#E5E5F0;}" +
	"table#"+allIDs[9]+" td {white-space:nowrap;text-align:left;background-color:transparent;padding:0px 5px 1px;}" +
	"table#"+allIDs[9]+" thead td {font-weight:bold;color:#3C3C3C;} table#"+allIDs[9]+" a {font-size:12px;color:#252525;font-weight:normal;}" +
	"."+allIDs[10]+"1 {width:100%;background-color:"+bgcolor[0]+";float:"+docDir[0]+";margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"2 {width:100%;background-color:"+bgcolor[1]+";float:"+docDir[0]+";margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"3 {width:100%;background-color:"+bgcolor[2]+";float:"+docDir[0]+";margin:0px; display:inline;padding:0px 2px;}" +
	/* "table#vlist {border-collapse:collapse;}" + */"table#vlist tbody td {background-color:transparent;} table#vlist tr:hover {background-color:#E5E5F0;}" +
	"."+allIDs[13]+" {width:100%; border-collapse:collapse; border:1px solid silver;margin-bottom:15px;} ."+allIDs[13]+" td{text-align:center; background-color:#FFC0C0; padding:1px; margin:1px;}" +
	"."+allIDs[19]+" {border:1px solid silver; text-align:right;}" +
	"tbody."+allIDs[20]+" {background-color:#F8FFEE;} tbody."+allIDs[20]+" td {background-color:transparent;text-align:center;} tbody."+allIDs[20]+" th {background-color:transparent;}" +
	"."+allIDs[21]+" {border-collapse:collapse;background-color:transparent;} ."+allIDs[21]+" td {background-color:transparent;}" +
	"button."+allIDs[15]+" {color:#fff;font-weight:bold;border-radius:5px;background-image:linear-gradient(to top,#5c8d0f,#82b433);padding:3px 12px;margin:3px 3px;}" +
	"."+allIDs[24]+" { visibility:hidden; display:none; position:absolute; top:-100px; left:-100px; }" +
	"."+allIDs[25]+" { position:absolute; top:0px; left:0px; visibility:visible; display:block; width:100%; height:100%; background-color: black; z-index: 20000; opacity:0.7; padding-top: 20%; }" +
	"."+allIDs[26]+" { text-align:center; width:66%; background-color:#000015; color:white; font-size:large; border:dashed 2px #FF00AA; padding:9px; } ."+allIDs[26]+" button {color:white;}" +
	"span."+allIDs[29]+" { visibility:hidden; display:none; }" +
	"."+allIDs[42]+" {background-image:none !important; background-color:white; border:thin solid #000000; padding-top: 3px; border-radius: 2em; -moz-border-radius: 2em;" +
		"font: normal normal 600 14px/16px Arial; line-height:16px !important; width:22px !important; height:19px !important;}" +
	"table#"+allIDs[31]+" td a {color:black;font-weight:normal;}" +
 	"."+allIDs[32]+" { padding:0px 2px;cursor:pointer;height:11px;width:12px;background: url("+img_hide+") no-repeat 0px 0px; }" +
	"."+allIDs[33]+" { height:12px !important;width:18px !important;background: url("+img_car+") no-repeat 0px 0px !important; }" +
	"."+allIDs[34]+" { height:12px !important;width:18px !important;background: url("+img_def+") no-repeat 0px 0px !important; }" +
	"."+allIDs[35]+" { height:12px;width:18px;background: url("+img_att+") no-repeat 0px 0px !important; }" +
	"."+allIDs[36]+" { height:8px;width:11px;background: url("+img_igm+") no-repeat 0px 0px;margin:0px 3px; }" +
	"."+allIDs[37]+" { height:10px;width:12px;background: url("+img_info+") no-repeat 0px 0px;margin:0px 3px; }" +
	"."+allIDs[38]+" { height:12px;width:16px;background: url("+img_edit+") no-repeat 0px 0px;cursor:pointer; }" +
	"."+allIDs[39]+" { height:12px;width:16px;background: url("+img_del+") no-repeat 0px 0px;cursor:pointer; }" +
	"."+allIDs[47]+" { height:12px;width:12px;background: url("+img_tinfo+") no-repeat 0px 0px;margin:0px 5px; }" +
	"img."+allIDs[45]+" {margin:0px 3px;} ."+allIDs[46]+" * {background-color:#ECECEC !important;} " +
	"#"+allIDs[49]+" { line-height: 29px; color: white; z-index: 100; float: "+docDir[1]+"; width: 28px; height: 28px; margin-top: 5px; " +
	"margin-"+docDir[1]+": 5px; display: inline-block; position: relative; border-radius: 5px; background-image:linear-gradient(to top,#5c8d0f,#82b433);} ";

if( /karte|position/.test(crtPath) ) acss += "."+allIDs[40]+" { height:12px;width:16px;background: url("+img_clipIn+") no-repeat 0px 0px;cursor:pointer; }"+
	"."+allIDs[41]+" { height:12px;width:16px;background: url("+img_clipOut+") no-repeat 0px 0px;cursor:pointer; }";

acss += "table#vlist td{padding:0;line-height:16px;text-align:"+docDir[0]+";white-space:nowrap;}table#vlist thead td{background-color:#FFF;height:22px;text-align:center;padding:0px 3px;}" +
	"table#vlist td.dot{width:10px;padding:0 3px;}table#vlist td.link{padding-right:10px;}table#vlist thead td a{font-weight:bold;color:#3C3C3C;}" +
	"table#vlist tbody td{font-size:12px;padding:0 2px;}table#vlist td.hl{color:#FF8000;}table#vlist td.link{font-size:14px;}table#vlist {border-collapse:collapse;}" +
	"table#vlist td a{font-weight:normal;color:#252525;}table#vlist td a.active{font-weight:bold;color:#252525;}" + //#FF8000;
	"div#build.gid17 table.send_res td {padding:2px 3px;} div.alliance table#offs td.sub div {"+(ltr?"padding-left":"padding-right")+":44px;}" +
	"div.subjectWrapper {width:95% !important; margin-"+docDir[0]+";"+docDir[0]+":16px;} div.reports table#overview td.sub .iReport {position:relative;"+docDir[0]+":-4px;}" +
	"td.coords,th.coords a{white-space:normal !important;} #side_info .listing ul li:hover a {background-color:white;} #side_info .listing ul {padding-"+docDir[1]+":16px;}";

	acss += "span."+allIDs[48]+" {position:relative;float:"+docDir[0]+";margin-top:-17px;padding-top:3px;height:15px;"+docDir[0]+":110px !important;}"+
	"span."+allIDs[48]+" a {display:inline !important;margin:0px !important;padding:0px !important;width:18px !important;left:auto !important;position:relative;}"+
	"span."+allIDs[48]+" img {left:0 !important;top:0 !important;position:relative !important;}"+
	"ul#outOfGame {width:335px} div.name {white-space:nowrap}";

RB_addStyle(acss);

/*************tooltips elements*****************/
function makeTooltip( ttObj ) {
	var ttD = $g(allIDs[3]);
	if( ! ttD ) {
		ttD = $e('DIV', [['id', allIDs[3]]]);
		document.body.appendChild(ttD);
		document.addEventListener("mousemove", updateTooltip, false);
	}
	ttD.appendChild( ttObj );
	return ttD;
}
function removeTooltip() {
	var ttD = $g(allIDs[3]);
	if( ttD ) {
		document.removeEventListener("mousemove", updateTooltip, false);
		document.body.removeChild(ttD);
		timerP.length = lastTimerP[0];
		timerB.length = lastTimerB;
	}
}
function updateTooltip(e){
	updatePosition( allIDs[3], [e.pageX,e.pageY] );
}
function updatePosition( wn, xy, sh ){
	var ttD = $g(wn);
	if( ! ttD ) return;
	var dW = ttD.clientWidth;
	var dH = ttD.clientHeight;
	var y = xy[1] + 8;
	if( sh ) {
		var x = RB.XY[sh*2];
	} else {
		var x = xy[0] + 8;
		if (x + dW > window.innerWidth + window.scrollX) x = x > dH + 16 ? x - dW - 16: 0;
	}
	ttD.style.left = x + "px";
	if (y + dH > window.innerHeight + window.scrollY) y = y > dH + 16 ? y - dH - 16: 0;
	ttD.style.top = y + "px";
};
function addToolTip (newITT,nd) {
	if( newITT ) {
		tiImg = trImg(allIDs[47]);
		tiImg.addEventListener("mouseover", function () { makeTooltip(newITT); }, false);
		tiImg.addEventListener("mouseout", removeTooltip, false);
		nd.appendChild(tiImg);
	}
}
/*************drag elements*****************/
var dragMaster = (function() {
	var dragObject;
	var mouseOffset;
	var mouseDownAt;
	var touchFL;
	function getMouseOffset(target, e) {
		var docPos = offsetPosition(target);
		return {x:e.pageX - docPos[0], y:e.pageY - docPos[1]};
	}
	function mouseUp(){
		if (mouseDownAt) {
			mouseDownAt = null;
		} else {
			savePosition(dragObject);
			dragObject = null;
		}
		if(touchFL) {
			document.removeEventListener('touchmove', touchMove, true);
			document.removeEventListener('touchend', mouseUp, true);
			document.removeEventListener('touchcancel', mouseUp, true);
		} else {
			document.removeEventListener('mousemove', mouseMove, true);
			document.removeEventListener('mouseup', mouseUp, true);
		}
	}
	function mouseMove(e){
		var ev = touchFL?e.touches[0]:e;
		if (mouseDownAt) if (Math.abs(mouseDownAt.x-ev.pageX)<10 && Math.abs(mouseDownAt.y-ev.pageY)<10) return;
		with(dragObject.style) {
			position = 'absolute';
			top = ev.pageY - mouseOffset.y + 'px';
			left = ev.pageX - mouseOffset.x + 'px';
		}
		mouseDownAt = null;
		if(touchFL) e.preventDefault();
		return false;
	}
	function dragStart(e,o,fl) {
		touchFL=fl;
		dragObject  = o.parentNode;
		var ev = touchFL?e.touches[0]:e;
		mouseOffset = getMouseOffset(o, ev);
		mouseDownAt = { x: ev.pageX, y: ev.pageY, dragObject: o };
		if(touchFL) {
			document.addEventListener('touchmove', mouseMove, true);
			document.addEventListener('touchend', mouseUp, true);
			document.addEventListener('touchcancel', mouseUp, true);
			e.preventDefault();
		} else {
			document.addEventListener('mousemove', mouseMove, true);
			document.addEventListener('mouseup', mouseUp, true);
		}
	}
	function mouseDown(e) {
		if (e.which!=1) return;
		dragStart(e,this,false);
		return false;
	}
	function touchStart(e) {
		dragStart(e,this,true);
		return false;
	}
	return {
		makeDraggable: function(element){
			element.addEventListener('mousedown', mouseDown, true);
			element.addEventListener('touchstart', touchStart, true);
		}
	}
}())
/**********end**drag elements*****************/

function savePosition(objName) {
	objNum = parseInt(objName.id.match(/\d+$/)[0]);
	if( objNum > 20 ) return;
	RB.XY[objNum*2] = objName.style.left.match(/^\d+/)[0];
	RB.XY[objNum*2+1] = objName.style.top.match(/^\d+/)[0];
	saveCookie('xy', 'XY');
}

var divSN = 100;
function makeFloat(flObj, ix, iy, sid) {
	flId = sid !== undefined ? sid : ++divSN;
	var zindex = 5999;
	switch (flId) {
		case 4:  zindex = 9999; break;
		case 21:  zindex = 10001; break;
	}
	bd = $e('div',[['id',allIDs[14] + flId],['class',allIDs[4]],['style','left:'+ ix +'px;top:'+ iy +'px;z-index:'+ zindex +';']]);
	bdr = $ee('div','',[['class',allIDs[5]],['onmousedown',jsNone]]);
	bd.appendChild(bdr);
	bd.appendChild(flObj);
	document.body.appendChild(bd);
	dragMaster.makeDraggable(bdr);
	return allIDs[14] + flId;
}

function makeFloatD(flObj, mNum) {
	var ix = RB.XY[mNum*2] < 1 ? 1: RB.XY[mNum*2];
	var iy = RB.XY[mNum*2+1] < xyBody[1] ? xyBody[1]: RB.XY[mNum*2+1];
	return makeFloat(flObj, ix, iy, mNum);
}

function closeWindowN ( num ) {
	if( windowID[num] == undefined ) return false;
	var wo = $g(windowID[num]);
	if( ! wo ) return false;
	wo.parentNode.removeChild(wo);
	windowID[num] = undefined;
	return true;
}

function bodyHide ( body ) {
	if( body[0].getAttribute('style',2) === null ) {
		body[0].setAttribute('style','display:none');
		RB.bodyH[body[1]] = 1;
		if( body[2] ) body[2].style.backgroundPosition = '0px -12px';
	} else {
		body[0].removeAttribute('style');
		RB.bodyH[body[1]] = 0;
		if( body[2] ) body[2].removeAttribute('style');
	}
	saveCookie('bodyH', 'bodyH');
}

/************************** build pages ****************************/

// begin Travian - add needed resources automatically under build/upgrade link
function needed_show( base ) {
	function saveWantsMem ( wantsResM ) {
		var noplace = '';
		var ofFL = false;
		for( var i = 0; i< 4; i++ ) if( wantsResM[i+5] > fullRes[i] ) ofFL = true;
		if( ofFL ) {
			noplace = gtext("noplace");
			if( wantsResM[4] != village_aid ) RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
		} else RB.wantsMem = wantsResM.slice();
		RB.wantsMem[4] = village_aid;
		saveCookie('Mem', 'wantsMem');
		alert( noplace +"\nSaved: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
	function showPlusTimer () {
		var j=timerB.length;
		timerB[j] = new Object();
		timerB[j].time = Math.abs(Math.round(wantsRes/incomepersecond[e]));
		timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
		return timerB[j].obj;
	}

	var neededRes = base.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);
	wfl = false;
	var wantsResMem = [0,0,0,0,0,0,0,0,0,0];
	var wantsResMemP = RB.wantsMem.slice();

	var forNPC = [0,0];
	var beforeThis = $e('DIV');
	for (var e = 0; e < 4; e++) {
		wantsResMem[e+5] = parseInt(neededRes[e+1]);
		wantsResMemP[e+5] = parseInt(wantsResMemP[e+5]) + wantsResMem[e+5];
		var wantsRes = resNow[e] - wantsResMem[e+5];
		var wantsResP = resNow[e] - wantsResMemP[e+5];
		if (wantsResP < 0) wantsResMemP[e] = Math.abs(wantsResP);
		forNPC[0] += wantsRes;
		forNPC[1] += incomepersecond[e];
		beforeThis.appendChild(trImg('r' + (e+1)));
		if (wantsRes >= 0) {
			if( income[e] < 0 )
				beforeThis.appendChild($em('SPAN',['+'+ wantsRes+ ' (',showPlusTimer(),') '],[['style','color:green;']]));
			else
				beforeThis.appendChild($ee('SPAN','+'+ wantsRes +' ',[['style','color:green;']]));
		} else {
			beforeThis.appendChild($em('SPAN',[wantsRes + ' (',(income[e] > 0 ? showPlusTimer(): '--:--'),') '],[['style','color:red;']]));
			wantsResMem[e] = Math.abs(wantsRes);
			wfl = true;
		}
	}
	if( RB.Setup[11] > 0 && forNPC[0] < 0 ) {
		var j=timerB.length;
		timerB[j] = new Object();
		timerB[j].time = Math.abs(Math.round(forNPC[0]/forNPC[1]));
		timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
		beforeThis.appendChild($em('SPAN',['(',trImg('npc_inactive'),' ',timerB[j].obj,') ']));
	}
	var memP = $a('(M)',[['href',jsVoid],['dir','ltr']]);
	memP.addEventListener('click', function(x) { return function() { saveWantsMem(x); }}(wantsResMem), 0);
	beforeThis.appendChild(memP);
	if( RB.wantsMem[4] == village_aid ) {
		var memP = $a(' (M+)',[['href',jsVoid]]);
		memP.addEventListener('click', function(x) { return function() { saveWantsMem(x); }}(wantsResMemP), 0);
		beforeThis.appendChild(memP);
	}

	return beforeThis;
}

function neededResAdd () {
	function addNPC( base ) {
		var gold = $gc('gold',base);
		if( gold.length > 0 ) {
			gold[0].addEventListener('click', function(x) { setTimeout(npcForTroops,500); }, 0);
		}
	}

	var baseWrap = $xf('.//div[contains(@class,"contractWrapper")]','l',cont);
	for( var j = 0; j < baseWrap.snapshotLength; j++ ) {
		var baseCosts = $xf('.//div[contains(@class,"contractCosts")]','l', baseWrap.snapshotItem(j));
		for( var i = 0; i < baseCosts.snapshotLength; i++ ) {
			var base = baseCosts.snapshotItem(i).innerHTML;
			if ( ! />(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/.test(base) ) break;
			var newD = needed_show( base );
			if( wfl || baseCosts.snapshotItem(i).parentNode.getAttribute("class") != "details" ) $gc('showCosts',baseWrap.snapshotItem(j))[0].appendChild( newD );
			addNPC(baseCosts.snapshotItem(i));
		}
	}

	var research = $xf('//div[(@class="research") or contains(@class,"action")]','l',cont);
	for( var i = 0; i < research.snapshotLength; i++ ) {
		var base = research.snapshotItem(i);
		if ($gc('showCosts',base).length > 0) {
			var newD = needed_show( base.innerHTML );
			if( wfl ) $gc('showCosts',base)[0].appendChild( newD );
			addNPC(base);
		}
	}

	var heroCost = $xf('//div[(@class="regenerateCosts")]','l',cont);
	for( var i = 0; i < heroCost.snapshotLength; i++ ) {
		var base = heroCost.snapshotItem(i);
		if ($gc('showCosts',base).length > 0) {
			var newD = needed_show( base.innerHTML );
			if( wfl ) $gc('showCosts',base)[0].appendChild( newD );
			addNPC(base);
		}
	}

	var clk = $gc('clocks',cont);
	for( var i = 0; i < clk.length; i++ ) {
		if ( ! />(\d+:\d+:\d+)/.test(clk[i].innerHTML) ) continue;
		var needTime = (clk[i].innerHTML).match(/>(\d+:\d+:\d+)/)[1];
		clk[i].title=RB.dictionary[14]+formatTime(absTime(toSeconds(needTime)),4);
	}

	lastTimerB = timerB.length;
}
// end Travian - add needed resources automatically under build/upgrade link

/********************* messages & reports ***************************/

function convertCoordsInMessagesToLinks() {
	var cM = $xf("//div[@*='message']");
	if( cM ) {
		var arXY = [];
		var iHTML = cM.innerHTML.replace(/([\u202a-\u202f])/g,'');
		var iHTML2 = iHTML;

		var j = 0;
		var villageLink = [];
		var Rej = /<a.+?\/a>/gi; // new Travian IGM extended tags
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[0];
			villageLink[j] = "<span>" + mLink + "</span>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /(https?:\/\/[^\s<>"$]+)/gi; // URLs
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[1].match(/(.*?)(?:\.|,|<|\))?$/)[1];
			villageLink[j] = "<span><a target='_blank' href='" + mLink + "'>" + mLink + "</a></span>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /[\/:]?(-?\d+)(?:<.+?>)?\s*?([\|\/\\ ])?(?:<.+?>)?\s*?(-?\d+)(?![\$\/%\d:])/g;
		while ((arXY = Rej.exec(iHTML)) != null) {
			if( /^[\/:]/.test(arXY[0]) ) continue;
			if( ! ( arXY[2] != undefined || arXY[3] < 0 )) continue;
			if( Math.abs(arXY[1]) > mapRadius || Math.abs(arXY[3]) > mapRadius ) continue;
			villageLink[j] = "<span><a href='karte.php?x="+arXY[1]+"&y="+arXY[3] +"'>"+ arXY[0] +"</a></span>";
			iHTML2 = iHTML2.replace(arXY[0], "<#!" + (j++) + "/>");
		}
		for( var i = 0; i < j ; i++ ) {
			iHTML2 = iHTML2.replace("<#!" + i + "/>", villageLink[i]);
		}
		villageLink.length = 0;
		cM.innerHTML = iHTML2;
		var mLinks = $xf('.//span/a','l',cM);
		for( var i = 0; i < mLinks.snapshotLength; i++ ) {
			distanceTooltip(mLinks.snapshotItem(i),0);
			sendResTropAdd(mLinks.snapshotItem(i), 1);
			linkHint(mLinks.snapshotItem(i));
		}
	}
}

/************************* Marketplace ****************************/

// market filter on buy page
function applyFilter_hide() {
	var market = $g("range").tBodies[0].rows;
	for (var mr = 0; mr < market.length; mr++) {
		var market_hide = [0,0,0];
		var mf = market_all[mr].split(";");
		for ( var i = 0; i < 2; i++ ) {
			for ( var j = 1; j < 5; j++ ) {
				if( mf[i] == RB.market_fi[4*i+j-1]*j || market_fc[i] == 0 ) {
					market_hide[i] = 1;
				}
			}
		}
		if( RB.market_fi[8] == 1 && mf[2] < 1 ) market_hide[2] = 1;
		if( RB.market_fi[9] == 1 && mf[2] == 1 ) market_hide[2] = 1;
		if( RB.market_fi[10] == 1 && mf[2] >= 1 ) market_hide[2] = 1;
		if( RB.market_fi[11] == 1 && mf[2] > 1 ) market_hide[2] = 1;
		if( market_fc[2] == 0 ) market_hide[2] = 1;
		// apply filter
		if( market_hide[0]*market_hide[1]*market_hide[2] == 1 ) {
			market[mr].style.display = '';
		} else {
			market[mr].style.display = 'none';
		}
	}
}

function applyFilter_row( row ) {
	market_fc[row] = 0;
	for ( var i = 0; i < 4; i++ ) {
		var n = row*4+i;
		if ( RB.market_fi[n] != 0 ) {
			market_fc[row]++;
			market_ftd[n].setAttribute('class', allIDs[18]);
		} else {
			market_ftd[n].removeAttribute('class');
		}
	}
}

function applyFilter( fi ) {
	var row = Math.floor(fi/4);
	if( RB.market_fi[fi] == 0 && ( market_fc[row] > 2 || row > 1 )) {
		for ( var i = 0; i < 4; i++ ) {
			RB.market_fi[row*4+i] = 0;
		}
	}
	RB.market_fi[fi] = 1 - RB.market_fi[fi];
	applyFilter_row( row );
	applyFilter_hide();
	saveCookie('mf', 'market_fi');
}

function marketBuy() {
	var market = $g("range");
	if( !(market) ) return;
	if( RB.village_Var[0] > 0 ) {
		market = market.tBodies[0].rows;
		for ( var mr = 0; mr < market.length; mr++ ) {
			if( market[mr].cells.length < 5 ) break;
			var btn = market[mr].cells[5].getElementsByTagName('BUTTON');
			if( btn.length == 0 ) continue;
			var wanted = parseInt(market[mr].cells[2].innerHTML.match(/>\s*?(\d+)/)[1]);
			var totMerchants = Math.ceil(wanted / RB.village_Var[0]);
			var crtExceed = wanted - totMerchants * RB.village_Var[0];
			var newTip = RB.dictionary[2]+': '+totMerchants;
			if( crtExceed < 0 ) newTip += ' ( '+ crtExceed + ' )';
			btn[0].setAttribute('title', newTip);
		}
	}
	if( RB.dictFL[4] == 0 ) {
		var TM = $g("range").tHead.rows[0].cells[4].innerHTML.onlyText();
		if( RB.dictionary[4] != TM ) {
			RB.dictionary[4] = TM;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[4] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
	if( RB.dictFL[11] == 0 ) {
		try {
			var tm = $gc('active',$gc('contentNavi',cont)[0])[0].innerHTML.onlyText().trim();
		} catch(err) {
			var tm = false;
		}
		if( tm ) {
			RB.dictionary[11] = tm;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[11] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
}

// market send page :)
function marketSend () {
	function setMerchantsCell(tM, colM) {
		cM.innerHTML = tM;
		$at(cM, [['style', 'font-size:11px; color:' + colM + ';line-height:16px;']]);
	};
	function getTotTransport() {
		var totT = 0;
		for (var i = 1; i < 5; i++) {
			var aR = parseInt(rxI[i].value);
			if (isFinite(aR)) totT += aR;
		}
		return totT;
	}
	function mhRowUpdate() {
		var totTransport = getTotTransport();
		var totMerchants = Math.ceil(totTransport / maxC);
		var mhColor = 'darkgreen';
		var crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
		var crtExceed = totTransport - maxTr;

		var mhText = "<b>" + mName + ": " + totMerchants + " / " + maxM + "<br />"+(ltr?"&#931;":"")+"= " + totTransport;
		if (totMerchants > maxM) {
			mhColor = "red";
			mhText += " ( "+ crtExceed + " )";
		} else if ( crtWaste ) mhText += " ( -"+ crtWaste + " )";
 		mhText += "</b>";
		setMerchantsCell(mhText, mhColor);
	}
	function getMaxRTr () {
		var maxRRTr = parseInt(maxRC.value);
		var maxRTr = isNaN(maxRRTr)? maxTr: maxRRTr;
		var maxRMM = parseInt(maxRM.value);
		var maxRTTr = isNaN(maxRMM)? maxTr: maxRMM * maxC;
		return Math.min(maxRTr, maxRTTr);
	}
	function mhRowLinkR ( RC ) {
		var maxRTr = getMaxRTr();
		var totTransport = getTotTransport();
		var aR = parseInt(rxI[RC].value).NaN0();
		if( lastLinkR[0] != RC || lastLinkR[3] != aR ) {
			lastLinkR = [RC,0,aR];
			var totMerchants = Math.ceil(totTransport / maxC);
			var crtExceed = totTransport - maxRTr;
			if( crtExceed > 0 ) {
				rxI[RC].value = Math.ceil(crtExceed / maxC) > Math.ceil(aR / maxC) || aR < crtExceed ? 0: rxI[RC].value - crtExceed;
			} else {
				var crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
				var recomended = crtWaste != 0 ? aR + crtWaste : 0;
				var i = recomended < resNow[RC-1] ? recomended : resNow[RC-1];
				rxI[RC].value = crtExceed < 0 ? i : 0;
			}
		} else {
			var i = ( aR == 0 && lastLinkR[1] == 0 ) ? false : true;
			rxI[RC].value = lastLinkR[1] == 0 && i ? 0 : lastLinkR[2];
			if( ++lastLinkR[1] > 1 || ! i ) lastLinkR[0] = 0;
		}
		lastLinkR[3] = parseInt(rxI[RC].value);
		mhRowUpdate();
	}
	function mhRowLinkM ( RC ) {
		var aR = parseInt(rxI[RC].value);
		rxI[RC].value = aR > maxC ? aR - maxC : '';
		mhRowUpdate();
	}
	function mhRowLinkP ( RC ) {
		var aR = parseInt(rxI[RC].value);
		var i = isNaN(aR) ? maxC : aR + maxC;
		rxI[RC].value = i < resNow[RC-1] ? i : resNow[RC-1];
		mhRowUpdate();
	}
	function mhRowsLinkM () {
		for( var i = 1; i < 5; i++ )
			if( checkRes[i].checked ) mhRowLinkM ( i );
	}
	function mhRowsLinkP () {
		for( var i = 1; i < 5; i++ )
			if( checkRes[i].checked ) mhRowLinkP ( i );
	}
	var extNegat = 0;
	function mhRowLinkMem () {
		loadVCookie('vPPH', 'village_PPH', RB.wantsMem[4]);
		if( RB.wantsMem[4] == 0 ) return;
		var htR = getTTime( calcDistance(RB.wantsMem[4], village_aid), MTime[parseInt(RB.Setup[2])]*sM, 0, 0 );
		var ht = parseInt(RB.wantsMem[9]) < htR ? htR - parseInt(RB.wantsMem[9]): 0;
		for( var i = 0; i < 4; i++ ) {
			var wantRes = Math.ceil(parseInt(RB.wantsMem[i]) - RB.village_PPH[i]/3600 * ht);
			if( RB.village_PPH[i] < 0 && ht > 0 ) {
				var deltaTime = RB.village_PPH[12] > 0 ? Math.round((Date.now())/1000) - parseInt(RB.village_PPH[12]): 0;
				var leftResInV = Math.floor(RB.village_PPH[i]/3600 * (deltaTime + ht) + RB.village_PPH[i+4]);
				if( leftResInV < 0 ) {
					var nowResInV = Math.floor(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
					if( nowResInV < 0 ) nowResInV = 0;
					wantRes = nowResInV + parseInt(RB.wantsMem[i]);
				}
				var minLeft = prompt(gtext("consnegat"), 10);
				if( minLeft == null ) minLeft = 0;
				if( minLeft == 0 ) wantRes = RB.wantsMem[i];
				else {
					extNegat = Math.ceil(RB.village_PPH[i]/3600 * parseInt(minLeft)*60);
					wantRes -= extNegat;
				}
			}
			if( wantRes < 0 ) wantRes = 0;
			if( checkRes[i+1].checked ) rxI[i+1].value = wantRes < resNow[i] ? wantRes: resNow[i];
		}
		mhRowUpdate();
		sendResourses( RB.wantsMem[4] );
	}
	var mcFL = true;
	function rEL () {
		$g('button').removeEventListener('DOMNodeInserted',rEL);
		if( mcFL ) {
			($gc('merchantsAvailable')[0]).addEventListener('DOMNodeInserted',reloadMerchants,false);
			mcFL = false;
		}
		setTimeout(reloadSettings,100);
	}
	function removeACh () {
		$g('button').addEventListener('DOMNodeInserted',rEL,false);
		if( typeof checkRes == 'undefined' ) return;

		for( var i = 1; i < 5; i++ )
			checkRes[i].checked = false;

		if( $gn('x').length < 1 ) return;
		var xx = parseInt($gn('x')[0].value);
		var yy = parseInt($gn('y')[0].value);
		if( isNaN(xx) || isNaN(yy) ) return;
		if( xy2id(xx,yy) == RB.wantsMem[4] ) {
			RB.wantsMem[3] = parseInt(RB.wantsMem[3]) - extNegat;
			saveCookie('Mem', 'wantsMem');
		}
	}
	function mhRowsLinkPP () {
		var maxRTr = getMaxRTr();
		switch (lPP) {
			case 0:
				refP.innerHTML = '&nbsp;%';
				lPP++;
				var aRF = [];
				for( var i = 0; i < 4; i++ ) if( checkRes[i+1].checked && resNow[i] > 0 ) aRF.push(resNow[i]);
				if( aRF.length > 0 ) {
					aRF.sort(function(a,b){return b-a;});
					var aRc = 0;
					var aRc2 = 0;
					for( i=aRF.length; i>0; i--) {
						aRc += aRc2;
						aRc2 = aRF[i-1];
						if( aRc+aRF[i-1]*i >  maxRTr ) break;
					}
					aRc = Math.floor((maxRTr-aRc)/i);
					for( var i = 0; i < 4; i++ )
						if( checkRes[i+1].checked ) rxI[i+1].value = aRc > resNow[i] ? resNow[i]: aRc;
					mhRowUpdate();
				}
				break;
			case 1:
				refP.innerHTML = '&nbsp;C';
				lPP++;
				var aRc = 0;
				var aRn = 0;
				for( var i = 1; i < 5; i++ ) if( checkRes[i].checked ) { aRc++; aRn += resNow[i-1]; }
				if( aRc > 0 ) {
					for( var i = 1; i < 5; i++ ) {
						if( checkRes[i].checked ) {
							var toRes = Math.floor((resNow[i-1]/aRn) * maxRTr);
							rxI[i].value = toRes < resNow[i-1] ? toRes : resNow[i-1];
						}
					}
					mhRowUpdate();
				}
				break;
			default:
				for( var i = 1; i < 5; i++ )
					if( checkRes[i].checked ) rxI[i].value = '';
				mhRowUpdate();
				refP.innerHTML = '&nbsp;=';
				lPP = 0;
				break;
		}
	}
	function mhRowLinkMPlus () {
		var xx = parseInt($gn('x')[0].value);
		var yy = parseInt($gn('y')[0].value);
		if( isNaN(xx) || isNaN(yy) ) return;
		RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
		for( var i=0; i<4; i++ )
			 if( isFinite(parseInt(rxI[i+1].value)) ) RB.wantsMem[i] = parseInt(rxI[i+1].value);
 		RB.wantsMem[4] = xy2id(xx,yy);
		saveCookie('Mem', 'wantsMem');
		alert( "Saved: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
	function mhRowLinkAMem () {
		var tID = $gn('kid')[0].value;
		if( tID != RB.wantsMem[4] ) return;
		loadVCookie('vPPH', 'village_PPH', RB.wantsMem[4]);
		var htR = getTTime( calcDistance(RB.wantsMem[4], village_aid), MTime[parseInt(RB.Setup[2])]*sM, 0, 0 );
		var ht = parseInt(RB.wantsMem[9]) < htR ? htR - parseInt(RB.wantsMem[9]): 0;
		for( var i = 0; i < 4; i++ ) {
			var rxI = $gn('r' + (i+1))[0].value;
			if( isNaN(parseInt(rxI)) || parseInt(rxI) == 0 ) continue;
			RB.wantsMem[i] = parseInt(RB.wantsMem[i]) - parseInt(rxI) - Math.ceil(RB.village_PPH[i]/3600 * ht);
			if( RB.wantsMem[i] <= 0 ) RB.wantsMem[i] = 0;
		}
		if( parseInt(RB.wantsMem[0])+parseInt(RB.wantsMem[1])+parseInt(RB.wantsMem[2])+parseInt(RB.wantsMem[3]) > 0 ) {
			if( parseInt(RB.wantsMem[9]) < ht ) RB.wantsMem[9] = ht;
		} else RB.wantsMem = [0,0,0,0,0,0,0,0,0,0];
		saveCookie('Mem', 'wantsMem');
	}
	function reloadSettings () {
		addButtonsEvent( checkTargetValidate() );
		for( var i = 1; i < 5; i++ )
			checkRes[i].checked = true;
		reloadMerchants();
	}
	function addButtonsEvent ( fl ) {
		var ss = $gt('button',$gn('snd')[0]);
		for( i=0; i<ss.length; i++ ) ss[i].addEventListener('click', removeACh, true);
		// travel time
		if( ! fl && ss.length > 0 )
			addShowDistanceIn( ss[0].parentNode, -1 );
		if( fl ) $gn('dname')[0].value = '';
	}
	function checkTargetValidate () {
		var basee = $g('target_validate');
		if( basee ) {
			$gc("sendRessources",$gn('snd')[0])[0].addEventListener('click', mhRowLinkAMem, true);
			addSpeedAndRTSend(basee);
			return true;
		} else return false;
	}
	function reloadMerchants () {
		checkMerchants();
		if( parseInt(maxRM.value).NaN0() > maxM ) maxRM.value = maxM;
		if( parseInt(maxRC.value).NaN0() > maxTr ) maxRC.value = maxTr;
		mhRowUpdate();
	}
	function checkMerchants () {
		moC = $gc('boxes-contents')[0];
		if (moC) {
			var moCC = moC.innerHTML.onlyText().match(/(\S+)\s+\D*?(\d+)\D+?(\d+)/);
			mName = moCC[1];
			maxM = ltr ? parseInt(moCC[2]) : parseInt(moCC[3]);
			merchInWork = parseInt(ltr ? moCC[3] : moCC[2]) - maxM;
			return false;
		} else return true;
	}

	if( checkTargetValidate() ) return;
	var basee = $g('send_select');
	if( ! basee ) return;

	var moC = null;
	var maxC = 0;
	var rxI = new Array();
	var mName = "";
	var maxM = 0;
	var maxTr = 0;
	var lastLinkR = [0,0,0,0];
	var checkRes = [];
	var lPP = 0;

	if( checkMerchants() ) return;

	if( mName != RB.dictionary[2] ) {
		RB.dictionary[2] = mName;
		saveCookie( 'Dict', 'dictionary' );
	}

	fillXY();

	for (var i = 1; i < 5; i++){
		rxI[i] = $g('r' + i);
		rxI[i].addEventListener('keyup', mhRowUpdate, false);
		rxI[i].addEventListener('change', mhRowUpdate, false);
		var iRow = basee.rows[i-1];
		$gt('a',iRow.cells[0])[0].addEventListener('click', mhRowUpdate, false);
		$g('addRessourcesLink'+i,iRow).addEventListener('click', mhRowUpdate, false);
		var ref = $a('-',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkM(x); }}( i ), false);
		iRow.appendChild($c(ref,[['width','5%']]));
		var ref = $a('R',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkR(x); }}( i ), false);
		iRow.appendChild($c(ref,[['width','5%']]));
		var ref = $a('+',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkP(x); }}( i ), false);
		iRow.appendChild($c(ref,[['width','5%']]));
		checkRes[i] = $e('INPUT',[['type','checkbox'],['checked','checked'],['name',allIDs[18]+i]]);
		iRow.appendChild($c(checkRes[i],[['width','5%']]));
	};
	maxC = parseInt($g('addRessourcesLink1',basee).innerHTML.match(/(\d+)/)[1]);
	maxTr = maxM * maxC;

	if( maxC != RB.village_Var[0] ) {
		RB.village_Var[0] = maxC;
		saveVCookie( 'VV', RB.village_Var );
	}

	var maxRM = $e('INPUT',[['type', 'TEXT'],['size',2],['value',maxM],['style','font-size:80%;']]);
	var maxRC = $e('INPUT',[['type', 'TEXT'],['size',5],['value',maxTr],['style','font-size:80%;']]);
	moC.appendChild($em('SPAN',[maxRM,' ??=',maxRC],[['style','margin:0px 5px;font-size:12px;']]));

	var newTR = $e('tr');
	var cM = $c('',[['colspan','3']]);
	newTR.appendChild(cM);
	if( basee.rows.length > 4 ) {
		for( i=basee.rows.length-1; i>3; i-- ) {
			var nc = basee.rows[i].cells.length;
			basee.rows[i].cells[nc-1].setAttribute('colspan',9-nc);
		}
		insertAfter(newTR,basee.rows[3]);
	} else basee.appendChild(newTR);
	mhRowUpdate();

	var ref = $a('(M)',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowLinkMPlus, false);
	newTR.appendChild($c(ref));
	var ref = $a('-',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowsLinkM, false);
	newTR.appendChild($c(ref,[['width','5%']]));
	var ref = $a('M',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowLinkMem, false);
	newTR.appendChild($c(ref,[['width','5%']]));
	var ref = $a('+',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowsLinkP, false);
	newTR.appendChild($c(ref,[['width','5%']]));
	var refP = $a('&nbsp;=',[['href',jsVoid]]);
	refP.addEventListener('click', mhRowsLinkPP, false);
	newTR.appendChild($c(refP,[['width','5%']]));

	if( /&r\d=/.test(crtPath) )
		for( i=1; i<5; i++ ) try{ rxI[i].value = crtPath.match(new RegExp('&r'+i+'=(\\d+)'))[1]; } catch(e){};

	addButtonsEvent();

	var target = $gc('merchantsAvailable')[0];
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'characterData') {
				reloadMerchants();
			}
		});
	});
	var config = { childList: true, characterData: true, subtree: true };
	observer.observe(target, config);
}

// 'Repeat' offer possition
function marketReSel( x ) {
	var selTable = $g('sell_overview');
	var strow = selTable.tBodies[0].rows[x[0]];

	var offer = strow.cells[1];
	var wanted = strow.cells[3];
	var dur = toNumber( strow.cells[strow.cells.length-2].innerHTML );

	offer.value = parseInt( offer.childNodes.item(1).nodeValue );
	offer.type = offer.childNodes.item(0).getAttribute('class').substring(1);
	wanted.value = parseInt( wanted.childNodes.item(1).nodeValue );
	wanted.type = wanted.childNodes.item(0).getAttribute('class').substring(1);

	$xf('.//select[@name="rid1"]','f',x[1]).value = offer.type;
	$xf('.//input[@name="m1"]','f',x[1]).value = offer.value;

	$xf('.//select[@name="rid2"]','f',x[1]).value = wanted.type;
	$xf('.//input[@name="m2"]','f',x[1]).value = wanted.value;

	if( isFinite(dur) ) {
		$xf('.//input[@name="d1"]','f',x[1]).setAttribute('checked','checked');
		$xf('.//input[@name="d2"]','f',x[1]).value = dur;
	} else {
		$xf('.//input[@name="d1"]','f',x[1]).removeAttribute('checked');
	}
}

// automatically set min resourse as wanted & max resourse as offer
// add 'Repeat' key
function marketOffer() {
	function merUpd () {
		var aR = parseInt(m1.value);
		m3.innerHTML = isNaN(aR) ? '': '( '+RB.dictionary[2]+' '+ Math.ceil(aR/RB.village_Var[0]) + (aR % RB.village_Var[0] != 0 ? ' : -' + (RB.village_Var[0] - aR % RB.village_Var[0]):'') + ' )';
		var aR2 = parseInt(m2.value);
		if( ! isNaN(aR) && ! isNaN(aR2) && aR > 0 ) {
			var rt = Math.round(aR2/aR*100)/100;
			var rtColor = rt == 1 ? 'black': rt < 1 ? 'red' : 'green';
			m3.appendChild($ee('SPAN',rt,[['style','font-weight:bold;color:'+rtColor+';padding:0px 10px;']]));
		}
	}
	function mofLinkM () {
		var aR = parseInt(m1.value);
		m1.value = isNaN(aR) ? '': aR <= RB.village_Var[0] ? '': aR - RB.village_Var[0];
		merUpd();
	}
	function mofLinkP () {
		var aR = parseInt(m1.value);
		m1.value = isNaN(aR) ? RB.village_Var[0] : aR + RB.village_Var[0];
		merUpd();
	}

	var selTable = $xf('.//table[@id="sell"]','l',cont);
	switch(selTable.snapshotLength) {
		case 0: return;
		case 1: selTable = selTable.snapshotItem(0); break
		default: selTable = $xf('.//form[contains(@style,"inline")]//table[@id="sell"]','f',cont);
	}
	var maxR = 0;
	var minR = 0;
	for( var i = 1; i < 4; i++ ) {
		if( resNow[i] > resNow[maxR] ) maxR = i;
		if( resNow[i] < resNow[minR] ) minR = i;
	}
	$xf('.//select[@name="rid1"]','f',selTable).value = maxR + 1;
	$xf('.//select[@name="rid2"]','f',selTable).value = minR + 1;
	$xf('.//input[@name="d2"]','f',selTable).type = "number";
	$xf('.//input[@name="d2"]','f',selTable).style.width = "30px";

	$at(selTable.rows[0].cells[2],[['style','width:auto;']]);
	$at(selTable.rows[1].cells[2],[['style','width:auto;']]);

	var refP = $a('+',[['href',jsVoid]]);
	refP.addEventListener('click', mofLinkP, false);
	selTable.rows[0].insertBefore($c(refP),selTable.rows[0].cells[3]);
	var refM = $a('-',[['href',jsVoid]]);
	refM.addEventListener('click', mofLinkM, false);
	selTable.rows[1].insertBefore($c(refM),selTable.rows[1].cells[3]);

	var m1 = $xf('.//input[@name="m1"]','f',selTable); // cell for offering
	m1.addEventListener('keyup', merUpd, false);
	m1.addEventListener('change', merUpd, false);

	var m2 = $xf('.//input[@name="m2"]','f',selTable); // cell for searching
	m2.addEventListener('keyup', merUpd, false);
	m2.addEventListener('change', merUpd, false);

	var m3 = $e('SPAN',[['style','margin: 0px 10px;']]);
	selTable.parentNode.appendChild(m3);

	var reSelTable = $g('sell_overview');
	if ( ! reSelTable ) return;
	// add additional field
	var strows = reSelTable.tHead.rows;
	strows[0].appendChild($c('&nbsp;',[['style','width:5%;']]));
	// fill rows
	var strows = reSelTable.tBodies[0].rows;
	for (var mr = 0; mr < strows.length; mr++ )
	{
		var newTD = $c($a('R',[['href',jsVoid]]));
		newTD.addEventListener('click', function(x) { return function() { marketReSel(x); }}( [mr,selTable] ), false);
		strows[mr].appendChild(newTD);
	}
}

function marketTradeRoutes() {
	function createTrade(userHour) {
		var sParams = '&did_dest='+$g("did_dest",routesForm).value;
			sParams += '&r1='+$g("r1",routesForm).value;
			sParams += '&r2='+$g("r2",routesForm).value;
			sParams += '&r3='+$g("r3",routesForm).value;
			sParams += '&r4='+$g("r4",routesForm).value;
			sParams += '&userHour='+userHour;
			sParams += '&repeat='+$g("repeat",routesForm).value;
			sParams += '&gid='+routesForm.querySelector('input[name="gid"]').value;
			sParams += '&a='+routesForm.querySelector('input[name="a"]').value;
			sParams += '&t='+routesForm.querySelector('input[name="t"]').value;
			sParams += '&trid='+routesForm.querySelector('input[name="trid"]').value;
			sParams += '&option='+routesForm.querySelector('input[name="option"]').value;
			ajaxRequest(fullName+'build.php?show-destination=all', 'POST', sParams, function(ajaxResp) { return function(userHour) { return logTradeRoutes(userHour,1); }(userHour); },
				function(ajaxResp) { return function(userHour) { return logWaves(userHour,0); }(userHour); } );
	}
	function logTradeRoutes (a,b) {
		tlog += "<span style='color:"+(b?'green':'red')+"'> "+((a > 9) ? a : "0" + a)+" </span>";
		divlog.innerHTML = tlog;
	}
	function createTradeLoop() {
		var count = 0;
		var err = $gc("error",routesTableEdit);
		if(err.length==0) {
			var e = $gc('rbcheckbox');
			for(var i=0; i<e.length; i++) {
				if(e[i].checked) {
					setTimeout(function(k){createTrade(k);}, 1200*count++, e[i].value);
				}
				if (i==e.length-1) {
					setTimeout(function(){ document.location.href = fullName +'build.php?t=0&gid=17'; }, 1200*count);
				}
			}
		}
	}
	function checkAll () {
		var f = $gc('rbcheckboxall',cont);
		var e = $gc('rbcheckbox',cont);
		for(var i=0; i<e.length; i++) {
			if (f[0].checked == true) {
				e[i].checked = true;
			} else {
				e[i].checked = false;
			}
		}
	}
	function merUpd () {
		var aR = 0;
		for (var i = 1; i < 5; i++ ) { var val = $g("r"+i,routesTableEdit).value; aR += isNumeric(val) ? parseInt(val) : 0; }
		m3.textContent = '( '+RB.dictionary[2]+' '+ Math.ceil(aR/RB.village_Var[0]) + (aR % RB.village_Var[0] != 0 ? ' : -' + (RB.village_Var[0] - aR % RB.village_Var[0]):'') + ' )';
	}
	function mofLinkU () {
		var inp = this.parentNode.previousSibling;
		var aR = parseInt(inp.value);
		if ( this.id == "rbplus" ) {
			inp.value = isNaN(aR) ? RB.village_Var[0] : aR + ( aR % RB.village_Var[0] != 0 ? RB.village_Var[0] - aR % RB.village_Var[0] : RB.village_Var[0] );
		} else {
			inp.value = isNaN(aR) ? 0 : aR <= RB.village_Var[0] ? 0 : aR - ( aR % RB.village_Var[0] != 0 ? aR % RB.village_Var[0] : RB.village_Var[0] );
		}
		var changeEvent = new Event("change", {"bubbles":true, "cancelable":false});
		inp.dispatchEvent(changeEvent);
		merUpd();
	}
	function RemoveTradeRoute (link) {
		link.parentNode.parentNode.style.display = 'none';
		ajaxRequest(link.href, 'GET', null, dummy, dummy);
	}
	function RemoveAllTradeRoutes () {
		delImg.removeEventListener('click', RemoveAllTradeRoutes, false);
		for (var i=0; i<routesTable.tBodies[0].rows.length-1; i++) {
			var linkEl = $gt("a",routesTable.tBodies[0].rows[i])[0];
			setTimeout(function(x){return function(){ RemoveTradeRoute(x); };}(linkEl), 600*i);
			if (i==routesTable.tBodies[0].rows.length-2) {
				setTimeout(function(){ document.location.href = fullName +'build.php?t=0&gid=17'; }, 600*(i+1));
			}
		}
	}
	function OnOffTradeRoute (inp) {
		var clickEvent = new MouseEvent("click", {bubbles:true, cancelable:true, view:window});
		inp.dispatchEvent(clickEvent);
	}
	function DisableAllTradeRoutes () {
		var count = 0;
		for ( var i=0; i<routesTable.tBodies[0].rows.length-1; i++) {
			var inputEl = $gt("input",routesTable.tBodies[0].rows[i])[0];
			if (disableInp.checked==false) {
				if(inputEl.checked) { setTimeout(function(x){return function(){ OnOffTradeRoute(x); };}(inputEl), 600*count++); }
			} else {
				if(inputEl.checked==false) { setTimeout(function(x){return function(){ OnOffTradeRoute(x); };}(inputEl), 600*count++); }
			}
		}
	}
	var delImg = $e('img',[['src',img_del],['onclick',jsNone]]);
	var disableInp = $e('INPUT',[['type','checkbox'],['checked','']]);
	function RemoveTradeRoutesBtn () {
		if (routesTable.tBodies[0].rows.length < 2 ) return;
		var newR = $em('TR',[$c(delImg),$c(''),$c(''),$c(''),$c(''),$c(disableInp)]);
		delImg.addEventListener('click', RemoveAllTradeRoutes, false);
		disableInp.addEventListener('click', DisableAllTradeRoutes, false);
		routesTable.tBodies[0].appendChild(newR);
	}
	var routesTable = $g("trading_routes",cont);
	if (routesTable) RemoveTradeRoutesBtn();
	var routesTableEdit = $g("trading_edit",cont);
	if ( !routesTableEdit ) { return; }
	var routesForm = $g("tradeRouteEdit",cont);
	if ( !routesForm ) { return; }
	var img = $gt("img",routesTableEdit);
	for (var i = 0; i < img.length; i++ ) { img[i].style.margin = 0; }
	for (var i = 1; i < 5; i++ ) {
		var inp = $g("r"+i,routesTableEdit);
		inp.addEventListener('input', merUpd, false);
		inp.style.margin = 0;
		var divC = $e('DIV',[['style','margin:0 3px;display:inline-block;']]);
		var refM = $a(' ??? ',[["id","rbmin"],['href',jsVoid]]);
		refM.addEventListener('click', mofLinkU, false);
		var refP = $a(' + ',[["id","rbplus"],['href',jsVoid]]);
		refP.addEventListener('click', mofLinkU, false);
		divC.appendChild(refP);
		divC.appendChild(refM);
		inp.parentNode.insertBefore(divC,inp.nextSibling);
	}
	var m3 = $e('DIV');
	var m1 = $ee('TR',$c(m3,[['colspan','2']]));
	routesTableEdit.tBodies[0].appendChild(m1);

	var p = $e('P',[['style','text-align:center;']]);
	for(var i=0; i<24; i++) {
		if(!(i%6) && i!=0) {
			var br = $e('BR');
			p.appendChild(br);
		}
		var t = $t(i>9?i:"0"+i)
		var c = $e('INPUT',[['type','checkbox'],['style','margin-'+docDir[0]+':15px;'],['class','rbcheckbox'],['value',i]]);
		p.appendChild(c);
		p.appendChild(t);
	}
	p.appendChild($e('BR'));
	var checkAllBox = $e('INPUT',[['type','checkbox'],['style','margin-'+docDir[0]+':15px;'],['class','rbcheckboxall'],['value','25']]);
	p.appendChild(checkAllBox);
	checkAllBox.addEventListener('click', checkAll, false);
	p.appendChild($ee('SPAN',"&#10004;"));
	p.appendChild($e('BR'));
	var btnText = $g("tradeSaveButton",routesTableEdit);
	var but = $e('INPUT',[['type','button'],['value',btnText.value],['style','margin:10px 0;padding:2px 10px;'],['onclick','marketPlace.validateTradeRouteResourcesSanity();return false;']]);
	p.appendChild(but);
	var divlog = $e('DIV',[['style','color:green;']]);
	var tlog = "";
	p.appendChild(divlog);
	$g("build",cont).appendChild(p);
	but.addEventListener('click',createTradeLoop);
}

// calculate incomming resourses
var mSInit = true;
function marketSumm () {
	marketSummReal();
	mSInit = false;
	var mForm = $g('merchantsOnTheWayFormular');
	if ( ! mForm ) return;
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) { marketSummReal(); });
	});
	var config = { childList: true };
	observer.observe(mForm, config);
}
function marketSummReal () {
	if( RB.Setup[10] == 0 ) return;
	var aT = $gc('traders',cont);
	if( aT.length == 0 ) return;
	if( $gc(allIDs[29],aT[0]).length > 0 ) return;
	if( ! mSInit ) {
		initRes = true; getResources(); progressbar_ReInit(); addSpeedAndRTSend();
	}
	var cH4 = $gt('H4');
	if( cH4 ) var merchB = cH4.length;
	var i = cH4[0].innerHTML.onlyText().trim();
	if( merchInWork != 0 && merchB == 1 ) {
		if( RB.dictionary[23] != '' && RB.dictionary[23] != i ) return;
	} else {
		if( mSInit && RB.dictionary[23] != i ) {
			RB.dictionary[23] = i;
			saveCookie( 'Dict', 'dictionary' );
		}
	}
// add 2x 1x tables
	if( RB.Setup[33] > 0 ) {
		var extRT = new Array();
		for (i = 0; i < aT.length; i++) {
			// get count of retry
			var multFL = $gc('repeat',aT[i]);
			if( multFL.length > 0 ) {
				// get time to go
				var timeToGo = toSeconds(aT[i].rows[1].cells[1].innerHTML);
				var tdist = calcDistance(village_aid,getVid($gt('A',aT[i].rows[0].cells[1])[0].getAttribute('href')));
				var htR = getTTime( tdist, MTime[parseInt(RB.Setup[2])]*sM, 0, 0 );
				var cnt = parseInt(multFL[0].innerHTML.match(/\d/)[0]);
				for( var nc=cnt-1; nc>0; nc-- ) {
					var tmpNode = aT[i].cloneNode(true);
					$gc('repeat',tmpNode)[0].innerHTML=nc+'x';
					var newT = htR * (cnt-nc)*2 + timeToGo;
					$gc('at',tmpNode)[0].innerHTML = $gc('at',tmpNode)[0].innerHTML.replace(/\d+:\d+/,formatTime(absTime(newT),5));
					var j=timerB.length;
					timerB[j] = new Object();
					timerB[j].time = newT;
					timerB[j].obj = $gt('span',$gc('in',tmpNode)[0])[0];
					timerB[j].obj.removeAttribute('id');
					timerB[j].obj.innerHTML = formatTime(newT,0);
					tmpNode.rows[1].cells[1].setAttribute('style','background-color:#F8FFEE;');
					extRT.push([newT,tmpNode]);
				}
			}
			if( ! (aT[i].nextSibling) ) break;
			if( aT[i].nextSibling.nodeName.match(/h4/i) ) break;
		}
		if( extRT.length > 0 ) {
			lastTimerB = timerB.length;
			extRT.sort(function(a,b){return a[0]-b[0];});
			for (var i = 0; i < aT.length; i++) {
				// get time to go
				var timeToGo = toSeconds(aT[i].rows[1].cells[1].innerHTML);
				if( timeToGo > extRT[0][0] ) {
					aT[i].parentNode.insertBefore(extRT[0][1],aT[i]);
					extRT.shift();
					if( extRT.length == 0 ) { i++; break; }
				}
				if( ! (aT[i].nextSibling) ) { i++; break; }
				if( aT[i].nextSibling.nodeName.match(/h4/i) ) { i++; break; }
			}
			var nc = aT[--i].nextSibling;
			for (i = 0; i < extRT.length; i++) {
				if( nc )
					nc.parentNode.insertBefore(extRT[i][1],nc);
				else
					aT[i].parentNode.appendChild(extRT[i][1]);
			}
		}
	}

	resourceCalculatorInit();
	for (i = 0; i < aT.length; i++) {
		// get time to go
		var timeToGo = toSeconds(aT[i].rows[1].cells[1].innerHTML);
		// get incoming resources
		var incomingRes = aT[i].rows[2].cells[1].innerHTML.match( />\s*?\d+.?/g );

		resourceCalculator( aT[i], timeToGo, incomingRes, 0 );
		if( ! (aT[i].nextSibling) ) break;
		if( aT[i].nextSibling.nodeName.match(/h4/i) ) break;
	}
	if( RB.Setup[10] > 1 ) resourceCalculatorSumm(cH4[0].nextSibling, timeToGo);
	if( RB.Setup[10] > 2 ) redLinesSumm(cH4[0].nextSibling);
}

var incomeToGo = [];
var summIncomingRes = [];
var serverTime = 0;
var lastTime = 0;
var rpCount = 0;
var redLines = [];
var redLineFL = true;
var timeToZero = 0;

function resourceCalculatorInit () {
	incomeToGo = resNow.slice();
	serverTime = getServerTime();
	lastTime = 0;
	summIncomingRes = [0,0,0,0];
	rpCount = 0;
	redLines.length = 0;
	redLineFL = true;
	timeToZero = 0;

	var existT = $gc(allIDs[13],cont);
	for( var i = 0; i < existT.length; i++ ) cont.removeChild(existT[i].parentNode);
}

function resourceCalculator ( tObj, timeToGo, incomingRes, tType ) { // tType 0-market 1-RP
	var textIncome = '';
	var redLine = '';
	var redTime = 0;
	var rLl = redLines.length-1;
	var retFL = false;
	var incomeToGoSumm = 0;
	while( /\/|x/.test(incomingRes[0]) ) incomingRes.shift();
	for( var j = 0; j < 4; j++ ) {
		incomingRes[j] = parseInt(incomingRes[j].match(/\d+/)[0]);
		var extraRes = 0;
		var mColor = '';
		summIncomingRes[j] += incomingRes[j];
		incomeToGo[j] = Math.round(incomepersecond[j] * (timeToGo - lastTime) + incomeToGo[j]);
		if( incomeToGo[j] < 0 ) {
			redTime = serverTime + timeToGo - Math.floor(incomeToGo[j]/incomepersecond[j]);
			redLine += ' <img src="img/x.gif" class="r' + (j+1) + '"> ' + formatTime(redTime,1);
			extraRes = incomeToGo[j];
			mColor = 'red';
			incomeToGo[j] = 0;
		}
		incomeToGo[j] += incomingRes[j];
		if( incomeToGo[j] > fullRes[j] ) {
			extraRes = incomeToGo[j] - fullRes[j];
			incomeToGo[j] = fullRes[j];
			mColor = 'red';
		}
		textIncome += ' &nbsp;<img src="img/x.gif" class="r' + (j+1) + '"> <span style="color: ' + mColor + ';">' + incomeToGo[j];
		if( extraRes != 0 ) textIncome += ' (' + (extraRes > 0 ? '+' + extraRes: extraRes) + ') ';
		textIncome += '</span>';
		incomeToGoSumm += incomeToGo[j];
	}
	if( incomepersecond[3] < 0 ) {
		var rLlFL = rLl;
		var ntf = fullRes[3]-incomeToGo[3];
		timeToZero = timeToGo - Math.round(incomeToGo[3]/incomepersecond[3]);
		if( RB.Setup[10] > 2 ) textIncome += ' <b>/ '+ ntf +'</b>';
		else if( timeToZero < 86400 )
			textIncome += ' <img src="img/x.gif" class="r5">' + formatTime(serverTime + timeToZero,2);
		if( redTime > 0 ) {
			if( redLineFL ) {
				redLines[++rLl] = [extraRes,redTime,0, ntf];
				redLineFL = false;
			}
			if( incomingRes[3] == 0 ) {
				redLines[rLl][0] += extraRes;
			} else {
				redLines[rLl][2] = serverTime + timeToGo;
				redLineFL = true;
			}
		} else {
			if( extraRes > 0 )
				redLines[++rLl] = [extraRes, serverTime+timeToGo, serverTime+timeToGo, ntf];
		}
		if( RB.Setup[10] > 2 && rLlFL < rLl ) {
			tObj.setAttribute("id", allIDs[44]+rLl);
			retFL = true;
		}
	}
	if( RB.Setup[11] > 0 ) textIncome += ' (<img class="npc" src="img/x.gif"> '+incomeToGoSumm+')';
	var newFText = retFL ? $em('A',[trImg("clock"),' ',formatTime(absTime(timeToGo), 1)],[['href','#'+allIDs[31]]]):
		$em('SPAN',[trImg("clock"),' ',formatTime(absTime(timeToGo), 1)]); // 2 ??
	if( tType == 0 ) {
		var newTR = $ee('tr',$c( newFText ),[['class','res']]);
		newTR.appendChild( $c( textIncome ));
		tObj.appendChild( newTR );
	} else {
		var existT = $gc(allIDs[20],tObj);
		if( existT.length > 0 ) tObj.removeChild(existT[0].parentNode);
		var newTR = $ee('TR',$c(newFText),[['class',allIDs[20]]]);
		newTR.appendChild($c(textIncome,[['colspan','11'],['style','text-align:'+docDir[0]+';']]));
		tObj.appendChild($ee('TBODY',newTR,[['class','infos']]));
	}
	lastTime = timeToGo;

	if( redLine.length > 0 ) tObj.parentNode.insertBefore($ee('table',$ee('tr',$c(redLine)),[['class',allIDs[13]]]),tObj);

	rpCount++;
}

function resourceCalculatorSumm ( tObj, timeToGo ) {
	if( rpCount == 0 ) return;

	function linkMMem () {
		for( var j = 0; j < 4; j++ ) {
			RB.wantsMem[j] -= summIncomingRes[j];
			if( RB.wantsMem[j] < 0 ) RB.wantsMem[j] = 0;
		}
		saveCookie('Mem', 'wantsMem');
		alert( "Corrected to: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}

	var rSumm = 0;
	var newR1 = $ee('TR',$c(trImg('clock')));
	var newR2 = $ee('TR',$c(formatTime(serverTime + timeToGo, 1)));
	var newR3 = $ee('TR',$c('&nbsp;'));

	var t = timerB.length;
	for( var j = 0; j < 4; j++ ) {
		rSumm += summIncomingRes[j];
		newR1.appendChild($c(trImg('r' + (j+1))));
		newR2.appendChild($c(summIncomingRes[j]));
		timerB[t] = new Object();
		timerB[t].time = incomepersecond[j] > 0 ? Math.round((fullRes[j]-incomeToGo[j]) / incomepersecond[j])+lastTime : Math.round(incomeToGo[j] / incomepersecond[j])-lastTime;
		timerB[t].obj = $eT('TD', timerB[t].time, 0);
		newR3.appendChild(timerB[t++].obj);
	}
	lastTimerB = timerB.length;

	var existT = $g(allIDs[30]);
	if( existT ) existT.parentNode.removeChild(existT);

	newR1.appendChild($c('&#931;('+rpCount+')'));
	newR2.appendChild($c(rSumm));
	var MM = $a('(M-)',[['href',jsVoid]]);
	MM.addEventListener('click', linkMMem, false);
	newR3.appendChild($c(MM));
	var newT = $ee('TABLE',newR1,[['class',allIDs[7]],['style','background-color:#F8FFEE;width:100%;margin-bottom:15px;'],['id',allIDs[30]]]);
	newT.appendChild(newR2);
	newT.appendChild(newR3);

	tObj.parentNode.insertBefore(newT,tObj);
}

function redLinesSumm ( tObj ) {
	if( incomepersecond[3] >= 0 ) return;

	function td ( xx ) {
		return xx>86400?xx-86400:xx;
	}

	var existT = $g(allIDs[31]);
	if( existT ) existT.parentNode.removeChild(existT);

	var newR = $em('TR',[$c(gtext("hunger")),$c(gtext("duration")),$c(gtext("deficit")),$c(RB.dictionary[21])]);
	var newT = $ee('TABLE',newR,[['class',allIDs[7]],['style','background-color:#FFE8D8;width:100%;margin-bottom:15px;'],['id',allIDs[31]]]);

	for( var i=0; i<redLines.length; i++ ) {
		if( redLines[i][2] == 0 ) {
			newT.appendChild($em('TR',[$c($a(formatTime(td(redLines[i][1]),1),[['href','#'+allIDs[44]+i]])),$c('--:--'),$c('-'),$c(redLines[i][3])]));
		} else {
			var dur = redLines[i][2]-redLines[i][1];
			if( dur == 0 )
				newT.appendChild($em('TR',[$c($a(formatTime(td(redLines[i][1]),1),[['href','#'+allIDs[44]+i]])),$c('--:--'),$c('+'+redLines[i][0],[['style','color:red;background-color:white;']]),$c(redLines[i][3])]));
			else
				newT.appendChild($em('TR',[$c($a(formatTime(td(redLines[i][1]),1),[['href','#'+allIDs[44]+i]])),$c(formatTime(dur,0)),$c(redLines[i][0]),$c(redLines[i][3])]));
		}
	}
	if( redLineFL )
		newT.appendChild($em('TR',[$c(formatTime(absTime(timeToZero,serverTime),1)),$c('--:--'),$c('-'),$c('-')]));

	tObj.parentNode.insertBefore(newT,tObj);
}

/************************* cookie ****************************/

var cookieDelim = [
	[")\\.([-\\.\\d]+)",'.','/'],
	[")@_(.*?)@#_",'@_','@#_']];

function loadVCookie ( nameCoockie, contentCookie, vID, cType ) {
	var Rej;
	var cvID = vID || village_aid;
	var cvT = cType || 0;
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	if (nameCoockie == 'vPPH') {
		Rej = new RegExp("^(?!\\.).*(" + cvID + cookieDelim[cvT][0]);
	}
	else {
		Rej = new RegExp("(" + cvID + cookieDelim[cvT][0]);
	}
	var oneCookie = RCookie.match(Rej);
	if( cvT == 1 ) RB[contentCookie].length = 0;
	if( oneCookie != undefined ) {
		var cookieValue = oneCookie[2].split(cookieDelim[cvT][1]);
		var sI = cvT == 0 ? 0: 1;
		var contentLength = cvT == 0 ? RB[contentCookie].length: cookieValue[0].length == 0 ? 0: parseInt(cookieValue[0]);
		for( var j = 0; j < contentLength; j++ ) {
			RB[contentCookie][j] = cookieValue[j+sI] == undefined ? 0: cvT == 0 ? parseInt(cookieValue[j]): unesc(cookieValue[j+sI]);
		}
	} else for( var j = 0; j < RB[contentCookie].length; j++ ) RB[contentCookie][j] = 0;
}

function loadZVCookie ( nameCoockie, contentCookie, vID ) {
	var cvID = vID || village_aid;
	loadVCookie ( nameCoockie, contentCookie, vID, 1 );
	if( RB[contentCookie].length == 0 ) RB[contentCookie][0] = 0;
}

function saveVCookie ( nameCoockie, contentCookie, cType ) {
	var Rej;
	var newCookie = '';
	var cvT = cType || 0;
	var oldCookie = RB_getValue(GMcookieID + nameCoockie,'');
	for( var i = 0; i < villages_count; i++ ) {
		newCookie += villages_id[i] + cookieDelim[cvT][1];
		if( villages_id[i] == village_aid ) {
			if( cvT == 1 ) newCookie += contentCookie.length + cookieDelim[cvT][1];
			for( var j = 0; j < contentCookie.length; j++ ) {
				if( contentCookie[j] !== undefined ) newCookie += esc(contentCookie[j]) + cookieDelim[cvT][1];
			}
		} else {
			if (nameCoockie == 'vPPH') {
				Rej = new RegExp("^(?!\\.).*(" + villages_id[i] + cookieDelim[cvT][0]);
			}
			else {
				Rej = new RegExp("(" + villages_id[i] + cookieDelim[cvT][0]);
			}
			var oldOneCookie = oldCookie.match(Rej);
			if( oldOneCookie != undefined ) newCookie += oldOneCookie[2];
		}
		newCookie += cookieDelim[cvT][2];
	}
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function saveCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var j = 0; j < RB[contentCookie].length; j++ ) newCookie += RB[contentCookie][j] + '@_';
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function loadCookie ( nameCoockie, contentCookie ) {
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	if( RCookie != '' ) {
		var cookieValue = RCookie.split('@_');
		for( var j = 0; j < RB[contentCookie].length; j++ )
			if( cookieValue[j] !== undefined ) if( cookieValue[j].length > 0 ) RB[contentCookie][j] = cookieValue[j];
	}
}

function saveOVCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var i = 0; i < villages_id.length; i++ )
		if( contentCookie[villages_id[i]] !== undefined )
		if( contentCookie[villages_id[i]].length > 0 )
			newCookie += villages_id[i] + cookieDelim[1][1] + esc(contentCookie[villages_id[i]]) + cookieDelim[1][2];
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function saveODCookie ( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var i = 0; i < linkVSwitch.length; i++ ) {
		var nd = parseInt(linkVSwitch[i].match(/newdid=(\d+)/)[1]);
		if( contentCookie[nd] !== undefined )
			newCookie += nd + cookieDelim[1][1] + contentCookie[nd] + cookieDelim[1][2];
	}
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function loadOVCookie ( nameCoockie, contentCookie ) {
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	var oneCookie = [];
	var cCount = 0;
	var Rej = new RegExp("(\\d+" + cookieDelim[1][0], 'g');
	while ((oneCookie = Rej.exec(RCookie)) != null) { RB[contentCookie][oneCookie[1]] = unesc(oneCookie[2]); cCount++; }
	return cCount;
}

function loadAllCookie () {
	loadVCookie ( 'Dorf2', 'village_Dorf2' );
	loadVCookie ( 'VV', 'village_Var' );
	loadCookie ( 'OV', 'overview' );
	loadCookie ( 'Mem', 'wantsMem' );
	loadCookie ( 'DictTR', 'dictTR' );
	loadCookie ( 'AS', 'serversAN' );

	if( lMap != '' && lMap != RB.dictionary[15] ) { RB.dictionary[15] = lMap; saveCookie( 'Dict', 'dictionary' ); }
//	if( ! /^1\.6\./.test(RB.Setup[0]) ) RB.Setup = RB.dSetup.slice(); else RB.Setup[0] = version;
}

/************************* distance calculation ***************************/

var MTime = [16, 12, 24, 0, 0, 16, 20];

function showAllTTime ( vType, tVil, arena, art, shoes ) {
	var TTime = [];
	if (RB.Setup[47]==1) {
		TTime = [
		[19, [24,63]], // Theutates Thunder, Spotter
		[17, [23]], // Pathfinder
		[16, [4,25,54,64,65]], // Equites Legati, Druidrider, Sopdu Explorer, Steppe Rider, Marksman
		[15, [55]], // Anhur Guard
		[14, [5,66]], // Equites Imperatoris, Marauder
		[13, [26]], // Haeduan
		[10, [6,15,56]], // Equites Caesaris, Paladin, Resheph Chariot
		[9, [14,16]], // Scout
		[7, [3,11,12,21,51,53]], // Imperian, Clubswinger, Spearman, Phalanx, Slave Militia, Khopesh Warrior
		[6, [1,13,22,52,61,62]], // Legionnaire, Axeman, Swordsman, Ash Warden, Mercenary, Bowman
		[5, [2,10,20,29,30,60,69,70]], // Praetorian, Settler, Chieftain, Logades
		[4, [7,9,17,19,27,57,59,67]], // Battering Ram, Senator, Ram, Chief, Ram, Ram (Egyptians), Nomarch, Ram (Huns)
		[3, [8,18,28,58,68]] // Fire Catapult, Catapult, Trebuchet, Stone Catapult
		];
	} else {
		TTime = [
		[19, [24]], // Theutates Thunder
		[17, [23]], // Pathfinder
		[16, [4,25]], // Equites Legati, Druidrider
		[14, [5]], // Equites Imperatoris
		[13, [26]], // Haeduan
		[10, [6,15]], // Equites Caesaris, Paladin
		[9, [14,16]], // Scout
		[7, [3,11,12,21]], // Imperian, Clubswinger, Spearman, Phalanx
		[6, [1,13,22]], // Legionnaire, Axeman, Swordsman
		[5, [2,10,20,29,30]], // Praetorian, Settler, Chieftain
		[4, [7,9,17,19,27]], // Battering Ram, Senator, Ram, Chief, Ram
		[3, [8,18,28]] // Fire Catapult, Catapult, Trebuchet
		];
	}

	function appendTTime ( htt ) {
		var htg = formatTime(htt, 0);
		newTR.appendChild($c(htg));
		return htt;
	}
	function appendTime () {
		htf = absTime( ht );
		timerP[t] = new Object();
		timerP[t].time = htf;
		timerP[t].obj = $c(formatTime(htf, 1));
		newTR.appendChild(timerP[t++].obj);
		newTABLE.appendChild(newTR);
	}

	var artefact = art || RB.Setup[3];
	var shK = shoes || 0;
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	var serverTime = getServerTime();
	var tR = vType < 1 ? parseInt(RB.Setup[2]) + 1: 0; //troop race

	var t = lastTimerP[0];
	timerP.length = t;
	if( typeof(tVil) != 'object' ) {
		var distance = calcDistance(tVil, village_aid);
		var xy = id2xy(tVil);
		var nL = $a(printCoords(tVil),[['href','position_details.php?x='+xy[0]+'&y='+xy[1]],['style','color:#252525;']]);
		nL.appendChild($e('SPAN',[['class',allIDs[29]]]));
		var newTR = $ee('TR',$c(nL,[['style','font-weight:bold;']]));
	} else {
		var distance = calcDistance(tVil[0], tVil[1]);
		var newTR = $ee('TR',$c('----'));
	}
	newTR.appendChild($c(' &lt;-&gt; ' + parseFloat(distance.toFixed(2)),[['colspan',(tR > 0 ? 2: ((RB.Setup[47]==1) ? 6 : 4))]]));
	newTABLE.appendChild(newTR);

	if( distance > 0 ) {
		if( sK == 0 ) {
			sK = troopInfo(1,7) != 0 ? troopInfo(1,7)/6: 1;
		}
		if( vType < 2 ) {
			var newTR = $e('TR');
			var ht = appendTTime( getTTime( distance, MTime[parseInt(RB.Setup[2])]*sM, 0, 0) );
			var attr = vType < 1 ? undefined : [['colspan',(RB.Setup[47]==1) ? 5 : 3]];
			newTR.appendChild($c(trImg(allIDs[33],RB.dictionary[2]),attr));
			appendTime();
		}
		if( vType > -1 ) {
			var newTR = $e('TR');
			var ht = appendTTime( getTTime( distance, RB.dictFL[19], arena, 0) );
			var attr = vType < 1 ? undefined : [['colspan',(RB.Setup[47]==1) ? 5 : 3]];
			newTR.appendChild($c(trImg('unit uhero'),attr));
			appendTime();
			for( var i = 0; i < TTime.length; i++ ) {
				var newTR = $e('TR');
				var ht = appendTTime( getTTime( distance, TTime[i][0]*sK, arena, parseInt(artefact), shK) );
				var j = 0;
				var fl = tR ? false: true;
				for( var k = 0; k < (RB.Setup[47]==1 ? 7 : 3); k++ ) {
					if (k==3 || k==4) continue;
					var fl2 = tR ? false: true;
					var newTD = $e('TD');
					while( TTime[i][1][j] < (11+10*k) ) {
						if( Math.ceil((TTime[i][1][j])/10) == tR ) { fl = true; fl2 = true; }
						newTD.appendChild(trImg('unit u' + TTime[i][1][j], RB.dictTR[TTime[i][1][j]-(TTime[i][1][j]>50?20:0)]));
						j++;
					}
					if( fl2 ) newTR.appendChild(newTD);
				}
				if( fl ) {
					appendTime();
				}
			}
		}
	}
	lastTimerP[1] = t;
	return newTABLE;
}

function distanceTooltipGen(e) {
	makeTooltip(showAllTTime(0, getVid(this.getAttribute('href')), RB.village_Var[1]));
}
function distanceTooltipGen2(e) {
	makeTooltip(showAllTTime(1, getVid(this.getAttribute('href')), RB.village_Var[1]));
}
function distanceTooltip(target, tp) {
	if( ! /[&\?][zd]=\d+|[&\?]x=-?\d+&y=-?\d+/.test(target.getAttribute('href')) ) return;
	if( tp == 0 )
		target.addEventListener("mouseover", distanceTooltipGen, false);
	else
		target.addEventListener("mouseover", distanceTooltipGen2, false);
	target.addEventListener("mouseout", removeTooltip, false);
}

function addShowDistanceIn( ss, vt ) {
	var newP = $g(allIDs[0]);
	if( !(newP) ) newP = $e('DIV',[['style','float:'+docDir[1]+';'],['id',allIDs[0]]]);
	ss.parentNode.insertBefore(newP, ss);
	$gn('x')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	$gn('y')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	lastTimerP[2] = lastTimerP[0];
	showDistanceIn( vt );
}

var distInVilage = new Object;
var distInVilageFL = true;
function showDistanceIn ( vt ) { // travel time
	var dd = $g(allIDs[0]);
	if( ! dd ) return;
	var dX = parseInt($gn('x')[0].value);
	var dY = parseInt($gn('y')[0].value);
	var ddd = dd.firstChild;
	if( ddd ) dd.removeChild(ddd);
	lastTimerP[0] = lastTimerP[2];
	var xy = $g(allIDs[29]);
	if( xy ) xy.parentNode.removeChild(xy);
	if( isNaN(dX) || isNaN(dY) ) return;
	xy = xy2id(dX, dY);
	dd.appendChild(showAllTTime(vt,xy,RB.village_Var[1]));
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];
	RB_setValue(GMcookieID + 'next', xy);
	if( distInVilageFL ) {
		var vLinks = $xf(vLinksPat,'l');
		for ( var vn = 0; vn < vLinks.snapshotLength; vn++ )
			distInVilage[villages_id[vn]] = vLinks.snapshotItem(vn).innerHTML;
		distInVilageFL = false;
	}
	ddd = $gn('y')[0].parentNode.parentNode;
	if( typeof distInVilage[xy] != 'undefined' ) {
		ddd.appendChild($ee('SPAN',distInVilage[xy],[['style','margin:0px 5px;font-size:12px;'],['id',allIDs[29]]]));
	} else {
		var ht = getVTip(xy);
		if( ht != '' ) {
			ddd.appendChild($ee('SPAN',ht,[['style','color:'+vHColor+';margin:0px 5px;font-size:12px;'],['id',allIDs[29]]]));
		}
	}
}

/************************* other ****************************/

function incomeResourcesInRP () {
	all_moving = 0;
	incomeResourcesInRP34();
}

var all_moving = 0;
function incomeResourcesInRP34 () {
	var townTables = $xf('.//table[.//td[@class="role"]/a]','l',cont);
	resourceCalculatorInit();
	if( all_moving == townTables.snapshotLength ) return; else all_moving = townTables.snapshotLength;
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
		var ttable = townTables.snapshotItem(i);
		var vID = $xf('thead/tr/td[@class="role"]/a', 'f', ttable).getAttribute('href').match(/d=(\d+)/)[1];
		var mLinks = $xf('tbody/tr/td/div[@class="res"]', 'f', ttable);
		if( mLinks && RB.Setup[10] > 0 ) {
			var timeToGo = toSeconds($xf('tbody/tr/td/div/span[contains(@id, "timer") or contains(@class,"timer")]','f',ttable).innerHTML);
			var incomingRes = mLinks.innerHTML.match( />\s*?(\d+)/g );
			if( incomingRes ) resourceCalculator( ttable, timeToGo, incomingRes );
		}
	}
	if( RB.Setup[10] > 1 && rpCount > 0 ) resourceCalculatorSumm(townTables.snapshotItem(0), timeToGo);
	if( RB.Setup[10] > 2 && rpCount > 0 ) redLinesSumm(townTables.snapshotItem(0));
}

function addARLinks(myVid, aDirect) {
	var newLinks = $e('span');
	var armStyle = aDirect == 0 ? allIDs[34]: allIDs[35];
	var ref = $ee('a',trImg(armStyle),[['href','build.php?id=39&tt=2&z=' + myVid],['onclick','return false;']]);
	ref.addEventListener('click', function(x) { return function() { sendArmy(x); }}(myVid), false);
	newLinks.appendChild(ref);
	if( aDirect < 2 ) {
		var ref = $ee('a',trImg(allIDs[33]),[['href','build.php?z=' + myVid + '&gid=17&t=5'],['onclick','return false;']]);
		ref.addEventListener('click', function(x) { return function() { sendResourses(x); }}(myVid), false);
		newLinks.appendChild(ref);
	}
	return newLinks;
}

function sendResTropAdd ( aLink, aType ) {
	if( RB.Setup[15] == 0 ) return;
	var vId = getVid(aLink.getAttribute('href'));
	if( vId == village_aid || vId == 0 ) return;
	insertAfter(addARLinks(vId, aType),aLink);
}

// begin Quick actions to my other villages

function vlist_addButtonsT4 () {
	var vlist = $g("sidebarBoxVillagelist");
	if ( vlist ) {
		var villages = $gt('li',vlist);
		for ( var vn = 0; vn < villages.length; vn++ ) {
			var linkEl = $gt("a",villages[vn])[0];
			linkVSwitch[vn] = linkEl.getAttribute('href');
			var myVid = getVidFromCoords(linkEl.innerHTML);
			villages_id[vn] = myVid;

			if( linkEl.getAttribute('class').match(/active/i) ) {
				village_aid = myVid; village_aNum = vn;
			}
			linkHint($gt('div',linkEl)[0], myVid);
			villages_count++;
			if( RB.Setup[21] != 2 && RB.Setup[15] > 0 ) {
				var newAR = addARLinks(villages_id[vn],0);
				newAR.setAttribute('class',allIDs[48]);
				insertAfter(newAR,$gt('div',linkEl)[0]);
			}
		}
	} else {
		villages_count = 1;
		villages_id[0] = 0;
	}

	if( RB.Setup[21] > 0 ) {
		var vLink = [];
		var vilT = $e('TABLE',[['id','vlist'],['style','background-color:white']]);
		var vilB = $e('TBODY');
		if( RB.bodyH[1] == 1 ) $at(vilB,[['style','display:none']]);
		var hideP = imgHide(1);
		hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([vilB,1,hideP]), false);
		vilT.appendChild($ee('THEAD',$em('TR',[$c(hideP),$c($gc('boxTitle',$g('sidebarBoxVillagelist'))[0].innerHTML.onlyText(),[['colspan',2],['style','font-weight:bold;']]),$c('('+villages_count+')')])));
		for( var i=0; i<villages.length; i++) {
			vLink[i] = $a($gt("div",villages[i])[0].innerHTML,[['href',linkVSwitch[i]]]);
			var cl = villages_id[i]==village_aid?"dot hl":"dot";
			vilB.appendChild($em('TR',[$c('&#x25CF;',[['class',cl]]),$c($ee('DIV',vLink[i])),$c($a(printCoords(villages_id[i]),[['href',linkVSwitch[i]]])),$c(addARLinks(villages_id[i],0))]));
		}
		vilT.appendChild(vilB);
		if( RB.Setup[21] == 1 ) makeFloatD(vilT,7);
		if( RB.Setup[21] == 2 ) {
			var xy = offsetPosition( $g("sidebarBoxVillagelist") );
			makeFloat(vilT,(ltr?xy[0]-10:10),xy[1]+18);
		}
	}
}

// end Quick actions to my other villages

function calculationPPH () {
	var RCookie = RB_getValue(GMcookieID + 'vPPH','0.0.0.0.0./');
	var rows = RCookie.split('\.\/');
	for( var i=0; i < (rows.length-1); i++ ) {
		var cels = rows[i].split(".");
		for ( var j=1; j < 5; j++ ) {
			sumPPH[j-1] += isFinite(parseInt(cels[j])) ? parseInt(cels[j]) :0;
		}
	}
}

var lastColor = [4,4,4,4];

function newStyle(e, j, sp) {
	var color = ( j == 2 && sp ) ? "white" : "black";
	var addCss = "."+ allIDs[16] + e + " div {color: " + color + ";background-color:" + bgcolor[j] + ";float: right;width: 100%;height:18px;margin-top:0px; display:inline;}";
	lastColor[e] = j;
	return addCss;
}

function progressbar_updValues() {
	var ts = Math.round(((Date.now()) - RunTime[4])/1000);
	getResources();
	var addCss = '';
	for (var j = 0; j < 4; j++) {
		var spaceLeft = fullRes[j] - resNow[j];
		var percentUsed2 = resNow[j] / fullRes[j] * 100;
		var percentUsed = Math.round(percentUsed2);

		timerRB[j].pb.setAttribute("style", "width: " + Math.round(percentUsed2 * 2.1) + "px;");
		timerRB[j].pval.innerHTML = percentUsed + "%";
		if( Math.abs(timerRB[j].time) < ts ) timerRB[j].time = 0;
		if( incomepersecond[j] != 0 ) {
			if( timerRB[j].time != 0 ) {
				timerRB[j].time += incomepersecond[j] > 0 ? -ts: ts;
				timerRB[j].val.innerHTML = formatTime(timerRB[j].time, 0);
			}
		}

		var sp = incomepersecond[j] > 0 ? true:false;
		if( percentUsed < 60 ) sp = false;
		if( timerRB[j].time < parseFloat(RB.Setup[6])*3600 ) {
			if (lastColor[j] != 2) {
				addCss += newStyle(j, 2, sp);
			}
		} else if( timerRB[j].time < parseFloat(RB.Setup[5])*3600 ) {
			if (lastColor[j] != 1) {
				addCss += newStyle(j, 1, sp);
			}
		} else {
			if( lastColor[j] != 0 ) {
				addCss += newStyle(j, 0, sp);
			}
		}


//Start kram89 code heavily modified Serj_LV :)
if( RB.bodyH[0] == 1 ) {
	if( timerN.length < 4 ){
		var resource = Math.floor(incomepersecond[j]*3600);
		timerN[j] = new Object();
		var resoColor = resource < 0 ? 'red':'black';
		timerN[j].resotime = timerRB[j].val.cloneNode(true);
		timerN[j].perreso = $e('span');
		timerN[j].divme1 = $ee('div',$em('span',[timerN[j].resotime,' ',timerN[j].perreso],[['style',"white-space:nowrap;"]]),
			[['style','position:absolute;top:45px;left:'+rect[j]+'px;text-align:center;width:80px;background-color:#fef0ce;border-radius:5px;']]);
		$g('stockBar').appendChild(timerN[j].divme1);
	}

	timerN[j].resotime.textContent = formatTime(timerRB[j].time,0);
	timerN[j].perreso.textContent = percentUsed+'%';

	function changeColor (obj,color) {
		if( timerN[j][obj+'_color'] != color ) {
			timerN[j][obj+'_color'] != color;
			timerN[j][obj].setAttribute('style','color:'+color+';');
		}
	}

	if( percentUsed < 50 ){
		changeColor('perreso','blue');
	} else if( parseInt(percentUsed) < 70 ){
		changeColor('perreso','#FF6600');
	} else if( parseInt(percentUsed) >= 70 ){
		changeColor('perreso','red');
	}

	if( timerRB[j].time < parseFloat(RB.Setup[6])*3600 ){
		changeColor('resotime','red');
	} else if( timerRB[j].time < parseFloat(RB.Setup[5])*3600 ){
		changeColor('resotime','#9900CC');
	} else {
		changeColor('resotime','green');
	}

} else if( timerN.length != 0 ) {
	$g('stockBar').removeChild(timerN[j].divme1);
	if( j == 3 ) timerN.length = 0;
}
//end code


	}
	if( addCss != '' ) RB_addStyle(addCss);
	for( var i = 0; i < timerP.length; i++ ) {
		timerP[i].time += ts;
		timerP[i].obj.innerHTML = formatTime(timerP[i].time, 1);
	}
	for( var i = 0; i < timerB.length; i++ ) {
		if( Math.abs(timerB[i].time) < ts ) timerB[i].time = 0;
		if( timerB[i].time != 0 ) {
			timerB[i].time += timerB[i].time > 0 ? -ts : ts;
			timerB[i].obj.innerHTML = formatTime(timerB[i].time, (typeof timerB[i].ft == 'undefined')? 0: timerB[i].ft);
		}
	}
	for( var i = 0; i < timerB3.length; i++ ) {
		if( Math.abs(timerB3[i].time) < ts )
			timerB3[i].time = 0;
		else
			timerB3[i].time -= ts;
		if( timerB3[i].time >= 0 ) {
			timerB3[i].obj.innerHTML = formatTime(timerB3[i].time, 3);
			if( timerB3[i].time == 0 ) {
				timerB3[i].obj.style.color = 'red';
				timerB3[i].time--;
				show_alert();
			}
		}
	}
	for( var i = 0; i < timerF.length; i++ ) {
		timerF[i].time += ts;
		timerF[i].obj.innerHTML = formatTime(timerF[i].time, 0);
	}
	for( var i = 0; i < timerOv.length; i++ ) {
		if( Math.abs(timerOv[i].time) < ts ) timerOv[i].time = -timerOv[i].dir;
		if( timerOv[i].time != 0 ) {
			timerOv[i].time += timerOv[i].dir*ts;
			timerOv[i].obj.innerHTML = formatTime(timerOv[i].time, 0);
		}
	}
	RunTime[4] = Date.now();
}

function progressbar_ReInit () {
	for (var j = 0; j < 4; j++)
		if( incomepersecond[j] != 0 ) {
			var spaceLeft = fullRes[j] - resNow[j];
			timerRB[j].time = incomepersecond[j] > 0 ? Math.round(spaceLeft / incomepersecond[j]) : Math.round(resNow[j] / incomepersecond[j]);
			var tTime = absTime(timerRB[j].time);
			var dstr = tTime > 86400 ? (new Date((Math.abs(timerRB[j].time)+getTimeOffset()*3600)*1e3+(Date.now()))).toDateString()+' ':'';
			timerRB[j].val.title = dstr + formatTime(tTime, 2);
		}
}

function progressbar_init() {
	calculationPPH();
	var mm = RB.Setup[22] > 0 ? normalProductionCalc( sumPPH ) : [0,0];
	var ssPPH = 0;

	var tblBody = $e("tbody");
	if( RB.bodyH[0] == 1 ) $at(tblBody,[['style','display:none']]);
	for (var j = 0; j < 4; j++) {
		// creates a table row
		var cellText = $e("div", [["class", allIDs[2]]]);

		timerRB[j] = new Object();
		timerRB[j].pb = $e('div', [['class', allIDs[16] + j]]);
		var fval = $e('DIV');
		fval.appendChild($e('IMG',[['class', 'r' + (j+1)],['style','margin:0 3px;margin-top:2px;'],['src','img/x.gif'],['title',income[j]]]));
		timerRB[j].pval = $e('span',[['style','margin:0px 2px;']]);
		fval.appendChild(timerRB[j].pval);

		if( incomepersecond[j] != 0 ) {
			var spaceLeft = fullRes[j] - resNow[j];
			timerRB[j].time = incomepersecond[j] > 0 ? Math.round(spaceLeft / incomepersecond[j]) : Math.round(resNow[j] / incomepersecond[j]);
			timerRB[j].val = $eT('span', timerRB[j].time, 0, [['style','margin:0px 2px;']]);
		} else {
			timerRB[j].time = 0;
			timerRB[j].val = $ee('span', '--:--');
		}
		fval.appendChild(timerRB[j].val);

		timerRB[j].pb.appendChild(fval);
		cellText.appendChild(timerRB[j].pb);

		var row = $ee('TR', $c(cellText));

		ssPPH += sumPPH[j]; var sumAttr = [['class',allIDs[11]]];
		if( RB.Setup[22] > 0 ) {
			if( j == mm[0] ) sumAttr.push(['style','color:green;']);
			if( j == mm[1] ) sumAttr.push(['style','color:red;']);
		}
		row.appendChild($c(sumPPH[j],sumAttr));
		tblBody.appendChild(row);
	}

	var alink = $a('ResourceBar+',[['href', '#'],['onclick',jsNone],['title',gtext("overview")]]);
	alink.addEventListener('click', overviewAll, false);
	var alink2 = $a(' v' + version,[['style','font-size:9px;'],['target','_blank'],['title',gtext("svers")]]);
	alink2.addEventListener('click', displayWhatIsNew, false);

	var aImg = $e('IMG',[['src',img_pref],['title',gtext("settings")],['style','padding:0px 2px;cursor:pointer;']]);
	aImg.addEventListener('click', rbSetup, false);

	var aImg2 = $e('IMG',[['src',img_notes],['title',gtext("notes")],['style','padding:0px 2px;cursor:pointer;']]);
	aImg2.addEventListener('click', rbNotes, false);

    var alink3 = $a('[M+]', [['href', jsVoid],['style','font-weight:400;'],['title',gtext("res90")]]);
    alink3.addEventListener('click', saveSpaceLeftToMem, false);

	var hideP = imgHide(0);
	hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([tblBody,0,hideP]), false);

	var cell = $em('TH',[hideP,alink,alink2,aImg2,aImg,alink3]);

	var pphSpan = $ee('SPAN','&#931;/h',[['title',ssPPH]]);
	pphSpan.addEventListener('click', function (x) { return function() { bodyHide(x); }}([tblBody,0]), false);
	var tblHead = $ee("thead",$em('TR',[cell,$c(pphSpan,[['class',allIDs[12]]])]));

	var tbl = $em('TABLE',[tblHead,tblBody],[['cellspacing', '1'],['cellpadding', '1'],['id', allIDs[1]]]);

	if( RB.Setup[4] == 0 ) {
		$g(pageElem[2]).appendChild($ee('P',tbl));
	} else {
		makeFloatD(tbl, 1);
	}

	progressbar_time = Date.now();
	RunTime[4] = progressbar_time;
	progressbar_updValues();
	progressbar_time = (Date.now()) - progressbar_time;
}

function saveSpaceLeftToMem () {
	if( closeWindowN(10) ) return;

	function resRecalc () {
		nK = parseInt(newPR.value).NaN0();
		for (var i = 0; i < 4; i++) {
			RB.wantsMem[i] = Math.round( fullRes[i]  * nK/100 - resNow[i] );
			if( RB.wantsMem[i] < 0 ) RB.wantsMem[i] = 0;
			ressA[i].innerHTML = RB.wantsMem[i];
		}
	}
	function svOK () {
		saveCookie('Mem', 'wantsMem');
		if( nK > 0 ) {
			RB.dictFL[21] = nK;
			saveCookie( 'DictFL', 'dictFL' );
		}
		closeWindowN(10);
	}

	var nK = RB.dictFL[21];
	if( nK < 1 ) nK = 90;
	var newT = $e('TABLE',[['class',allIDs[7]],['style','background-color:#FAFAFF;']]);
	var newPR = $e('INPUT',[['type', 'TEXT'],['size',2],['maxlength',2],['value',nK]]);
	newPR.addEventListener('keyup', resRecalc, false);
	var btnOK = $ee('BUTTON',gtext("ok"),[['class',allIDs[15]],['onclick',jsNone]]);
	btnOK.addEventListener('click', svOK, true);
	newT.appendChild($em('TR',[$em('TD',[newPR,'%']),$c(btnOK)]));
	var ressA = [];
	RB.wantsMem = [0,0,0,0,village_aid];
	for (var i = 0; i < 4; i++) {
		ressA[i] = $c(RB.wantsMem[i]);
		newT.appendChild($em('TR',[$c(trImg('r' + (i+1))),ressA[i]]));
	}
	resRecalc();
	var xy = offsetPosition(this.parentNode);
	windowID[10] = makeFloat(newT,xy[0]+120,xy[1]+25);
}

function distanceToMyVillages() {
	function updateDistTable () {
		pp.removeChild(attbl);
		lastTimerP[0] = lastTimerP[2];
		attbl = showAllTTime(1, curD, sel.value, sel3.value, shoesT[sel2.value]);
		lastTimerP[0] = lastTimerP[1];
		pp.appendChild(attbl);
	}

	var curD = getVid(crtPath);
	var shoesT = [0,0.25,0.5,0.75];

	var sel = $e('SELECT');
	for( var j = 0; j < 21; j++ ) newOption(sel, j, j);
	var al = RB.Setup[9] == 0 ? RB.village_Var[1] : parseInt(RB.Setup[9]) - 1;
	sel.selected = al; sel.value = al;
	attbl = showAllTTime(1, curD, al);
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];

	var kirURL = $a('(kirilloid.ru)',[['href','http://travian.kirilloid.ru/distance.php#cc='+id2xy(village_aid).join()+','+id2xy(curD).join()+'&srv='+RB.Setup[45]+'.'+'4'+(RB.Setup[46]==1?31:4)],['target','_blank'],['style','font-size:10px;display:inline-block;']]);
	var sel2 = $e('SELECT');
	var sO2 = ['-','+25%','+50%','+75%'];
	for( var j = 0; j < sO2.length; j++ ) newOption(sel2, sO2[j], j);
	sel2.selected = 0; sel2.value = 0;
	var t4P = $em('SPAN',[' , ',trImg('itemCategory itemCategory_shoes'),' : ',sel2]);

	var sel3 = $e('SELECT');
	var sO3 = [gtext('none'),'x0.33','x0.5','x0.67','x1.5','x2','x3'];
	for( var j = 0; j < sO3.length; j++ ) newOption(sel3, sO3[j], j);
	sel3.selected = RB.Setup[3]; sel3.value = RB.Setup[3];
	var artSp = $em('SPAN',[' , ',sel3],[['title',gtext("speedart")]]);

	var pp = $em('P',[arena + ' : ',sel,t4P,artSp,' ',kirURL, attbl],[['style','margin:10px 30px 0px;']]);
	cont.appendChild(pp);
	document.addEventListener("change", updateDistTable, false);

	var villages = $g('vlist');
	if ( ! villages ) return;
	villages = villages.tBodies[0].rows;
	for( var i = 0; i < villages_id.length; i++ ) {
		var distance = parseFloat(calcDistance( villages_id[i], curD ).toFixed(1));
		villages[i].cells[3].appendChild($t(" <-> " + distance));
	}
}

function distanceToTargetVillages() {
	var vtLink;
	var vtable = $g("villages");
	if ( ! vtable ) return;
	var fl = false;
	// fill rows
	var vtrows = vtable.tBodies[0].rows;
	for (var mr = 0; mr < vtrows.length; mr++)
	{
		var vName = $gc('name',vtrows[mr]);
		if ( vName.length > 0 ) {
			vtLink = $gt('a',vName[0]);
		}
		if( vtLink.length > 0 ) {
			vtLink = vtLink[0];
			var vURL = vtLink.getAttribute("href");
			distanceTooltip(vtLink,0);
			sendResTropAdd(vtLink, 1);
			linkHint(vtLink);
			var Rej = /d=(\d+)/i;
			var vID = Rej.exec(vURL)[1];
			var distance = parseFloat(calcDistance( vID, village_aid ).toFixed(1));
			vtrows[mr].appendChild($c(distance));
			fl = true;
		}
	}
	if( fl ) {
		// add additional field
		var vtrows = vtable.tHead.rows;
		vtrows[0].appendChild($c('&lt;-&gt;',[['style','width:10%;']]));
	}
}

function fillXY ( nXY ) {
	if( /[&?]z=\d/.test(crtPath) ) return;
	var myVid = nXY || RB_getValue(GMcookieID + 'next', -1);
	if( myVid > 0 ) {
		var arXY = id2xy( myVid );
		if( $gn('x').length < 1 ) return;
		$gn('x')[0].value = arXY[0];
		$gn('y')[0].value = arXY[1];
		nextFL = false;
	}
}

function fillXYtoRP() {
	fillXY();
	if( $g('troops') ) {
		var ss = $g('btn_ok');
		if( ss ) {
			addShowDistanceIn( ss, 0 );
			ss.parentNode.addEventListener('keyup', a2bInfo, false);
			ss.parentNode.addEventListener('click', a2bInfo, false);
		}
	}
}

function sendArmy( myVid ) {
	if( $gn('t9').length > 0 ) {
		fillXY( myVid );
		showDistanceIn( 0 );
	} else {
		if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
		document.location.href = 'build.php?id=39&tt=2';
	}
	return false;
}

function sendResourses( myVid ) {
	if( $gn('r1').length > 0 ) {
		fillXY( myVid );
		showDistanceIn( -1 );
	} else {
		if( RB.village_Dorf2[0] != 0 ) {
			if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
			document.location.href='build.php?id=' + RB.village_Dorf2[0] + '&t=5';
		} else {
			document.location.href='build.php?z=' + myVid + '&gid=17&t=5';
		}
	}
	return false;
}

// 0-market, 1-barracks, 2-stable, 3-workshop, 4-Tournament Square, 5-Great Barracks, 6-Great Stable
function parseDorf2 () {
	var base = $g('village_map');
	if( !(base) ) return;
	var fl = false;
	var buildsID = ['g17','g19','g20','g21','g14','g29','g30'];
	var buildsNum = [0,0,0,0,0,0,0];

	var allAreas = $gt('AREA',base);
	var allIMG = $gt('IMG',base);
	if ( allAreas.length > 0 ) {
		for( var t=0; t<allAreas.length; t++ ) {
			for( var i = 0; i < buildsID.length; i++ ) {
				var Rej = new RegExp(buildsID[i]);
				if( Rej.test(allIMG[t].getAttribute('class')) )
					buildsNum[i] = allAreas[t].getAttribute('href').match(/id=(\d+)/)[1];
			}
		}
	} else {
		for( var t=0; t<allIMG.length; t++ ) {
			for( var i = 0; i < buildsID.length; i++ ) {
				var Rej = new RegExp(buildsID[i]);
				if( Rej.test(allIMG[t].getAttribute('class')) ) {
					buildsNum[i] = allIMG[t].previousSibling.getAttribute('class').match(/aid(\d+)/)[1];
				}
			}
		}
	}

	for( var i = 0; i < buildsID.length; i++ ) {
		if( buildsNum[i] != RB.village_Dorf2[i] ) {
			RB.village_Dorf2[i] = buildsNum[i];
			fl = true;
		}
	}
	if( buildsNum[4] > 0 ) { // search&save Tournament Square
		if (allAreas.length > 0 ) {
			var tur = $xf('.//img[contains(@class,"g14")]','f',base).getAttribute('alt').match(/\d+/)[0];
		} else {
			var tur = $xf('.//img[contains(@class,"g14")]','f',base).previousSibling.firstChild.textContent;
		}
		if( tur != RB.village_Var[1] ) {
			RB.village_Var[1] = tur;
			saveVCookie( 'VV', RB.village_Var );
		}
	} else if( RB.village_Var[1] > 0 ) {
		RB.village_Var[1] = 0;
		saveVCookie( 'VV', RB.village_Var );
	}
	var dictsFL = [['g17',7],['g19',8],['g20',9],['g21',10],['g16',6],['g14',3],['g29',24],['g30',25]];
	function getBuildingName () {
		var turD = $gc('elementTitle')[0].innerHTML.firstText();
		RB.dictionary[dictsFL[this.i][1]] = turD;
		saveCookie( 'Dict', 'dictionary' );
		RB.dictFL[dictsFL[this.i][1]] = 1;
		saveCookie( 'DictFL', 'dictFL' );
	}
	function getBuilding () {
		for( var i = 0 ; i < dictsFL.length; i++ ) {
			if( RB.dictFL[dictsFL[i][1]] == 0 ) {
				var turF = $gc('building '+dictsFL[i][0],base);
				if( turF.length > 0 ) {
					var event = new Event('mouseover');
					turF[0].previousElementSibling.addEventListener('mouseover', getBuildingName, false);
					turF[0].previousElementSibling.i = i;
					turF[0].previousElementSibling.dispatchEvent(event);
					turF[0].previousElementSibling.removeEventListener('mouseover', getBuildingName, false);
				}
			}
		}
	}
	if (document.readyState === "complete") {
		getBuilding();
	} else {
		document.onreadystatechange = function () {
			if (document.readyState === "complete") {
				getBuilding();
			}
		}
	}
	if( fl ) saveVCookie( 'Dorf2', RB.village_Dorf2 );
}

/************************* Setup ***************************/

function okTD( funcOk, funcCancel, sp ) {
	var newBTO = $ee('BUTTON',gtext("ok"),[['class',allIDs[15]],['onclick',jsNone]]);
	newBTO.addEventListener('click', funcOk, true);
	var newBTX = $ee('BUTTON',gtext("cancel"),[['class',allIDs[15]],['onclick',jsNone]]);
	newBTX.addEventListener('click', funcCancel, true);
	var at = [['style','text-align:right']];
	if( parseInt(sp) != NaN ) at.push(['colspan',sp]);
	return $em('TD',[newBTO,newBTX],at);
}

function gtext ( txt ) {
	var ntxt = typeof DICT['en'][txt] == 'undefined' ? 'Error!': DICT['en'][txt];
	if( typeof DICT[LC] == 'undefined' ) return ntxt;
	if( typeof DICT[LC][txt] != 'undefined' ) ntxt = DICT[LC][txt];
	else if( typeof DICT[LC]["fb"] != 'undefined' )
		if( typeof DICT[DICT[LC]["fb"]] != 'undefined' )
			if( typeof DICT[DICT[LC]["fb"]][txt] != 'undefined' ) ntxt = DICT[DICT[LC]["fb"]][txt];
	return ntxt;
}

RB.dSetup = [//	0	1	2	3	4	5	6	7	8	9
	/* 0 */	version,0,	7,	0,	1,	7,	1,	1,	3,	0,
	/* 1 */		2,	1,	2,	0,	1,	1,	2,	0,	1,	4,
	/* 2 */		1,	1,	1,	10,	80,	1,	1,	0,	0,	audiofile,
	/* 3 */		0,	15,	1,	1,	0,	0,	1,	1,	1,	0,
	/* 4 */		'',	'',	'',	'',	'',	0,	0,  0,  0
			];
RB.Setup = RB.dSetup.slice();

function rbSetup () {
	var analyzers = [gtext('incomreso')[0]];
	for( var i = 1; i <= serversAC; i++ ) {
		analyzers[i] = userActivityServers( i, 1, true )[0];
	}
	var normProd = [gtext('incomreso')[0],gtext("normal")];
	for( i = 2; i < normalizeProductionCount+2; i++ ) {
		normProd[i] = RB.dictTR[i+(10*(RB.Setup[2]-(RB.Setup[2]>4?2:0)))-1];
	}
	for( i = 0; i < 5; i++ )
		if( RB.Setup[40+i].length<2 ) RB.Setup[40+i] = cnColors[i];

	// 0-type(Info,CheckBox,Text,SELect,SPan,Button), 1-setupNum, 2-text, 3-ext
	var aRBS = [
		['I', 0, gtext("info")],
			['SEL', 1, gtext("scrlang")+(LC != 'en' ? ' / Language':''), langs],
			['SEL', 2, gtext("yourrace"), gtext("racelist")],
			['T', 45, gtext("sspeed"), gtext("sspeedh")],
			['SEL', 46, gtext("servertype"), gtext("servertypeo"),gtext("servertypeh")],
			['SEL', 3, gtext("speedart"), [gtext('none'),'x0.33','x0.5','x0.67','x1.5','x2','x3']],
			['SEL', 9, arena, [gtext("auto"),0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],
			['T', 24, gtext("cranny"), gtext("crannyh")],
		['I', 0, gtext("builtin")],
			['SEL', 22, gtext("normalize"), normProd, gtext("builtinh")],
			['CB', 25, gtext("banalyze")],
			['CB', 26, gtext("cropfind")],
			['SEL', 30, gtext("adetect"), gtext("adetecto"), gtext("adetecth")],
			['T', 31, gtext("adetectt"), gtext("adetectth")],
			['CB', 32, gtext("buildhint")],
			['CB', 37, gtext("bmove")],
		['I', 0, gtext("onallp")],
			['SEL',14, gtext("buildand"), gtext('buildands'), gtext("buildandh")],
			['CB',15, gtext("sendres")],
			['CB',18, gtext("sendmess")],
			['SEL',19, gtext("analyzer"), analyzers],
			['B', 0, gtext("analyzer"), [gtext('settings'),'analyzerSetup']],
			['SEL',16, gtext("bigicon"), gtext('addvtableo')],
			['SEL',21, gtext("addvtable"), gtext('addvtableo')],
			['CB',17, gtext("opennote")],
			['SEL',35, gtext("notesize"), ['40x15','55x20','70x30','60x45','40x8','30??34']],
			['CB',34, gtext("openoview")],
		['I', 0, gtext("resbar")],
			['CB', 4, gtext("showres")],
			['T', 6, gtext("redbl")],
			['T', 5, gtext("yellowbl")],
		['I', 0, gtext("marketpl")],
			['SEL', 8, gtext("mfilter"), gtext("mfiltero")],
			['CB', 11, gtext("npcsum"), gtext("npcsumh")],
			['T', 23, gtext("bidinc"), gtext("bidinch")],
			['CB', 33, gtext("show3x"), gtext("show3xh")],
		['I', 0, gtext("rpandmp")],
			['SEL', 10, gtext("incomres"), gtext("incomreso")],
			['SEL', 20, gtext("troopsI"), gtext("troopsIo")],
			['SEL', 27, gtext("defRP"), [RB.dictionary[16],RB.dictionary[17],RB.dictionary[18]]],
		['I', 0, gtext("links")],
			['SEL',12, gtext("showls"), gtext("showlso")],
			['CB', 36, gtext("showAsSN")],
			['T', 'ln2', gtext("savedls")],
			['T', 'ln', gtext("savedls")+' (2)'],
			['T', 'ln3', gtext("savedls")+' (3)'],
		['I', 0, gtext("notifi"), gtext("notification")],
			['SEL',28, gtext("method"), [gtext('none'),'Alert pop-up','HTML5 Audio']],
			['T', 29, gtext("audiourl"), 'https://... .mp3 .ogg .wav'],
			['B', 0, gtext("audiotest"), ['test','testAudio']],
		['I', 0, gtext("colorCustomize"), gtext("colorHint")],
			['T', 40, gtext("color0")],
			['T', 41, gtext("color1")],
			['T', 42, gtext("color2")],
			['T', 43, gtext("color3")],
			['T', 44, gtext("color4")],
		['I', 0, gtext("savedd"), gtext("saveddh")],
			['B', 0, gtext("savedelall"), [gtext("del"),'allStorageDelete']],
		['I', 0, '']
	];

	if( closeWindowN(0) ) return;

	function setupSave() {
		var aS = $gt("SELECT",$g(allIDs[6]));
		for (var i = 0; i < aS.length; i++) RB.Setup[parseInt(aS[i].name)] = aS[i].value;
		var aS = $gt("INPUT",$g(allIDs[6]));
		for (var i = 0; i < aS.length; i++) {
			crtValue = aS[i].value;
			if( aS[i].type == 'checkbox') crtValue = (aS[i].checked == true ? '1' : '0');
			if( isNaN(aS[i].name) )
				RB_setValue(GMcookieID + aS[i].name, crtValue);
			else
				RB.Setup[parseInt(aS[i].name)] = crtValue;
		}
		if(RB.Setup[29].length < 2) RB.Setup[29] = audiofile;
		saveCookie( 'RBSetup', 'Setup' );
		destroySetup();
		location.reload(true);
	}
	function destroySetup() {
		closeWindowN(0);
	}

	setupD = $e('TABLE',[['id',allIDs[6]]]);
	var newTR = $ee('TR',$c(gtext("svers")+': ' + version));//RB.Setup[0]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);

	for( var i = 0; i < aRBS.length; i++ ) {
		if( aRBS[i][0] == 'I' ) {
			var newTt = $ee('SPAN',aRBS[i][2],[['style','font-weight:bold;']]);
			if( typeof aRBS[i][3] == 'string' && aRBS[i][3].length > 1 ) {
				$at(newTt,[['title',aRBS[i][3]]]);
				newTt.appendChild(trImg(allIDs[47]));
			}
			var newTR = $ee('TR',$c(newTt,[['colspan','2'],['style','text-align:center']]));
		} else {
			var vN = isNaN(aRBS[i][1]) ? RB_getValue(GMcookieID + aRBS[i][1], "") : RB.Setup[aRBS[i][1]];
			var newTt = $ee('SPAN',aRBS[i][2]);
			var hn = aRBS[i][0] == 'SEL' ? 4: 3;
			if( typeof aRBS[i][hn] == 'string' && aRBS[i][hn].length > 1 ) {
				$at(newTt,[['title',aRBS[i][hn]]]);
				newTt.appendChild(trImg(allIDs[47]));
			}
			var newTR = $ee('TR',$c(newTt));
			switch( aRBS[i][0] ) {
				case 'CB': var newO = $e('INPUT',[['type', 'CHECKBOX']]); if(vN == 1) $at(newO, [['checked', true]]); break;
				case 'T': var newO = $e('INPUT',[['type', 'TEXT'],['value',vN]]); break;
				case 'SEL': var newO = $e('SELECT');
					for( var j = 0; j < aRBS[i][3].length; j++ ) newOption(newO, aRBS[i][3][j], j);
					newO.selected = vN; newO.value = parseInt(vN); break;
				case 'SP': var newO = $ee('SPAN',vN); break;
				case 'B': var newO = $ee('BUTTON',aRBS[i][3][0],[['class',allIDs[15]],['type', 'BUTTON'],['onclick',jsNone]]);
					newO.addEventListener('click', eval(aRBS[i][3][1]), true);
					break;
			}
			$at(newO, [['name', aRBS[i][1]]]);
			newTR.appendChild($c( newO, [['style','text-align:center;']]));
		}
		setupD.appendChild(newTR);
	}

	var newTR = $ee('TR',$em('TD',[gtext("youlang")+': ',$ee('b',navigator.language)]));
	newTR.appendChild(okTD(setupSave,destroySetup));
	setupD.appendChild(newTR);

	windowID[0] = makeFloatD(setupD, 0);
}

function allStorageDelete () {
	if( ! confirm(gtext("savedelallh")) ) return;
	for( var i = 0; i< allCookies.length; i++ ) {
		RB_deleteValue( GMcookieID + allCookies[i] );
	}
	document.location.href = fullName + 'logout.php';
}

function parseSpieler () {
	var Rej = new RegExp('uid=' + userID);
	if( ! Rej.test(crtPath) && crtPath.indexOf('uid=') != -1 ) return;
	try {
		var capitalS = $xf('./tbody/tr/td/span[not(./a)]','f',$g('villages'));
		var capital = capitalS.parentNode.getElementsByTagName('A')[0].getAttribute('href').match(/d=(\d+)/)[1];
	} catch(err) {
		var capital = 0;
	}
	var aID = $xf('.//a[contains(@href,"allianz.php?aid=")]','f',$g('profile'));
	var fl = false;
	if( aID ) {
		aID = aID.getAttribute('href').match(/aid=(\d+)/)[1];
		if( aID != RB.dictionary[13] ) {
			fl = true;
			RB.dictionary[13] = aID;
		}
	} else if( RB.dictionary[13] != 0 ) {
		RB.dictionary[13] = 0;
		aID = 0;
	}
	if( RB.dictionary[0] != capital || RB.dictFL[1] == 0 || fl ) {
		var ally = $xf('.//table[@id="details"]//tr','l',cont).snapshotItem(2).innerHTML.match(/>(.+?):?</)[1];
		RB.dictionary[0] = capital;
		RB.dictionary[1] = ally;
		saveCookie( 'Dict', 'dictionary' );
		RB.dictFL[1] = 1;
		saveCookie( 'DictFL', 'dictFL' );
	}
}

var vLinksPat = '//div[@id="sidebarBoxVillagelist"]//li/a/div';

function overviewWarehouse () {
	function refreshOview () {
		if( (parseInt(RB.overview[1]) + 900) > nowTime ) return;
		RB.overview[0] = 0;
		RB.overview[1] = crtPath.split("?")[0] + clearAntibot( linkVSwitch[village_aNum] );
		saveCookie('OV', 'overview');
		document.location.href=fullName + 'dorf1.php';
	}

	var overviewD = $e('TABLE',[['id',allIDs[8]]]);
	var newTHead = $e('THEAD');

	var refreshImg = $e('IMG',[['src', img_refr],['title',gtext("refresh")],['style','cursor:pointer;']]);
	refreshImg.addEventListener('click', refreshOview, true);
	var newTR = $em('TR',[$c(refreshImg),$c(trImg('r1')),$c(trImg('r2')),$c(trImg('r3')),
		$c(trImg('&nbsp;')),$c(trImg('r4')),$c(trImg('&nbsp;')),$c(trImg('r5')),$c('')]);
	newTHead.appendChild(newTR);

	overviewD.appendChild(newTHead);

	var newTBody = $e('TBODY');
	var t = 0;
	var nowTime = Math.round((Date.now())/1000);
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = $a(vLinks.snapshotItem(vn).innerHTML,[['href',linkVSwitch[vn]]]);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));
		loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

		var minLeft = Number.POSITIVE_INFINITY;
		for( var i = 0; i < 4; i++ ) {
			var deltaTime = RB.village_PPH[12] > 0 ? nowTime - parseInt(RB.village_PPH[12]): 0;
			var nowResInV = Math.round(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
			if( nowResInV > RB.village_PPH[i+8] ) nowResInV = RB.village_PPH[i+8];
			if( nowResInV < 0 ) nowResInV = 0;
			var secLeft = RB.village_PPH[i] > 0 ? Math.round((RB.village_PPH[i+8] - nowResInV) / (RB.village_PPH[i]/3600)) : Math.round( nowResInV / (RB.village_PPH[i]/3600));
			if( secLeft < minLeft ) minLeft = secLeft;
			var nowResInVP = Math.round(nowResInV / RB.village_PPH[i+8]*100);
			var clr;
			if( secLeft < parseFloat(RB.Setup[6])*3600) {
				clr = 3;
			} else if ( secLeft < parseFloat(RB.Setup[5])*3600) {
				clr = 2;
			} else {
				clr = 1;
			}
			var newPval = $ee('DIV',nowResInVP+'%',[['class',allIDs[10]+clr]]);
			newPval.setAttribute("style", "width: " + Math.round(nowResInVP/2) + "px;");
			newTR.appendChild($c(newPval,[['class',allIDs[10]]]));
			if( i > 1 ) {
				timerOv[t] = new Object();
				timerOv[t].time = minLeft;
				timerOv[t].obj = $eT('TD', minLeft, 0, [['class',allIDs[17]]]);
				timerOv[t].dir = RB.village_PPH[i] > 0 ? -1: 1;
				if( Math.abs(minLeft) < 600 ) setInterval(function(x){return function(){
					x.style.color = x.style.color=='red'?'black':'red';}
				}(timerOv[t].obj),1000);
				newTR.appendChild(timerOv[t++].obj);
				minLeft = Number.POSITIVE_INFINITY;
			}
		}
		newTR.appendChild($c(RB.village_PPH[3],[['style','text-align:right']]));
		newTR.appendChild($c(addARLinks(villages_id[vn],0)));
		newTBody.appendChild(newTR);
	}
	overviewD.appendChild(newTBody);
	return overviewD;
}

function trImg ( cl, et ) {
	var ecl = [['class', cl],['src', 'img/x.gif']];
	if( typeof et != 'undefined' ) ecl.push(['title',et]);
	return $e('IMG',ecl);
}

function humanRF ( num ) {
	var rnum = parseInt(num);
	var dnum = Math.abs(rnum);
	var sign = rnum < 0 ? '-': '';
	var ddnum = 0;
	var fnum = '';
	while( dnum > 1000 ) {
		ddnum = ('00'+(dnum % 1000)).substr(-3,3);
		dnum = Math.floor(dnum/1000);
		fnum = ddnum + ',' + fnum;
	}
	fnum = dnum + ',' + fnum;
	return sign+fnum.substr(0,fnum.length-1);
}

function overviewResources () {
	var overviewD = $e('TABLE',[['id',allIDs[8]]]);
	var newTHead = $ee('THEAD',$em('TR',[$c(' '),$c(trImg('r1')),$c(trImg('r2')),$c(trImg('r3')),$c(' '),$c(trImg('r4')),$c(' '),$c(abFL?'&#931;':''),$c(trImg('clock')),$c('')]));

	overviewD.appendChild(newTHead);

	var newTBody = $e('TBODY');
	var t = 0;
	var resSumm = [0,0,0,0];
	var nowTime = Math.round((Date.now())/1000);
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = $a(vLinks.snapshotItem(vn).innerHTML,[['href',linkVSwitch[vn]]]);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));
		loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

		var allResInV = 0;
		for( var i = 0; i < 4; i++ ) {
			var deltaTime = RB.village_PPH[12] > 0 ? nowTime - parseInt(RB.village_PPH[12]): 0;
			var nowResInV = Math.round(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
			if( nowResInV > RB.village_PPH[i+8] ) nowResInV = RB.village_PPH[i+8];
			if( nowResInV < 0 ) nowResInV = 0;
			resSumm[i] += nowResInV;
			allResInV += nowResInV;
			var attr = [['class',allIDs[19]]];
			if( RB.village_PPH[i] < 0 ) attr[1] = ['style','color:red;'];
			newTR.appendChild($c(humanRF(nowResInV),attr));
			if( i == 2 ) newTR.appendChild($c('/'+RB.village_PPH[8],[['style','font-size:8pt;']]));
		}
		newTR.appendChild($c('/'+RB.village_PPH[11],[['style','font-size:8pt;']]));
		newTR.appendChild($c(abFL?humanRF(allResInV):'',[['style','font-weight:bold;text-align:right']]));
		if( villages_id[vn] != village_aid )
			newTR.appendChild($c(formatTime(getTTime(calcDistance(villages_id[vn],village_aid),MTime[parseInt(RB.Setup[2])]*sM,0,0),0)));
		else
			newTR.appendChild($c('&lt;--'));
		newTR.appendChild($c(addARLinks(villages_id[vn],0)));
		newTBody.appendChild(newTR);
	}
	overviewD.appendChild(newTBody);
	var newTR = $ee('TR',$c('&nbsp;'));
	for( var i = 0; i < 4; i++ ) {
		newTR.appendChild($c(humanRF(resSumm[i]),[['style','text-align:right;']]));
		if( i > 1 ) newTR.appendChild($c(' '));
	}
	newTR.appendChild($c(' ',[['colspan',3]]));
	overviewD.appendChild($ee('TFOOT',newTR));
	return overviewD;
}

function overviewTroops () {
	var overviewD = $e('TABLE',[['id',allIDs[8]]]);

	var newTBody = $e('TBODY');
	var vLinks = $xf(vLinksPat,'l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = $a(vLinks.snapshotItem(vn).innerHTML,[['href',linkVSwitch[vn]]]);
		if( villages_id[vn] == village_aid ) $at(vName, [['style','color:#71D000;']]);
		var newTR = $ee('TR',$c(vName));

		loadZVCookie('Dorf12','village_dorf12',villages_id[vn]);
		var t = 0;
		var hfl = false;
		if( RB.village_dorf12[0] > 0 ) {
			var tT = $e('TABLE',[['class',allIDs[7]],['style','width:100%;']]);
			if( RB.village_dorf12[1] == 'hero' )  hfl = true;
			t = hfl ? 3: 1;
			var fl = false;
			var nR1 = $e('TR');
			var nR2 = $e('TR');
			for( var i = 1; i < 71; i++ ) {
				nR1.appendChild($c(trImg('unit u'+i)));
				if( i == RB.village_dorf12[t] ) {
					nR2.appendChild($c(RB.village_dorf12[t+1]));
					fl = true;
					t += 2;
				} else nR2.appendChild($c(0));
				if( (i%10) == 0 ) {
					if( fl ) {
						tT.appendChild(nR1);
						tT.appendChild(nR2);
						fl = false;
					}
					var nR1 = $e('TR');
					var nR2 = $e('TR');
				}
			}
			newTR.appendChild($c(tT));
		} else newTR.appendChild($c('&nbsp;'));
		if( hfl ) newTR.appendChild($em('TD',[$ee('DIV',trImg('unit uhero')),$ee('DIV',RB.village_dorf12[2])]));
		else newTR.appendChild($c(''));
		newTR.appendChild($c(addARLinks(villages_id[vn],0)));
		newTBody.appendChild(newTR);
	}
	overviewD.appendChild(newTBody);

	return overviewD;
}

function overviewAll () {
	if( closeWindowN(1) ) { timerOv.length = 0; return; }
	if( villages_count < 2 ) return;

	function ovWarehouse () {
		ovBuild(overviewWarehouse());
	}
	function ovResources () {
		ovBuild(overviewResources());
	}
	function ovTroops () {
		ovBuild(overviewTroops());
	}
	function ovBuild ( ovNew ) {
		ovDIV.removeChild(overviewD);
		overviewD = ovNew;
		ovDIV.appendChild(overviewD);
	}
	function overviewClose () {
		timerOv.length = 0;
		closeWindowN(1);
	}

	var ovDIV = $e('DIV');
	var linkOW = $a(gtext("warehouse"),[['href',jsVoid]]);
	linkOW.addEventListener('click', ovWarehouse, true);
	var linkOR = $a(gtext("resources"),[['href',jsVoid]]);
	linkOR.addEventListener('click', ovResources, true);
	var linkOT = $a(gtext("troops"),[['href',jsVoid]]);
	linkOT.addEventListener('click', ovTroops, true);
	var menuD = $em('TD',[linkOW,' | ',linkOR,' | ',linkOT],[['style','text-align:'+docDir[0]+';padding:5px;']]);

	var menuR = $ee('TR',menuD);

	var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['class',allIDs[15]],['onclick',jsNone],['style','float:'+docDir[1]+';']]);
	newBTX.addEventListener('click', overviewClose, true);
	menuR.appendChild($c(newBTX));

	var menuT = $ee('TABLE',menuR,[['style','background-color:#F8F8F8;border-collapse:collapse;']]);
	ovDIV.appendChild(menuT);

	var overviewD = overviewWarehouse();

	ovDIV.appendChild(overviewD);
	windowID[1] = makeFloatD(ovDIV, 2);
}

function clearAntibot ( oldURL ) {
	var clearURL = oldURL.replace(/&c=[\w]{6,6}/,'');
	return clearURL;
}

function imgHide ( num ) {
	var o = [['src','img/x.gif'],['class',allIDs[32]]];
	if( RB.bodyH[num] == 1 ) o.push(['style','background-position:0px -12px;']);
	return $e('IMG',o);
}

function saveLink ( lns ) {
	var newCL = '';
	for( var i = 0; i < lns.length; i++ )
		if( /d=\d+/i.test(lns[i]) ) newCL += lns[i] + '@@_';
	RB_setValue(GMcookieID + "ln", newCL);
	redrawLinks();
	convertLinks();
}
function saveLink3 () {
	saveVCookie('ln3', RB.ln3, 1);
	redrawLinks();
	convertLinks();
}
function sortLinks () {
	slt = slt ? false: true;
	redrawLinks();
}
function redrawLinks () {
	$g(windowID[5]).parentNode.removeChild($g(windowID[5]));
	showLinks();
}
var slt = true;
function showLinks () {
	function intShowLinks (fl) {
		var maxLinks = fl ? alinks.length: RB.ln3.length;
		for( var i = 0; i < maxLinks; i++ ) {
			var oneLink = (fl?alinks[i]:RB.ln3[i]).split("\/@_");
			var tVId = parseInt(oneLink[0].match(/d=(\d+)/)[1]);
			var newTR = $e('TR');
			if( flKarte ) {
				if( slt ) {
					var newA = trImg(allIDs[39],gtext("del"));
					newA.addEventListener('click', function(x) { return function() { if( fl ) removeLink(x); else removeLink3(x); }}(i), false);
					var newTD = $c(newA);

					var newA = trImg(allIDs[38],gtext("edit"));
					newA.addEventListener('click', function(x) { return function() { if( fl ) editLink(x); else editLink3(x); }}(i), false);
					newTD.appendChild(newA);

					var newA = fl ? trImg(allIDs[40],gtext("unpin")): trImg(allIDs[41],gtext("pin"));
					newA.addEventListener('click', function(x) { return function() { if(fl) unpinLink(x); else pinLink(x); }}(i), false);
					newTD.appendChild(newA);
					newTR.appendChild(newTD);
				} else {
					if( i > 0 ) {
						var newA = $ee('A',$e('IMG',[['src',img_up]]),[['href',jsVoid]]);
						newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,(fl?0:1),-1]), false);
						var newTD = $c(newA);
					} else var newTD = $c($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

					if( i < maxLinks-1 ) {
						var newA = $ee('A',$e('IMG',[['src',img_down]]),[['href',jsVoid]]);
						newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,(fl?0:1),1]), false);
						newTD.appendChild(newA);
					} else newTD.appendChild($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

					newTR.appendChild(newTD);
				}
			}
			var newA = $a(unesc(oneLink[1]),[['href','karte.php?'+oneLink[0]]]);
			distanceTooltip(newA,0);
			var newTD = $c( newA);
			newTR.appendChild(newTD);
			var newTD = $c(addARLinks(tVId,1));
			newTR.appendChild(newTD);
			newTBody.appendChild(newTR);
		}
		if( i > 0 ) newTBody.appendChild($ee('TR',$c(' ',[['style','height:2px;line-height:2px;background-color:silver;'],['colspan',(flKarte ? 3:2)]])));
	}
	function moveLinkUpDown ( num ) {
		switch ( num[1] ) {
			case 0:
				var oneLink = alinks[num[0]];
				alinks.splice(num[0], 1);
				alinks.splice(num[0]+num[2], 0, oneLink);
				saveLink( alinks );
				break;
			case 1:
				var oneLink = RB.ln3[num[0]];
				RB.ln3.splice(num[0], 1);
				RB.ln3.splice(num[0]+num[2], 0, oneLink);
				saveLink3();
				break;
			case 2:
				var oneLink = clinks[num[0]];
				clinks.splice(num[0], 1);
				clinks.splice(num[0]+num[2], 0, oneLink);
				RB_setValue(GMcookieID + "ln2", clinks.join("@@_")+"@@_");
				redrawLinks();
				break;
		}
	}
	function pinLink ( num ) {
		alinks.push(RB.ln3[num]);
		RB.ln3.splice(num, 1);
		saveVCookie('ln3', RB.ln3, 1);
		saveLink( alinks );
	}
	function unpinLink ( num ) {
		RB.ln3.push(alinks[num]);
		alinks.splice(num, 1);
		saveVCookie('ln3', RB.ln3, 1);
		saveLink( alinks );
	}
	function addLink () {
		var newLink = crtPath.match(/[?&](d=.*)$/i);
		if( newLink.length == 0 ) return;
		newLink = newLink[1];
		var newName = $gt('h1',cont)[0].innerHTML.onlyText().replace(/&.+?;/g, " ");
		newName = prompt(gtext("linkname"), newName);
		if( newName == null ) return;
		var newOneLink = newLink + "\/@_" + esc(newName);
		RB.ln3.push(newOneLink);
		saveLink3();
	}
	function removeLink ( num ) {
		if( ! confirm(gtext("linkdel")+': '+unesc(alinks[num].split("\/@_")[1])+' ?') ) return;
		alinks.splice(num, 1);
		saveLink( alinks );
	}
	function removeLink3 ( num ) {
		if( ! confirm(gtext("linkdel")+': '+unesc(RB.ln3[num].split("\/@_")[1])+' ?') ) return;
		RB.ln3.splice(num, 1);
		saveLink3();
	}
	function editLink ( num ) {
		var oneLink = alinks[num].split("\/@_");
		var newName = prompt(gtext("linkname"), unesc(oneLink[1]));
		if( newName == null ) return;
		alinks[num] = oneLink[0] + "\/@_" + esc(newName);
		saveLink( alinks );
	}
	function editLink3 ( num ) {
		var oneLink = RB.ln3[num].split("\/@_");
		var newName = prompt(gtext("linkname"), unesc(oneLink[1]));
		if( newName == null ) return;
		RB.ln3[num] = oneLink[0] + "\/@_" + esc(newName);
		saveLink3();
	}
	function editCLink () {
		if( closeWindowN(6) ) return;

		function removeCLink ( num ) {
			eBody.removeChild($g('sn'+num));
		}
		function addCLink ( fl ) {
			var v = fl ? crtPath: '';
			var newA = trImg(allIDs[39],gtext("del"));
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',''],['name','lname'],['size',20]])), $c($e('INPUT',[['value',v],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		function saveCLinks () {
			var names = $gn('lname');
			var urls = $gn('lurl');
			var newCL = '';
			for( var i = 0; i < names.length; i++ ) {
				if( urls[i].value.length < 3 ) continue;
				if( names[i].value.length == 0 ) {
					if( urls[i].value.length > 25 )
						newCL += esc(urls[i].value.slice(0,9) +'..'+ urls[i].value.slice(-14)) +"\/@_"+ esc(urls[i].value) +"@@_";
					else
						newCL += urls[i].value +"\/@_"+ esc(urls[i].value) +"@@_";
				} else newCL += esc(names[i].value) +"\/@_"+ esc(urls[i].value) +"@@_";
			}
			RB_setValue(GMcookieID + "ln2", newCL);
			cancelCLinks();
			redrawLinks();
		}
		function cancelCLinks () {
			closeWindowN(6);
		}

		var SN = 0;
		var eBody = $e('TBODY');
		var editLinks = $ee('TABLE',eBody);
		editLinks.appendChild($em('THEAD',[$ee('TR',okTD(saveCLinks,cancelCLinks,3)),$em('TR',[$c(gtext("linkname")),$c('URL',[['colspan',2]])])]));
		for( var i = 0; i < clinks.length; i++ ) {
			var oneLink = clinks[i].split("\/@_");
			var newA = trImg(allIDs[39],gtext("del"));
			newA.addEventListener('click', function(x) { return function() { removeCLink(x); }}(SN), false);
			eBody.appendChild($em('TR',[$c($e('INPUT',[['value',unesc(oneLink[0])],['name','lname'],['size',20]])), $c($e('INPUT',[['value',unesc(oneLink[1])],['name','lurl'],['size',50]])),$c(newA)],[['id','sn'+(SN++)]]));
		}
		var newA = $a('+',[['href',jsVoid],['title',"add new"],['style','color:red;']]);
		newA.addEventListener('click', function() { addCLink(false); }, true);
		var newB = $a('(+)',[['href',jsVoid],['title',"add current"],['style','color:red;']]);
		newB.addEventListener('click', function() { addCLink(true); }, true);
		editLinks.appendChild($ee('TFOOT',$em('TR',[$em('TD',[newA,' / ',newB],[['style','text-align:center;font-size:20px;']]),okTD(saveCLinks,cancelCLinks,2)])));

		windowID[6] = makeFloatD(editLinks, 9);
	}

	var flKarte = /karte.+?[?&]d=.+c=/i.test(crtPath) ? true: false;
	if( /karte.php|position_details.php/i.test(crtPath) ) flKarte = true;
	// village links
	var ln_cookie = RB_getValue(GMcookieID + "ln", "");
	var alinks = ln_cookie.split("@@_");
	alinks.splice((alinks.length - 1), 1);
	// free constant links
	var ln_cookie = RB_getValue(GMcookieID + "ln2", "");
	var clinks = ln_cookie.split("@@_");
	clinks.splice((clinks.length - 1), 1);
	// links bound to village
	loadVCookie('ln3', 'ln3', village_aid, 1);
	if( RB.ln3[0] == 0 ) RB.ln3.length = 0;

	var newTBody = $e('TBODY');
	if( RB.bodyH[2] == 1 ) $at(newTBody,[['style','display:none']]);

	rbLinks = $e('TABLE',[['id',allIDs[9]]]);
	var newTHead = $e('THEAD');
	var newTR = $e('TR');

	var editCL = trImg(allIDs[38],gtext("edit"));
	editCL.addEventListener('click', editCLink, false);

	var hideP = imgHide(2);
	hideP.addEventListener('click', function (x) { return function() { bodyHide(x); }}([newTBody,2,hideP]), false);

	var newTD = $em('TD',[hideP,' ',gtext("links"),': ',editCL],[['colspan',(flKarte?3:2)]]);
	if( flKarte ) {
		var sortL = $ee('A',$e('IMG',[['src',img_updown]]),[['href',jsVoid],['title',gtext("edit")],['style','padding:0px 5px;']]);
		sortL.addEventListener('click', sortLinks, false);
		newTD.appendChild(sortL);
	}
	newTR.appendChild(newTD);
	newTHead.appendChild(newTR);
	rbLinks.appendChild(newTHead);

	for( var i = 0; i < clinks.length; i++ ) {
		var newTR = $e('TR');
		if( ! slt ) {
			if( i > 0 ) {
				var newA = $ee('A',$e('IMG',[['src',img_up]]),[['href',jsVoid]]);
				newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,2,-1]), false);
				var newTD = $c(newA);
			} else var newTD = $c($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

			if( i < clinks.length-1 ) {
				var newA = $ee('A',$e('IMG',[['src',img_down]]),[['href',jsVoid]]);
				newA.addEventListener('click', function(x) { return function() { moveLinkUpDown(x); }}([i,2,1]), false);
				newTD.appendChild(newA);
			} else newTD.appendChild($e('IMG',[['src', 'img/x.gif'],['style','height:12px;width:12px;']]));

			newTR.appendChild(newTD);
		}
		var oneLink = clinks[i].split("\/@_");
		newTR.appendChild($c($a(unesc(oneLink[0]),[['href',unesc(oneLink[1])]]),[['colspan',(flKarte?(slt?3:2):2)]]));
		newTBody.appendChild(newTR);
	}
	if( i > 0 ) newTBody.appendChild($ee('TR',$c(' ',[['style','height:2px;line-height:2px;background-color:silver;'],['colspan',(flKarte ? 3:2)]])));

	intShowLinks(true);
	intShowLinks(false);

	rbLinks.appendChild(newTBody);

	if( RB.Setup[12] == 1 ) {
		windowID[5] = allIDs[9]+'F';
		$g(pageElem[2]).appendChild($ee('P',rbLinks,[['id',windowID[5]]]));
	} else {
		windowID[5] = makeFloatD(rbLinks, 3);
	}
}
function addlinkT4() {
	var vilView = $g('tileDetails');
	if( vilView ) {
		var h1 = $gt('H1',vilView)[0];
		if( ! h1 ) h1 = $gt('H1',cont)[0];
		if( h1 ) {
			var spn = $gt('SPAN',h1);
			var xy = getVidFromCoords(spn[0].innerHTML);
			newLink = 'd='+xy;
			var newName = h1.innerHTML.firstText().replace(/([\u2000-\u20ff])/g,'') + ' ' + printCoords(xy);
			newName = prompt(gtext("linkname"), newName);
			if( newName == null ) return;
			var newOneLink = newLink + "\/@_" + esc(newName);
			RB.ln3.push(newOneLink);
			saveLink3();
		}
	}
}

function detectNameAttaker() {
	var tmenu = $gc('filterContainer',cont)[0];
	if( ! (tmenu) ) return;

	var ttable = [];
	var thref = [];
	var nameCache = [];
	var linkCache = [];
	var anameCache = [];

	function nameAttaker( num ) {
		var tname = nameCache[thref[num]];
		var tlink = linkCache[thref[num]];
		var aname = anameCache[thref[num]];
		if( ! tname ){
			ajaxRequest(fullName+thref[num], 'GET', null, function(ajaxResp) {
				var resb = ajaxResp.responseText;
				var res = resb.match(/<td class=\"player\"><a href=\"(spieler\.php.+?)\">(.+)<\/a/i);
				tlink = res[1];
				tname = res[2];
				nameCache[thref[num]] = tname;
				linkCache[thref[num]] = tlink;
				res = resb.match(/<td class=\"alliance\"><a href=\"(allianz\.php.+?)\">(.*)<\/a/i);
				aname = res[2];
				anameCache[thref[num]] = aname;
				var tTD = $xf('tbody[@class="units"]/tr/th', 'f', ttable[num]);
				if( $gc(allIDs[29],tTD).length > 0 ) return;
				tTD.insertBefore($a(tname,[['href',tlink],['title',aname],['class',allIDs[29]]]),tTD.firstChild);
			}, dummy);
		} else {
			var tTD = $xf('tbody[@class="units"]/tr/th', 'f', ttable[num]);
			if( $gc(allIDs[29],tTD).length > 0 ) return;
			tTD.insertBefore($a(tname,[['href',tlink],['title',aname],['class',allIDs[29]]]),tTD.firstChild);
		}
	}
	function prepareGetAttakers() {
		var allIn = $xf('.//table[tbody/tr/td/div[@class="in"]]','l');
		var hrefCache = [];
		var curTO = 0;
		for( var i = 0; i < allIn.snapshotLength; i++ ) {
			ttable[i] = allIn.snapshotItem(i);
			thref[i] = $xf('thead/tr/td[@class="role"]/a', 'f', ttable[i]).getAttribute('href');
			hrefCache[thref[i]] = true;
			curTO += hrefCache[thref[i]] ? 1: getRandom(500,2000);
			setTimeout(function(x) { return function() { nameAttaker(x); }}(i), curTO);
		}
	}

	var nameLink = $a('???',[['href',jsVoid]]);
	nameLink.addEventListener('click', prepareGetAttakers, false);
	var newSP = $ee('DIV',nameLink,[['style',"position:absolute;margin:5px -30px;"]]);
	tmenu.insertBefore(newSP,tmenu.firstChild);

	var attFI = $ee('BUTTON',trImg('iReport iReport1'),[['class',"iconFilter"],['onclick',jsNone]]);
	attFI.addEventListener('click', filterIncomeTroops, false);
	tmenu.insertBefore(attFI,tmenu.firstChild.nextSibling);
}

var filterITObj = new Object;
function filterIncomeTroops () {
	function parseNextPage () {
		if( ! nP ) {
			filterITObj.statD.innerHTML = '';
			addSpeedAndRTSend(filterITObj.actD);
			return;
		}
		filterITObj.statD.innerHTML = 'scanning: page'+curNum;
		curNum++;
		ajaxRequest(fullName+nP, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			ad = $xf('.//div[@id="content"]','f',ad);
			if( ! ad ) return;
			nP = getNextReportPage(ad);
			var allIn = $xf('.//table[tbody/tr/td/div[@class="in"]]','l',ad);
			for( var i=0; i<allIn.snapshotLength; i++ ) {
				var town = $xf('.//td[@class="role"]/a','f',allIn.snapshotItem(i));
				if( getVid(town.getAttribute('href')) == village_aid ) continue;
				var adT = allIn.snapshotItem(i).cloneNode(true);
				filterITObj.actD.appendChild(adT);
			}
			ad = null;
			setTimeout(parseNextPage, getRandom(300,1000));
		}, dummy);
	}

	function closeDiv() {
		var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['onclick',jsNone],['class',allIDs[15]],['style','direction:ltr']]);
		newBTX.addEventListener('click', function() {closeWindowN(11);}, true);
		return $ee('DIV',newBTX);
	}

	if( closeWindowN(11) ) return;
	if( typeof filterITObj.newD == 'undefined' ) {
		filterITObj.newD = $e('DIV',[['class',"gid16"],['id','build'],['style','background-color:white;width:551px;']]);
		filterITObj.statD = $e('DIV');
		filterITObj.actD = $e('DIV');
		$am(filterITObj.newD,[closeDiv(),filterITObj.statD,filterITObj.actD,closeDiv()]);
		var nP = 'build.php?gid=16&tt=1&filter=1';
		var curNum = 1;
		parseNextPage();
	}
	windowID[11] = makeFloatD(filterITObj.newD, 11);
}

/***************************** Activity Servers **********************************/

var serversAC = 5;
RB.serversAN = new Array(serversAC);
function userActivityServers ( num, id, user ) {
	var dsrv = RB.serversAN[num-1] !== undefined ? RB.serversAN[num-1]: srv;
	if ( num == 3 ) {
		return ['travianbox.com','http://'+dsrv+'.testing.travianbox.com/Stats/'+(user?'Player?p=':'Alliance?a=')+id,'http://###'+dsrv+'###.testing.travianbox.com/stats/Player?p=...'];
	} else if ( num == 4 ) {
		if( RB.serversAN[num-1] === undefined ) dsrv = crtLang + crtName.split('.')[0];
		return ['travianstats.de','http://travianstats.de/index.php?m='+(user?'player':'alliance')+'_info&'+(user?'u':'a')+'id='+id+'&w='+dsrv,'http://travianstats.de/index.php?m=player_info&w=###'+dsrv+'###uid=...'];
	} else if ( num == 5 ) {
		if( RB.serversAN[num-1] === undefined ) dsrv = crtName;
		return ['gettertools.com','https://www.gettertools.com/'+dsrv+'/'+(user?'Player':'Alliance')+'/'+id+'-','https://www.gettertools.com/###'+dsrv+'###/Player/...'];
	} else if ( num == 1 ) {
		if( RB.serversAN[num-1] === undefined ) dsrv = crtName;
		return ['travmap.shishnet.org','https://travmap.shishnet.org/map.php?server='+dsrv+'&'+(user?'player':'alliance')+'=id:'+id+'&groupby='+(user?'town':'player')+'&casen=on&format=svg&azoom=off','https://travmap.shishnet.org/map.php?server=###'+dsrv+'###&player=....'];
	} else {
		return ['travian.ws','http://travian.ws/analyser.pl?s='+dsrv+'&'+(user?'u':'a')+'id='+id,'http://travian.ws/analyser.pl?s=###'+dsrv+'###&uid=...'];
	}
}

function ActivityInfo ( id, user ) {
	var newR = $ee('TR',$c($e('IMG',[['src',img_stat]]),[['style','width:55px;']]));
	var newD = $c('',[['style','text-align:'+docDir[0]+';']]);
	for( var i = 1; i <= serversAC; i++ ) {
		if ( i==2 || i==3 ) continue; //don't show old analyzer sites
		var alink = userActivityServers( i, id, user );
		newD.appendChild($a(alink[0],[['href',alink[1]],['target','_blank']]));
		newD.appendChild($e('BR'));
	}
	newR.appendChild(newD);
	newR.appendChild($c('',[['id',allIDs[0]],['style','width:40%;text-align:'+docDir[0]+';']]));
	newT = $ee('TABLE',newR,[['class',allIDs[21]]]);
	var newP = $ee('P',newT);
	var lastT = $gt('TABLE',cont);
	insertAfter(newP, lastT[lastT.length-1]);
}
function userActivityInfo() {
	// Get user id
	var uID = crtPath.match(/uid=(\d+)/);
	ActivityInfo( uID?uID[1]:userID, true );
}
function allyActivityInfo() {
	// Get alliance id
	var aID = crtPath.match(/aid=(\d+)/);
	if( aID ) aID = aID[1];
	else if( RB.dictionary[13] > 0 ) aID = RB.dictionary[13]; else return;
	ActivityInfo( aID, false );
}

function AllyBonusPageRefreshRB() {
	var target = $g('dailyContributionTitleText');
	if ( ! target ) { return; }
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if (mutation.type === 'childList') {
				initRes = true; getResources(); progressbar_ReInit();
			}
		});
	});
	var config = { childList: true, subtree: true };
	observer.observe(target, config);
}

function viewMessageIW() {
	function selectMessage (num) {
		var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
		var tds = allRows.snapshotItem(num).cells;
		$gt('INPUT',tds[0])[0].setAttribute('checked',true);
		var aLinks = $xf('.//a[(contains(@href, "berichte.php?") or contains(@href, "messages.php?")) and not(contains(@href, "toggleState="))]','f',tds[1]);
		var aLink = aLinks.getAttribute('href');

		var tV = /berichte/.test(aLink) ? 1: 0;
		viewMessageIWDisplay( aLink, tV , (num>12?offsetPosition(aLinks):false));
	}

	var allRows = $xf('.//tr[td/@class="sel"]','l',cont);
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i).cells[1];
		var newImg = $e('IMG',[['src',img_view]]);
		newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(i), false);
		$at(newImg,[['style','position:relative;float:'+docDir[0]+';'+(/berichte/.test(crtPath)?'':docDir[0]+':-6px;')]]);
		td.insertBefore(newImg, td.firstChild);
	}
}

function viewMessageIWClose() {
	closeWindowN(4);
}
function viewMessageIWDisplay( aLink, tV, xy ) {
	var messCr = './/div[@class="paper"]';
	var viewPref = [
		[messCr,'messages','padding-top:10px;padding-bottom:15px;padding-'+docDir[0]+':25px;text-align:'+docDir[0]+';'],
		['.//*[@id="report_surround" or @id="reportWrapper"]','reports','padding-top:10px;padding:10px 25px 0px;width:554px;']];

	aLink = aLink.replace(/^\//, '');
	ajaxRequest(fullName+aLink, 'GET', null, function(ajaxResp) {
		viewMessageIWClose();
		var ad = ajaxNDIV(ajaxResp);
		var aV = $xf(viewPref[tV][0], 'f', ad);
		ad = null;
		if (aV) {
			var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['onclick',jsNone],['class',allIDs[15]]]);
			newBTX.addEventListener('click', viewMessageIWClose, true);
			newBTX.disabled = false;
			var newD = $em('DIV',[$ee('DIV',aV,[['class',viewPref[tV][1]],['style',viewPref[tV][2]]]),newBTX],[['style','text-align:center;background-color:white;padding-bottom:10px;']]);
			var closeBtn = $a('X',[['id',allIDs[49]],['title',gtext("close")]]);
			closeBtn.addEventListener('click', viewMessageIWClose, true);
			newD.insertBefore(closeBtn, newD.firstChild);
			windowID[4] = xy ? makeFloat(newD, xy[0], xy[1]): makeFloatD(newD, 4);
			var bigImg = $xf('.//img[contains(@class,"eportImage")]','f',aV);
			if( bigImg ) bigImg.parentNode.removeChild(bigImg);
			var bigImg2 = $xf('.//div[contains(@class,"victory")]','f',aV);
			if( bigImg2 ) bigImg2.parentNode.removeChild(bigImg2);
			if( tV == 1 ) { addSpeedAndRTSend(newD); analyzerBattle(); } else convertCoordsInMessagesToLinks();
			addRefIGM( windowID[4] );
			if( xy ) updatePosition( windowID[4], xy, 4 );
		}
	}, dummy);
}

function viewMessageIWK ( piBl ) {
	var iBl = piBl || cont;
	var allRows = $xf('.//td[.//a[contains(@href, "berichte.php?id=")]]','l',iBl);
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i);
		var aLink = $xf('.//a[contains(@href, "berichte")]','f',td).getAttribute('href');
		var newImg = $e('IMG',[['src',img_view]]);
		if( /allianz/.test(crtPath) )
			$at(newImg,[['style','position:relative;float:'+docDir[0]+';'+docDir[0]+':-5px;']]);
		td.insertBefore(newImg, td.firstChild);
		newImg.addEventListener('click', function(x) { return function() { viewMessageIWDisplay(x[0],1,x[1]); }}([aLink,(i>12?offsetPosition(newImg):false)]), false);
	}
}

function parseDorf1 () {
	if( RB.Setup[14] == 0 ) return;

	function parseBuilds() {
		loadZVCookie('Dorf1','village_dorf1');
		var fl = false;
		var newCookie = [0];
		var t = 1;
		var s = 0;
		var fl2 = false;
		var move = $gc('buildingList');
		if( move.length < 1 ) fl2 = true;
		if( fl2 ) {
			if( RB.village_dorf1[0] != 0 ) fl = true;
		} else {
			var descr = $gt('li',move[0]);
			for( var i = 0; i < descr.length; i++ ) {
				newCookie[0]++;
				var td = $gt('div',descr[i]);
				newCookie[t++] = td[s].innerHTML.onlyText().replace(/\s+?/g,' ');
				if( td.length < 3 ) {
					newCookie[t++] = 0;
					newCookie[t++] = '';
				} else {
					var ts = td[s+1].innerHTML.match(/\d+:\d\d:\d\d/);
					newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(ts?ts[0]:"0:00:00");
					newCookie[t++] = td[s+1].innerHTML.onlyText().replace(/.+?\d\d\s\S+\s/,'').replace(/\s+?/g,' ');
				}
				if( RB.dictFL[14] == 0 ) {
					RB.dictionary[14] = newCookie[t-1].split(/\d/,1)[0];
					saveCookie( 'Dict', 'dictionary' );
					RB.dictFL[14] = 1;
					saveCookie( 'DictFL', 'dictFL' );
				}
			}
			fl = true;
		}
		if( fl ) saveVCookie('Dorf1',newCookie,1);
	}
	function parseAttack() {
		loadZVCookie('Dorf11','village_dorf11');
		var fl = RB.village_dorf11[0] == 0 ? false: true;
		var newCookie = [0];
		var t = 1;
		var move = $g('movements');
		if( ! move ) {
			saveVCookie('Dorf11',newCookie,1);
			return;
		}
		var descr = move.tBodies[0].rows;
		for( var i = 0; i < descr.length; i++ ) {
			var aimg = $gt('img',descr[i])[0];
			var atime = toSeconds(descr[i].innerHTML);
			if( aimg ) {
				newCookie[0]++;
				newCookie[t] = aimg.getAttribute('class');
				newCookie[t+2] = $gc('mov',descr[i])[0].innerHTML.onlyText().trim();
			}
			if( atime != 0 ) {
				newCookie[t+1] = Math.round(RunTime[0]/1000) + atime;
				t = t+3;
				fl = true;
			}
		}
		if( fl ) saveVCookie('Dorf11',newCookie,1);
	}
	function parseTroops() {
		loadZVCookie('Dorf12','village_dorf12');
		var newCookie = [0];
		var t = 1;
		var troops = $xf('.//tr[.//img]','r',$g("troops"));
		var fl = RB.village_dorf12[0] ==  troops.snapshotLength ? false : true;
		for( var i = 0; i < troops.snapshotLength; i++ ) {
			if( troops.snapshotItem(i).cells.length < 3 ) continue;
			newCookie[0]++;
			newCookie[t++] = troops.snapshotItem(i).getElementsByTagName('IMG')[0].getAttribute('class').match(/ u(.+)/)[1];
			newCookie[t++] = troops.snapshotItem(i).cells[1].innerHTML;
			if( ! fl ) {
				if( RB.village_dorf12[t-2] == undefined ) fl = true;
				if( RB.village_dorf12[t-2] != newCookie[t-2] ) fl = true;
				if( RB.village_dorf12[t-1] != newCookie[t-1] ) fl = true;
			}
		}
		if( fl ) saveVCookie('Dorf12',newCookie,1);
	}

	parseBuilds();
	if( /dorf1.php/.test(crtPath) ) {
		parseAttack();
		parseTroops();
	}
}

function showTooltipBuild ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c(tb[i*3+1]));
		newTR.appendChild($c(tb[i*3+3]));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}
function showTooltipDemolish ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c(tb[i*3+1]));
		newTR.appendChild($c(tb[i*3+3]));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}
function showTooltipInfo ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	var rf = new Array();
	for( var i = 0; i < tb[0]; i++ ) rf[i]=i;
	rf.sort(function(a,b){return tb[a*4+2]-tb[b*4+2];});
	lastTimerB = timerB.length;
	var t = lastTimerB;
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c(tb[rf[i]*4+3].replace(/"tinfo_c"/g,allIDs[47])));
		var htf = tb[rf[i]*4+2] - Math.round((Date.now())/1000);
		if( htf > 0 ) {
			timerB[t] = new Object();
			timerB[t].time = htf;
			timerB[t].obj = $c(formatTime(htf, 0));
			newTR.appendChild(timerB[t++].obj);
		} else newTR.appendChild($c('--:--'));
		newTR.appendChild($c(tb[rf[i]*4+4]));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}
function showTooltipAttack ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	lastTimerB = timerB.length;
	var t = lastTimerB;
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$c($e('IMG',[['src','img/x.gif'],['class',tb[i*3+1]]])));
		var lrt = /2|adv/.test(tb[i*3+1]) ? '&laquo;': '&raquo;';
		newTR.appendChild($c(lrt));
		newTR.appendChild($c(tb[i*3+3]));
		var htf = tb[i*3+2] - Math.round((Date.now())/1000);
		if( htf > 0 ) {
			timerB[t] = new Object();
			timerB[t].time = htf;
			timerB[t].obj = $c(formatTime(htf, 0));
			$am(newTR,[timerB[t++].obj,$c(formatTime(absTime(htf),4))]);
		} else $am(newTR,[$c('--:--'),$c('')]);
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}

function showDorf1 () {
	var vlist = $g('vlist');
	if( ! vlist ) return;
	var t = 0;
	villages = vlist.tBodies[0].rows;
	for( var i = 0; i < villages_id.length; i++ ) {
		loadZVCookie('Dorf1','village_dorf1',villages_id[i]);
		var newTD = $c('');
		if( RB.village_dorf1[0] > 0 ) {
			var dTime = RB.village_dorf1[2] - Math.round(RunTime[0]/1000);
			var color = dTime < 0 ? 'red': 'black';
			if( dTime < 0 ) dTime = 0;
			timerB3[t] = new Object();
			timerB3[t].time = dTime;
			timerB3[t].obj = $ee('SPAN',formatTime(dTime, 3),[['style','margin:0px 5px;color:'+color+';']]);
			var tb = RB.village_dorf1.slice();
			timerB3[t].obj.addEventListener("mouseover", function(x) { return function() { showTooltipBuild(x); }}(tb), false);
			timerB3[t].obj.addEventListener("mouseout", removeTooltip, false);
			newTD.appendChild(timerB3[t++].obj);
		} else newTD.appendChild($ee('SPAN','--:--',[['style','margin:0px 5px;']]));

		loadZVCookie('Dorf13','village_dorf13',villages_id[i]);
		if( RB.village_dorf13[0] > 0 ) {
			var dTime = RB.village_dorf13[2] - Math.round(RunTime[0]/1000);
			var color = dTime < 0 ? 'red': 'black';
			if( dTime < 0 ) dTime = 0;
			timerB3[t] = new Object();
			timerB3[t].time = dTime;
			timerB3[t].obj = $ee('SPAN',formatTime(dTime, 3));
			var tb = RB.village_dorf13.slice();
			timerB3[t].obj.addEventListener("mouseover", function(x) { return function() { showTooltipBuild(x); }}(tb), false);
			timerB3[t].obj.addEventListener("mouseout", removeTooltip, false);
			var newdid = linkVSwitch[i].match(/newdid=\d+/i)[0];
			newTD.appendChild($em('A',['[',timerB3[t++].obj,']'],[['href',fullName + 'build.php?'+newdid+'&gid=15'],['style','margin:0px 10px 0px -5px;color:'+color+';font-weight:normal;']]));
		}

		loadZVCookie('Dorf14','village_dorf14',villages_id[i]);
		if( RB.village_dorf14[0] > 0 ) {
			var now = Math.round(RunTime[0]/1000);
			var newCookie = [0];
			var fl = false;
			for( var j=0; j<RB.village_dorf14[0]; j++ ) {
				if( RB.village_dorf14[j*4+2] > now ) {
					newCookie[0]++;
					newCookie.push(RB.village_dorf14[j*4+1],RB.village_dorf14[j*4+2],RB.village_dorf14[j*4+3],RB.village_dorf14[j*4+4]);
				} else fl = true;
			}
			if( fl ) {
				var aid_t = village_aid;
				village_aid = villages_id[i];
				saveVCookie('Dorf14',newCookie,1);
				village_aid = aid_t;
			}
			if( newCookie[0] > 0 ) {
				var newI = trImg(allIDs[47]);
				newI.addEventListener("mouseover", function(x) { return function() { showTooltipInfo(x); }}(newCookie), false);
				newI.addEventListener("mouseout", removeTooltip, false);
				newTD.appendChild(newI);
			}
		}

		loadZVCookie('Dorf11','village_dorf11',villages_id[i]);
		if( RB.village_dorf11[0] > 0 ) {
			var newdid = linkVSwitch[i].match(/newdid=\d+/i)[0];
			var newAI = $a('',[['href',fullName + 'build.php?'+newdid+'&gid=16&id=39'],['style','font-weight:400;color:black;']]);
			var tb = RB.village_dorf11.slice();
			for( var j = 0; j < tb[0]; j++ ) {
				newAI.appendChild($e('IMG',[['src','img/x.gif'],['class',tb[j*3+1]]]));
				if(RB.Setup[14] > 1) {
					var htf = tb[j*3+2] - Math.round((Date.now())/1000);
					if( htf > 0 ) {
						timerB3[t] = new Object();
						timerB3[t].time = htf;
						timerB3[t].obj = $ee('SPAN',formatTime(htf, 3));
						newAI.appendChild(timerB3[t++].obj);
					}
				}
			}
			newAI.addEventListener("mouseover", function(x) { return function() { showTooltipAttack(x); }}(tb), false);
			newAI.addEventListener("mouseout", removeTooltip, false);
			newTD.appendChild(newAI);
		}
		villages[i].appendChild(newTD);
	}
	var awake = $e('DIV',[['id',allIDs[28]]]);
	awake.addEventListener("click", editAWake, false);
	vlist.tHead.rows[0].appendChild($c(awake));
	aClockTimer = t;
	showAWake();
}

function editAWake () {
	var aClock = parseInt(RB_getValue(GMcookieID + 'AC','0'));
	var acc = aClock - Math.round((Date.now())/1000) + getServerTime();
	var ac = acc < 0 ? formatTime(0,0) : formatTime(acc,0);
	var newClock = prompt(gtext("aclock"), ac);
	if( newClock == null ) return;
	var dg = newClock.match(/\d+/g);
	if( ! (dg) ) {
		aClock = 0;
	} else if( dg.length < 1 || dg.length > 3 ) {
		aClock = 0;
	} else {
		if( dg.length == 1 ) {
			aClock = Math.round((Date.now())/1000)+parseInt(dg[0])*60;
		} else {
			var nA = dg.length == 3 ? [dg[0],dg[1],dg[2]]: [dg[0],dg[1],0];
			var tt = toSeconds(nA[0]+':'+nA[1]+':'+nA[2]);
			var st = getServerTime();
			aClock = tt > st ? tt-st: 86400+tt-st;
			aClock += Math.round((Date.now())/1000);
		}
	}
	RB_setValue(GMcookieID + 'AC', aClock);
	showAWake();
}
function showAWake () {
	var awD = $g(allIDs[28]);
	if( ! (awD) ) return;
	var aClock = parseInt(RB_getValue(GMcookieID + 'AC','0'));
	awD.innerHTML = '';
	if( aClock > 0 ) {
		var dTime = aClock - Math.round((Date.now())/1000);
		var color = dTime < 0 ? 'red': 'black';
		if( dTime < 0 ) dTime = 0;
		timerB3[aClockTimer] = new Object();
		timerB3[aClockTimer].time = dTime;
		timerB3[aClockTimer].obj = $eT('SPAN',dTime, 3,[['style','margin:0px 10px;color:'+color+';']]);
		awD.appendChild(timerB3[aClockTimer].obj);
	} else awD.appendChild($ee('SPAN','--:--',[['title','click me']]));
}

function addSpeedAndRTSend ( iBl ) {
	if( /(&|\?)t=1(&|$)/.test(crtPath) ) return;
	var mLinks = $xf('.//a[contains(@href, "karte.php?")]', 'r', (typeof iBl == 'undefined' ? cont: iBl));
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var existT = $gc(allIDs[29],mLinks.snapshotItem(j));
		if( existT.length > 0 ) continue; else mLinks.snapshotItem(j).appendChild($e('SPAN',[['class',allIDs[29]]]));
		linkHint(mLinks.snapshotItem(j));
		distanceTooltip(mLinks.snapshotItem(j),1);
		sendResTropAdd(mLinks.snapshotItem(j), 1);
	}
}

function bigQuickLinks () {
	var bigIcon = [ // [type (true-id, false-ref), value, additional, img_ID, Dict, Dict additionnal, Background]
		[false, 'build.php?id=39', '', 0, 6, 0, 0], // RP
		[true, 3, '', 3, 10, 0, 1], // Workshop
		[true, 0, '', 4, 7, 0, 1], // Market
		[false, 'allianz.php', '', 6, 1, 0, 2], // Ally
		[true, 1, '', 1, 8, 0, 3], // Barrack
		[true, 2, '', 2, 9, 0, 4], // Stable
		[true, 0, '&t=1', 5, 7, 11, 4], // Market in
		[false, 'allianz.php?s=3', '', 7, 1, 12, 5], // Ally attack
		[true, 5, '', 1, 24, 0, 3], // Great Barrack
		[true, 6, '', 2, 25, 0, 4], // Great Stable
	];
	//icons 0-RP, 1-workshop, 2-market, 3-ally, 4-barrack, 5-stable, 6-market_in, 7-ally_attack, 8-great_barracks, 9-great_stable
	//dorf2 0-market, 1-barracks, 2-stable, 3-workshop, 4-Tournament Square, 5-Great Barracks, 6-Great Stable
	var t = 0;
	var tt = [];
	for( var i = 0; i < 2; i++) {
		for( var j = 0; j < 5; j++ ) {
			tt[t] = bigIcon[t][4] > 0 ? RB.dictionary[bigIcon[t][4]] : '';
			if( bigIcon[t][5] > 0 ) tt[t] += ', ' + RB.dictionary[bigIcon[t][5]];
			t++;
		}
	}

	function CreateBigLinkButton (strBuilding, iNo) {
		var BigLinkButton = $e('button', [['type','button'],['title',tt[iNo]],['class','layoutButton ' + strBuilding + ' green ' + (RB.village_Dorf2[bigIcon[iNo][1]] != 0 ? '' : 'disabled')],['style','position:relative']]);
		var BigLinkDiv = $e('div',[['class','button-container addHoverClick ']]);
		BigLinkDiv.addEventListener('mouseover', function() {this.className = this.className + 'hover'}, false);
		BigLinkDiv.addEventListener('mouseout', function() {this.className = 'button-container addHoverClick '}, false);
		//if (iNo!=0 && iNo!=8 && iNo!=9 && RB.village_Dorf2[bigIcon[iNo][1]] != 0) {
		//	BigLinkButton.setAttribute('onmouseenter', "Travian.Game.Layout.loadLayoutButtonTitle(this, 'activeVillage', '"+strBuilding+"'); this.removeAttribute('onmouseenter')");
		//}

		if( bigIcon[iNo][0] ) {
			if( RB.village_Dorf2[bigIcon[iNo][1]] != 0 ) {
				BigLinkButton.addEventListener("click", function(e) { window.location.href="build.php?id="+RB.village_Dorf2[bigIcon[iNo][1]]+bigIcon[iNo][2]; }, false);
			}
		} else {
			BigLinkButton.addEventListener("click", function(e) { window.location.href=bigIcon[iNo][1]; }, false);
		}

		if (iNo == 8 || iNo == 9) { //insert plus image only if great barracks or great stable exist
			BigLinkButton.appendChild($e('img', [['class','productionBoost'],['src','img/x.gif'],['style','position:absolute;'+docDir[0]+':4px;top:4px;z-index:1000']]));
		}

		BigLinkDiv.appendChild($e('img',[['src','img/x.gif'],['alt','']]));
		BigLinkButton.appendChild(BigLinkDiv);
		return BigLinkButton;
	}

	var sidebarBoxActiveVillage = $g('sidebarBoxActiveVillage');
	var bigIconsHeader = $gc('header', sidebarBoxActiveVillage)[0];
	var bigIconsFooter = $gc('footer', sidebarBoxActiveVillage)[0];
	var childrenB = $gt('button',bigIconsHeader);

	if (childrenB[0].className.search('green') == -1 ) { //Plus account active
		for( var j = 0; j < childrenB.length; j++ ) {
			childrenB[j].style.display = "none";
		}
		if( RB.Setup[16] != 0 ) { bigIconsHeader.insertBefore(CreateBigLinkButton('overviewWhite',0), bigIconsHeader.firstChild); }
		bigIconsHeader.insertBefore(CreateBigLinkButton('marketWhite',2), bigIconsHeader.firstChild);
		bigIconsHeader.insertBefore(CreateBigLinkButton('barracksWhite',4), bigIconsHeader.firstChild);
		bigIconsHeader.insertBefore(CreateBigLinkButton('stableWhite',5), bigIconsHeader.firstChild);
		bigIconsHeader.insertBefore(CreateBigLinkButton('workshopWhite',1), bigIconsHeader.firstChild);
	} else {
		plusAccount = true;
		try { if( RB.Setup[16] != 0 ) { bigIconsHeader.insertBefore(CreateBigLinkButton('overviewWhite',0), $gc('clear',bigIconsHeader)[0]) } } catch(e) {}
	}

	bigIconsFooter.appendChild($e('button',[['type','button'],['class','layoutButton disabled'],['style','position:relative;box-shadow:none;background-image:none;border:0;width:49px;']]));
	//Insert great barracks and great stable icons, only if they exist
	if (!isNaN(RB.village_Dorf2[bigIcon[8][1]]) && (RB.village_Dorf2[bigIcon[9][1]] != 0)) { //the isNaN check can be removed later, bug from loadVCookie, loads 1 value more
		bigIconsFooter.appendChild(CreateBigLinkButton('stableWhite',9));
	} else { //append placeholder
		bigIconsFooter.appendChild($e('button',[['type','button'],['class','layoutButton disabled'],['style','position:relative;box-shadow:none;background-image:none;border:0;']]));
	}
	if (!isNaN(RB.village_Dorf2[bigIcon[8][1]]) && (RB.village_Dorf2[bigIcon[8][1]] != 0)) {
		bigIconsFooter.appendChild(CreateBigLinkButton('barracksWhite',8));
	}  else { //append placeholder
		bigIconsFooter.appendChild($e('button',[['type','button'],['class','layoutButton disabled'],['style','position:relative;box-shadow:none;background-image:none;border:0;']]));
	}
}

function karteDistance () {
	var contXY = offsetPosition( cont );
	contRight = ltr ? contXY[0] + cont.clientWidth : contXY[0];
	contTop = contXY[1];
	karteDistance4();
}

var tileDFL = true;
var activeTip = '';
function karteDistance4 () {
	var tipE = $g(windowID[2]);
	if( tipE ) tipE.parentNode.removeChild(tipE);
	var vilView = $g('tileDetails');
	if( vilView ) {
		if( tileDFL ) {
			addRefIGM('tileDetails');
			troopsOasis( vilView );
			viewMessageIWK( vilView );
			linkOnT4Karte( vilView );
		}
		tileDFL = false;
	} else {
		tileDFL = true;
		var tipE = $gc('tip-contents');
		var ttD = $g(allIDs[3]);
		if( tipE.length > 0 && ! ttD ) {
			var tipC = getVidFromCoords($gc('text elementText',tipE[0])[0].innerHTML);
			if( tipC > 0 ) {
				var newTip = getVTip(tipC);
				if( newTip != activeTip ) {
					activeTip = newTip;
					if( newTip != '' ) {
						var titleElem = $gc('title elementTitle',tipE[0])[0];
						titleElem.appendChild($ee('span',newTip,[['style','color:#77FF77;margin:0px 10px;']]));
					}
				}
				var dTTK = showAllTTime(0, tipC, RB.village_Var[1]);
				$at(dTTK, [['style','background-color:#fef7e7;']]);
				windowID[2] = makeFloat( dTTK, (ltr?contRight+5:contRight-200), contTop);
			}
		}
	}
	setTimeout(karteDistance4, 1000);
}

function linkOnT4Karte ( vV ) {
	var vilView = vV || cont;
	var h1 = $gt('H1',vilView)[0];
	if( h1 ) {
		var spanLast = $gt('SPAN',h1);
		if( spanLast.length == 0 ) return;
		spanLast = spanLast[spanLast.length-1];
		if( RB.Setup[12]>0 ) {
			var xy = getVidFromCoords(h1.innerHTML);
			if( typeof flinks[xy] == 'undefined' ) {
				var al = $a('(+)',[['href',jsVoid],['title',gtext('addcur')],['style','margin:0px 10px;']]);
				al.addEventListener("click", addlinkT4, true);
			} else var al = $ee('SPAN',flinks[xy],[['style','color:#00CB00;margin:0px 10px;']]);
			h1.appendChild(al);
		}
		if( /position_details/.test(crtPath) ) return;
		var ln = $gt('A',$gc('detailImage',vilView)[0]);
		if( ln.length > 0 ) {
			var xy = id2xy(getVid(ln[0].getAttribute('href')));
			var nLink = $a('->',[['href','position_details.php?x='+xy[0]+'&y='+xy[1]],['style','margin:0px 5px;']]);
			h1.appendChild(nLink);
		}
	}
}

function rbNotes () {
	if( closeWindowN(3) ) return;

	function saveNotes () {
		RB_setValue(GMcookieID + 'notes',textNB.value);
		alert( 'saved' );
	}

	var nSize = [[40,15],[55,20],[70,30],[60,45],[40,8],[30,34]];
	var nText = RB_getValue(GMcookieID + 'notes','');
	var newNB = $e('TABLE');
	var textNB = $ee('TEXTAREA',nText,[['cols',nSize[RB.Setup[35]][0]],['rows',nSize[RB.Setup[35]][1]],['style', 'background-image: url('+img_underline+');background-repeat: repeat;']])
	newNB.appendChild($ee('TR',$c(textNB)));
	var saveB = $e('IMG',[['src',img_save]]);
	saveB.addEventListener('click', saveNotes, false);
	newNB.appendChild($ee('TR',$c(saveB,[['style','text-align: center']])));
	windowID[3] = makeFloatD( newNB, 5 );
}

function addRefIGM ( idBlock ) {
	if( RB.Setup[18] == 0 && RB.Setup[19] == 0 ) return;
	var idB = idBlock || pageElem[1];
	var mLinks = $xf('.//a[contains(@href, "spieler.php?uid=")]', 'l', $g(idB));
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var al = mLinks.snapshotItem(j);
		var uid = al.getAttribute('href').match(/uid=(\d+)/);
		if( uid ) uid = uid[1]; else continue;
		if( uid != userID && uid != 1 ) {
			al.style.display = 'inline';
			if( RB.Setup[19] > 0 ) al.parentNode.insertBefore($ee('A',trImg(allIDs[37]),[['href',userActivityServers( RB.Setup[19], uid, true )[1]],['target','_blank']]),  al.nextSibling);
			if( RB.Setup[18] > 0 ) al.parentNode.insertBefore($ee('A',trImg(allIDs[36]),[['href','messages.php?t=1&id='+uid]]),  al.nextSibling);
		}
	}
	if( RB.Setup[19] > 0 ) {
		var mLinks = $xf('.//a[contains(@href, "allianz.php?aid=")]', 'r', $g(idB));
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			var al = mLinks.snapshotItem(j);
			var uid = al.getAttribute('href').match(/aid=(\d+)/);
			if( uid ) uid = uid[1]; else continue;
			if (al.getAttribute('class')) if (al.getAttribute('class').indexOf("tabItem") > -1) continue;
			if( uid > 0 ) {
				al.parentNode.insertBefore($ee('A',trImg(allIDs[37]),[['href',userActivityServers( RB.Setup[19], uid, false )[1]],['target','_blank']]),  al.nextSibling);
			}
		}
	}
}

function parseAlly () {
	if( RB.dictFL[12] == 0 ) {
		var tm = $xf('.//a[@href="allianz.php?s=3"]','f',cont);
		if( tm ) {
			RB.dictionary[12] = tm.innerHTML.onlyText().trim();
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[12] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
}

function addSpeedRTSendMessageInLLinks() {
	var llinks = $g('llist');
	if( ! llinks ) return;
	if( RB.Setup[15] == 1 ) {
		var mLinks = $xf('tbody//a[contains(@href, "karte.php?")]', 'r', llinks);
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			distanceTooltip(mLinks.snapshotItem(j),1);
			sendResTropAdd(mLinks.snapshotItem(j), 1);
		}
	}
	if( RB.Setup[15] == 1 ) {
		var mLinks = $xf('tbody//a[contains(@href, "spieler.php?uid=")]', 'r', llinks);
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			var al = mLinks.snapshotItem(j);
			var uid = al.getAttribute('href').match(/uid=(\d+)/)[1];
			al.appendChild($ee('A',trImg(allIDs[36]),[['href','messages.php?t=1&id='+uid]]));
		}
	}
}

function villageHintEdit () {
	function editVHint () {
		newVHint = prompt(gtext("name2"), vName);
		if( newVHint == null ) return;
		if( newVHint.length > 20 ) newVHint = newVHint.substr(0,20);
		if( RB.vHint[village_aid] != newVHint ) {
			RB.vHint[village_aid] = newVHint;
			saveOVCookie('vHint', RB.vHint);
			vName = newVHint;
			vNFC.innerHTML = vName;
		}
	}

	var vNF = $g('villageNameField');
	vNF.style.display = 'inline-block';
	vNF.style.overflow = 'initial';
	var vName = RB.vHint[village_aid] || '';
	var vNFC = $ee('SPAN',vName,[['style','color:'+vHColor+';font-size:10px;']]);
	var vNFA = $ee('SPAN',vNFC,[['style','white-space:normal']]);
	var vNFe = trImg(allIDs[38],gtext('name2'));
	vNFe.addEventListener('click', editVHint, false);
	vNFA.appendChild(vNFe);
	vNF.parentNode.appendChild(vNFA);
}

function villageHintDorf3 () {
	var newdidVH = [];
	for( i = 0; i < villages_id.length; i++ )
		newdidVH[linkVSwitch[i].match(/newdid=(\d+)/i)[1]] = villages_id[i];
	var mLinks = $xf('.//a[contains(@href, "newdid=")]', 'r', cont);
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var mLID = mLinks.snapshotItem(j).getAttribute('href').match(/newdid=(\d+)/)[1];
		linkHint( mLinks.snapshotItem(j), newdidVH[mLID] );
	}
}

function linkHint ( aLink, vID ) {
	try {
		var avID = vID || getVid(aLink.getAttribute('href'));
		if( isNaN(avID) ) return;
	} catch(e) { return; }
	if( RB.vHint[avID] != undefined ) {
		aLink.appendChild($ee('SPAN',' '+RB.vHint[avID],[['style','color:'+vHColor+';']]));
	} else {
		var ht = getVTip(avID);
		if( ht != '' ) {
			var ltext = aLink.innerHTML.onlyText().length;
			if( ltext < 20 )
				aLink.appendChild($ee('SPAN',' '+ht.substr(0,20-ltext),[['style','color:'+vHColor+';']]));
		}
	}
}

function setLC () {
	if( RB.Setup[1] > 0 ) return langs[RB.Setup[1]].match(/\((\w+)\)/)[1];
	lang = navigator.language;
	if( /^ar/i.test(lang) ) return 'ar';
	else if( /^bs/i.test(lang) || crtLang == 'ba' ) return 'bs';
	else if( /^bg/i.test(lang) ) return 'bg';
	else if( /^de/i.test(lang) ) return 'de';
	else if( /^fa/i.test(lang) ) return 'fa';
	else if( /^fr/i.test(lang) ) return 'fr';
	else if( /^hr/i.test(lang) || crtLang == 'hr' ) return 'hr';
	else if( /^hu/i.test(lang) ) return 'hu';
	else if( /^it/i.test(lang) ) return 'it';
	else if( /^pl/i.test(lang) ) return 'pl';
	else if( /^pt/i.test(lang) ) return 'pt';
	else if( /^ua/i.test(lang) || crtLang == 'ua' ) return 'ua';
	else if( /^ro/i.test(lang) ) return 'ro';
	else if( /^ru/i.test(lang) ) return 'ru';
	else if( /^sr/i.test(lang) ) return 'sr';
	else if( /^sv/i.test(lang) ) return 'sv';
	else if( /^tr/i.test(lang) ) return 'tr';
	else if( /^zh/i.test(lang) ) return 'zh';
	else if( /^vi/i.test(lang) ) return 'vi';
	else if( /^el/i.test(lang) || crtLang == 'gr' ) return 'el';
	else if( /^nl/i.test(lang) ) return 'nl';
	else return 'en';
}

function demolishSave () {
	var dem = $g('build');
	if( ! dem ) return;
	if( dem.getAttribute('class').indexOf('gid15') == -1 ) return;

	loadZVCookie('Dorf13','village_dorf13');
	var fl = false;
	var newCookie = [0];
	var t = 1;

	var dem = $g('demolish');
	if( ! dem ) {
		if( RB.village_dorf13[0] != 0 ) fl = true;
	} else {
		if( dem.tagName == 'TABLE' ) {
			var descr = dem.rows;
			for( var i = 0; i < descr.length; i++ ) {
				newCookie[0]++;
				var td = descr[i].cells;
				newCookie[t++] = td[1].innerHTML.onlyText().trim();
				if( td.length < 4 ) {
					newCookie[t++] = 0;
					newCookie[t++] = '';
				} else {
					newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(td[2].innerHTML);
					newCookie[t++] = td[3].innerHTML.onlyText().trim();
				}
			}
		}
		fl = true;
	}
	if( fl ) saveVCookie('Dorf13',newCookie,1);
}

function calcAllTroops() {
	if( RB.Setup[10] == 0 ) return;
	var sumT = [0,0,0,0,0,0,0,0,0,0,0];
	var sumC = 0;
	var oFL = true;
	var uFL = true;
	var townTables = $xf('.//table[.//td[@class="role"]/a[contains(@href,"'+village_aid+'")]]','l',cont);
	if( townTables.snapshotLength == 0 ) return;
	var ownTable = false;
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
		var ttable = townTables.snapshotItem(i);
		uFL = (new RegExp("uid="+userID)).test(ttable.rows[0].cells[1].innerHTML);
		if( oFL || ! uFL ) for( var t=0; t<10; t++ ) {
			var tC = parseInt(ttable.rows[2].cells[t+1].innerHTML);
			if( isFinite(tC) ) { sumT[t] += tC; sumC += troopInfo( parseInt(RB.Setup[2])*10+t+1, 9) * tC; }
		}
		if( oFL && uFL ) {
			ownTable = ttable;
			if( ttable.rows[2].cells.length > 11 ) {
				var tC = parseInt(ttable.rows[2].cells[t+1].innerHTML);
				if( isFinite(tC) ) {
					sumT[10] += tC; sumC += tC*6;
				}
			}
			oFL = false;
		}
	}
	if( ownTable ) {
		var sumRow = ownTable.rows[2].cloneNode(true);
		for( var t=sumRow.cells.length-1; t>0; t-- ) {
			sumRow.cells[t].innerHTML = sumT[t-1];
			if( sumT[t-1] > 0 ) sumRow.cells[t].removeAttribute('class');
		}
		sumRow.cells[0].innerHTML = gtext('total');
		var existT = $gc(allIDs[20],ownTable);
		if( existT.length > 0 ) ownTable.removeChild(existT[0]);
		ownTable.appendChild($ee('TBODY',sumRow,[['class',allIDs[20]]]));
		var cropC = $gc('r4',ownTable);
		if( cropC.length > 0 ) {
			i = $g(allIDs[29]);
			if( i ) i.parentNode.removeChild(i);
			cropC[0].parentNode.appendChild($ee('SPAN',' ('+ sumC +') ',[['id',allIDs[29]]]));
		}
	}
}

function scanTroopsData () {
	function scanTropsDataR ( hn ) {
		ajaxRequest(fullName +'manual.php?typ=1&s='+ hn, 'GET', null, function(ajaxResp) {
			var j = (hn-1-(hn>50?20:0))*10;
			var allTD = [];
			var helpText = ajaxResp.responseText;
			var ad = ajaxNDIV(ajaxResp);
			var allTD = $gt('td',ad);
			var t = 0; var tt = 0;
			var fl = false;
			var tmp = new Array(10);
			for(var i=0; i<allTD.length; i++) {
				var n = allTD[i].innerHTML.onlyText().match(/\d+/);
				if( n ) {
					if( parseRules[t++] ) tmp[tt++] = parseInt(n[0]);
				} else {
					fl = true; // new travian help
				}
			}
			for( var t=0; t<10; t++ ) {
				if( fl ) RB.tropsI[j++] = tmp[parseCont[t]];
					else RB.tropsI[j++] = tmp[t];
			}
			RB.dictTR[hn-(hn>50?20:0)] = helpText.match(/alt="(.+?)"/)[1];
			RB.trFL[hn-(hn>50?20:0)] = 1;
			saveCookie('trFL','trFL');
			saveCookie('tropsI','tropsI');
			saveCookie('DictTR','dictTR');
			if( RB.dictFL[18] == "0" ) {
				RB.dictionary[20] = helpText.match(/class="r5".+?alt="(.+?)"/)[1];
				saveCookie( 'Dict', 'dictionary' );
				RB.dictFL[18] = 1;
				saveCookie( 'DictFL', 'dictFL' );
			}
		}, dummy);
	}
//						0    1    2    3   4    5     6    7   8    9    10
	var parseRules = [true,true,true,true,true,true,true,true,true,true,false];
	var parseCont = [4,5,6,0,1,2,3,7,8,9];
	for( var i=0; i<((RB.Setup[47]==1)?51:31); i++ ) RB.trFL[i] = 0;
	if( RB.dictFL[13] == 1 ) {
		loadCookie('trFL','trFL');
		loadCookie( 'tropsI', 'tropsI' );
	} else {
		RB.trFL[0] = 1;
		RB.dictFL[13] = 1;
		saveCookie('DictFL','dictFL');
	}
	if( RB.Setup[20] == 2 ) {
		RB.dictFL[13] = 0;
		saveCookie('DictFL','dictFL');
		RB.Setup[20] = 1;
		saveCookie('RBSetup','Setup');
	}
	var curTO = 0;
	for( var i = 1; i < 31; i++ ) {
		if( RB.trFL[i] == 1 ) continue;
		curTO += getRandom(500,1000);
		setTimeout(function(x) { return function() { scanTropsDataR(x); }}(i), curTO);
	}
	if (RB.Setup[47]==1) {
		for( var i = 51; i < 71; i++ ) {
			if( RB.trFL[i-20] == 1 ) continue;
			curTO += getRandom(500,1000);
			setTimeout(function(x) { return function() { scanTropsDataR(x); }}(i), curTO);
		}
	}
	if( curTO == 0 ) {
		RB.dictFL[13] = 2;
		saveCookie( 'DictFL', 'dictFL' );
	}
}

function troopInfo( tt, val ) {
	if (tt>50) {
		tt = tt-20
	} else if (tt>30) {
		tt = tt+20
	}
	if( RB.dictFL[13] < 2 ) return 0;
	if( triFL ) {
		loadCookie( 'tropsI', 'tropsI' );
//						   1 2 3  4  5  6  7 8  9 10
		var parseRules2 = [-1,1,2,-1,-1,-1,-1,4,-1,3];
		var nature = [ //http://t4.answers.travian.com/index.php?aid=109
		[10,25,20,1,20],
		[20,35,40,1,20],
		[60,40,60,1,20],
		[80,66,50,1,20],
		[50,70,33,2,20],
		[100,80,70,2,20],
		[250,140,200,3,20],
		[450,380,240,3,20],
		[200,170,250,3,20],
		[600,440,520,5,20],
		[20,35,50,1,6], // natarian
		[65,30,10,1,7],
		[100,90,75,1],
		[0,10,0,1,25],
		[155,80,50,2,14],
		[170,140,80,3],
		[250,120,150,6,5],
		[60,45,10,5,3],
		[80,50,50,1,5],
		[30,40,40,1,5]];
		var j=RB.tropsI.length;
		for( var i=0; i<20; i++ )
			for( var t=0; t<10; t++ )
				RB.tropsI[j++] = parseRules2[t]<0? 0: nature[i][parseRules2[t]];
		triFL = false;
	}
	return parseInt(RB.tropsI[(tt-1)*10+val]);
}

function gti( p1, p2, p3 ) {
	return (troopInfo(parseInt(p1),p2)*p3).NaN0();
}
function troopsDorf1 () {
	if( RB.Setup[20] == 0 ) return;
	var tinfoT = $g('troops');
	if( ! tinfoT ) return;
	tiImg = trImg(allIDs[47]);
	tiImg.addEventListener("mouseover", showTroopsITT, false);
	tiImg.addEventListener("mouseout", removeTooltip, false);
	tinfoT.rows[0].cells[0].appendChild(tiImg);
}
function showTroopsITT () {
	var ITTb = $e('TBODY');
	var newITT = $ee('TABLE',ITTb,[['class',allIDs[7]]]);
	loadZVCookie('Dorf12','village_dorf12');
	var tt = 0;
	var tc = 0;
	var ti = [0,0,0,0,0];
	var ts = [0,0,0,0,0];
	for( var i = 0; i < RB.village_dorf12[0]; i++ ) {
		tn = RB.village_dorf12[i*2+1];
		tt = parseInt(tn);
		tc = parseInt(RB.village_dorf12[i*2+2]);
		var atfl = ( (tt%10) < 7 && troopInfo( tt, 9 ) > 1 ) ? false: true;
		ti = [atfl?gti(tt,0,tc):0, atfl?0:gti(tt,0,tc), gti(tt,1,tc), gti(tt,2,tc), gti(tt,9,tc)];
		if( tt > 30 && tt < 51) ti[0]=0;
		ts = [atfl?ts[0]+ti[0]:ts[0], atfl?ts[1]:ts[1]+ti[1], ts[2]+ti[2], ts[3]+ti[3], ts[4]+ti[4]];
		ITTb.appendChild($em('TR',[$c(trImg('unit u'+tn)),$c(humanRF(ti[0])),$c(humanRF(ti[1])),$c(humanRF(ti[2])),$c(humanRF(ti[3])),$c(humanRF(ti[4]))]));
	}
	var tHead = $ee('THEAD',$em('TR',[$c('&#931;'),$c(humanRF(ts[0])),$c(humanRF(ts[1])),$c(humanRF(ts[2])),$c(humanRF(ts[3])),$c(humanRF(ts[4]))]));
	tHead.appendChild($em('TR',[$c(''),$em('TD',[trImg('att_all'),trImg('unit u13')]),$em('TD',[trImg('att_all'),trImg('unit u16')]),$c(trImg('def_i')),$c(trImg('def_c')),$c(trImg('r5'))]));
	newITT.appendChild(tHead);
	makeTooltip(newITT);
}

function getTroopsInOasis ( vf ) {
	var troopsTR = $xf('.//tr[td/img[contains(@class, "unit u")]]','l',vf );
	if( troopsTR.snapshotLength < 1 ) return false;
	var ITTb = $e('TBODY');
	var newITT = $ee('TABLE',ITTb,[['class',allIDs[7]]]);
	var ti = [0,0,0,0];
	var ts = [0,0,0,0];
	for( var i=0; i<troopsTR.snapshotLength; i++ ) {
		tt = parseInt($gt('IMG',troopsTR.snapshotItem(i))[0].getAttribute('class').match(/\d+/)[0]);
		tc = toNumber(troopsTR.snapshotItem(i).cells[1].innerHTML);
		ti = [gti(tt,1,tc), gti(tt,2,tc), tc, gti(tt,9,tc)];
		ts = [ts[0]+ti[0], ts[1]+ti[1], ts[2]+ti[2], ts[3]+ti[3]];
		ITTb.appendChild($em('TR',[$c(trImg('unit u'+tt)),$c(humanRF(ti[0])),$c(humanRF(ti[1])),$c(humanRF(ti[2])),$c(humanRF(ti[3]))]));
	}
	var tHead = $ee('THEAD',$em('TR',[$c('&#931;'),$c(humanRF(ts[0])),$c(humanRF(ts[1])),$c(humanRF(ts[2])),$c(humanRF(ts[3]))]));
	tHead.appendChild($em('TR',[$c(''),$c(trImg('def_i')),$c(trImg('def_c')),$c(trImg('itemCategory itemCategory_cage')),$c(trImg('r5'))]));
	newITT.appendChild(tHead);
	return newITT;
}
function troopsOasis ( vfS ) {
	if( RB.Setup[20] == 0 ) return;
	var vf = vfS || cont;
	var newITT = getTroopsInOasis(vf);
	var i = $gt('H4',vf);
	if(i && newITT) {
		addToolTip(newITT,i[1]);
		i[1].appendChild(oasisKirilloid(vf));
	}
}

function a2bInfo () {
	var ts = [0,0,0,0,0,0];
	var inputs = $gt('INPUT',cont);
	for( var i=0; i<inputs.length; i++ ) {
		if( /t\d+/.test(inputs[i].getAttribute('name')) ) {
			var rtt = parseInt(inputs[i].getAttribute('name').match(/\d+/)[0]);
			if( rtt == 11 ) continue;
			var tt = rtt+(parseInt(RB.Setup[2])*10);
			var tc = parseInt(inputs[i].value);
			if( isNaN(tc) ) continue;
			var atfl = ( rtt < 7 && troopInfo( tt, 9 ) > 1 ) ? false: true;
			ts = [atfl?ts[0]+gti(tt,0,tc):ts[0], atfl?ts[1]:ts[1]+gti(tt,0,tc), ts[2]+gti(tt,1,tc), ts[3]+gti(tt,2,tc), ts[4]+gti(tt,8,tc), ts[5]+gti(tt,9,tc)];
		}
	}
	var rP = $g(allIDs[21]);
	if( rP ) rP.parentNode.removeChild(rP);
	rP = $e('P',[['id',allIDs[21]],['style','max-width:50%;']]);
	rT = $e('TABLE',[['class',allIDs[7]]]);
	rT.appendChild($em('TR',[$c(''),$c(trImg('unit u13')),$c(trImg('unit u16'))]));
	rT.appendChild($em('TR',[$c(trImg('att_all')),$c(humanRF(ts[0])),$c(humanRF(ts[1]))]));
	rT.appendChild($em('TR',[$c(trImg('def1')),$c(humanRF(ts[2])),$c(humanRF(ts[3]))]));
	rT.appendChild($ee('TR',$c('',[['colspan','3']])));
	rT.appendChild($em('TR',[$c(trImg('r5')),$c(humanRF(ts[5]),[['colspan','2']])]));
	rT.appendChild($em('TR',[$c(trImg(allIDs[33])),$c(humanRF(ts[4]),[['colspan','2']])]));
	rP.appendChild(rT);
	if( $g('btn_ok') ) $g('btn_ok').parentNode.appendChild(rP);
	else if( $g('raidListSlot') ) insertAfter(rP, $g('raidListSlot'));
}

function detectTribe () {
	var tribeImg = $xf('.//img[contains(@class,"nation")]','f',$g('sidebarBoxHero'));
	if( ! tribeImg ) {
		RB.Setup[2] = 0; //set the Romans tribe the default, if failed
		return;
	}
	RB.Setup[2] = parseInt(tribeImg.getAttribute('class').match(/\d+/)[0])-1;
	saveCookie( 'RBSetup', 'Setup' );
}

function detectServerType () {
	var aText = $xf('//script[contains(text(),"T4_feature_flags")]');
	if( aText ) {
		if ( /T4_feature_flags\s*=\s*(.*)};/.test(aText.textContent) ) {
			var T4_feature_flags = JSON.parse(aText.textContent.match( /T4_feature_flags\s*=\s*(.*});/)[1]);
			if (T4_feature_flags.territory == true) {
				RB.Setup[46] = 1;
				saveCookie( 'RBSetup', 'Setup' );
			} else {
				RB.Setup[46] = 2;
				saveCookie( 'RBSetup', 'Setup' );
			}
		}
	}
}

function detectEgyptiansAndHuns () {
	var aText = $xf('//script[contains(text(),"T4_feature_flags")]');
	if( aText ) {
		if ( /T4_feature_flags\s*=\s*(.*)};/.test(aText.textContent) ) {
			var T4_feature_flags = JSON.parse(aText.textContent.match( /T4_feature_flags\s*=\s*(.*});/)[1]);
			if (T4_feature_flags.tribesEgyptiansAndHuns == true) {
				RB.Setup[47] = 1;
				saveCookie( 'RBSetup', 'Setup' );
			} else {
				RB.Setup[47] = 2;
				saveCookie( 'RBSetup', 'Setup' );
			}
		}
	}
}

function detectMapSize () {
	var aText = $xf('//script[contains(text(),"TravianDefaults")]');
	if( aText ) {
		eval(aText.textContent);
		mapSize = window.TravianDefaults["Map"]["Size"]["width"];
		RB.Setup[48] = mapSize;
		saveCookie( 'RBSetup', 'Setup' );
	}
}

function detectServerSpeed () {
	var fullScr = $xf('//script[contains(text(),"Travian.Game.speed")]').innerHTML;
	if ( /Travian\.Game\.speed\s=\s(\d+);/.test(fullScr) ) {
		RB.Setup[45] = fullScr.match(/Travian\.Game\.speed\s=\s(\d+);/)[1];
		saveCookie( 'RBSetup', 'Setup' );
	}
}

function show_alert () {
	var nt = Date.now();
	if( lastAlert > nt-5e3 ) return;
	var audioT = $g(allIDs[22]);
	if( audioT ) audioT.parentNode.removeChild(audioT);
	switch (parseInt(RB.Setup[28])) {
		case 1: // alert
			alert('ding ding');
			break;
		case 2: // HTML5 audio
			cont.appendChild($e('AUDIO',[['id',allIDs[22]],['src',RB.Setup[29]],['autoplay','true']]));
			break;
	}
	lastAlert = nt;
}

function testAudio () {
	var sW = $g(windowID[0]);
	if( ! sW ) return;
	lastAlert = 0;
	RB.Setup[28] = $gn(28)[0].value;
	RB.Setup[29] = $gn(29)[0].value;
	show_alert();
}

/************************* begin test zone ***************************/

function crannyCalc () {
	var allB = $gc('number',cont);
	if( allB.length == 0 ) allB = $gt('B',cont);
	var cap = parseInt(allB[0].innerHTML);
	if( isNaN(cap) ) return;
	var s = parseInt(RB.Setup[24])/100;
	$at(allB[0],[['title',Math.round(cap*s)]]);
	var newT = $e('TABLE',[['class',allIDs[7]],['style','margin:2px 30px;']]);
	var t = timerB.length;
	for( var i=0; i<4; i++ ) {
		var pc = resNow[i] < cap ? Math.round(resNow[i]/cap*100) : 100;
		var color = 'red';
		if( incomepersecond[i] > 0 && pc < 100 ) {
			timerB[t] = new Object();
			timerB[t].time = Math.round((cap-resNow[i])/incomepersecond[i]);
			timerB[t].obj = $eT('TD',timerB[t].time, 0);
			var ct = timerB[t++].obj;
			color = 'green';
		} else var ct = $c('--:-- ');
		var ca = $c((resNow[i]-cap),[['style','color:'+color+';']]);
		color = 'red';
		if( incomepersecond[i] > 0 && pc < parseInt(RB.Setup[24]) ) {
			timerB[t] = new Object();
			timerB[t].time = Math.round((cap*s-resNow[i])/incomepersecond[i]);
			timerB[t].obj = $eT('TD',timerB[t].time, 0,[['style','background-color:yellow;']]);
			var ct8 = timerB[t++].obj;
			color = 'green';
		} else ct8 = $c('--:-- ',[['style','background-color:yellow;']]);
		var ca8 = $c(Math.round(resNow[i]-cap*s),[['style','background-color:yellow;color:'+color+';']]);
		newT.appendChild($em('TR',[$c(trImg('r'+(i+1))),$c(pc+'%'),ct8,ca8,ct,ca]));
	}
	cont.appendChild(newT);
}

function buildDispatcher () {
	var build = $g('build');
	if( !(build) ) return;
	var gid = build.getAttribute('class');
	gid = gid.split(/\s/)[0];
	if( gid == 'gid17' ) {
		marketSend(); marketSumm(); marketOffer(); marketBuy(); marketTradeRoutes();
		var gold = $xf('//div[@class="npcMerchant"]//button[contains(@class, "gold")]','l',cont);
		for( var i = 0; i < gold.snapshotLength; i++ ) {
			gold.snapshotItem(i).addEventListener('click', function(x) { setTimeout(npcForTroops,500); }, 0);
		}
	} else if( gid == 'gid15' ) {
		demolishSave();
	} else if( gid == 'gid16' ) {
		if( ! /tt=(99|100)/.test(crtPath) && !($g('raidList')) ) {
			stopRP(); incomeResourcesInRP(); detectNameAttaker(); calcAllTroops(); rpFL = true;
			if( $gn('snd') ) { fillXYtoRP(); rpDefaultAction(); abFL=true;}
		} else {
			goldClubInfo();
		}
	} else if( gid == 'gid23' ) {
		crannyCalc();
	} else if( gid == 'gid19' || gid == 'gid20' || gid == 'gid21' || gid == 'gid25' || gid == 'gid26' || gid == 'gid29'|| gid == 'gid30' || gid == 'gid36' ) {
		calcTroopCost();
		if( RB.Setup[11] > 0 ) calcNPCtroops();
	} else if( gid == 'gid11' ) {
		if( RB.dictFL[20] == 0 ) {
			var TM = $g("build_value").rows[0].cells[0].innerHTML.replace(/:/g, "");
			RB.dictionary[21] = TM;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[20] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	} else if( gid == 'gid13' ) {
		calcUnitUpgrade();
	}
	underProgressSave(gid);
}

var normalizeProductionCount = 8;
function normalizeProduction () {
	if( RB.Setup[22] < 1 ) return;
	var resT = $g('production');
	if( !(resT) ) return;
	var mm = normalProductionCalc ( income );
	$at(resT.rows[1+mm[0]], [['style','color:green;']]);
	$at(resT.rows[1+mm[1]], [['style','color:red;']]);
}

// by Mike_Sh
function normalProductionCalc ( ires ) {
	var choise = RB.Setup[22] == 1 ? 0: (RB.Setup[22]-1)+RB.Setup[2]*normalizeProductionCount;
	var vNormal = [[10,12,8,6],  // ???????????????????? ???????????????? (???????????????????????? ??????????)/normal development (production resources)
// Romans //
	[12,10,15,3],// Legionnaire
	[10,13,16,7],// Praetorian
	[15,16,21,8],// Imperian
	[14,16,2,4],// Equites Legati
	[55,44,32,10],// Equites Imperatoris
	[55,64,80,18],// Equites Caesaris
	[90,36,50,7],// Battering Ram
	[95,135,60,9],// Fire Catapult
// Teutons //
	[95,75,40,40],// Clubswinger
	[145,70,85,40],// Spearman
	[13,12,17,7],// Axeman
	[16,10,5,5],// Scout
	[37,27,29,8],// Paladin
	[45,51,48,8],// Teutonic Knight
	[100,30,35,7],// Ram
	[90,120,60,6],// Catapult
// Gauls //
	[20,26,11,6],// Phalanx
	[28,30,37,12],// Swordsman
	[17,15,2,4],// Pathfinder
	[35,45,23,6],// Theutates Thunder
	[36,33,28,12],// Druidrider
	[100,124,135,34],// Haeduan
	[190,111,66,15],// Ram
	[96,145,63,9],// Trebuchet
// Nature //
	[],[],[],[],[],[],[],[],
// Natars //
	[],[],[],[],[],[],[],[],
// Egyptians //
	[45,60,30,15],// Slave Militia
	[23,20,29,12],// Ash Warden
	[17,18,22,8],// Khopesh Warrior
	[35,45,23,6],// Sopdu Explorer
	[36,33,28,12],// Anhur Guard
	[45,56,61,18],// Resheph Chariot
	[199,115,68,16],// Ram
	[96,145,63,9],// Stone Catapult
// Huns //
	[13,8,4,4],// Mercenary
	[14,11,6,6],// Bowman
	[17,15,2,4],// Spotter
	[58,74,38,9],// Steppe Rider
	[32,35,33,5],// Marksman
	[45,56,61,14],// Marauder
	[106,33,36,7],// Ram
	[95,128,62,6]];// Catapult

	var vPN = [];
	for( var i = 0; i < 4; i++ ) {
		vPN[i] = ires[i] / vNormal[choise][i];
	}
	var minI = 0, maxI = 0;
	var minVal = vPN[0], maxVal = vPN[0];
	for ( i=0; i<(choise?3:4); i++){
		if ( minVal > vPN[i]) {
			minVal = vPN[i];
			minI = i;
		}
		if ( maxVal < vPN[i]) {
			maxVal = vPN[i];
			maxI = i;
		}
	}
	return [maxI,minI];
}

function speedBids () {
	if ( parseInt(RB.Setup[23]) == 0 ) return;
	var bform = $gc('auctionDetails',cont)[0];
	if( !(bform) ) return;
	var curBid = parseInt($gt('SPAN',bform)[0].innerHTML);
	$gn('maxBid',bform)[0].value = curBid+parseInt(RB.Setup[23]);
}

var ajaxToken=false;
function getAjaxToken () {
	if( ajaxToken ) return ajaxToken;
	var aText1 = $xf('.//script[contains(text(),"return \'")]','f',document.head);
	if( aText1 ) {
		ajaxToken = aText1.textContent.match(/return.'(.+)'/)[1];
		mapFL = true;
		return ajaxToken;
	}
	var aText = $xf('//script[contains(text(),"ajaxToken")]');
	if( aText ) eval(aText.textContent.match(/ajaxToken.*/)[0]);
	return ajaxToken;
}

function cropFind () {
	if( RB.Setup[26] == 0 ) return;

	function cropFindReq2 () {
		if( iaFL ) return;
		neFL = true;
		cropFindReq();
	}
	function cropFindReq () {
		if( iaFL ) return;
		iaFL = true;
		if( $g(allIDs[18]) ) cont.removeChild($g(allIDs[18]));
		cont.appendChild($ee('DIV',$ee('span','searching...',[['id',allIDs[0]]]),[['id',allIDs[18]]]));
		ss = $g(allIDs[0],cont);
		setInterval(function(x){return function(){
			x.style.color = x.style.color=='white'?'black':'white';}
		}(ss),500);
		XY = [parseInt(oX.value),parseInt(oY.value)];
		var zoom = parseInt(oZ.value); if( zoom > 7 || zoom < 1 ) zoom = 2;
		var rK = 1;
		var dX = 21;
		var dY = 17;
		var newY = XY[1] - Math.round((zoom-1)*dY/2);
		var curTO = 0;
		aCC.length = 0;
		oasis.length = 0;
		for (var i=zoom; i>0; i--) {
			var newX = XY[0] - Math.round((zoom-1)*dX/2);
			for (var j=zoom; j>0; j--) {
				setTimeout(function(x) { return function() { cropFindGetMap(x); }}({rX:newX,rY:newY,fl:(i==1&&j==1?true:false)}), curTO);
				newX += dX;
				curTO += Math.round(getRandom(500,1500)*rK);
			}
			newY += dY;
		}
	}
	function printResult ( ft, mX, mY , descr ) {
		var des = typeof descr == 'undefined' ? '': descr;
		$g(allIDs[18]).appendChild($em('DIV',[ft,' ',$a(mX+'|'+mY,[['href','karte.php?'+'x='+mX+'&y='+mY]])]));
		aCC[aCC.length] = [ft,mX,mY,des];
	}
	function findAnim (x) {
		var vid = xy2id(x[0],x[1]);
		if( typeof chkOasisFL[vid] != "undefined" ) {
			addToolTip(chkOasisFL[vid],x[3].rows[x[2]].cells[2]);
		} else {
			ajaxRequest(fullName+'ajax.php?cmd=viewTileDetails', 'POST', 'cmd=viewTileDetails&x='+x[0]+'&y='+x[1]+'&ajaxToken='+getAjaxToken(), function(ajaxResp) {
				var mapData = eval('(' + ajaxResp.responseText + ')');
				mapData = mapData.response;
				var adv = $ee('DIV',mapData.data.html,[['style','display:none;']]);
				ad = $xf('.//table[@id="troop_info"]','f',adv);
				if( ad ) {
					chkOasisFL[vid] = getTroopsInOasis(ad);
					if( ! iaFL ) {
						addToolTip(chkOasisFL[vid],x[3].rows[x[2]].cells[2]);

						var anim = $xf('.//tr[td/img[contains(@class, "unit u")]]','l',ad);
						if( anim.snapshotLength > 0 ) {
							var animL = [0,0,0,0,0,0,0,1,1,1];
							for( var i=0; i<anim.snapshotLength; i++ ) {
								tt = parseInt($gt('IMG',anim.snapshotItem(i))[0].getAttribute('class').match(/\d+/)[0]);
								tc = toNumber(anim.snapshotItem(i).cells[1].innerHTML);
								if ( animL[tt-31] >0 )
									x[3].rows[x[2]].cells[2].appendChild($em('SPAN',[tc+"x",trImg('unit u'+tt)]));
							}
						}
					}
				}
			}, dummy);
		}
	}
	function printFinal () {
		if( $g(allIDs[18]) ) cont.removeChild($g(allIDs[18]));
		var cell_id = xy2id(XY[0],XY[1]); // village_aid or xy2id(XY[0],XY[1]) ...
		var aCCs = aCC.sort(function (a,b) {
				var dA = parseFloat(calcDistance( xy2id(a[1],a[2]), cell_id ).toFixed(1));
				var dB = parseFloat(calcDistance( xy2id(b[1],b[2]), cell_id ).toFixed(1));
				if( dA < dB ) return -1;
				if( dA > dB ) return 1;
				return 0;
			});
		var newT = $e('TABLE',[['class',allIDs[7]]]);
		oasis.sort(function(a,b){return parseInt(b[2])-parseInt(a[2]);});
		var curTO = 50;
		for( var i=0; i<aCCs.length; i++ ) {
			if( neFL ) {
				if ( mapFL == true ) {
					if( aCCs[i][3].e.indexOf('oasis') != -1 && typeof aCCs[i][3].uid == "undefined" && anim.checked ) {
						if( typeof chkOasisFL[xy2id(aCCs[i][1],aCCs[i][2])] == "undefined" )
							curTO += getRandom(250,1000);
						else
							curTO += 10;
						setTimeout(function(x) { return function() { findAnim(x) }}([aCCs[i][1],aCCs[i][2],i,newT]), curTO);
					}
					newT.appendChild($em('TR',[
						$c((typeof aCCs[i][3].uid != "undefined" ? $em('A',[aCCs[i][0],(aCCs[i][3].v<8?$e('img',[['src','img/x.gif'],['class','nation nation'+aCCs[i][3].v],['style','float:none;'+((aCCs[i][3].v)==5?'background-position: 0 '+(RB.Setup[46]==1?'-48':'-78')+'px;':'')]]):"")],[['href','spieler.php?uid='+aCCs[i][3].uid[0]]]):"")),
						$c((typeof aCCs[i][3].aid != "undefined" ? ($a(aCCs[i][3].aid[1],[['href','allianz.php?aid='+aCCs[i][3].aid[0]]])):"")),
						$c(aCCs[i][3].e),
						$c($a(aCCs[i][1]+'|'+aCCs[i][2],[['href',('position_details.php?x='+aCCs[i][1]+'&y='+aCCs[i][2])]])),
						$c('<->'),$c(calcDistance(xy2id(aCCs[i][1],aCCs[i][2]), cell_id).toFixed(1))
					]));
				} else {
					if( aCCs[i][3].e.indexOf('oasis') != -1 && typeof aCCs[i][3].u == "undefined" && anim.checked ) {
						if( typeof chkOasisFL[xy2id(aCCs[i][1],aCCs[i][2])] == "undefined" )
							curTO += getRandom(250,1000);
						else
							curTO += 10;
						setTimeout(function(x) { return function() { findAnim(x) }}([aCCs[i][1],aCCs[i][2],i,newT]), curTO);
					}
					newT.appendChild($em('TR',[
						$c((typeof aCCs[i][3].u != "undefined" ? $em('A',[aCCs[i][0],(aCCs[i][3].v<8?$e('img',[['src','img/x.gif'],['class','nation nation'+aCCs[i][3].v],['style','float:none;'+((aCCs[i][3].v)==5?'background-position: 0 -78px;':'')]]):"")],[['href','spieler.php?uid='+aCCs[i][3].u[0]]]):"")),
						$c((typeof aCCs[i][3].a != "undefined" ? ($a(aCCs[i][3].a[1],[['href','allianz.php?aid='+aCCs[i][3].a[0]]])):"")),
						$c(aCCs[i][3].e),
						$c($a(aCCs[i][1]+'|'+aCCs[i][2],[['href',('position_details.php?x='+aCCs[i][1]+'&y='+aCCs[i][2])]])),
						$c('<->'),$c(calcDistance(xy2id(aCCs[i][1],aCCs[i][2]), cell_id).toFixed(1))
					]));
				}
			} else {
				var oasisCC = 0;
				var oasisCount = 0;
				for( var t=0; t<oasis.length; t++ ) {
					if( Math.abs(aCCs[i][1]-oasis[t][0]) < 4 && Math.abs(aCCs[i][2]-oasis[t][1]) < 4 ) {
						oasisCC += parseInt(oasis[t][2]);
						if( ++oasisCount > 2 ) break;
					}
				}
				newT.appendChild($em('TR',[$c(aCCs[i][0]),$c(oasisCC>0?'+'+oasisCC+'%':''),
					$c($a(aCCs[i][1]+'|'+aCCs[i][2],[['href','karte.php?'+'x='+aCCs[i][1]+'&y='+aCCs[i][2]]])),
					$c(aCCs[i][3]),$c('<->'),$c(calcDistance(xy2id(aCCs[i][1],aCCs[i][2]), cell_id).toFixed(1))]));
			}
		}
		cont.appendChild($ee('P',newT,[['id',allIDs[18]],['style','margin:10px 15px 0px;']]));
		addSpeedAndRTSend($g(allIDs[18]));
		addRefIGM(allIDs[18]);
		neFL = false;
		iaFL = false;
	}
	function parseV4map (o) {
		if ( mapFL == true ) {
			var ar = new Object();
			if( typeof o.aid != 'undefined') {
				var ally = o.text.match(/{k.allianz}(.+?)</)[1];
				ar.aid = [o.aid, ally];
			}
			var pl = o.text.match(/{k.spieler}(.+?)</)[1];
			ar.uid = [o.uid, pl];
			var ei = o.text.match(/{k.einwohner}(.+?)</);
			ar.e = ei ? ei[1]: 'oasis';
			if( /{a.r4}/.test(o.text) ) ar.e += ' +'+o.text.match(/{a.r4}\s+(\d+%)/)[1];
			ar.v = o.text.match(/{a.v(\d)}/)[1];
			return [pl,ar];
		} else {
			var ar = new Object();
			if( typeof o.a != 'undefined') {
				var ally = o.t.match(/{k.allianz}(.+?)</)[1];
				ar.a = [o.a, ally];
			}
			var pl = o.t.match(/{k.spieler}(.+?)</)[1];
			ar.u = [o.u, pl];
			var ei = o.t.match(/{k.einwohner}(.+?)</);
			ar.e = ei ? ei[1]: 'oasis';
			if( /{a.r4}/.test(o.t) ) ar.e += ' +'+o.t.match(/{a.r4}\s+(\d+%)/)[1];
			ar.v = o.t.match(/{a.v(\d)}/)[1];
			return [pl,ar];
		}
	}
	function cropFindGetMap ( a ) {
		ajaxRequest(fullName+'ajax.php?cmd=mapPositionData', 'POST', 'cmd=mapPositionData&data[x]='+a.rX+'&data[y]='+a.rY+'&data[zoomLevel]=2&'+'ajaxToken='+getAjaxToken(), function(ajaxResp) {
			var mapData = eval('(' + ajaxResp.responseText + ')');
			mapData = mapData.response;
			var pRules = [[/{k.f1}/,'Crop 9:',c9],[/{k.f6}/,'Crop 15:',c15],[/{k.f7}/,'4-4-3-7:',c7],[/{k.f8}/,'3-4-4-7:',c7],[/{k.f9}/,'4-3-4-7:',c7]];
			for( var i=0; i < mapData.data.tiles.length; i++ ) {
				if ( mapFL == true ) {
					if (typeof mapData.data.tiles[i].title != 'undefined') {
						if( neFL ) {
							if( /{k.fo}/.test(mapData.data.tiles[i].title)) {
								printResult( "", mapData.data.tiles[i].position.x, mapData.data.tiles[i].position.y, {e:"oasis"} );
							} else if( /k.dt}|{k.bt}/.test(mapData.data.tiles[i].title)) {
								if( mapData.data.tiles[i].uid == userID ) continue;
								if( typeof mapData.data.tiles[i].aid != 'undefined' && mapData.data.tiles[i].aid == RB.dictionary[13] ) continue;
								var md = parseV4map( mapData.data.tiles[i] );
								printResult( md[0], mapData.data.tiles[i].position.x, mapData.data.tiles[i].position.y, md[1] );
							}
						} else {
							for( var t=0; t<pRules.length; t++ ) {
								if( pRules[t][0].test(mapData.data.tiles[i].title)) {
									if( pRules[t][2].checked )
										printResult( pRules[t][1], mapData.data.tiles[i].position.x, mapData.data.tiles[i].position.y );
								}
							}
							if( /{k.bt}|{k.fo}/.test(mapData.data.tiles[i].title)) {
								if( /{a.r4}/.test(mapData.data.tiles[i].text)) {
									oasis[oasis.length] = [mapData.data.tiles[i].position.x, mapData.data.tiles[i].position.y, mapData.data.tiles[i].text.match(/{a.r4}\s+(\d+)%/)[1]];
								}
							}
						}
					}
				} else {
					if (typeof mapData.data.tiles[i].c != 'undefined') {
						if( neFL ) {
							if( /{k.fo}/.test(mapData.data.tiles[i].c)) {
								printResult( "", mapData.data.tiles[i].x, mapData.data.tiles[i].y, {e:"oasis"} );
							} else if( /k.dt}|{k.bt}/.test(mapData.data.tiles[i].c)) {
								if( mapData.data.tiles[i].u == userID ) continue;
								if( typeof mapData.data.tiles[i].a != 'undefined' && mapData.data.tiles[i].a == RB.dictionary[13] ) continue;
								var md = parseV4map( mapData.data.tiles[i] );
								printResult( md[0], mapData.data.tiles[i].x, mapData.data.tiles[i].y, md[1] );
							}
						} else {
							for( var t=0; t<pRules.length; t++ ) {
								if( pRules[t][0].test(mapData.data.tiles[i].c)) {
									if( pRules[t][2].checked )
										printResult( pRules[t][1], mapData.data.tiles[i].x, mapData.data.tiles[i].y );
								}
							}
							if( /{k.bt}|{k.fo}/.test(mapData.data.tiles[i].c)) {
								if( /{a.r4}/.test(mapData.data.tiles[i].t)) {
									oasis[oasis.length] = [mapData.data.tiles[i].x, mapData.data.tiles[i].y, mapData.data.tiles[i].t.match(/{a.r4}\s+(\d+)%/)[1]];
								}
							}
						}
					}
				}
			}
			if( a.fl ) printFinal();
		}, dummy);
	}

	var aCC = [];
	var oasis = [];
	var neFL = false;
	var iaFL = false;
	var chkOasisFL = new Object();
	var cfText = $ee('SPAN',$a('crop find'),[['href',jsVoid],['style','display:inline-block;']]);
	var cfText2 = $ee('SPAN',$a(gtext('neighbors')),[['href',jsVoid],['style','display:inline-block;']]);

	var labels = $gt('LABEL', cont);
	var xCoordText, yCoordText;
	for( var i=0; i < labels.length; i++ ) {
		if ( labels[i].hasAttribute('for') && (labels[i].htmlFor == 'xCoordInputMap') ) xCoordText = labels[i].textContent;
		if ( labels[i].hasAttribute('for') && (labels[i].htmlFor == 'yCoordInputMap') ) yCoordText = labels[i].textContent;
	}
	cfText.addEventListener('click', cropFindReq, false);
	cfText2.addEventListener('click', cropFindReq2, false);
	var XY = /[\?|&](d=|z=|x=)/.test(crtPath) ? id2xy(getVid(crtPath)): id2xy(village_aid);

	function inps (val, iname) { return $e('INPUT',[['value',val],['name',iname],['id',iname],['class','text coordinates'],['type','text'],['style','width:4em;']]); }
	function inpsC (id, check) {
		var inp = $e('INPUT',[['id',id],['type','checkbox'],['style','margin-'+docDir[0]+':0px;']]);
		if (check) inp.checked = true; return inp;
	}
	function label (text, input) { return $em('LABEL',[text,input],[['style','margin:2px;display:inline-block;']]); }

	var oX = inps(XY[0],'RBmX');
	var oY = inps(XY[1],'RBmY');
	var oZ = inps(2,'RBzoom');
	var c15 = inpsC('RBc15',true);
	var c9 = inpsC('RBc9',true);
	var c7 = inpsC('RBc7',false);
	var anim = inpsC('RBanim',false);
	var anDiv = $em('SPAN',[' ',trImg('unit u40'),':',anim]);
	cont.appendChild($em('DIV',[label(xCoordText,oX),label(yCoordText,oY),label('zoom:',oZ),label('15:',c15),label('9:',c9),label('7:',c7),cfText,' | ',cfText2,anDiv],[['class','contents'],['style','white-space:nowrap;margin-top:5px;']]));
}

function npcForTroops () {
	var npcT = $g('npc');
	if( !(npcT) ) return;
	var TR = $e('TR');

	var inps = $gt('INPUT', npcT);
	if( inps.length < 8 ) return;

	function redistrNPC ( num ) {
		var tN = parseInt(RB.Setup[2])*10 + num;
		var tRS = troopInfo(tN,3)+troopInfo(tN,4)+troopInfo(tN,5)+troopInfo(tN,6);
		var aCol = Math.floor(resNowSumm / tRS);
		var summ = 0;
		for( var i=0; i<3; i++ ) {
			var tCo = aCol * troopInfo(tN, i+3);
			summ += tCo;
			inps[i*2].value = tCo + sRes[i];
		}
		inps[i*2].value = resNowSumm - summ + sRes[i];
	}
	function redistrNPCcrop () {
		var newMaxCrop = fullRes[3] - sRes[3];
		var newCrop = resNowSumm > newMaxCrop ? newMaxCrop: resNowSumm;
		var deltaRes = resNowSumm > newMaxCrop ? Math.ceil((resNowSumm-newCrop)/3): 0;
		for( var i=0; i<3; i++ ) inps[i*2].value = deltaRes + sRes[i];
		inps[i*2].value = sRes[i] + (resNowSumm > newMaxCrop ? resNowSumm-deltaRes*3: newCrop);
	}

	var sRes = [0,0,0,0];
	for( var i=0; i<4; i++ ) sRes[i] = parseInt(inps[i*2].value).NaN0();
	var sumSRes = sRes[0]+sRes[1]+sRes[2]+sRes[3];
	var resNowSumm = resNow[0]+resNow[1]+resNow[2]+resNow[3] - sumSRes;

	for( var i=1; i<11; i++ ) {
		var tN = parseInt(RB.Setup[2])*10+i;
		var tRS = troopInfo(tN,3)+troopInfo(tN,4)+troopInfo(tN,5)+troopInfo(tN,6);
		var aCol = Math.floor(resNowSumm/tRS);
		var newA = $em('A',[trImg('unit u'+tN),'(',aCol,')'],[['href',jsVoid],['onclick','setTimeout(function (x) { return Travian.Game.Marketplace.ExchangeResources.calculateRest()}, 250);']]);
		newA.addEventListener('click', function(x) { return function() { redistrNPC(x); }}(i), false);
		TR.appendChild($c(newA));
	}
	var newA = $a(trImg('r4'),[['href',jsVoid],['onclick','setTimeout(function (x) { return Travian.Game.Marketplace.ExchangeResources.calculateRest()},250)']]);
	newA.addEventListener('click',redistrNPCcrop, false);
	TR.appendChild($c(newA));
	var tT = $ee('TABLE',TR,[['class',allIDs[7]]]);
	npcT.parentNode.insertBefore(tT, npcT);
}

function analyzerBattle () {
	if( RB.Setup[25] == 0 || RB.dictFL[13] < 2 ) return;
	var newTPP = false;
	var report = $g('report_surround');
	if(! report) {
		report = $g("reportWrapper");
		newTPP = true;
		if (! report) return;
		if (! $g('defender')) return;
	}
	if( !($g('attacker')) ) return;
	var tt = $gt('TABLE',report);
	if( tt.length < 2 ) return;

	function parseTroops ( pRows, pRU, ptS ) {
		var pRace = Math.floor(parseInt($gt('IMG',pRows[newTPP?0:1].cells[1])[0].getAttribute('class').match(/u(\d+)/)[1])/10);
		for( var i=10; i>0; i-- ) {
			tCount = parseInt(pRows[newTPP?1:2].cells[i].innerHTML).NaN0();
			var tKirillC = tCount;
			if( tCount > 0 ) {
				for( j=0; j<pRU.length; j++) ptS[0][j] += troopInfo(pRace*10+i, pRU[j])*tCount;
				if( i < 7 && troopInfo(pRace*10+i, 9) > 1 ) ptS[2] += troopInfo(pRace*10+i, 0)*tCount;
			}
			if( pRows.length > (newTPP?2:3) ) if( pRows[newTPP?2:3].cells.length > 3 ) {
				tCount = parseInt(pRows[newTPP?2:3].cells[i].innerHTML);
				if( tCount > 0 ) {
					for( j=0; j<pRU.length; j++) ptS[1][j] += troopInfo(pRace*10+i, pRU[j])*tCount;
					tKirillC -= tCount;
				}
			}
			kirillS = (tKirillC > 0 ? tKirillC:'')+','+kirillS;
		}
		kirillS = 'r'+kirillRace[pRace]+'u'+kirillS.replace(/,*$/,'');
		return ptS;
	}

	var attakerN, defenderN;
	if (newTPP == true) {
		attakerN = $gt('h2')[0].textContent;
		defenderN = $gt('h2')[1].textContent;
	} else {
		attakerN = $gc('role',tt[0].rows[0].cells[0])[0].innerHTML;
		defenderN = $gc('role',tt[1].rows[0].cells[0])[0].innerHTML;
	}

	var kirilloid = '#a:';
	var aRow = tt[0].rows;
	var tCount = 0;
	var atS = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],0];
	var aRU =  [0,8,3,4,5,6,9];
	var kirillRace = [0,1,2,3,3,4,5];
	var kirillS = '';
	var atS = parseTroops( aRow, aRU, atS );
	kirilloid += kirillS+'Ub#d:'+((RB.Setup[46]==1)?'m9':'');
	kirilloid = kirilloid.replace(/r0(uUb)?/g,'');
	atS[0][1] -= atS[1][1];
	var goods = $gc('res',tt[newTPP?1:0]);
	var ress = goods.length > 0 ? goods[0].innerHTML.match(/<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?<img.+?>.*?(\d+).*?/): [0,0,0,0,0];
	ress = [0,parseInt(ress[1]),parseInt(ress[2]),parseInt(ress[3]),parseInt(ress[4])];
	if( goods.length > 1) {
		var crC = parseInt( goods[1].innerHTML.onlyText() );
		if( ! isNaN(crC) ) {
			var pbonus = 0;
			for( var i=1; i<5; i++ ) {
				var t = ress[i]-crC;
				pbonus += t < 0 ? 0: t;
			}
			var pbonusS = $ee('SPAN',' ( &#931;= '+pbonus+' ) ',[['style','vertical-align:baseline;']]);
			if( pbonus > 0 ) {
				var newT = $e('TABLE',[['class',allIDs[7]]]);
				for( i=1; i<11; i++ ) {
					var trC = troopInfo(i+(parseInt(RB.Setup[2])*10), 8);
					if( trC > 1 ) {
						newT.appendChild($em('TR',[$c(trImg('unit u'+(i+parseInt(RB.Setup[2])*10))),$c(Math.ceil(pbonus/trC))]));
					}
				}
				pbonusS.addEventListener("mouseover", function () { makeTooltip(newT); }, false);
				pbonusS.addEventListener("mouseout", removeTooltip, false);
			}
			goods[1].firstElementChild.appendChild(pbonusS)
		}
	}

	var dfS = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],0];
	var dRU =  [1,2,3,4,5,6,9];
	var kirillRace = [0,1,2,3,4,5,6];
	var kirillSd = '';
	for( dTc=1; dTc < tt.length; dTc++ ) {
		var dRow = tt[dTc].rows;
		if (tt[dTc].className == 'additionalInformation') continue;
		if( dRow.length < 2 ) continue;
		kirillS = '';
		var dfS = parseTroops( dRow, dRU, dfS );
		kirillSd += kirillS+'U#';
	}
	kirilloid += kirillSd.substring(0,2)+('#')+kirillSd;
	kirilloid = kirilloid.replace(/r.uU#/g,'');
	kirilloid = kirilloid.replace(/r0u/g,'u');
	kirilloid = kirilloid.replace(/[;#]$/,'');

	var adCoords = $xf('.//a[contains(@href, "karte.php")]','l',report);
	if( adCoords.snapshotLength > 1 ) {
		var atCoord = getVid(adCoords.snapshotItem(0).getAttribute('href'));
		var dfCoord = getVid(adCoords.snapshotItem(1).getAttribute('href'));
		var distance = Math.round(calcDistance(atCoord,dfCoord));
		var distRef = $ee('SPAN','&lt;- '+distance+' -&gt;',[['style','white-space:nowrap;']]);
		distRef.addEventListener("mouseover", function() {
			var al = parseInt(RB.Setup[9]) == 0 ? parseInt(RB.village_Var[1]) : parseInt(RB.Setup[9]) - 1;
			makeTooltip(showAllTTime(1, [atCoord,dfCoord], al));
		}, false);
		distRef.addEventListener("mouseout", removeTooltip, false);
	} else var distRef = ' ';

	var newTABLE = $e('TABLE',[['class',allIDs[7]],['style','background-color:white;width:100%;']]);
	newTABLE.appendChild($em('TR',[$c(distRef),$c(attakerN),$c(defenderN),$c(gtext('total'))]));
	// strength
	var newTR = $ee('TR',$em('TD',[trImg('unit u13'),'+',trImg('unit u16')]));
	var strAP = atS[0][0]-atS[2];
	newTR.appendChild($em('TD',[humanRF(strAP),' + ',humanRF(atS[2])]));
	newTR.appendChild($em('TD',[humanRF(dfS[0][0]),' + ',humanRF(dfS[0][1])]));
	var proc = [0,0];
	proc[0] = Math.round(strAP/(strAP+dfS[0][0])*100).NaN0();
	proc[1] = Math.round(atS[2]/(atS[2]+dfS[0][1])*100).NaN0();
	newTR.appendChild($c(proc[0]+' + '+proc[1]+' = '+Math.round((proc[0]+proc[1])/(proc[0]>0 && proc[1] > 0 ? 2: 1))+'%'));
	newTABLE.appendChild(newTR);
	// crop
	proc[0] = Math.round(atS[1][6]/(atS[1][6]+dfS[1][6])*100).NaN0();
	var newTR = $em('TR',[$c(trImg('r5')),$c(humanRF(atS[0][6])+'/'+humanRF(atS[1][6])),
						$c(humanRF(dfS[0][6])+'/'+humanRF(dfS[1][6])),$c(proc[0]+'%')]);
	newTABLE.appendChild(newTR);
	// resource
	var newTR = $ee('TR',$em('TD',[trImg('r1'),'+',trImg('r2'),'+',trImg('r3'),'+',trImg('r4'),'=']));
	proc[0] = atS[1][2]+atS[1][3]+atS[1][4]+atS[1][5];
	if( atS[0][1] == 0 ) ress = [0,0,0,0,0];
	proc[5] = ress[1]+ress[2]+ress[3]+ress[4];
	proc[1] = dfS[1][2]+dfS[1][3]+dfS[1][4]+dfS[1][5];
	proc[4] = proc[1]+proc[5];
	proc[2] = Math.round((proc[0])/(proc[0]+proc[4])*100).NaN0();
	newTR.appendChild($em('TD',[humanRF(atS[1][2])+' + '+humanRF(atS[1][3])+' + '+humanRF(atS[1][4])+' + '+humanRF(atS[1][5]),$e('BR'),' = '+humanRF(proc[0])]));
	newTR.appendChild($em('TD',[humanRF(dfS[1][2]+ress[1])+' + '+humanRF(dfS[1][3]+ress[2])+' + '+humanRF(dfS[1][4]+ress[3])+' + '+humanRF(dfS[1][5]+ress[4]),$e('BR'),' = '+humanRF(proc[4])]));
	newTR.appendChild($c(proc[2]+'%'));
	newTABLE.appendChild(newTR);
	// carry
	var newTR = $ee('TR',$c(trImg(allIDs[33])));
	proc[4] = atS[0][1] > 0 ? Math.round(proc[5]/atS[0][1]*100) : 0;
	newTR.appendChild($c(proc[4]+'%'));
	newTR.appendChild($c($a('(kirilloid.ru)',[['href','http://travian.kirilloid.ru/warsim2.php'+kirilloid],['target','_blank'],['style','font-size:11px;']])));
	proc[4] = proc[5] > 0 ? Math.round((proc[5]-proc[0])/proc[5]*100) : '--';
	newTR.appendChild($c(proc[4]+'%'));
	newTABLE.appendChild(newTR);

	var toLog = $a('travian-reports.net');
	toLog.addEventListener("click", addReport, true);
	newTABLE.appendChild($ee('TR',$c(toLog,[['colspan',4]])));

	newTPP ? ($g('attacker').parentNode.parentNode.appendChild(newTABLE)) : (tt[0].parentNode.appendChild(newTABLE));
}

function returnQuickHelp () {
	var i = "return Travian.Game.iPopup(0,0, 'gid');";
	$ib($ee('li', $ee('A',trImg(''),[['href','#'],['target','_blank'],['onclick',i]]), [['class',"help"]]),$g('outOfGame').firstChild);
}

function rpDefaultAction () {
	var nc = $xf('.//input[@name="c"]','l',cont);
	if( nc.snapshotLength < 3 ) return;
	if( RB.Setup[27] > 0 ) if( typeof nc.snapshotItem(RB.Setup[27]).getAttribute('disabled') != "string" ) nc.snapshotItem(RB.Setup[27]).checked = true;
	if( RB.dictFL[16] > 0 ) return;
	for( var i=0; i<nc.snapshotLength; i++ ) {
		RB.dictionary[16+i] = nc.snapshotItem(i).parentNode.innerHTML.onlyText().trim();
	}
	saveCookie( 'Dict', 'dictionary' );
	RB.dictFL[16] = 1;
	saveCookie( 'DictFL', 'dictFL' );
}

function addAReportFilter () {
	dictRpInit();
	var newD = $e('DIV',[['style','white-space:nowrap;padding:5px;']]);
	for( var i=0; i<iReports.length; i++ ) {
		newD.appendChild($a(trImg('iReport iReport'+iReports[i], RB.dictRp[i]),[['href',fullName + 'allianz.php?s=3&filter='+iReports[i]+'&own=0'],['style','margin:2px;']]));
	}
	cont.appendChild(newD);
}

function restHeroTime () {
	var timers = $xf('.//div/span[contains(@class, "timer")]','l',cont);
	for( var i=0; i<timers.snapshotLength; i++ ) {
		timers.snapshotItem(i).parentNode.insertBefore($em('SPAN',[' (',formatTime(absTime(toSeconds(timers.snapshotItem(i).textContent)),4),')']), timers.snapshotItem(i).nextSibling);
	}
}

function detectAttack () {
	function getAttackAInfo () {
		$g(allIDs[23]).innerHTML = "checking";
		RB.attackList.length = 1;
		if ( plusAccount == true ) {
			findAttackPA();
			return;
		}
		if ( RB.Setup[46] == 1 ) {
			findAttackFS();
			return;
		}
		FreezeScreen(true);
		var curTO = 0;
		for( var i=0; i<linkVSwitch.length; i++ ) {
			curTO += getRandom(300,1000);
			setTimeout(function(x) { return function() { findAttack(x); }}(i), curTO);
		}
	}
	function showAtt () {
		var aDv = $g(allIDs[23]);
		if( !(aDv) ) {
			aDv = $e('DIV',[['style','max-width:100px;'],['id',allIDs[23]]]);
			makeFloatD(aDv, 10);
			timerNum = timerB.length;
			lastTimerB = timerNum+1;
		}
		if( RB.attackList.length < 2 ) {
			aDv.innerHTML = 'No attack';
		} else {
			aDv.innerHTML = '';
		}

		for( var t=1; t<RB.attackList.length; t++ ) {
			aDv.appendChild(vLinks.snapshotItem(RB.attackList[t]).cloneNode(true));
			if(RB.attackList.length > t+1) aDv.appendChild($t(', '));
		}
		aDv.appendChild($e('BR'));
		timerB[timerNum] = new Object();
		timerB[timerNum].time = Math.round(nextCheck/1000);
		timerB[timerNum].obj = $eT('SPAN', timerB[timerNum].time, 0);
		aDv.appendChild(timerB[timerNum].obj);
	}
	function triggerAlarm () {
		var audioT = $g(allIDs[22]);
		if( audioT ) audioT.parentNode.removeChild(audioT);
		cont.appendChild($e('AUDIO',[['id',allIDs[22]],['src',RB.Setup[29]],['autoplay','true'],['loop','true']]));
	}
	function noAttack () {
		RB.attackList[0] = Date.now();
		RB_setValue(GMcookieID + 'Att', JSON.stringify(RB.attackList));
		nextCheck = getRandom(basePeriod,2e5);
		setTimeout( getAttackAInfo, nextCheck);
		showAtt();
	}
	function showError () {
		var aDv = $g(allIDs[23]);
		if( aDv ) {
			aDv.innerHTML = "<span style='color:red;'> Error! </span>";
		}
	}
	function findAttack( nd ) {
		var aLink = fullName +'dorf1.php?'+ linkVSwitch[nd].match(/newdid=\d+/i)[0];
		ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			var move = $xf('.//*[@id="movements"]','f',ad);
			ad = null;
			if (move) {
				if( /att1|att3/.test(move.innerHTML) ) {
					RB.attackList.push(nd);
				}
			}
			if( nd == linkVSwitch.length-1 ) {
				setTimeout( function() { ajaxRequest(active_did, 'GET', null, dummy, dummy); }, getRandom(300,1000));
				RB.attackList[0] = Date.now();
				RB_setValue(GMcookieID + 'Att', JSON.stringify(RB.attackList));
				nextCheck = getRandom(basePeriod,2e5);
				setTimeout( getAttackAInfo, nextCheck);
				FreezeScreen(false);
				showAtt();
				if( RB.attackList.length > 1 ) {
					var audioT = $g(allIDs[22]);
					if( audioT ) audioT.parentNode.removeChild(audioT);
					cont.appendChild($e('AUDIO',[['id',allIDs[22]],['src',RB.Setup[29]],['autoplay','true'],['loop','true']]));
					//show_alert();
				}
			}
		}, showError);
	}
	function findAttackFS() {
		var aLink = fullName +'allianz.php?action=members';
		ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			var move = $xf('.//*[@class="attack"]','l',ad);
			ad = null;
			if (move) {
				for( var h=0; h<move.snapshotLength; h++ ) {
					var att = $gt('a',move.snapshotItem(h).parentNode);
					var pat = new RegExp('uid=' + userID);
					for (var i=0; i<att.length; i++) {
						if( pat.test(att[i].href) ) {
							triggerAlarm();
							return;
						}
					}
				}
			}
			noAttack();
		}, showError);
	}
	function findAttackPA() {
		var aLink = fullName +'dorf1.php';
		ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			var move = $xf('.//li[contains(@class,"attack")]','f',ad);
			ad = null;
			if (move) {
				triggerAlarm();
				return true;
			} else { noAttack(); }
		}, showError);
	}
	function FreezeScreen( state ) {
		if( RB.Setup[30] < 2 ) return;
		scroll(0,0);
		var outerPane = $g(allIDs[27]);
		if (state) {
			if (outerPane) outerPane.className = allIDs[25];
		} else {
			if (outerPane) outerPane.className = allIDs[24];
		}
	}

	try { RB.attackList = JSON.parse(RB_getValue(GMcookieID + 'Att','[0]')); } catch (err) { RB.attackList = [0]; }
	var timerNum = 0;
	if( RB.Setup[31] < 5 || RB.Setup[31] > 30 ) RB.Setup[31] = 15;
	var basePeriod = (parseInt(RB.Setup[31])-1)*6e4;
	var firstCheck = parseInt(RB.attackList[0]) + basePeriod - RunTime[0];
	var nextCheck =  firstCheck < 3e5 ? getRandom(3e5,3e4): getRandom(firstCheck,1e5);

	var vLinks = $xf(vLinksPat,'l');
	var active_did = crtPath.split("?")[0] + clearAntibot( linkVSwitch[village_aNum] );
	setTimeout( getAttackAInfo, nextCheck);
	showAtt();
	var btnX = $ee('BUTTON','X');
	btnX.addEventListener("click", function(){ FreezeScreen(false) }, true);
	var divIn = $em('div',['checking ',btnX],[['class',allIDs[26]]]);
	var divF = $ee("div",divIn,[['align','center'],['id', allIDs[27]],['class',allIDs[24]]]);
	document.body.insertBefore(divF, document.body.firstChild);
}

function analyzerSetup () {
	if( closeWindowN(7) ) return;

	function okAnalyzer() {
		for( var i=0; i<serversAC; i++ ) {
			RB.serversAN[i] = inp[i].value;
		}
		saveCookie('AS', 'serversAN');
		cancelAnalyzer();
	}
	function cancelAnalyzer() {
		closeWindowN(7);
	}

	var newT = $e('TABLE',[['class',allIDs[7]],['style','background-color:yellow;']]); // #F0F0F0
	var inp = [];
	for( var i=0; i<serversAC; i++ ) {
		var ps = userActivityServers(i+1)[2].split('###');
		inp[i] = $e('INPUT',[['type','text'],['value',ps[1]],['size',(ps[1].length+1)]])
		newT.appendChild($ee('TR',$em('TD',[ps[0],inp[i],ps[2]],[['style','direction:ltr;']])));
	}
	newT.appendChild($ee('TR',okTD(okAnalyzer,cancelAnalyzer)));
	var xy = offsetPosition(this);
	windowID[7] = makeFloat(newT,xy[0]-(ltr?320:20),xy[1]-190,22);
}

function timeToBids () {
	var timers = $xf('.//span[contains(@class,"timer")]','l',cont);
	for( var i=0; i<timers.snapshotLength; i++ ) {
		timers.snapshotItem(i).setAttribute('title',formatTime(absTime(toSeconds(timers.snapshotItem(i).innerHTML)),2));
	}
}

function addReport () {
	if( closeWindowN(8) ) return;
	var reportO = $g('report_surround');
	if(! reportO) {
		reportO = $g("reportWrapper");
		if (! reportO) return;
	}

	function cancelLog () {
		closeWindowN(8);
	}

	var report = reportO.cloneNode(true);
	var rt = $gc(allIDs[7],report)[0];
	rt.parentNode.removeChild(rt);

	var divs = $gc("avatar",report);
	for( var i=divs.length-1; i>=0; i-- ) {
		divs[i].parentNode.removeChild(divs[i]);
	}
	var divs = $gc("outcome",report);
	for( var i=divs.length-1; i>=0; i-- ) {
		divs[i].parentNode.removeChild(divs[i]);
	}
	var divs = $gc("troopCount",report);
	for( var i=0; i<divs.length; i++ ) {
		divs[i].setAttribute('alt','Troops');
	}
	var divs = $gc("troopDead",report);
	for( var i=0; i<divs.length; i++ ) {
		divs[i].setAttribute('alt','Casualties');
	}

	var reportV = report.innerHTML.replace(/<button[\s\S]+?button>/g,'').replace(/\"\"/g,'').
		replace(/<script[\s\S]+?script>/g,'').replace(/alt=\"(.+?)\"/g,">$1<a").replace(/\s{2,}/g,' ').
		replace(/<\/th>|<\/td>/g,"\t").replace(/<\/div>|<\/tr>/g,"\n").onlyText().replace(/\n{2,}/g,'\n')
		.replace(/Trimis:/,"trimis:");
	var form = $e('FORM',[['method','post'],['action','http://travian-reports.net/convert'],['target','_blank']]);
	form.appendChild($e('input',[['type','hidden'],['name','design'],['value',1]]));
	form.appendChild($ee('textarea', reportV, [['name','report'],['cols',30],['rows',10]]));
	form.appendChild($em('DIV',[$e('input',[['type','checkbox'],['name','anonymous']]),"Anonymous"]));
	form.appendChild($em('DIV',[$e('input',[['type','checkbox'],['name','h_a']]),"Hide attaker"]));
	form.appendChild($em('DIV',[$e('input',[['type','checkbox'],['name','h_d']]),"Hide defender"]));
	var newBTX = $ee('BUTTON',gtext("cancel"),[['class',allIDs[15]],['onclick',jsNone]]);
	newBTX.addEventListener('click', cancelLog, true);
	form.appendChild($em('DIV',[$e('input',[['type','submit'],['name','step1']]),newBTX]));
	var newRF = $ee('DIV',form,[['style','background-color:cyan;']]);

	var xy = offsetPosition(this);
	windowID[8] = makeFloat(newRF, xy[0]-100, xy[1]-250, 21);
}

/************************** center number ****************************/
function centerNumber () {

var dorf = 0;
var bCost = [[0],//dummy
[//Woodcutter Cost gid = 1
[0,0,0,0,0,0],
[40,100,50,60,1,2],
[65,165,85,100,1,3],
[110,280,140,165,2,4],
[185,465,235,280,2,5],
[310,780,390,465,2,6],
[520,1300,650,780,3,8],
[870,2170,1085,1300,4,10],
[1450,3625,1810,2175,4,12],
[2420,6050,3025,3630,5,14],
[4040,10105,5050,6060,6,16],//10
[6750,16870,8435,10125,7,18],
[11270,28175,14090,16905,9,20],
[18820,47055,23525,28230,11,22],
[31430,78580,39290,47150,13,24],
[52490,131230,65615,78740,15,26],
[87660,219155,109575,131490,18,29],
[146395,365985,182995,219590,22,32],
[244480,611195,305600,366715,27,35],
[408280,1020695,510350,612420,32,38],
[681825,1704565,852280,1022740,38,41],//20
[1138650,2846620,1423310,1707970,38,44],
[1901540,4753855,2376925,2852315,38,47],
[3175575,7938935,3969470,4763360,38,50],
[5303210,13258025,6629015,7954815,38,53],
[8856360,22140900,11070450,13284540,38,56]//25
],
[//Clay Pit Cost gid = 2
[0,0,0,0,0,0],
[80,40,80,50,1,2],
[135,65,135,85,1,3],
[225,110,225,140,2,4],
[375,185,375,235,2,5],
[620,310,620,390,2,6],
[1040,520,1040,650,3,8],
[1735,870,1735,1085,4,10],
[2900,1450,2900,1810,4,12],
[4840,2420,4840,3025,5,14],
[8080,4040,8080,5050,6,16],//10
[13500,6750,13500,8435,7,18],
[22540,11270,22540,14090,9,20],
[37645,18820,37645,23525,11,22],
[62865,31430,62865,39290,13,24],
[104985,52490,104985,65615,15,26],
[175320,87660,175320,109575,18,29],
[292790,146395,292790,182995,22,32],
[488955,244480,488955,305600,27,35],
[816555,408280,816555,510350,32,38],
[1363650,681825,1363650,852280,38,41],//20
[2277295,1138650,2277295,1423310,38,44],
[3803085,1901540,3803085,2376925,38,47],
[6351150,3175575,6351150,3969470,38,50],
[10606420,5303210,10606420,6629015,38,53],
[17712720,8856360,17712720,11070450,38,56]//25
],
[//Iron Mine Cost gid = 3
[0,0,0,0,0,0],
[100,80,30,60,1,3],
[165,135,50,100,1,5],
[280,225,85,165,2,7],
[465,375,140,280,2,9],
[780,620,235,465,2,11],
[1300,1040,390,780,3,13],
[2170,1735,650,1300,4,15],
[3625,2900,1085,2175,4,17],
[6050,4840,1815,3630,5,19],
[10105,8080,3030,6060,6,21],//10
[16870,13500,5060,10125,7,24],
[28175,22540,8455,16905,9,27],
[47055,37645,14115,28230,11,30],
[78580,62865,23575,47150,13,33],
[131230,104985,39370,78740,15,36],
[219155,175320,65745,131490,18,39],
[365985,292790,109795,219590,22,42],
[611195,488955,183360,366715,27,45],
[1020695,816555,306210,612420,32,48],
[1704565,1363650,511370,1022740,38,51],//20
[2846620,2277295,853985,1707970,38,54],
[4753855,3803085,1426155,2852315,38,57],
[7938935,6351150,2381680,4763360,38,60],
[13258025,10606420,3977410,7954815,38,63],
[22140900,17712720,6642270,13284540,38,66]//25
],
[//Cropland Cost gid = 4
[0,0,0,0,0,0],
[70,90,70,20,1,0],
[115,150,115,35,1,0],
[195,250,195,55,2,0],
[325,420,325,95,2,0],
[545,700,545,155,2,0],
[910,1170,910,260,3,1],
[1520,1950,1520,435,4,2],
[2535,3260,2535,725,4,3],
[4235,5445,4235,1210,5,4],
[7070,9095,7070,2020,6,5],//10
[11810,15185,11810,3375,7,6],
[19725,25360,19725,5635,9,7],
[32940,42350,32940,9410,11,8],
[55005,70720,55005,15715,13,9],
[91860,118105,91860,26245,15,10],
[153405,197240,153405,43830,18,12],
[256190,329385,256190,73195,22,14],
[427835,550075,427835,122240,27,16],
[714485,918625,714485,204140,32,18],
[1193195,1534105,1193195,340915,38,20],//20
[1992635,2561960,1992635,569325,38,22],
[3327700,4278470,3327700,950770,38,24],
[5557255,7145045,5557255,1587785,38,26],
[9280620,11932225,9280620,2651605,38,28],
[15498630,19926810,15498630,4428180,38,30]//25
],
[//Sawmill Cost gid = 5
[0,0,0,0,0,0],
[520,380,290,90,1,4],
[935,685,520,160,1,6],
[1685,1230,940,290,2,8],
[3035,2215,1690,525,2,10],
[5460,3990,3045,945,2,12]
],
[//Brickyard Cost gid = 6
[0,0,0,0,0,0],
[440,480,320,50,1,3],
[790,865,575,90,1,5],
[1425,1555,1035,160,2,7],
[2565,2800,1865,290,2,9],
[4620,5040,3360,525,2,11]
],
[//Iron Foundry Cost gid = 7
[0,0,0,0,0,0],
[200,450,510,120,1,6],
[360,810,920,215,1,9],
[650,1460,1650,390,2,12],
[1165,2625,2975,700,2,15],
[2100,4725,5355,1260,2,18]
],
[//Grain Mill Cost gid = 8
[0,0,0,0,0,0],
[500,440,380,1240,1,3],
[900,790,685,2230,1,5],
[1620,1425,1230,4020,2,7],
[2915,2565,2215,7230,2,9],
[5250,4620,3990,13015,2,11]
],
[//Bakery Cost gid = 9
[0,0,0,0,0,0],
[1200,1480,870,1600,1,4],
[2160,2665,1565,2880,1,6],
[3890,4795,2820,5185,2,8],
[7000,8630,5075,9330,2,10],
[12595,15535,9135,16795,2,12]
],
[//Warehouse Cost gid = 10
[0,0,0,0,0,0],
[130,160,90,40,1,1],
[165,205,115,50,1,2],
[215,260,145,65,2,3],
[275,335,190,85,2,4],
[350,430,240,105,2,5],
[445,550,310,135,3,6],
[570,705,395,175,4,7],
[730,900,505,225,4,8],
[935,1155,650,290,5,9],
[1200,1475,830,370,6,10],//10
[1535,1890,1065,470,7,12],
[1965,2420,1360,605,9,14],
[2515,3095,1740,775,11,16],
[3220,3960,2230,990,13,18],
[4120,5070,2850,1270,15,20],
[5275,6490,3650,1625,18,22],
[6750,8310,4675,2075,22,24],
[8640,10635,5980,2660,27,26],
[11060,13610,7655,3405,32,28],
[14155,17420,9800,4355,38,30]//20
],
[//Granary Cost gid = 11
[0,0,0,0,0,0],
[80,100,70,20,1,1],
[100,130,90,25,1,2],
[130,165,115,35,2,3],
[170,210,145,40,2,4],
[215,270,190,55,2,5],
[275,345,240,70,3,6],
[350,440,310,90,4,7],
[450,565,395,115,4,8],
[575,720,505,145,5,9],
[740,920,645,185,6,10],//10
[945,1180,825,235,7,12],
[1210,1510,1060,300,9,14],
[1545,1935,1355,385,11,16],
[1980,2475,1735,495,13,18],
[2535,3170,2220,635,15,20],
[3245,4055,2840,810,18,22],
[4155,5190,3635,1040,22,24],
[5315,6645,4650,1330,27,26],
[6805,8505,5955,1700,32,28],
[8710,10890,7620,2180,38,30]//20
],
[//Blacksmith Cost gid = 12
[0,0,0,0,0,0],
[170,200,380,130,2,4],
[220,255,485,165,3,6],
[280,330,625,215,3,8],
[355,420,795,275,4,10],
[455,535,1020,350,5,12],
[585,685,1305,445,6,15],
[750,880,1670,570,7,18],
[955,1125,2140,730,9,21],
[1225,1440,2740,935,10,24],
[1570,1845,3505,1200,12,27],//10
[2005,2360,4485,1535,15,30],
[2570,3020,5740,1965,18,33],
[3290,3870,7350,2515,21,36],
[4210,4950,9410,3220,26,39],
[5390,6340,12045,4120,31,42],
[6895,8115,15415,5275,37,46],
[8825,10385,19730,6750,44,50],
[11300,13290,25255,8640,53,54],
[14460,17015,32325,11060,64,58],
[18510,21780,41380,14155,77,62]//20
],
[//Smithy Cost gid = 13
[0,0,0,0,0,0],
[180,250,500,160,2,4],
[230,320,640,205,3,6],
[295,410,820,260,3,8],
[375,525,1050,335,4,10],
[485,670,1340,430,5,12],
[620,860,1720,550,6,15],
[790,1100,2200,705,7,18],
[1015,1405,2815,900,9,21],
[1295,1800,3605,1155,10,24],
[1660,2305,4610,1475,12,27],//10
[2125,2950,5905,1890,15,30],
[2720,3780,7555,2420,18,33],
[3480,4835,9670,3095,21,36],
[4455,6190,12380,3960,26,39],
[5705,7925,15845,5070,31,42],
[7300,10140,20280,6490,37,46],
[9345,12980,25960,8310,44,50],
[11965,16615,33230,10635,53,54],
[15315,21270,42535,13610,64,58],
[19600,27225,54445,17420,77,62]//20
],
[//Tournament Square Cost gid = 14
[0,0,0,0,0,0],
[1750,2250,1530,240,1,1],
[2240,2880,1960,305,1,2],
[2865,3685,2505,395,2,3],
[3670,4720,3210,505,2,4],
[4700,6040,4105,645,2,5],
[6015,7730,5255,825,3,6],
[7695,9895,6730,1055,4,7],
[9850,12665,8615,1350,4,8],
[12610,16215,11025,1730,5,9],
[16140,20755,14110,2215,6,10],//10
[20660,26565,18065,2835,7,12],
[26445,34000,23120,3625,9,14],
[33850,43520,29595,4640,11,16],
[43330,55705,37880,5940,13,18],
[55460,71305,48490,7605,15,20],
[70990,91270,62065,9735,18,22],
[90865,116825,79440,12460,22,24],
[116305,149540,101685,15950,27,26],
[148875,191410,130160,20415,32,28],
[190560,245005,166600,26135,38,30]//20
],
[//Main Building Cost gid = 15
[0,0,0,0,0,0],
[70,40,60,20,2,2],
[90,50,75,25,3,3],
[115,65,100,35,3,4],
[145,85,125,40,4,5],
[190,105,160,55,5,6],
[240,135,205,70,6,8],
[310,175,265,90,7,10],
[395,225,340,115,9,12],
[505,290,430,145,10,14],
[645,370,555,185,12,16],//10
[825,470,710,235,15,18],
[1060,605,905,300,18,20],
[1355,775,1160,385,21,22],
[1735,990,1485,495,26,24],
[2220,1270,1900,635,31,26],
[2840,1625,2435,810,37,29],
[3635,2075,3115,1040,44,32],
[4650,2660,3990,1330,53,35],
[5955,3405,5105,1700,64,38],
[7620,4355,6535,2180,77,41]//20
],
[//Rally Point Cost gid = 16
[0,0,0,0,0,0],
[110,160,90,70,1,1],
[140,205,115,90,1,2],
[180,260,145,115,2,3],
[230,335,190,145,2,4],
[295,430,240,190,2,5],
[380,550,310,240,3,6],
[485,705,395,310,4,7],
[620,900,505,395,4,8],
[795,1155,650,505,5,9],
[1015,1475,830,645,6,10],//10
[1300,1890,1065,825,7,12],
[1660,2420,1360,1060,9,14],
[2130,3095,1740,1355,11,16],
[2725,3960,2230,1735,13,18],
[3485,5070,2850,2220,15,20],
[4460,6490,3650,2840,18,22],
[5710,8310,4675,3635,22,24],
[7310,10635,5980,4650,27,26],
[9360,13610,7655,5955,32,28],
[11980,17420,9800,7620,38,30]//20
],
[//Marketplace Cost gid = 17
[0,0,0,0,0,0],
[80,70,120,70,4,4],
[100,90,155,90,4,6],
[130,115,195,115,5,8],
[170,145,250,145,6,10],
[215,190,320,190,7,12],
[275,240,410,240,9,15],
[350,310,530,310,11,18],
[450,395,675,395,13,21],
[575,505,865,505,15,24],
[740,645,1105,645,19,27],//10
[945,825,1415,825,22,30],
[1210,1060,1815,1060,27,33],
[1545,1355,2320,1355,32,38],
[1980,1735,2970,1735,39,41],
[2535,2220,3805,2220,46,44],
[3245,2840,4870,2840,55,48],
[4155,3635,6230,3635,67,52],
[5315,4650,7975,4650,80,56],
[6805,5955,10210,5955,96,60],
[8710,7620,13065,7620,115,64]//20
],
[//Embassy Cost gid = 18
[0,0,0,0,0,0],
[180,130,150,80,5,3],
[230,165,190,100,6,5],
[295,215,245,130,7,7],
[375,275,315,170,8,9],
[485,350,405,215,10,11],
[620,445,515,275,12,13],
[790,570,660,350,14,15],
[1015,730,845,450,17,17],
[1295,935,1080,575,21,19],
[1660,1200,1385,740,25,21],//10
[2125,1535,1770,945,30,24],
[2720,1965,2265,1210,36,27],
[3480,2515,2900,1545,43,30],
[4455,3220,3715,1980,51,33],
[5705,4120,4755,2535,62,36],
[7300,5275,6085,3245,74,39],
[9345,6750,7790,4155,89,42],
[11965,8640,9970,5315,106,45],
[15315,11060,12760,6805,128,48],
[19600,14155,16335,8710,153,51]//20
],
[//Barracks Cost gid = 19
[0,0,0,0,0,0],
[210,140,260,120,1,4],
[270,180,335,155,1,6],
[345,230,425,195,2,8],
[440,295,545,250,2,10],
[565,375,700,320,2,12],
[720,480,895,410,3,15],
[925,615,1145,530,4,18],
[1180,790,1465,675,4,21],
[1515,1010,1875,865,5,24],
[1935,1290,2400,1105,6,27],//10
[2480,1655,3070,1415,7,30],
[3175,2115,3930,1815,9,33],
[4060,2710,5030,2320,11,36],
[5200,3465,6435,2970,13,39],
[6655,4435,8240,3805,15,42],
[8520,5680,10545,4870,18,46],
[10905,7270,13500,6230,22,50],
[13955,9305,17280,7975,27,54],
[17865,11910,22120,10210,32,58],
[22865,15245,28310,13065,38,62]//20
],
[//Stable Cost gid = 20
[0,0,0,0,0,0],
[260,140,220,100,2,5],
[335,180,280,130,3,8],
[425,230,360,165,3,11],
[545,295,460,210,4,14],
[700,375,590,270,5,17],
[895,480,755,345,6,20],
[1145,615,970,440,7,23],
[1465,790,1240,565,9,26],
[1875,1010,1585,720,10,29],
[2400,1290,2030,920,12,32],//10
[3070,1655,2595,1180,15,36],
[3930,2115,3325,1510,18,40],
[5030,2710,4255,1935,21,44],
[6435,3465,5445,2475,26,48],
[8240,4435,6970,3170,31,52],
[10545,5680,8925,4055,37,56],
[13500,7270,11425,5190,44,60],
[17280,9305,14620,6645,53,64],
[22120,11910,18715,8505,64,68],
[28310,15245,23955,10890,77,72]//20
],
[//Workshop Cost gid = 21
[0,0,0,0,0,0],
[460,510,600,320,4,3],
[590,655,770,410,4,5],
[755,835,985,525,5,7],
[965,1070,1260,670,6,9],
[1235,1370,1610,860,7,11],
[1580,1750,2060,1100,9,13],
[2025,2245,2640,1405,11,15],
[2590,2870,3380,1800,13,17],
[3315,3675,4325,2305,15,19],
[4245,4705,5535,2950,19,21],//10
[5430,6020,7085,3780,22,24],
[6950,7705,9065,4835,27,27],
[8900,9865,11605,6190,32,30],
[11390,12625,14855,7925,39,33],
[14580,16165,19015,10140,46,36],
[18660,20690,24340,12980,55,39],
[23885,26480,31155,16615,67,42],
[30570,33895,39875,21270,80,45],
[39130,43385,51040,27225,96,48],
[50090,55535,65335,34845,115,51]//20
],
[//Academy Cost gid = 22
[0,0,0,0,0,0],
[220,160,90,40,5,4],
[280,205,115,50,6,6],
[360,260,145,65,7,8],
[460,335,190,85,8,10],
[590,430,240,105,10,12],
[755,550,310,135,12,15],
[970,705,395,175,14,18],
[1240,900,505,225,17,21],
[1585,1155,650,290,21,24],
[2030,1475,830,370,25,27],//10
[2595,1890,1065,470,30,30],
[3325,2420,1360,605,36,33],
[4255,3095,1740,775,43,36],
[5445,3960,2230,990,51,39],
[6970,5070,2850,1270,62,42],
[8925,6490,3650,1625,74,46],
[11425,8310,4675,2075,89,50],
[14620,10635,5980,2660,106,54],
[18715,13610,7655,3405,128,58],
[23955,17420,9800,4355,153,62]//20
],
[//Cranny Cost gid = 23
[0,0,0,0,0,0],
[40,50,30,10,1,0],
[50,65,40,15,1,0],
[65,80,50,15,2,0],
[85,105,65,20,2,0],
[105,135,80,25,2,0],
[135,170,105,35,3,1],
[175,220,130,45,4,2],
[225,280,170,55,4,3],
[290,360,215,70,5,4],
[370,460,275,90,6,5]//10
],
[//Town Hall Cost gid = 24
[0,0,0,0,0,0],
[1250,1110,1260,600,6,4],
[1600,1420,1615,770,7,6],
[2050,1820,2065,985,9,8],
[2620,2330,2640,1260,10,10],
[3355,2980,3380,1610,12,12],
[4295,3815,4330,2060,15,15],
[5500,4880,5540,2640,18,18],
[7035,6250,7095,3380,21,21],
[9005,8000,9080,4325,26,24],
[11530,10240,11620,5535,31,27],//10
[14755,13105,14875,7085,37,30],
[18890,16775,19040,9065,45,33],
[24180,21470,24370,11605,53,36],
[30950,27480,31195,14855,64,39],
[39615,35175,39930,19015,77,42],
[50705,45025,51110,24340,92,46],
[64905,57635,65425,31155,111,50],
[83075,73770,83740,39875,133,54],
[106340,94430,107190,51040,160,58],
[136115,120870,137200,65335,192,62]//20
],
[//Residence Cost gid = 25
[0,0,0,0,0,0],
[580,460,350,180,2,1],
[740,590,450,230,3,2],
[950,755,575,295,3,3],
[1215,965,735,375,4,4],
[1555,1235,940,485,5,5],
[1995,1580,1205,620,6,6],
[2550,2025,1540,790,7,7],
[3265,2590,1970,1015,9,8],
[4180,3315,2520,1295,11,9],
[5350,4245,3230,1660,12,10],//10
[6845,5430,4130,2125,15,12],
[8765,6950,5290,2720,18,14],
[11220,8900,6770,3480,21,16],
[14360,11390,8665,4455,26,18],
[18380,14580,11090,5705,31,20],
[23530,18660,14200,7300,37,22],
[30115,23885,18175,9345,44,24],
[38550,30570,23260,11965,53,26],
[49340,39130,29775,15315,64,28],
[63155,50090,38110,19600,77,30]//20
],
[//Palace Cost gid = 26
[0,0,0,0,0,0],
[550,800,750,250,6,1],
[705,1025,960,320,7,2],
[900,1310,1230,410,9,3],
[1155,1680,1575,525,10,4],
[1475,2145,2015,670,12,5],
[1890,2750,2575,860,15,6],
[2420,3520,3300,1100,18,7],
[3095,4505,4220,1405,21,8],
[3965,5765,5405,1800,26,9],
[5075,7380,6920,2305,31,10],//10
[6495,9445,8855,2950,37,12],
[8310,12090,11335,3780,45,14],
[10640,15475,14505,4835,53,16],
[13615,19805,18570,6190,64,18],
[17430,25355,23770,7925,77,20],
[22310,32450,30425,10140,92,22],
[28560,41540,38940,12980,111,24],
[36555,53170,49845,16615,133,26],
[46790,68055,63805,21270,160,28],
[59890,87110,81670,27225,192,30]//20
],
[//Treasury Cost gid = 27
[0,0,0,0,0,0],
[2880,2740,2580,990,7,4],
[3630,3450,3250,1245,9,6],
[4570,4350,4095,1570,10,8],
[5760,5480,5160,1980,12,10],
[7260,6905,6505,2495,15,12],
[9145,8700,8195,3145,18,15],
[11525,10965,10325,3960,21,18],
[14520,13815,13010,4990,26,21],
[18295,17405,16390,6290,31,24],
[23055,21930,20650,7925,37,27],//10
[29045,27635,26020,9985,45,30],
[36600,34820,32785,12580,53,33],
[46115,43875,41310,15850,64,36],
[58105,55280,52050,19975,77,39],
[73210,69655,65585,25165,92,42],
[92245,87760,82640,31710,111,46],
[116230,110580,104125,39955,133,50],
[146450,139330,131195,50340,160,54],
[184530,175560,165305,63430,192,58],
[232505,221205,208285,79925,230,62]//20
],
[//Trade Office Cost gid = 28
[0,0,0,0,0,0],
[1400,1330,1200,400,4,3],
[1790,1700,1535,510,4,5],
[2295,2180,1965,655,5,7],
[2935,2790,2515,840,6,9],
[3760,3570,3220,1075,7,11],
[4810,4570,4125,1375,9,13],
[6155,5850,5280,1760,11,15],
[7880,7485,6755,2250,13,17],
[10090,9585,8645,2880,15,19],
[12915,12265,11070,3690,19,21],//10
[16530,15700,14165,4720,22,24],
[21155,20100,18135,6045,27,27],
[27080,25725,23210,7735,32,30],
[34660,32930,29710,9905,39,33],
[44370,42150,38030,12675,46,36],
[56790,53950,48680,16225,55,39],
[72690,69060,62310,20770,67,42],
[93045,88395,79755,26585,80,45],
[119100,113145,102085,34030,96,48],
[152445,144825,130670,43555,115,51]//20
],
[//Great Barracks Cost gid = 29
[0,0,0,0,0,0],
[630,420,780,360,1,4],
[805,540,1000,460,1,6],
[1030,690,1280,590,2,8],
[1320,880,1635,755,2,10],
[1690,1125,2095,965,2,12],
[2165,1445,2680,1235,3,15],
[2770,1845,3430,1585,4,18],
[3545,2365,4390,2025,4,21],
[4540,3025,5620,2595,5,24],
[5810,3875,7195,3320,6,27],//10
[7440,4960,9210,4250,7,30],
[9520,6345,11785,5440,9,33],
[12185,8125,15085,6965,11,36],
[15600,10400,19310,8915,13,39],
[19965,13310,24720,11410,15,42],
[25555,17035,31640,14605,18,46],
[32710,21810,40500,18690,22,50],
[41870,27915,51840,23925,27,54],
[53595,35730,66355,30625,32,58],
[68600,45735,84935,39200,38,62]//20
],
[//Great Stable Cost gid = 30
[0,0,0,0,0,0],
[780,420,660,300,2,5],
[1000,540,845,385,3,8],
[1280,690,1080,490,3,11],
[1635,880,1385,630,4,14],
[2095,1125,1770,805,5,17],
[2680,1445,2270,1030,6,20],
[3430,1845,2905,1320,7,23],
[4390,2365,3715,1690,9,26],
[5620,3025,4755,2160,10,29],
[7195,3875,6085,2765,12,32],//10
[9210,4960,7790,3540,15,36],
[11785,6345,9975,4535,18,40],
[15085,8125,12765,5805,21,44],
[19310,10400,16340,7430,26,48],
[24720,13310,20915,9505,31,52],
[31640,17035,26775,12170,37,56],
[40500,21810,34270,15575,44,60],
[51840,27915,43865,19940,53,64],
[66355,35730,56145,25520,64,68],
[84935,45735,71870,32665,77,72]//20
],
[//City Wall Cost gid = 31
[0,0,0,0,0,0],
[70,90,170,70,1,0],
[90,115,220,90,1,0],
[115,145,280,115,2,0],
[145,190,355,145,2,0],
[190,240,455,190,2,0],
[240,310,585,240,3,1],
[310,395,750,310,4,2],
[395,505,955,395,4,3],
[505,650,1225,505,5,4],
[645,830,1570,645,6,5],//10
[825,1065,2005,825,7,6],
[1060,1360,2570,1060,9,7],
[1355,1740,3290,1355,11,8],
[1735,2230,4210,1735,13,9],
[2220,2850,5390,2220,15,10],
[2840,3650,6895,2840,18,12],
[3635,4675,8825,3635,22,14],
[4650,5980,11300,4650,27,16],
[5955,7655,14460,5955,32,18],
[7620,9800,18510,7620,38,20]//20
],
[//Earth Wall Cost gid = 32
[0,0,0,0,0,0],
[120,200,0,80,1,0],
[155,255,0,100,1,0],
[195,330,0,130,2,0],
[250,420,0,170,2,0],
[320,535,0,215,2,0],
[410,685,0,275,3,1],
[530,880,0,350,4,2],
[675,1125,0,450,4,3],
[865,1440,0,575,5,4],
[1105,1845,0,740,6,5],//10
[1415,2360,0,945,7,6],
[1815,3020,0,1210,9,7],
[2320,3870,0,1545,11,8],
[2970,4950,0,1980,13,9],
[3805,6340,0,2535,15,10],
[4870,8115,0,3245,18,12],
[6230,10385,0,4155,22,14],
[7975,13290,0,5315,27,16],
[10210,17015,0,6805,32,18],
[13065,21780,0,8710,38,20]//20
],
[//Palisade Cost gid = 33
[0,0,0,0,0,0],
[160,100,80,60,1,0],
[205,130,100,75,1,0],
[260,165,130,100,2,0],
[335,210,170,125,2,0],
[430,270,215,160,2,0],
[550,345,275,205,3,1],
[705,440,350,265,4,2],
[900,565,450,340,4,3],
[1155,720,575,430,5,4],
[1475,920,740,555,6,5],//10
[1890,1180,945,710,7,6],
[2420,1510,1210,905,9,7],
[3095,1935,1545,1160,11,8],
[3960,2475,1980,1485,13,9],
[5070,3170,2535,1900,15,10],
[6490,4055,3245,2435,18,12],
[8310,5190,4155,3115,22,14],
[10635,6645,5315,3990,27,16],
[13610,8505,6805,5105,32,18],
[17420,10890,8710,6535,38,20]//20
],
[//Stonemason's Lodge Cost gid = 34
[0,0,0,0,0,0],
[155,130,125,70,1,2],
[200,165,160,90,1,3],
[255,215,205,115,2,4],
[325,275,260,145,2,5],
[415,350,335,190,2,6],
[535,445,430,240,3,8],
[680,570,550,310,4,10],
[875,730,705,395,4,12],
[1115,935,900,505,5,14],
[1430,1200,1155,645,6,16],//10
[1830,1535,1475,825,7,18],
[2340,1965,1890,1060,9,20],
[3000,2515,2420,1355,11,22],
[3840,3220,3095,1735,13,24],
[4910,4120,3960,2220,15,26],
[6290,5275,5070,2840,18,29],
[8050,6750,6490,3635,22,32],
[10300,8640,8310,4650,27,35],
[13185,11060,10635,5955,32,38],
[16880,14155,13610,7620,38,41]//20
],
[//Brewery Cost gid = 35
[0,0,0,0,0,0],
[1460,930,1250,1740,5,6],
[2045,1300,1750,2435,6,9],
[2860,1825,2450,3410,7,12],
[4005,2550,3430,4775,8,15],
[5610,3575,4800,6685,10,18],
[7850,5000,6725,9360,12,22],
[10995,7000,9410,13100,14,26],
[15390,9805,13175,18340,17,30],
[21545,13725,18445,25680,21,34],
[30165,19215,25825,35950,25,38]//10
],
[//Trapper Cost gid = 36
[0,0,0,0,0,0],
[80,120,70,90,1,4],
[100,155,90,115,1,6],
[130,195,115,145,2,8],
[170,250,145,190,2,10],
[215,320,190,240,2,12],
[275,410,240,310,3,15],
[350,530,310,395,4,18],
[450,675,395,505,4,21],
[575,865,505,650,5,24],
[740,1105,645,830,6,27],//10
[945,1415,825,1065,7,30],
[1210,1815,1060,1360,9,33],
[1545,2320,1355,1740,11,36],
[1980,2970,1735,2230,13,39],
[2535,3805,2220,2850,15,42],
[3245,4870,2840,3650,18,46],
[4155,6230,3635,4675,22,50],
[5315,7975,4650,5980,27,54],
[6805,10210,5955,7655,32,58],
[8710,13065,7620,9800,38,62]//20
],
[//Hero's Mansion Cost gid = 37
[0,0,0,0,0,0],
[700,670,700,240,1,2],
[930,890,930,320,1,3],
[1240,1185,1240,425,2,4],
[1645,1575,1645,565,2,5],
[2190,2095,2190,750,2,6],
[2915,2790,2915,1000,3,8],
[3875,3710,3875,1330,4,10],
[5155,4930,5155,1765,4,12],
[6855,6560,6855,2350,5,14],
[9115,8725,9115,3125,6,16],//10
[12125,11605,12125,4155,7,18],
[16125,15435,16125,5530,9,20],
[21445,20525,21445,7350,11,22],
[28520,27300,28520,9780,13,24],
[37935,36310,37935,13005,15,24],
[50450,48290,50450,17300,18,27],
[67100,64225,67100,23005,22,30],
[89245,85420,89245,30600,27,33],
[118695,113605,118695,40695,32,36],
[157865,151095,157865,54125,37,39]//20
],
[//Great Warehouse Cost gid = 38
[0,0,0,0,0,0],
[650,800,450,200,1,1],
[830,1025,575,255,1,2],
[1065,1310,735,330,2,3],
[1365,1680,945,420,2,4],
[1745,2145,1210,535,2,5],
[2235,2750,1545,685,3,6],
[2860,3520,1980,880,4,7],
[3660,4505,2535,1125,4,8],
[4685,5765,3245,1440,5,9],
[5995,7380,4150,1845,6,10],//10
[7675,9445,5315,2360,7,12],
[9825,12090,6800,3020,9,14],
[12575,15475,8705,3870,11,16],
[16095,19805,11140,4950,13,18],
[20600,25355,14260,6340,15,20],
[26365,32450,18255,8115,18,22],
[33750,41540,23365,10385,22,24],
[43200,53170,29910,13290,27,26],
[55295,68055,38280,17015,32,28],
[70780,87110,49000,21780,38,30]//20
],
[//Great Granary Cost gid = 39
[0,0,0,0,0,0],
[400,500,350,100,1,1],
[510,640,450,130,1,2],
[655,820,575,165,2,3],
[840,1050,735,210,2,4],
[1075,1340,940,270,2,5],
[1375,1720,1205,345,3,6],
[1760,2200,1540,440,4,7],
[2250,2815,1970,565,4,8],
[2880,3605,2520,720,5,9],
[3690,4610,3230,920,6,10],//10
[4720,5905,4130,1180,7,12],
[6045,7555,5290,1510,9,14],
[7735,9670,6770,1935,11,16],
[9905,12380,8665,2475,13,18],
[12675,15845,11090,3170,15,20],
[16225,20280,14200,4055,18,22],
[20770,25960,18175,5190,22,24],
[26585,33230,23260,6645,27,26],
[34030,42535,29775,8505,32,28],
[43555,54445,38110,10890,38,30]//20
],
[//WW Cost gid = 40
[0,0,0,0,0,0],
[66700,69050,72200,13200,0,1],
[68535,70950,74185,13565,0,2],
[70420,72900,76225,13935,0,3],
[72355,74905,78320,14320,0,4],
[74345,76965,80475,14715,0,5],
[76390,79080,82690,15120,0,6],
[78490,81255,84965,15535,0,7],
[80650,83490,87300,15960,0,8],
[82865,85785,89700,16400,0,9],
[85145,88145,92165,16850,0,10],//10
[87485,90570,94700,17315,0,12],
[89895,93060,97305,17790,0,14],
[92365,95620,99980,18280,0,16],
[94905,98250,102730,18780,0,18],
[97515,100950,105555,19300,0,20],
[100195,103725,108460,19830,0,22],
[102950,106580,111440,20375,0,24],
[105785,109510,114505,20935,0,26],
[108690,112520,117655,21510,0,28],
[111680,115615,120890,22100,0,30],//20
[114755,118795,124215,22710,0,33],
[117910,122060,127630,23335,0,36],
[121150,125420,131140,23975,0,39],
[124480,128870,134745,24635,0,42],
[127905,132410,138455,25315,0,45],
[131425,136055,142260,26010,0,48],
[135035,139795,146170,26725,0,51],
[138750,143640,150190,27460,0,54],
[142565,147590,154320,28215,0,57],
[146485,151650,158565,28990,0,60],//30
[150515,155820,162925,29785,0,64],
[154655,160105,167405,30605,0,68],
[158910,164505,172010,31450,0,72],
[163275,169030,176740,32315,0,76],
[167770,173680,181600,33200,0,80],
[172380,178455,186595,34115,0,84],
[177120,183360,191725,35055,0,88],
[181995,188405,197000,36015,0,92],
[186995,193585,202415,37005,0,96],
[192140,198910,207985,38025,0,100],//40
[197425,204380,213705,39070,0,105],
[202855,210000,219580,40145,0,110],
[208430,215775,225620,41250,0,115],
[214165,221710,231825,42385,0,120],
[220055,227805,238200,43550,0,125],
[226105,234070,244750,44745,0,130],
[232320,240505,251480,45975,0,135],
[238710,247120,258395,47240,0,140],
[245275,253915,265500,48540,0,145],
[252020,260900,272800,49875,0,150],//50
[258950,268075,280305,51245,0,156],
[266070,275445,288010,52655,0,162],
[273390,283020,295930,54105,0,168],
[280905,290805,304070,55590,0,174],
[288630,298800,312430,57120,0,180],
[296570,307020,321025,58690,0,186],
[304725,315460,329850,60305,0,192],
[313105,324135,338925,61965,0,198],
[321715,333050,348245,63670,0,204],
[330565,342210,357820,65420,0,210],//60
[339655,351620,367660,67220,0,217],
[348995,361290,377770,69065,0,224],
[358590,371225,388160,70965,0,231],
[368450,381435,398835,72915,0,238],
[378585,391925,409800,74920,0,245],
[388995,402700,421070,76985,0,252],
[399695,413775,432650,79100,0,259],
[410685,425155,444550,81275,0,266],
[421980,436845,456775,83510,0,273],
[433585,448860,469335,85805,0,280],//70
[445505,461205,482240,88165,0,288],
[457760,473885,495505,90590,0,296],
[470345,486920,509130,93080,0,304],
[483280,500310,523130,95640,0,312],
[496570,514065,537520,98270,0,320],
[510225,528205,552300,100975,0,328],
[524260,542730,567490,103750,0,336],
[538675,557655,583095,106605,0,344],
[553490,572990,599130,109535,0,352],
[568710,588745,615605,112550,0,360],//80
[584350,604935,632535,115645,0,369],
[600420,621575,649930,118825,0,378],
[616930,638665,667800,122090,0,387],
[633895,656230,686165,125450,0,396],
[651330,674275,705035,128900,0,405],
[669240,692820,724425,132445,0,414],
[687645,711870,744345,136085,0,423],
[706555,731445,764815,139830,0,432],
[725985,751560,785850,143675,0,441],
[745950,772230,807460,147625,0,450],//90
[766460,793465,829665,151685,0,460],
[787540,815285,852480,155855,0,470],
[809195,837705,875920,160140,0,480],
[831450,860745,900010,164545,0,490],
[854315,884415,924760,169070,0,500],
[877810,908735,950190,173720,0,510],
[901950,933725,976320,178495,0,520],
[926750,959405,1000000,183405,0,530],
[952235,985785,1000000,188450,0,540],
[1000000,1000000,1000000,193630,0,550]//100
],
[//Horse Drinking Trough Cost gid = 41
[0,0,0,0,0,0],
[780,420,660,540,4,5],
[1000,540,845,690,4,8],
[1280,690,1080,885,5,11],
[1635,880,1385,1130,6,14],
[2095,1125,1770,1450,7,17],
[2680,1445,2270,1855,9,20],
[3430,1845,2905,2375,11,23],
[4390,2365,3715,3040,13,26],
[5620,3025,4755,3890,15,29],
[7195,3875,6085,4980,19,31],//10
[9210,4960,7790,6375,22,35],
[11785,6345,9975,8160,27,39],
[15085,8125,12765,10445,32,43],
[19310,10400,16340,13370,39,47],
[24720,13310,20915,17115,46,51],
[31640,17035,26775,21905,55,55],
[40500,21810,34270,28040,67,59],
[51840,27915,43865,35890,80,63],
[66355,35730,56145,45940,96,67],
[84935,45735,71870,58800,115,71]//20
],
[//Stone Wall Cost gid = 42
[0,0,0,0,0,0],
[110,160,70,60,0,1],
[140,205,90,75,0,1],
[180,260,115,100,0,2],
[230,335,145,125,0,2],
[295,430,190,160,0,2],
[380,550,240,205,1,3],
[485,705,310,265,1,4],
[620,900,395,340,1,4],
[795,1155,505,430,1,5],
[1015,1475,645,555,1,6],//10
[1300,1890,825,710,1,7],
[1660,2420,1060,905,1,9],
[2130,3095,1355,1160,1,11],
[2725,3960,1735,1485,1,13],
[3485,5070,2220,1900,1,15],
[4460,6490,2840,2435,2,18],
[5710,8310,3635,3115,2,22],
[7310,10635,4650,3990,2,27],
[9360,13610,5955,5105,2,32],
[11980,17420,7620,6535,2,38]//20
],
[//Makeshift Wall Cost gid = 43
[0,0,0,0,0,0],
[50,80,40,30,0,1],
[65,100,50,40,0,1],
[80,130,65,50,0,2],
[105,170,85,65,0,2],
[135,215,105,80,0,2],
[170,275,135,105,1,3],
[220,350,175,130,1,4],
[280,450,225,170,1,4],
[360,575,290,215,1,5],
[460,740,370,275,1,6],//10
[590,945,470,355,1,7],
[755,1210,605,455,1,9],
[965,1545,775,580,1,11],
[1240,1980,990,745,1,13],
[1585,2535,1270,950,1,15],
[2030,3245,1625,1215,2,18],
[2595,4155,2075,1560,2,22],
[3325,5315,2660,1995,2,27],
[4255,6805,3405,2550,2,32],
[5445,8710,4355,3265,2,38]//20
],
[//Command Center Cost gid = 44
[0,0,0,0,0,0],
[1600,1250,1050,200,1,2],
[1950,1525,1280,245,1,3],
[2380,1860,1565,300,1,3],
[2905,2270,1905,365,1,4],
[3545,2770,2325,445,1,5],
[4325,3380,2840,540,1,6],
[5275,4120,3460,660,1,7],
[6435,5030,4225,805,1,9],
[7850,6135,5155,980,1,10],
[9580,7485,6285,1195,1,12],//10
[11685,9130,7670,1460,2,15],
[14260,11140,9355,1780,2,18],
[17395,13590,11415,2175,2,21],
[21225,16580,13925,2655,2,26],
[25890,20230,16990,3235,2,31],
[31590,24680,20730,3950,2,37],
[38535,30105,25290,4815,2,44],
[47015,36730,30855,5875,2,53],
[57360,44810,37640,7170,2,64],
[69975,54670,45925,8745,2,77]//20
],
[//Waterworks Cost gid = 45
[0,0,0,0,0,0],
[910,945,910,340,1,1],
[1190,1240,1190,445,1,1],
[1560,1620,1560,585,1,2],
[2045,2125,2045,765,1,2],
[2680,2785,2680,1000,1,2],
[3510,3645,3510,1310,1,3],
[4600,4775,4600,1720,1,4],
[6025,6255,6025,2250,1,4],
[7890,8195,7890,2950,1,5],
[10340,10735,10340,3865,1,6],//10
[13545,14065,13545,5060,2,7],
[17745,18425,17745,6630,2,9],
[23245,24135,23245,8685,2,11],
[30450,31620,30450,11375,2,13],
[39890,41420,39890,14905,2,15],
[52255,54265,52255,19525,2,18],
[68450,71085,68450,25575,2,22],
[89670,93120,89670,33505,2,27],
[117470,121985,117470,43890,2,32],
[153885,159805,153885,57495,2,38]//20
]
];

fieldsOfVillage = {
	'f1':	[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //9 crop
	'f2':	[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-5-6
	'f3':	[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-4-6
	'f4':	[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-5-3-6
	'f5':	[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //5-3-4-6
	'f6':	[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3], //15 crop
	'f7':	[0, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-4-3-7
	'f8':	[2, 3, 3, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-4-4-7
	'f9':	[2, 3, 3, 0, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //4-3-4-7
	'f10':	[2, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], //3-5-4-6
	'f11':	[2, 0, 0, 2, 0, 3, 3, 2, 2, 1, 1, 2, 0, 3, 3, 1, 3, 3], //4-3-5-6
	'f12':	[0, 3, 0, 0, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1]  //5-4-3-6
};
//		'f99':	'Natarian village',

// ?????? Main.
function TM_ShowMainBuildingNumbers(dorf){

	var gid;
	var countArray, checkWW=false;
	var mapOffset = 1;
	// ?????? Map1 holds building names, level and building spot IDs in area elements (2 are duplicate walls to be ignored).

	// active buildings
	var bldText = $xf('.//script[contains(text(),"bld=")]','f',cont);
	var bldArr = new Array(45);
	if( bldText ) {
		eval(bldText.textContent);
		for( var i=0; i<bld.length; i++ ) bldArr[bld[i]['aid']] = bld[i]['stufe'];
	}

	var mapInfo = $g('clickareas');
	if ( mapInfo ) {
		countArray = 22;
		dorf = 2;
		mapOffset = 19;
		var levels = $xf('./DIV','l',$g('levels'));
		var lRef = 0;
	} else {
		mapInfo = $g('rx');
		if ( mapInfo ) {
			countArray = 18;
			dorf = 1;
			var levels = $xf('./DIV','l',$g('village_map'));
		}
	}

	if ( mapInfo ) {
	} else {
		mapInfo = $g('village_map');
		mapOffset = 19;
		var lswitch = $g('lswitch');
		var blswitch = false;
		var levels = $xf('.//div[contains(@class,"labelLayer")]','l',mapInfo);
		var lRef = 0;

		if ( lswitch ) {
			if ( lswitch.className == "lswitchPlus" ) {
				blswitch = true;
				levels = $xf('.//div[contains(@class,"level")]','l',mapInfo);
			}
		}
		var imageElements = $xf('.//img[contains(@class,"building")]','l',mapInfo);
		var BuildingLevel, smallDIV, coords, doubleFL;

		for (var i = 0; i < imageElements.snapshotLength; i++) {
			if ( /iso/.test(imageElements.snapshotItem(i).getAttribute('class') )) continue;
			BuildingLevel = imageElements.snapshotItem(i).previousSibling.textContent;
			if (! BuildingLevel) continue;
			BuildingLevel = parseInt(BuildingLevel);

			gid = parseInt(/(\d+)/.exec(imageElements.snapshotItem(i).getAttribute('class'))[1]);
			smallDIV = levels.snapshotItem(lRef++);

			if( bldArr[i+mapOffset] ) {
				setInterval(function(x){return function(){
					x.style.color = x.style.color=='white'?'black':'white';}
				}(smallDIV),800);
				if( BuildingLevel==0 ) smallDIV.textContent='0 ';
				BuildingLevel = bldArr[i+mapOffset];
			}

			try {
				var resneed = bCost[gid][BuildingLevel+1];
			} catch (err) {
				continue;
			}

			if (blswitch) { smallDIV.style.borderRadius = "50%"; smallDIV.style.backgroundImage = "none"; }
			if (BuildingLevel == getMaxLevel(gid)) {
				smallDIV.style.backgroundColor = getColor(4);//green
			}else if( resneed[0] > fullRes[0] || resneed[1] > fullRes[0] || resneed[2] > fullRes[0] || resneed[3] > fullRes[3] ) {
				smallDIV.style.backgroundColor = getColor(3);//magenta
			}else if( (resNow[0]+resNow[1]+resNow[2]+resNow[3]) >= (resneed[0]+resneed[1]+resneed[2]+resneed[3]) ){
				if(resNow[0] >= resneed[0] && resNow[1] >= resneed[1] && resNow[2] >= resneed[2] && resNow[3] >= resneed[3]){
					smallDIV.style.backgroundColor = getColor(0);//white
				}else{
					smallDIV.style.backgroundColor = getColor(1);//orange #FFC85B
				}
			}else if (parseInt(resneed[0]) > resNow[0] ||
				parseInt(resneed[1]) > resNow[1] ||
				parseInt(resneed[2]) > resNow[2] ||
				parseInt(resneed[3]) > resNow[3] ){
				smallDIV.style.backgroundColor = getColor(2);//red
			}
		}
		return;
	}

	if( !(mapInfo) ) return;

	var areaElements = $gt('area', mapInfo);
	var imageElements =  $gt('img',$g('village_map'));
	var BuildingLevel, smallDIV, coords, doubleFL;

	if (dorf == 2) {
		if( countArray > imageElements.length-1 ) {
			checkWW = true;
			countArray = areaElements.length;
		}
	}

	for (var i = 0; i < countArray; i++) {
		BuildingLevel = /\d+/.exec(areaElements[i].alt.replace(/&#([0-9]{2,4});/g,""));
		if (! BuildingLevel) BuildingLevel = /\d+/.exec(areaElements[i].title);
		if (! BuildingLevel) continue;

		var j = 0;
		if (dorf == 2) {
			gid = parseInt(/(\d+)\S*$/.exec(imageElements[i].getAttribute('class'))[1]);
			if( checkWW ) {
				if( i == 6 ) gid = 40;
				if( i > 9 ) j = 4;
				else if ( i > 1 ) j = 1;
			}
			smallDIV = levels.snapshotItem(lRef++);
			doubleFL = $gt('DIV',smallDIV).length>0 ? true:false;
		}
		if (dorf == 1){
			var typeOfVillage = $g('village_map').getAttribute('class');
			gid = fieldsOfVillage[typeOfVillage][i]+1;
			smallDIV = levels.snapshotItem(i);
			doubleFL = $gt('DIV',smallDIV).length>0 ? true:false;
		}

		if( doubleFL ) smallDIV = $gt('DIV',smallDIV)[0];
		else smallDIV.className += ' '+allIDs[42];

		if( bldArr[i+mapOffset+j] ) {
			setInterval(function(x){return function(){
				x.style.color = x.style.color=='white'?'black':'white';}
			}(smallDIV),800);
			if( parseInt(BuildingLevel[0])==0 ) smallDIV.innerHTML='0 ';
			BuildingLevel[0] = bldArr[i+mapOffset+j];
		}

		try {
			var resneed = bCost[gid][parseInt(BuildingLevel[0])+1];
		} catch (err) {
			continue;
		}

		if (parseInt(BuildingLevel[0]) == getMaxLevel(gid)) {
			smallDIV.style.backgroundColor = getColor(4);//green
		}else if( resneed[0] > fullRes[0] || resneed[1] > fullRes[0] || resneed[2] > fullRes[0] || resneed[3] > fullRes[3] ) {
			smallDIV.style.backgroundColor = getColor(3);//magenta
		}else if( (resNow[0]+resNow[1]+resNow[2]+resNow[3]) >= (resneed[0]+resneed[1]+resneed[2]+resneed[3]) ){
			if(resNow[0] >= resneed[0] && resNow[1] >= resneed[1] && resNow[2] >= resneed[2] && resNow[3] >= resneed[3]){
				smallDIV.style.backgroundColor = getColor(0);//white
			}else{
				smallDIV.style.backgroundColor = getColor(1);//orange #FFC85B
			}
		}else if (parseInt(resneed[0]) > resNow[0] ||
			parseInt(resneed[1]) > resNow[1] ||
			parseInt(resneed[2]) > resNow[2] ||
			parseInt(resneed[3]) > resNow[3] ){
			smallDIV.style.backgroundColor = getColor(2);//red
		}
	}
}

function getColor(x) {
	return RB.Setup[40+x].length>1 ? RB.Setup[40+x]: cnColors[x];
}

function getMaxLevel(gid) {
	var maxLevel;
	switch (gid) {
		case 1:
		case 2:
		case 3:
		case 4: if( village_aid == RB.dictionary[0] ) maxLevel = RB.dictFL[17]==1 ? 12: 25;
				else maxLevel = 10;
			break;
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			maxLevel = 5;
			break;
		case 23:
		case 35:
			maxLevel = 10;
			break;
		case 40:
			maxLevel = 100;
			break;
		default:
			maxLevel = 20;
	}
	return (maxLevel)
}

function cultureCalc () {
	function createEl (bid,blevel) {
		return $em('SPAN',[' ',$e('IMG',[['src',img_cp],['title',RB.dictionary[19]]]),' '+bCost[bid][blevel][4]+' -> '+bCost[bid][blevel+1][4]+' ',
			$e('IMG',[['src','img/x.gif'],['class','r5'],['title',RB.dictionary[20]]]),' '+bCost[bid][blevel][5]+' -> '+bCost[bid][blevel+1][5]+' ',
			$e('IMG',[['src',img_car]]),'/',$e('IMG',[['src',img_cp],['title',RB.dictionary[19]]]),' ',
			((bCost[bid][blevel+1][4]-bCost[bid][blevel][4])!=0)?Math.round((bCost[bid][blevel+1][0]+bCost[bid][blevel+1][1]+bCost[bid][blevel+1][2]+bCost[bid][blevel+1][3])/(bCost[bid][blevel+1][4]-bCost[bid][blevel][4])).toLocaleString():'-'],
			[['style','white-space:nowrap;']]);
	}
	var blevel = $gc('level',$gt('h1',cont)[0]);
	if( blevel.length > 0 ) {
		var contr = $g('contract');
		if( ! contr ) return;
		if( $gt('INPUT',contr).length > 0 ) return;
		blevel = parseInt(blevel[0].innerHTML.match(/\d+/)[0]);
		var bid = parseInt($g('build').getAttribute('class').match(/\d+/)[0]);
		var clocks = $gc('contractCosts',contr);
		var uc = $gc('underConstruction',cont);
		if (uc.length > 0) blevel++;
		if( clocks.length > 0 ) {
			if( clocks[0].childElementCount > 0 ) {
				var cB = createEl(bid, blevel);
				var cl = $gc('clear',contr);
				if ( cl.length > 0 ) $ib(cB,cl[cl.length-1]);
			} else {
				var cB = $em('SPAN',[' ',$e('IMG',[['src',img_cp],['title',RB.dictionary[19]]]),' '+bCost[bid][blevel][4]+' ',$e('IMG',[['src','img/x.gif'],['class','r5'],['title',RB.dictionary[20]]]),' '+bCost[bid][blevel][5]]);
				contr.appendChild(cB);
			}
		}
	} else {
		var bnew = $gc('contractWrapper',cont);
		for( var i=0; i<bnew.length; i++ ) {
			bid = parseInt(bnew[i].id.match(/\d+/)[0]);
			var clocks = $gc('showCosts',bnew[i]);
			if( clocks.length > 0 ) {
				var cB = createEl(bid, 0);
				var cl = $gc('clear',clocks[0]);
				$ib(cB,cl[cl.length-1]);
			}
		}
	}
}

if( /dorf1.php/.test(crtPath) ) TM_ShowMainBuildingNumbers(1);
if( /dorf2.php/.test(crtPath) ) TM_ShowMainBuildingNumbers(2);
if( /build/.test(window.location.href) ) cultureCalc();
}
/****************************** end Center Number ****************************/

function allyQStats (members) {
	var sumC = 0, sumV = 0;
	for( var i=1; i<members.rows.length; i++ ) {
		sumC += parseInt( members.rows[i].cells[3].textContent );
		sumV += parseInt( members.rows[i].cells[4].textContent );
	}
	i--;
	var semafor = $e('div',[['style','text-align:center;']]);
	var semafor1 = $e('div');
	var semafor2 = $e('div');
	var semafor3 = $e('div');
	for( var t=1; t<6; t++ ) {
		var blue = $xf('.//img[contains(@class,"online'+t+'")]','l',members);
		if( blue.snapshotLength > 0 )
			semafor1.appendChild($em('SPAN',[blue.snapshotItem(0).cloneNode(true),' = ',blue.snapshotLength,'; ']));
	}
	for( var t=1; t<((RB.Setup[47]==1)?8:4); t++ ) {
		if (t==4 || t==5) continue;
		var tribe = $xf('.//div[contains(@class,"tribe'+t+'")]','l',members);
		if( tribe.snapshotLength > 0 ) {
			semafor2.appendChild($e('DIV',[['class','tribeIcon tribe'+t],['style','display:inline-block;']]));
			semafor2.appendChild($ee('SPAN',' = '+tribe.snapshotLength+'; '));
		}
	}
	for( var t=1; t<3; t++ ) {
		var spec = $xf('.//div[contains(@class,"type'+t+'")]','l',members);
		if( spec.snapshotLength > 0 ) {
			semafor3.appendChild($em('SPAN',[$e('DIV',[['class','memberSpecialization type'+t],['style','float:none;']]),' = ',spec.snapshotLength,'; ']));
		}
	}
	semafor.appendChild(semafor1);
	semafor.appendChild(semafor2);
	semafor.appendChild(semafor3);
	var newT = $em('TR',[$c(semafor,[['colspan',3]]),$c(sumC+' / '+i+' = '+Math.round(sumC/i)),$c(sumV+' / '+i+' = '+Math.round(sumV/i),[['style','text-align:center;']])]);
	if( members.rows[1].cells.length > 5 ) newT.appendChild($c('&nbsp;',[['colspan',members.rows[1].cells.length-5]]));
	members.appendChild($ee('TBODY',newT));
}

function calcTroopCost () {
	function resRecalc () {
		allWR = [0,0,0,0,0,0];
		var nc = 0;
		for( var i=0; i < wRes.length; i++ ) {
			nc = parseInt(wRes[i][0].value).NaN0();
			for( var t=0; t<6; t++ ) allWR[t] += wRes[i][t+2] * nc;
		}
		var wantD = '>'+allWR[1]+' >'+allWR[2]+' >'+allWR[3]+' >'+allWR[4];

		var newBTX = $ee('BUTTON',gtext("close")+' (X)',[['onclick',jsNone],['class',allIDs[15]],['style','direction:ltr']]);
		newBTX.addEventListener('click', closeTip, true);

		var nts = tshift>0 ? tshift + (RunTime[0] - (Date.now())) / 1e3: 0;
		var newR = $em('TR',[$em('TD',[trImg('clock'),' ',$eT('SPAN',allWR[0]+nts,0),' ',trImg('r5'),' ',allWR[5]]),$c(newBTX)]);
		var newTbl = $ee('TABLE',newR,[['class',allIDs[7]],['style','background-color:#FAFAFF;']]);
		var newT = needed_show( wantD );
		newR = $ee('TR',$c(newT,[['colspan',2]]));
		newTbl.appendChild(newR);
		closeWindowN(9);
		var xy = offsetPosition(this);
		windowID[9] = makeFloat(newTbl,xy[0]-(ltr?100:300),xy[1]-60);
	}
	function closeTip () {
		closeWindowN(9);
	}

	var inp = $gt('INPUT',cont);
	var t = 0;
	var wRes = [];
	for( var i=0; i < inp.length; i++ ) {
		var tinp = inp[i];
		var tname = tinp.getAttribute('name');
		var tarm = tname.match(/t(\d+)/);
		if( tarm ) tarm = tarm[1]; else continue;
		var base = $gc('showCosts', tinp.parentNode)[0].innerHTML;
		var nRes = base.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);
		var nTime = toSeconds(base);
		wRes[t++] = [tinp,tname,nTime,parseInt(nRes[1]),parseInt(nRes[2]),parseInt(nRes[3]),parseInt(nRes[4]),parseInt(nRes[5])];
		tinp.addEventListener('keyup', resRecalc, false);
		tinp.addEventListener('click', resRecalc, false);
	}
	var tshift = 0;
	var upt = $xf('.//table[@class="under_progress"]','l',cont);
	if( upt.snapshotLength > 0 ) {
		upt = upt.snapshotItem(0);
		var ts = $xf('.//td[@class="dur"]/span','l',upt);
		tshift = toSeconds(ts.snapshotItem(ts.snapshotLength-1).innerHTML);
		var allUC = new Object();
		var mFL = false;
		var ts = $xf('.//td[@class="desc"]/img','l',upt);
		for( var i=0; i < ts.snapshotLength; i++ ) {
			var uclass = ts.snapshotItem(i).getAttribute('class');
			if( typeof(allUC[uclass]) == 'undefined' ) allUC[uclass] = ['',0,0];
			allUC[uclass][0] = ts.snapshotItem(i).getAttribute('alt');
			allUC[uclass][1] += parseInt(ts.snapshotItem(i).parentNode.innerHTML.onlyText().match(/\d+/)[0]);
			if( allUC[uclass][2] > 0 ) mFL = true; else allUC[uclass][2]++;
		}
		if( mFL ) {
			var ts = $xf('.//tbody','f',upt);
			for( var i in allUC )
				ts.appendChild($ee('TR',$em('TD',[trImg(allIDs[45]+' '+i,allUC[i][0]),' '+allUC[i][1]+' '+allUC[i][0]],[['colspan',3]])));
				//insertAfter($em('DIV',[trImg(allIDs[45]+' '+i,allUC[i][0]),' '+allUC[i][1]+' '+allUC[i][0]],[['style','margin:5px 10px;']]), upt);
		}
	}
}

function saveHeroSpeed () {
	var sb = $gc("speed tooltip",cont);
	if( sb.length > 0 ) {
		RB.dictFL[19] = sb[0].innerHTML.match(/>\s*?(\d+)/)[1];
		saveCookie( 'DictFL', 'dictFL' );
	}
}

function goldClubInfo () {
	function checkClass (clName,chkbox) {
		var ac = $xf('.//tr[.//img[contains(@class,"'+clName+'")]]','l',chkbox.parentNode.parentNode.parentNode);
		for( var t=0; t < ac.snapshotLength; t++ )
			var ad = $gt('INPUT',ac.snapshotItem(t))[0].checked=chkbox.checked;
	}
	function checkGreen () {
		checkClass('iReport1',this);
	}
	function checkUni (a) {
		checkClass(a[0],a[1]);
	}
	function checkAll () {
		var ai = $gt('INPUT',this.parentNode);
		for( var i=1; i<ai.length; i++ )
			ai[i].checked=this.checked;
	}
	function makeChkBox (fListID) {
		return $e('INPUT',[['type','checkbox'],['onclick','setTimeout(function(){'+allIDs[0]+'('+fListID+');},200)']]);
	}
	function oasisXY (farmList) {
		var oXY = $gc('coordinatesWrapper',farmList);
		for(var i=0; i<oXY.length; i++) {
			var xy = id2xy(getVidFromCoords(oXY[i].innerHTML));
			var newA = '<a href="position_details.php?x='+xy[0]+'&y='+xy[1]+'">'+oXY[i].innerHTML+'</a>';
			oXY[i].innerHTML = newA;
		}
		return i;
	}
	function uncheckOasis (nd) {
		while (nd.parentNode) {
			nd = nd.parentNode;
			if (nd.tagName === 'TR') {
				$gc('markSlot',nd)[0].checked=false;
				break;
			}
		}
	}
	function findAnimA (x) {
		var vid = getVidFromCoords(x[0].innerHTML);
		var xy = id2xy(vid);
		ajaxRequest(fullName+'ajax.php?cmd=viewTileDetails', 'POST', 'cmd=viewTileDetails&x='+xy[0]+'&y='+xy[1]+'&ajaxToken='+getAjaxToken(), function(ajaxResp) {
			var mapData = eval('(' + ajaxResp.responseText + ')');
			mapData = mapData.response;
			var adv = $ee('DIV',mapData.data.html,[['style','display:none;']]);
			ad = $xf('.//table[@id="troop_info"]','f',adv);
			if( ad ) {
				chkOasisFL[x[1]][vid] = getTroopsInOasis(ad);
				if( ! chkOasisFL[x[1]][vid] ) {
					ad = $xf('.//table[@id="village_info"]','f',adv);
					if( ad ) chkOasisFL[x[1]][vid] = ad;
				}
				addToolTip(chkOasisFL[x[1]][vid],x[0].parentNode);
				if( chkOasisFL[x[1]][vid] )
					uncheckOasis(x[0]);
			}
			if( ! x[3] ) {
				x[2].removeAttribute('style');
				x[2].click();
			}
		}, dummy);
	}
	function findAnim (farmList,fListID,cb) {
		var ac = $gc('coordinatesWrapper',farmList.parentNode);
		var curTO = 0;
		for(var i=ac.length-1; i>=0; i--) {
			var vid = getVidFromCoords(ac[i].innerHTML);
			if( typeof(chkOasisFL[fListID][vid]) == 'undefined' ) {
				cb.style.color = cb.style.color=='black'?'red':'black';
				setTimeout(function(x) { return function() { findAnimA(x) }}([ac[i],fListID,cb,i]), curTO);
				curTO += getRandom(250,1000);
			} else {
				if( chkOasisFL[fListID][vid] ) {
					uncheckOasis(ac[i]);
					if( chkOasisFL[fListID].fl )
						addToolTip(chkOasisFL[fListID][vid],ac[i].parentNode);
				}
			}
		}
		chkOasisFL[fListID].fl = false;
	}
	function scanGoldRep () {
		function addARLFilter (sc,cl) {
			var ac = $xf('.//img[contains(@class,"'+sc+'")]','f',fList[i].parentNode);
			if( ac ) {
				var nca = makeChkBox(fListID);
				nca.addEventListener('click',function(i) { return function() { checkUni(i) }}([sc,nca]),false);
				$am(sp,[' | ',nca,' ',trImg(cl+' '+sc,ac.getAttribute('alt').split(':')[0])]);
			}
			fList[i].appendChild(sp);
		}
		var fList = $gc('markAll',cont);
		for( var i=0; i < fList.length; i++ ) {
			var fListID = $gt('INPUT',fList[i]);
			if( fListID.length != 1 ) continue;
			fListID = fListID[0].getAttribute('id').match(/\d+/)[0];

			$gt('INPUT',fList[i])[0].addEventListener('click',checkAll,false);
			var nc = makeChkBox(fListID);
			nc.addEventListener('click',checkGreen,false);
			var sp = $em('SPAN',[nc,' ',trImg('iReport iReport1',RB.dictRp[0])],[['style','padding:5px 0px;']]);
			addARLFilter('iReport3','iReport iReport3');
			addARLFilter('att','att2');
			addARLFilter('full','carry');
			addARLFilter('half','carry');

			if( oasisXY(fList[i].parentNode) ) {
				if( typeof(chkOasisFL[fListID]) == 'undefined'  )
					chkOasisFL[fListID] = new Object;
				chkOasisFL[fListID].fl = true;
				var anim = $em('BUTTON',[trImg('unit u31'),' ??? '],[['onclick','setTimeout(function(){'+allIDs[0]+'('+fListID+');},200);return false;']]);
				anim.addEventListener('click',function(x) { return function() { findAnim(x[0],x[1],x[2]) }}([fList[i],fListID,anim]),false);
				$am(sp,[' | ',anim]);
			}

			var allBer = $xf('.//a[contains(@href,"berichte.php?id=")]','l',fList[i].parentNode);
			for( var t=0; t < allBer.snapshotLength; t++ ) {
				var tImg = $gt('IMG',allBer.snapshotItem(t).parentNode);
				if( tImg.length > 1 )
					tImg[0].addEventListener('click', function(x) { return function() { selectMessage(x); }}([allBer.snapshotItem(t).getAttribute('href'),offsetPosition(tImg[0])]), true);
			}

			var flID = $gt('INPUT',fList[i])[0].getAttribute("onclick").match(/\d+/)[0];
			if( flID != RB.village_Var[2] ) {
				RB.village_Var[2] = flID;
				saveVCookie( 'VV', RB.village_Var );
				if( RB.dictFL[22] == 0 ) {
					try {
						var tm = $gc('tabItem',$gc('active',$gc('subNavi',cont)[0])[0])[0].innerHTML.onlyText().trim();
					} catch(err) {
						var tm = false;
					}
					if( tm ) {
						RB.dictionary[22] = tm;
						saveCookie( 'Dict', 'dictionary' );
						RB.dictFL[22] = 1;
						saveCookie( 'DictFL', 'dictFL' );
					}
				}
			}
		}
	}
	function selectMessage ( a ) {
		viewMessageIWDisplay( a[0], 1, a[1] );
	}

	var xy = RB_getValue(GMcookieID + 'next', -1);
	if( $gn('x').length < 1 ) {
		if( xy > 0 ) {
			if( RB.overview[1] == "gc" ) {
				RB.overview[1] = "";
				saveCookie('OV', 'overview');
				xy = id2xy( xy );
				document.location.href = 'karte.php?x='+xy[0]+'&y='+xy[1];
			}
		}
		dictRpInit();
		var chkOasisFL = new Object();
		setInterval(scanGoldRep, 1000);

		document.head.appendChild($ee('SCRIPT','function '+allIDs[0]+'(a){'+
		'$("#list"+a).find(".markSlot").each(function(c,d){'+
			'Travian.Game.RaidList.data[a].slots[d.name.match(/\\d+/)[0]].marked=d.checked;'+
		'});Travian.Game.RaidList.updateTroopSummaryForAList(a);};',[['type',"text/javascript"]]));

	} else {
		if( xy > 0 ) {
			fillXY();
			RB.overview[1] = "gc";
			saveCookie('OV', 'overview');
		}
		var ss = $g('raidListSlot');
		if( ss ) {
			addShowDistanceIn( $g('save'), 0 );
			ss.addEventListener('keyup', a2bInfo, false);
			ss.addEventListener('click', a2bInfo, false);
		}
	}
}

function calcNPCtroops () {
	var allD = $gc('details',cont);
	for( var i=0; i<allD.length; i++ ) {
		var woodU = allD[i].innerHTML.match(/>\s*?(\d+)/)[1];
		var npcI = $gc('npc',allD[i]);
		if( npcI.length < 1 ) return;
		var woodN = allD[i].innerHTML.match(/r1=(\d+)&/)[1];
		npcI[0].parentNode.appendChild($ee('SPAN','('+(Math.floor(woodN/woodU))+')',[['style','padding:0px 5px;']]));
	}
}

function calcUnitUpgrade () {
	function showUnitUpgrade ( aN ) {
		var ITTb = $e('TBODY');
		var newITT = $ee('TABLE',ITTb,[['class',allIDs[7]]]);
		if( aN[1] > 0 ) ITTb.appendChild(trUC(aN[0],0));
		if( aN[1] > 1 ) ITTb.appendChild(trNull());
		var hlTR = trUC(aN[0],aN[1]);
		hlTR.firstChild.setAttribute('style','background-color:#FF8000;');
		ITTb.appendChild(hlTR);
		if( aN[1] < 19 ) ITTb.appendChild(trUC(aN[0],aN[1]+1));
		if( aN[1] < 18 ) ITTb.appendChild(trNull());
		if( aN[1] < 20 ) ITTb.appendChild(trUC(aN[0],20));
		var tHead = $ee('THEAD',$em('TR',[$c('#'),$c(trImg('att_all')),$c(trImg('def_i')),$c(trImg('def_c'))]));
		newITT.appendChild(tHead);
		makeTooltip(newITT);
	}
	function sUC (tt,c,ul) {
		return gti(tt,c,1)>0?(gti(tt,c,1)+(gti(tt,c,1)+300*gti(tt,9,1)/7)*(Math.pow(1.007,ul)-1)).toFixed(1):0;
	}
	function trUC (tt,ul) {
		return $em('TR',[$c(ul),$c(sUC(tt,0,ul)),$c(sUC(tt,1,ul)),$c(sUC(tt,2,ul))]);
	}
	function trNull () {
		return $ee('TR',$c('...',[['colspan',4],['style','text-align:center;']]));
	}

	var allD = $xf('.//img[contains(@class,"unit ")]','l',cont);
	for( var i=0; i<allD.snapshotLength; i++ ) {
		var uname = allD.snapshotItem(i).getAttribute('class').match(/\d+/)[0];
		var rpn = allD.snapshotItem(i);
		do {
			rpn = rpn.parentNode;
			var spn = $gt('SPAN',rpn);
		} while( spn.length < 1 )
		if( spn[0].innerHTML.match(/:\d+:/) ) continue;
		var curL = parseInt(spn[0].innerHTML.match(/\d+/)[0]);
		spn[0].addEventListener("mouseover", function(x) { return function() { showUnitUpgrade(x); }}([uname,curL]), false);
		spn[0].addEventListener("mouseout", removeTooltip, false);
		spn[0].appendChild(trImg(allIDs[47]));
	}
}

function stopRP () {
	stopRPFL = false;
	var unsafeWindow = this['unsafeWindow'] || window;
	if(typeof unsafeWindow.auto_reload == 'undefined')
		document.head.appendChild($ee('script','auto_reload=2;',[['type',"text/javascript"]]));
	else
		unsafeWindow.auto_reload=2;
}

function spielerSort() {
	var vtable = $g("villages");
	if ( ! vtable ) return;

	function aSort(a, b) {
		var a = a[lastSC];
		var b = b[lastSC];
		var aa = parseFloat(a.replace(/,/, '.'));
		var bb = parseFloat(b.replace(/,/, '.'));
		if ( isNaN(aa) || isNaN(bb) ) return a < b ? -1: a > b ? 1: 0;
		else return aa - bb;
	}

	function sortSpieler (sc) {
		if( lastSC == sc ) lastSD = 1 - lastSD;
		lastSC = sc;
		vtArr.sort(aSort);
		if( lastSD == 1 ) vtArr.reverse();
		for( var i = 0; i < vtCount; i++ ) {
			vtable.tBodies[0].appendChild(vtArr[i][4]);
		}
	}

	var vtrows = vtable.tHead.rows[0];
	var sortCell = [0,2,4,5];
	for( var i=0; i<4; i++ ) {
		if (RB.Setup[46] != 1 && i==3) continue;
		var newSL = $a(vtrows.cells[sortCell[i]].innerHTML,[['href',jsVoid]]);
		newSL.addEventListener('click', function(x) { return function() { sortSpieler(x); }}(i), false);
		vtrows.cells[sortCell[i]].textContent = "";
		vtrows.cells[sortCell[i]].appendChild(newSL);
	}

	var lastSD = 1;
	var lastSC = 0;
	var vtrows = vtable.tBodies[0].rows;
	var vtCount = vtrows.length;
	var vtArr = [];
	for (var i = 0; i < vtCount; i++) {
		vtArr[i] = [];
		for( var t=0; t < 4; t++ ) {
			if (RB.Setup[46] != 1 && t==3) continue;
			vtArr[i][t] = vtrows[i].cells[sortCell[t]].innerHTML.onlyText();
		}
		vtArr[i][4] = vtrows[i];
	}
}

function getNextReportPage ( bl ) {
	var nFL = false;
	var navLink = $gc('next',(bl||cont));
	if( navLink.length > 0 ) {
		if( navLink[0].getAttribute('href') ) nFL = navLink[0].getAttribute('href');
	}
	return nFL;
}

function reportsDelOrSearch () {
	var delBtn = $gn('del');
	if( delBtn.length == 0 ) return;
	var t = $g('overview');
	if( ! t ) return;

	function delRep () {
		var nr = getNextReportPage();
		if( ! nr ) {
			RB.overview[0] = -1;
			saveCookie('OV', 'overview');
		}
		var ac = $xf('./tbody//input[@type="checkbox"]','l',t);
		for( var i=0; i<ac.snapshotLength; i++ ) ac.snapshotItem(i).checked=true;
		delBtn[0].click();
	}
	function delRepInit () {
		RB.overview[0] = -4;
		saveCookie('OV', 'overview');
		delRep();
	}

	var newDel = delBtn[0].cloneNode(true);
	var bc = 'button-content';
	newDel.setAttribute('title',$gc(bc,delBtn[0])[0].textContent);
	$gc(bc,newDel)[0].textContent = " [X] >> ";
	ltr ? newDel.style.marginLeft = "4px" : newDel.style.marginRight = "4px";
	var archiveButton = $g("archive");
	delBtn[0].parentNode.insertBefore(newDel, archiveButton ? archiveButton.nextSibling : delBtn[0].nextSibling);

	newDel.setAttribute('onclick',jsNone);
	newDel.addEventListener('click',delRepInit,true);

	dictRpInit();

	if( RB.overview[0] == -4 ) setTimeout(delRep, getRandom(300,1000));
}

function dictRpInit () {
	loadCookie( 'DictRp', 'dictRp' );
	loadCookie( 'DictRpFL', 'dictRpFL' );
	var FL = false;
	for( var i=0; i < 12; i++ ) {
		if( RB.dictRpFL[i] == 1 ) continue;
		var img = $gc('iReport'+iReports[i],cont);
		for( var j = 0; j < img.length; j++ ) {
			if( img[j].getAttribute('alt') == 'iReport iReport'+iReports[i] ) {
				RB.dictRp[i] = img[j].parentNode.getAttribute('alt');
				RB.dictRpFL[i] = 1;
				FL = true;
			} else {
				RB.dictRp[i] = img[j].getAttribute('alt');
				RB.dictRpFL[i] = 1;
				FL = true;
			}
		}
	}
	if( FL ) {
		saveCookie( 'DictRp', 'dictRp' );
		saveCookie( 'DictRpFL', 'dictRpFL' );
	}
}

function getVTip (vID) {
	if( isNaN(vID) || RB.Setup[36] != 1 ) return '';
	var newTip = '';
	if( RB.vHint[vID] != undefined ) newTip = RB.vHint[vID];
	else if( typeof flinks[vID] != 'undefined' ) newTip = flinks[vID];
	return newTip;
}

function convertLinks () {
	function fillObj (arr) {
		for( var i = 0; i < arr.length; i++ ) {
			var oneLink = arr[i].split("\/@_");
			var tVId = parseInt(oneLink[0].match(/d=(\d+)/)[1]);
			flinks[tVId] = oneLink[1];
		}
	}
	flinks = new Object();
	loadVCookie('ln3', 'ln3', village_aid, 1);
	if( RB.ln3[0] == 0 ) RB.ln3.length = 0;
	fillObj(RB.ln3);
	var alinks = RB_getValue(GMcookieID + "ln", "").split("@@_");
	alinks.splice((alinks.length - 1), 1);
	fillObj(alinks);
}

function underProgressSave (gid) {
	var upt = $gc('under_progress',cont);
	if( upt.length > 0 ) {
	// [i*4+1 gid, i*4+2 time, i*4+3 description, i*4+4 ending]
		loadZVCookie('Dorf14','village_dorf14');
		var newCookie = [0];
		var fl = false;
		for( var i=0; i<RB.village_dorf14[0]; i++ ) {
			if( RB.village_dorf14[i*4+1] == gid ) continue;
			newCookie[0]++;
			newCookie.push(RB.village_dorf14[i*4+1],RB.village_dorf14[i*4+2],RB.village_dorf14[i*4+3],RB.village_dorf14[i*4+4]);
			fl = true;
		}
		var tinfo_c = new RegExp('"'+allIDs[47]+'"');
		for( var i=1; i<upt[0].rows.length; i++ ) {
			var td = upt[0].rows[i].cells;
			if( td.length < 3 ) break;
			newCookie[0]++;
			var ts = td[1].innerHTML.match(/\d+:\d\d:\d\d/);
			newCookie.push(gid, Math.round(RunTime[0]/1000) + toSeconds(ts?ts[0]:"0:00:00"),
							td[0].innerHTML.replace(/[\n\t]/g,' ').replace(/\s+/g,' ').replace(tinfo_c,'"tinfo_c"'),
							td[2].innerHTML.replace(/[\n\t]/g,' ').replace(/\s+/g,' ').onlyText());
			fl = true;
		}
		if( fl ) saveVCookie('Dorf14',newCookie,1);
	}
}

function villageBMover () {
	function villBMSaveChange () {
		var newCookie = [0];
		for( var i=0; i<crossN.length; i++ ) {
			if( crossN[i] != crossR[i] ) {
				newCookie[0]++;
				newCookie.push(crossR[i],crossN[i]);
			}
		}
		if( newCookie[0] > 0 ) saveVCookie('vBMn',newCookie,1);
		location.reload(true);
	}
	function villBMClick ( bn ) {
		if( startFL ) {
			aBuild = crossN[bn-19];
			var clsname = areas[bn-1].getAttribute("class");
			var re1 = new RegExp("a"+aBuild.toString(),"g");
			var re2 = new RegExp("aid"+aBuild.toString(),"g");
			clsname = clsname.replace(re1, "a41").replace(re2, "aid41");
			areas[bn-1].setAttribute("class",clsname);
			zBN = bn;
			startFL = false;
		} else {
			if( bn == zBN ) {
				startFL = true;
				var clsname = areas[bn-1].getAttribute("class");
				clsname = clsname.replace("a41", "a"+aBuild.toString()).replace("aid41", "aid"+aBuild.toString());
				areas[bn-1].setAttribute("class",clsname);
			} else {
				tBuild = crossN[bn-19];
				crossN[bn-19] = aBuild;
				crossN[zBN-19] = tBuild;
				aBuild = tBuild;
				var clsname1 = areas[zBN-1].getAttribute("class");
				var clsname2 = areas[bn-1].getAttribute("class");
				clsname1 = clsname1.replace("a41", "a"+aBuild.toString()).replace("aid41", "aid"+aBuild.toString());
				areas[zBN-1].setAttribute("class",clsname1);
				var re1 = new RegExp("a"+crossN[zBN-19].toString(),"g");
				var re2 = new RegExp("aid"+crossN[zBN-19].toString(),"g");
				clsname2 = clsname2.replace(re1, "a"+crossN[bn-19].toString()).replace(re2, "aid"+crossN[bn-19].toString());
				areas[bn-1].setAttribute("class",clsname2);
				startFL = true;
			}
		}
	}
	function villBMCancel () {
		saveVCookie('vBMn',[0],1);
		location.reload(true);
	}
	function villBMStart () {
		if( inAct ) {
			villBMSaveChange();
		} else {
			var path = $gt('path',vmap);
			for( var i=0; i<path.length; i++) {
				path[i].removeAttribute('onclick');
			}
			var colorLayer = $gc('colorLayer',vmap);
			for( var i=0; i<colorLayer.length; i++) {
				colorLayer[i].removeAttribute('onclick');
			}
			for( var i=18; i<areas.length-4; i++) {
				if( i<areasCount+18 ) {
					elClone = areas[i].cloneNode(true);
					areas[i].parentNode.replaceChild(elClone, areas[i]);
					areas[i].addEventListener('click',function(x) { return function() { villBMClick(x) }}(i+1),false);
				}
			}
			act.style.backgroundColor='yellow';
			$at($gt('IMG',act)[0],[['title',gtext("ok")]]);
			var act_r = $ee('DIV',gtext("reset"),
				[['style','position:absolute;top:0px;left:'+(ltr?510:40)+'px;z-index:500;width:79px;background-color:red;text-align:center;cursor:pointer;']]);
			act_r.addEventListener('click',villBMCancel,false);
			vmap.appendChild(act_r);
			var act_s = $ee('DIV',gtext("save"),
				[['style','position:absolute;top:52px;left:'+(ltr?510:40)+'px;z-index:500;width:79px;background-color:lime;text-align:center;cursor:pointer;']]);
			act_s.addEventListener('click',villBMSaveChange,false);
			vmap.appendChild(act_s);
			inAct = true;
			zImg = trImg(allIDs[47],'empty');
			zImg.setAttribute('style','display:none;');
			vmap.appendChild(zImg);
		}
	}

	var vmap = $g('village_map');
	if( ! vmap ) return;
	var aBuild = 0;
	var tBuild = 0;
	var zBN = 0;
	var zImg = '';
	var areas = $gc('buildingSlot',vmap);
	var cross = [];
	if( areas.length < 21 ) return;
	loadZVCookie('vBMn','vBMn');
	var areasCount = 20;
	for( var i=0; i<areas.length-22; i++) cross[i]=i+19;
	var crossN = cross.slice();
	var crossR = cross.slice();

	if( RB.vBMn[0] > 0 ) {
		for( i=0; i<RB.vBMn[0]; i++) {
			var f = RB.vBMn[i*2+1];
			var t = RB.vBMn[i*2+2];
			crossN[f-19] = parseInt(t);
			var clsname = areas[f-1].getAttribute("class");
			var re1 = new RegExp("a"+f,"g");
			var re2 = new RegExp("aid"+f,"g");
			clsname = clsname.replace(re1, "a"+t).replace(re2, "aid"+t);
			areas[f-1].setAttribute("class",clsname);
		}
	}

	var inAct = false;
	var startFL = true;
	var act = $ee('DIV',$e('IMG',[['src',img_bmove],['title',gtext("bmove")]]),
		[['style','position:absolute;top:20px;left:'+(ltr?510:40)+'px;z-index:500;width:79px;height:32px;cursor:pointer;']]);
	act.addEventListener('click',villBMStart,false);
	vmap.appendChild(act);
}

function oasisKirilloid (vf) {
	var troopsTR = $xf('.//tr[td/img[contains(@class, "unit u")]]','l',vf);
	if( troopsTR.snapshotLength < 1 ) return false;

	var kirillRace = ['','r1','r2','','r3','r4','r5'];
	var kirillS = kirillRace[RB.Setup[2]]+'RuUb#d:p500r3'+((RB.Setup[46]==1)?'m9':'')+'#r3u';

	var anim = new Array(10);
	for( var i=0; i<troopsTR.snapshotLength; i++ )
		anim[parseInt($gt('IMG',troopsTR.snapshotItem(i))[0].getAttribute('class').match(/\d+/)[0])-31] =
			toNumber(troopsTR.snapshotItem(i).cells[1].innerHTML);

	for(i=0; i<10; i++) kirillS += anim[i] ? anim[i]+',': ',';
	kirillS = '#a:'+kirillS.replace(/,*$/,'U');
	return $a('(kirilloid.ru)',[['href','http://travian.kirilloid.ru/warsim2.php'+kirillS],['target','_blank'],['style','font-size:11px;']]);
}

function displayWhatIsNew () {
	if ($g('whatsnew')) {
		$g("whatsnew").style.visibility = "visible"; return; }
	else {
		var box = $e('div',[['id','whatsnew'],['style','width:410px;position:fixed;top:50%;left:50%;transform: translate(-50%,-50%);color:black;background-color:#FFFFFF;padding:5px 5px;border-radius:1em;z-index:999;opacity:0.90;']]);
		var header = $e('div',[['style','height:35px;font-size:130%;font-weight:bold;text-align:center;']]);
		var content = $e('div',[['style','margin:0px 20px;font-size: 13px;']]);
		var footer = $e('div',[['style','display:table;margin:15px 20px 5px;width:370px;']]);
		var feedback = $ee('div',$a('Feedback',[['href',homepageurl+'/feedback'],['target','_blank']]),[['style','display:table-cell;width:33%;']]);
		var homepage = $ee('div',$a('Homepage',[['href',homepageurl],['target','_blank']]),[['style','display:table-cell;width:33%;text-align:center;']]);
		var donate = $ee('div',$a('Donate',[['href','https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=56E2JM7DNDHGQ&item_name=T4.4+script&currency_code=EUR'],['target','_blank']]),[['style','display:table-cell;width:33%;text-align:'+docDir[1]+';']]);
		var closeb = $ee('div',$a('X',[['style','font-size:120%;float:'+docDir[1]+';']]),[['style','height:15px;padding:10px;']]);
		header.textContent = "About Resource Bar+";
		content.innerHTML = "What's new in Version "+version+" - Sep 5, 2018:<p></p><ui><li>Fixed travian-reports for Path to Pandora</li><li>Updated Waterworks resource costs</li></ui>";
		footer.appendChild(feedback);
		footer.appendChild(homepage);
		footer.appendChild(donate);
		box.appendChild(closeb);
		box.appendChild(header);
		box.appendChild(content);
		box.appendChild(footer);
		closeb.addEventListener("click", function(){ $g("whatsnew").style.visibility = "hidden";}, false);
		document.body.appendChild(box);
	}
}

/************************** end test zone ****************************/

// start script

	if( ! $g('l1') ) return;
	var userID = getUserID();
	var GMcookieID = crtName + '-' + userID + '-';
	loadCookie ( 'RBSetup', 'Setup' );
	if ( RB.Setup[0] != version ) {
		//displayWhatIsNew();
		RB.Setup[0] = version;
		saveCookie( 'RBSetup', 'Setup' );
	}
	var xyBody = [0,0];

	loadOVCookie('vHint', 'vHint');
	loadCookie ( 'xy', 'XY' );
	loadCookie ( 'bodyH', 'bodyH' );
	loadCookie ( 'DictFL', 'dictFL' );

	if( RB.Setup[2] == 3 || RB.Setup[2] == 4 || RB.Setup[2] > 6 ) { detectTribe(); }
	if( RB.Setup[45] == 0 ) { detectServerSpeed(); }
	if (RB.Setup[46] == 0) { detectServerType(); }
	if (RB.Setup[47] == 0) { detectEgyptiansAndHuns(); }
	if (RB.Setup[48] == 0) { detectMapSize(); }
	var mapWidth = RB.Setup[48];
	var mapRadius = (mapWidth - 1) / 2;

	vlist_addButtonsT4();
	loadCookie ( 'Dict', 'dictionary' );

	if( villages_id[0] == 0 ) if( RB.dictionary[0] == 0 ) {
		document.location.href = fullName + 'spieler.php?uid=' + userID;
	} else {
		villages_id[0] = parseInt(RB.dictionary[0]);
		village_aid = villages_id[0];
	}
	loadAllCookie();
	var LC = setLC();
	var arena = RB.dictFL[3] == 0 ? gtext("arena") : RB.dictionary[3];

	//save "produce per hour"
	if( ! getResources() ) return;
	if( /dorf[12].php/.test(crtPath) ) parseDorf1();

	if( RB.overview[0] > -1 ) {
		var i =  parseInt(RB.overview[0]) +1;
		if( i > villages_count ) {
			RB.overview[0] = -2;
			saveCookie('OV', 'overview');
			setTimeout( function() { document.location.href = RB.overview[1]; }, getRandom(300,1000));
		} else {
			RB.overview[0] = i;
			saveCookie('OV', 'overview');
			var newdid = linkVSwitch[i-1].match(/newdid=\d+/i)[0];
			setTimeout( function() { document.location.href = fullName +'dorf1.php?'+ newdid; }, getRandom(300,1000));
		}
		return;
	} else if( RB.overview[0] == -2 ) {
		RB.overview[0] = -1;
		RB.overview[1] = Math.round(RunTime[0]/1000);
		saveCookie('OV', 'overview');
		overviewAll();
	}

	var idx = [1,2,3,5];
	var rect = ltr ? [92,176,260,437] : [430,346,262,85];

	progressbar_init();
	convertLinks();

	var cont = $g(pageElem[1]);

	if( RB.Setup[45] > 1 && sM < 2 ) { sM = parseInt(RB.Setup[45]); sC = [16/sM,100]; }
	if( /dorf1.php/.test(crtPath) ) { troopsDorf1(); normalizeProduction(); }
	villageHintEdit();
	if( /dorf2.php/.test(crtPath) ) { parseDorf2(); if( RB.Setup[37] > 0 ) villageBMover(); }
	if( /dorf3.php/.test(crtPath) ) villageHintDorf3();
	if( /(?:messages|berichte).php/.test(crtPath) ) { viewMessageIW(); }
	if( /berichte.php/.test(crtPath) ) reportsDelOrSearch(); else if( RB.overview[0] < -2 ) { RB.overview[0] = -1; saveCookie('OV', 'overview'); }
	if( /messages.php\?.*id=/.test(crtPath) ) convertCoordsInMessagesToLinks();
	if( /karte.php\?(.*&)?[zdxy]=/.test(crtPath) ) { distanceToMyVillages(); linkOnT4Karte(); }
	if( /karte.php/.test(crtPath) ) { karteDistance(); cropFind(); }
	if( /position_details.php\?(.*&)?[zdxy]=/.test(crtPath) ) { troopsOasis(); distanceToMyVillages(); viewMessageIWK(); linkOnT4Karte(); }
	if( crtPath.indexOf('allianz.php') != -1 ) {
		if( $g('offs') ) { viewMessageIWK(); addAReportFilter(); }
		var allianceTable = $gc('allianceMembers',cont);
		if( allianceTable.length > 0 ) { allyActivityInfo(); allyQStats(allianceTable[0]); }
		parseAlly();
		AllyBonusPageRefreshRB();
	}
	if( /spieler.php/.test(crtPath) ) {
		distanceToTargetVillages(); userActivityInfo();
		if ( ! $g('PlayerProfileEditor') ) { parseSpieler(); spielerSort(); }
	}
	if( /berichte.php.+id=/.test(crtPath) ) { addSpeedAndRTSend(); analyzerBattle(); }
	if( ! /dorf.\.php/.test(crtPath) ) addRefIGM();
	if( /hero.php/.test(crtPath) ) { speedBids(); timeToBids(); neededResAdd(); restHeroTime(); saveHeroSpeed(); addSpeedAndRTSend(); addSpeedAndRTSend($gc('boxes',cont)[0]); }
	if( /build.php/.test(crtPath) ) { neededResAdd(); buildDispatcher(); addSpeedAndRTSend(); }

	setTimeout( function() { progressbar_updValues(); setInterval(progressbar_updValues, 1000); }, (1000-progressbar_time-((Date.now())-RunTime[0])));
	bigQuickLinks();
	if( RB.Setup[14] > 0 ) showDorf1();
	if( RB.Setup[12] > 0 ) showLinks();
	if( RB.Setup[17] == 1 ) rbNotes();
	addSpeedRTSendMessageInLLinks();
	if( RB.Setup[20] > 0 ) if( RB.dictFL[13] < 2 || RB.Setup[20] == 2 ) scanTroopsData();
	returnQuickHelp();
	if( RB.Setup[32] == 1 ) centerNumber();
	if( RB.Setup[34] == 1 ) overviewAll();
	if( nextFL ) if( RB_getValue(GMcookieID + 'next', -1) > 0 ) RB_setValue(GMcookieID + 'next', -1);
	if( RB.Setup[30] > 0 ) detectAttack();
	showRunTime();

/********** end of main code block ************/
}

function backupStart () {
	if(notRunYet) {
		var l4 = document.getElementById('l4');
		if( l4 ) allInOneOpera();
		else setTimeout(backupStart, 500);
	}
}

var notRunYet = true;
if( /Gecko/i.test(navigator.userAgent) ) allInOneOpera();
else if (window.addEventListener) window.addEventListener("load",function () { if(notRunYet) allInOneOpera(); },false);
setTimeout(backupStart, 500);

})();