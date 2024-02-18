console.log('create webGL env');
// Get the WebGL rendering context
const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    console.error("WebGL not supported, falling back on experimental-webgl");
    gl = canvas.getContext("experimental-webgl");
}

if (!gl) {
    alert("Your browser does not support WebGL");
}

// Define vertex and fragment shaders
const vertexShaderSource = `
    attribute vec3 position;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0, 0.02, 0.0, 1.0);
    }
`;

// Create shader objects
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Vertex shader compilation error:", gl.getShaderInfoLog(vertexShader));
}
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Fragment shader compilation error:", gl.getShaderInfoLog(fragmentShader));
}
// Create shader program
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);

if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error("Shader program linking error:", gl.getProgramInfoLog(shaderProgram));
}
gl.useProgram(shaderProgram);

// Define vertex data
const vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
];


// Create vertex buffer
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Get attribute location and enable it
const positionAttributeLocation = gl.getAttribLocation(shaderProgram, "position");
gl.enableVertexAttribArray(positionAttributeLocation);

// Point attribute to the vertex buffer
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

const projectionMatrix = mat4.create();
const fieldOfView = Math.PI / 4;
const aspect = canvas.width / canvas.height;
const zNear = 0.1;
const zFar = 100.0;
mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

const modelViewMatrix = mat4.create();

let angle = 0;
let then = 0;

function drawScene(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    angle += deltaTime;
    mat4.identity(modelViewMatrix);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);
    mat4.rotate(modelViewMatrix, modelViewMatrix, angle, [0, 1, 0]);

    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "modelViewMatrix"), false, modelViewMatrix);
    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "projectionMatrix"), false, projectionMatrix);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 8, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 12, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 16, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 20, 4);

    requestAnimationFrame(drawScene);
}

requestAnimationFrame(drawScene);

// Clear the canvas and draw the triangle
// gl.clearColor(0.0, 0.0, 0.0, 1.0);
// gl.clear(gl.COLOR_BUFFER_BIT);
// gl.drawArrays(gl.TRIANGLES, 0, 3);
