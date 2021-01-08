#include "DynamicDamper.h"

using namespace std;

DynamicDamper::DynamicDamper(const Coefficients& _coeffs) : coeffs(_coeffs){
	body = {0, 0};
	damper = {1, 0};
	cout << "Damper is successfully initialised" << endl;
}

void DynamicDamper::ClacCoordinates(double simulation_time, vector<Coordinates>& coords){
	//double v_dam = 0;
	//double v_body = 0;
	double y_dam = coeffs.bottom_length + coeffs.top_length;
	double y_body = coeffs.bottom_length;

	double t = 0;
	double dt = simulation_time / static_cast<double>(coords.size());

	double x1 = 0;
	double x2 = 0;
	const double& m1 = coeffs.m_body;
	const double& m2 = coeffs.m_damper;
	const double& c1 = coeffs.c_bottom;
	const double& c2 = coeffs.c_top;
	const double& l1 = coeffs.bottom_length;
	const double& l2 = coeffs.top_length;
	const double& p = coeffs.freq;
	const double& Q0 = coeffs.Amp;
	double delta_p2 = (m1-p*p*(c1+c2))*(m2-c2*p*p)-c2*c2;
	cout << delta_p2 << endl;
	for (size_t i = 0; i < coords.size(); ++i){
//        v_body += (coeffs.c_top * (y_dam - y_body - coeffs.top_length)
//        		- coeffs.c_bottom * (y_body - coeffs.bottom_length
//        							- y_dam - y_body - coeffs.top_length)
//        		+ coeffs.Amp * sin(coeffs.freq * t))
//        				/ coeffs.m_body * dt;
//        v_dam  += -coeffs.c_top * (y_dam - y_body - coeffs.top_length)
//        		/ coeffs.m_damper * dt;
//	    y_dam += v_dam * dt;
//	    y_body += v_body * dt;

		// знаки???
		//x1 = (l1 - y_body);
		//x2 = (l2 + l1 - y_dam);

		//v_body -= (-c1 * x1 + c2 * (x2 - x1) + Q0 * sin(p * t)) / m1 * dt;
		//v_dam -= -c2 * (x2 - x1) * dt / m2;

		//y_body += v_body * dt;
		//y_dam += v_dam * dt;
	    x1 = Q0 * (c2 - p * p * m2) * sin(p*t) / delta_p2;
	    x2 = Q0 * c2 * sin(p*t) / delta_p2;
		t += dt;
		y_dam = l1 + l2 - x2;
		y_body = l1 - x1;
		coords[i] = {y_dam, y_body};
	}
}
