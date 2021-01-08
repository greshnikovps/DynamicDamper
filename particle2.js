function MainParticle(canvas) {
    // ��������������� ���������
    var context    = canvas.getContext("2d");  // �� context ���������� ���������
	
   //  ������� ��������	
    const Pi = 3.1415926;                   // ����� "��"
    const m0 = 1;                           // ������� �����
    const T0 = 1;                           // ������� ������� (������ ��������� �������� �������)
    const a0 = 1;                           // ������� ���������� (������� ����)

    const g0 = a0 / T0 / T0;                // ������� ��������� (���������, ��� ������� �� T0 ����� �������� ���������� a0)
    const k0 = 2 * Pi / T0;                 // ������� �������
    const C0 = m0 * k0 * k0;                // ������� ���������
	var scale1 = 0.5;
	var scale2 = 0.5;
	var coil = 7;
	var coil2 = 5;
	var t = 0;
	var qq = 0;
    // *** ������� ���������� ���������� ***
	var xShift= 0;
    const Ny = 15;                           // ����� �����, ������������ �� ��������� � ���� (������ ������ ���� ������������ ������� ����)
    const Nx = 15;							 // ����� �����, ������������ �� ��������� � ���� (������ ������ ���� ������������ ������� ����)
	const l1 =  11*a0;						// ����� ������ �������
	const l2 =  2*a0;						// ����� ������ �������
	var m1 = 5 * m0;  						// ����� ������� ����
	var m2 = 5 * m0; 						// ����� ������� ����
    const Cwall = 10 * C0;                  // ��������� ����
    const r = 1 * a0;                     // ������ ������� � ��������� �����������
	var c1 = 100;                    	    // "���������" �������� 1
	var c2 = 100;                     		// "���������" �������� 1
	var vx0 = 0 * a0/T0;					//��������� ��������
	var E = 0;								//������� �������
	var Vmax = 0; var Mmin = 0; var Vprov = 0;
	var dby, dcy, bc, cc;
	var p = 3;
	

	//*** �������� �������� ��������� � ��������� �����***
	Text_m1.value  = m1;
	Text_p.value  = p;
	Text_c1.value  = c1;
		
	Slider_m1.min = 0.1;          
    Slider_m1.max = 10;
    Slider_m1.step = 0.1;
    Slider_m1.value = Text_m1.value; 
	
	Slider_p.min = 1;          
    Slider_p.max = 5;
    Slider_p.step = 0.01;
    Slider_p.value = Text_p.value; 
	
	Slider_c1.min = 1;     
	Slider_c1.max = 200;
	Slider_c1.step = 1;
	Slider_c1.value = Text_c1.value; 	
	
    // *** ������� �������������� ���������� ***

    const fps = 550;                         // frames per second - ����� ������ � ������� (����c��� �����������)
    const spf = 260;                        // steps per frame   - ����� ����� �������������� ����� ������� (�������� �������)
    const dt  = 0.01 * T0 / fps;           // ��� �������������� 
	
	// ������� �������� ��� ���������
	const scale    = canvas.height / Ny * a0;  // ���������� ����������� ��� �������� �� ��������� � �������� �����������
	
    var w = canvas.width / scale;		 // ������ ���� � ��������� �����������
	var h = canvas.height / scale;       // ������ ���� � ��������� �����������

	
    // -------------------------------         ���������� ���������              ------------------------------------------
	// ���������� ���� 1
    var b = [];
	var time = 1;
	b.y  = l1-h/2;            b.x   = h / 2;   // ��������� ���������� ����
	b.y_ = b.y;              b.x_  = b.x; 
	b.fy = 0;                b.vy = 0;               // ��������� ��������
	// ���������� ���� 2
	var c = [];
	c.y  = l2 + l1 - h/2;    		 c.x   = h / 2;   // ��������� ���������� ����
	c.y_ = c.y;              c.x_  = c.x; 
	c.fy = 0;              	c.vy = 0;                // ��������� ��������

	
	// ����� ����� 
	var origin = [];
	origin.x = w/2;	origin.y = h/2;
	// ������ 
	var wall1 = [];
	wall1.x = w/2 ;	wall1.y = h/2;

	// �������� ���� ���������
	setInterval(control, 1500 / fps);  // ������� control ���������� � ��������, ������������ ������ ����������
	
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------           ����������� ���� �������              -----------------------------------
// ---------------------------------------------------------------------------------------------------------------------
	
 
	function control() 
	{
        physics(); // ������ spf ����� ��������������
		draw();
		
    }

	this.set_m1 = function(input) 
	{
		m1 = Number(input);���
    context.clearRect(0, 0, w * scale, h* scale);      
	}
	
	this.set_c1 = function(input) 
	{
		c1 = Number(input);���
    context.clearRect(0, 0, w * scale, h* scale);      		
	}
	
	
	this.set_p = function(input) 
	{;
		p = Number(input);���
    context.clearRect(0, 0, w * scale, h* scale);      
}

	
    // �������, �������� spf ����� ��������������
    function physics()
	{     
        b.y_ = b.y;  b.vy_= b.vy;									//���������� ������ ���������� � ��������
		c.y_ = c.y;  c.vy_= c.vy;
		E_ = E;

			for (var s = 1; s <= spf; s++) 	
			{
			b.vy  +=  (c2*(-b.y + c.y - l2) - c1*(b.y - l1 + h/2))/m1*dt ; //������ �������� ������� ����
			c.vy  += -c2*(c.y - b.y - l2)/m2*dt - 3*Math.sin(p*t)/m2*dt;					//������ �������� ������� ����
			//document.getElementById('text').innerHTML = '<b>'+(h/2-c.y-l2)+' </b>';
			wall1.y = h/2 + Math.sin(p*t);
			if (Math.abs(c1/m1 - Math.pow(p,2)) <= 0.02) {
			b.y += b.vy*dt;// - Math.sin(p*t);
			c.y = l2 + l1 - h/2 + Math.sin(p*t);
			}
			else 
			{
			b.y += b.vy*dt;											//������ ���������� ������� ����
			c.y += c.vy*dt;											//������ ���������� ������� ����	
			}
			E = 0.5*(m1*b.vy*b.vy + m2*c.vy*c.vy)+0.5*c2*(c.y - b.y -l2)*(c.y - b.y -l2)+0.5*c1*(b.y-l1)*(b.y - l1); //������ ������� �������
			t += dt;
			//Vprov = Math.max(b.vx, c.vx);
			//if ((Vprov) > Vmax) Vmax = b.vx;	   

			}
	  
	   time = time + 1;
	   
    }
	
    // ����������� �������, �������� �������, ������ � �������
    
    function draw() //�������, �������� ����, ������ � �������
	{
			context.clearRect(0, 0, w * scale, h * scale);      // �������� �����
           
		    // �����, ����������� ������ ������� �� �������
		   	context.beginPath();
            for (var i = 0; i <= coil; i++ ) {
            var x;
            var y;
            if (i != coil + 1) {
                y = c.y*scale + ((b.y - c.y))*scale/coil*i;
                x = canvas.width/2 + ((i%2==0)?-1:1)*8 + (b.x - a0)/coil*i;
            } else {
                y = c.y*scale + ((b.y - c.y))*scale/coil*(i+1);
                x = canvas.width/2 + ((i%2==0)?1:-1)*8 +  (b.x - a0)/coil*(i+1);
            }
            context.lineTo(x, y);
			}
			context.stroke();
			// �����, ����������� ������ ������� �� ������
		   	context.beginPath();
            for (var i = 0; i <= coil2; i++ ) {
            var x;
            var y;
            if (i != coil2 + 1) {
                y = wall1.y*scale + ((c.y - wall1.y))*scale/coil2*i;
                x = canvas.width/2 + ((i%2==0)?-1:1)*8 + (b.x - a0)/coil*i;
            } else {
                y = wall1.y*scale + ((c.y - wall1.y))*scale/coil2*(i+1);
                x = canvas.width/2 + ((i%2==0)?1:-1)*8 +  (b.x - a0)/coil*(i+1);
            }
            context.lineTo(x, y);
			}
			context.stroke();			// ������ 
			context.moveTo((wall1.x+a0)*scale, wall1.y *scale );
			context.lineTo((wall1.x-a0)*scale, wall1.y*scale );	
			context.closePath();
			context.stroke();
			
			// ������� ������
			context.fillStyle = "#FF0A47";
			context.beginPath();
            context.arc(c.x * scale, c.y * scale, 0.5*r * scale, 0,  2*Math.PI, false);
			context.fill();
			//������� ������
			context.fillStyle = "#0AC2FF";
			context.beginPath();
            context.arc(b.x * scale, b.y * scale, 0.5*r * scale, 0,  2*Math.PI, false);
			context.fill();
			
			
    }
	 
 
}