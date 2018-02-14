var model = { sphere: [], star: [], text: [], heart: [], hover: []};

var fixArr = ['Dubbo', 'Maven', 'Computer', 'FinTech', 'Distributed', 'back-end', , 'RPC', 'Southampton Uni', 'is', 'test', 'experience',
    'Spring', 'Jekins', 'Java', 'MySQL', 'Web', 'Redis', 'Python', 'Science', 'Internet', 'Finace']


var basicInfo = "Name: Qian Lin \n " +
			  "Address:  Flat D 308 - 310 Lewisham High Street \n " +
			  "Email: qlin250@gmail.com \n " +
			  "Mobile: 07305361177";

var assessText = "One year experience in a commercial bank in China. Participated in design, review, development and maintenance of bank web service. Rich experience in object-oriented programming development and Java distributed system. Having strong capability to learn and use new computer technique and programming language. Good at mathematics. Able to complete duties on time to support teams. Work hard and have positive attitude to accept any challenge."

var expText = "2016/07 -- 2017/11:  XIB Bank \n " +
    "Work in a commercial bank, response for maintenance and optimizing bank back-end systems. Have experience with Java, Spring, MySQL, Oracle, MyBaits, Maven, Redis and so on. One year experience in constructing java-based distributed server, used Dubbo (Java-based RPC framework) + Spring to build system. \n " +
    "2015/07 - 2015/09 \n " +
    "Summer internship in Univiersity. Response for MOOC data analysis and visualization. Develop online dashboard by Python and R-studio, data managed by MySQL";

var eduText = "Education \n " +
    "2013 /9 -- 2016 /6	University of Southampton \n " +
    "Computer Science:  Bachelor \n " +
    "Get 2:1 result overall. Learned Java, Algorithm, Cloud application, Software development, Intelligent System, Database management. Good at programming language and mathematics."
var projExpText = "2017/3 - 2017/11: Funding Deposit System \n " +
                  "Project Description:	Deposit online P2P companies’ funds to guarantee the safety of their funding \n " +
                  "Responsibility: Construct a high-speed performance distributed systems and provide relevant interfaces. Maintenance of web server , trouble shooting all aspects that arise in operation + \n " +
                  "2016/07 - 2017/03: Integrated Channel System \n " +
                  "Project Description:	A system provides unified service to front system such as e-bank, bank counters and so on \n " + 
                  "Responsibility:	Maintain web service. Meanwhile develop new functions and expand this system to satisfy new requirement.";
var itSkillText = "MySQL: 24 Months experience \n " +
                  "Java: 36 Months experience";

var contentArr = [basicInfo, assessText, expText, eduText, projExpText, itSkillText];

var camera, scene, renderer;
var controls;
var objects = [];



function addText(text, x, y, z) {

    var element = document.createElement("div");
    element.innerHTML = "<div style='vertical-align: text-top ;font-size: 80px;font-weight: bold;color: #5ab997;text-shadow: 0 0 10px #4c4c4c'; name='"+text +"'>" + text + "</div>";
    var object = new THREE.CSS3DObject(element);
    object.position.x = x;
    object.position.y = y;
    object.position.z = z;
    scene.add(object);
    objects.push(object);
    render();
}


function star(duration, ang, size) {

    model.star = [];

    for (var i = 0; i < objects.length; i++) {
        var theta = 360 * 4 / objects.length * i * Math.PI / 180;

        var object = new THREE.Object3D();
        object.position.z = Math.sin(theta) * 500 - 500;
        object.position.x = (size - 500) * Math.cos(theta + ang) + size * Math.cos(3 / 4 * theta + ang);
        object.position.y = (size - 500) * Math.sin(theta + ang) - size * Math.sin(3 / 4 * theta + ang);

        object.position.x = object.position.z * Math.sin(0.99 * Math.PI) + object.position.x * Math.cos(0.99 * Math.PI);
        object.position.z = object.position.z * Math.cos(0.99 * Math.PI) - object.position.x * Math.sin(0.99 * Math.PI);
        object.lookAt(new THREE.Vector3(0, 0, 1000));

        model.star.push(object);
    }

    transform(model.star, duration, objects);
}

function heart(duration,ang,size){

	model.heart = [];
	
	for(var i = 0 ; i < objects.length; i++){
		var theta =  2/objects.length * i * Math.PI;

		var object = new THREE.Object3D();
		object.position.x = size * (5 * Math.cos(theta * 4 + ang) - Math.cos(2 * theta + ang));
		object.position.z = size * (8 * Math.sin(theta * 4 + ang ) - Math.sin(2 * theta + ang));
		object.position.y = Math.cos(theta + ang) * 600  ;
		object.lookAt(new THREE.Vector3(0,0,0));
		model.heart.push(object);
	}

	transform(model.heart,duration,objects);
}

function sphere(duration, ang, size) {

    model.sphere = [];

    var vector = new THREE.Vector3();

    for (var i = 0, l = objects.length; i < l; i++) {

        var phi = Math.acos(-1 + (2 * i) / l);
        var theta = Math.sqrt(l * Math.PI) * phi;

        theta += ang;
        var object = new THREE.Object3D();

        object.position.x = size * Math.cos(theta) * Math.sin(phi);
        object.position.z = size * Math.sin(theta) * Math.sin(phi);
        object.position.y = size * Math.cos(phi);

        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        model.sphere.push(object);

    }

    transform(model.sphere, duration, objects);
}

function hover(duration, ang, size) {

    model.hover = [];

    var vector = new THREE.Vector3();

    for (var i = 0, l = objects.length; i < l; i++) {

        var phi = Math.acos(-1 + (2 * i) / l) ;
        var theta = Math.sqrt(l * Math.PI) * phi ;

        theta += ang;
        var object = new THREE.Object3D();

        object.position.x = 0;
        object.position.z = 0;
        object.position.y = 0;

        model.hover.push(object);

    }

    transform(model.hover, duration, objects);
}


function displayText(text, duration) {
	model.text = [];
	var width = window.innerWidth * 0.85;
    var strArr = text.split(" ")
    var offsetX = -(width * 1.5) + getSize(strArr[0]) / 2,
        offsetY = 1200;
    for (var i = 0; i < strArr.length; i++) {
        if (strArr[i] === '\n') {
        	offsetX = -(width * 1.5) + getSize(strArr[i+1]) / 2;
        	offsetY -= 150;
        	var object = new THREE.Object3D();
        	model.text.push(object)
        } else {
            var object = new THREE.Object3D();
            object.scale = new THREE.Vector3(0,0,0);
            object.position.z = 0;
            object.position.x = offsetX;
            object.position.y = offsetY;
            if ( i !== strArr.length - 1){
            	offsetX += (getSize(strArr[i]) / 2  + getSize(strArr[i+1]) / 2) + 25;
            	if (getSize(strArr[i+1]) !== 0 && offsetX + getSize(strArr[i+1]) / 2 > 1800) {
            		offsetX = - (width * 1.5) + getSize(strArr[i+1]) / 2;
            		offsetY -= 150;
            	}
            }
            model.text.push(object)
        }
    }

    transform(model.text, duration, objects)
}


function getSize(text) {
  if (text === '\n') {
  	return 0;
  }
  return document.getElementsByName(text)[0].clientWidth;
}


function transform(model, duration, objects) {

    TWEEN.removeAll();


    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        var target = model[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Linear.None)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Linear.None)
            .start();
    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}


function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 4000;

    scene = new THREE.Scene();

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth * 0.85, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);

    controls.rotateSpeed = 0.5;
    controls.minDistance = 0;
    controls.maxDistance = 5500;
    controls.addEventListener('change', render);

    window.addEventListener('resize', onWindowResize, false);
    var textArr = assessText.split(' ');
    //fill sphere 
    for (var i = 0; i < 25; i++) {
    	addText(textArr[i],0,0,0);
    }

    for (var i = 0; i < fixArr.length; i++) {
    	addText(fixArr[i],0,0,0);
    }

    for (var i = 25; i < 50; i++) {
    	addText(textArr[i],0,0,0);
    }
   }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

var ang = 0;
var isHover = false;
var time = 0;
var selectIndex = -1;
var clean = true;
var hoverAnim = false;
var rand = 1;

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
	
	if (!isHover) {
	  if (rand > 0.6){
	    sphere(500,ang,1200);
	  } else if (rand > 0.3){
	  	star(500,ang,800);
	  } else {
	  	heart(500, ang, 250);
	  }
	  ang += 0.001;
	} else {
	  time ++;
	  if (hoverAnim) {
	    hover(500, 0 ,1300);
	    clean = false;
	    hoverAnim = false;
	  } else if (time > 60 && !hoverAnim && !clean) {
        cleanAll();
        addContent(contentArr[selectIndex]);
        clean = true;
	  } else if (clean) {
	  	displayText(contentArr[selectIndex], 500);
	  }
	}
}

function render() {
    renderer.render(scene, camera);
}

function mouseOver(index) {
  var textArr = assessText.split(" ");
  isHover = true;
  hoverAnim = true;
  selectIndex = index;
  time = 0;
}

function mouseExit() {
  exit = true;
  isHover = false;
  hoverAnim = false;
  rand = Math.random();
  if (objects.length < 100) {
	for (var i = 0; i < fixArr.length; i++) {
	  var x = Math.random() * 1000 * Math.cos(Math.random() * Math.PI);
	  var y = Math.random() * 1000 * Math.cos(Math.random() * Math.PI);
	  var z = Math.random() * 1000 * Math.cos(Math.random() * Math.PI);
	  addText(fixArr[i],x,y,z);
	}
  }
}

function addContent (content) {
  var contentArr = content.split(" ");
  for (var i = 0; i < contentArr.length; i++) {
  	addText(contentArr[i],0,0,0);
  }
}

function cleanAll(){
  var size = objects.length;
  for(var i = 0; i < size; i++){
	scene.remove(objects.pop());
  }		
}