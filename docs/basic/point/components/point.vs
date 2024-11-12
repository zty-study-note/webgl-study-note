attribute vec2 a_position;
uniform vec2 screenSize;

void main(){
    
    float x=a_position.x*2./screenSize.x-1.;
    float y=1.-(a_position.y*2./screenSize.y);
    
    gl_Position=vec4(x,y,0.,1.);
    gl_PointSize=10.;
}

