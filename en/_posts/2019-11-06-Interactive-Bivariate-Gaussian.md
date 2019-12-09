---
layout: post
title: An Interactive JS Canvas to Understand the Bivariate Gaussian Distribution
comments: true
description: >
    ※ Some Javascript issues, reload the page if you can't see the canvas working!
    Also, it takes a while to load so please be patient.
excerpt_separator: <!--more-->

---

# An Interactive JS Canvas to Understand the Bivariate Gaussian Distribution

Code can be found in [this github repo](https://github.com/AtomScott/Interactive-Bivariate-Gaussian). Feel free to use and improve, feedback is welcome.
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjs/6.2.2/math.min.js'></script>
<script src="https://docs.opencv.org/3.4.1/opencv.js"></script>

<div id='canvasControls'></div>

<canvas id="canvas1" style='display:block; width:100%;height:500px'>If you see this then your browser doesn't support
    the necessary web tech!</canvas>

<script>
    function bivariateNormal(x,y,meanX,meanY,stdX,stdY,corrCoeff){
        let left = 1/(2*math.pi*stdX*stdY*Math.sqrt(1-corrCoeff**2));

        let z = ((x-meanX)**2)/stdX**2 - (2*corrCoeff*(x-meanX)*(y-meanY))/(stdX*stdY) + ((y-meanY)**2)/stdY**2;
        let expo = -z/ (2*(1-corrCoeff**2));
        let right = math.exp(expo);
        return math.multiply(left, right);
    }


    function draw(){
        let mat = cv.Mat.zeros(c.height, c.width, cv.CV_8U);
        let maxZ = bivariateNormal(meanX.getValue(), meanY.getValue(), meanX.getValue(), meanY.getValue(),stdX.getValue(), stdY.getValue(), corrCoeff.getValue());
        for (i = 0; i < 10000; i++) {

            var x = Math.floor(Math.random() * Math.floor(c.width));
            var y = Math.floor(Math.random() * Math.floor(c.height));
            var z = bivariateNormal(x/c.width, y/c.height, meanX.getValue(), meanY.getValue(),stdX.getValue(), stdY.getValue(), corrCoeff.getValue());
            mat.ucharPtr(y, x)[0] = z*255/maxZ;
        }
        cv.imshow(c, mat);
    }

    class Slider{
        constructor(name, parentId, min, max, step=1){

            const me = this;
            me.name = name;
            me.parent = document.getElementById(parentId);
            me.step = step;
            me.min = min;
            me.max = max;

            me.createElement();
            me.slider = document.getElementById(me.name);
            me.output = document.getElementById(me.name+"Out");

            me.output.innerHTML = me.slider.value;
            me.slider.oninput = function f(){
                me.output.innerHTML = me.slider.value;
                draw();
            };
        }

        getValue(){
            return parseFloat(this.slider.value);
        }
        createElement(){
            const me = this;
            var sliderHTML = `
                <div class="slidecontainer">
                    <input type="range" min="${me.min}" max="${me.max}" value="${(me.min+me.max)/2}" step=${me.step} class="slider" id="${me.name}">
                    <p>${me.name}: <span id="${me.name + 'Out'}"></span></p>
                </div>`;
            me.parent.insertAdjacentHTML('beforeend', sliderHTML);
        }
    }

    var c = document.getElementById("canvas1");
    var ctx = c.getContext("2d");

    c.height = c.width / math.phi;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, c.width, c.height);

    const meanX = new Slider("meanX", "canvasControls", 0, 1, 0.01);
    const meanY = new Slider("meanY", "canvasControls", 0, 1, 0.01);
    const stdX = new Slider("stdX", "canvasControls", 0, 1, 0.01);
    const stdY = new Slider("stdY", "canvasControls", 0, 1, 0.01);
    const corrCoeff = new Slider("corrCoeff", "canvasControls", -1, 1, 0.01);

    draw();

</script>
