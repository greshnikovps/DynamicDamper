#include "graphic.h"

void printMessage(const string& msg){
	cout << msg;
}

double readSimulTime(){
	double sim_time = 30;
//	cout << "введите время: ";
//	cin >> sim_time;
	return sim_time;
}

void Draw(const vector<Coordinates>& coords){
	// todo
}

void readCoeffs(Coefficients& coeffs){
	cout << "koefs are read" << endl;
	coeffs.c_bottom = 100;
	coeffs.c_top = 100;
	coeffs.m_damper = 1;
	coeffs.m_body = 1;
	coeffs.bottom_length = 1;
	coeffs.top_length = 1;
	coeffs.Amp = 500000;
	coeffs.freq = 5;
//	cout << "Введите коэффициенты: (8 штук) :";
//	cin >> coeffs;
	if (false){
		throw invalid_argument("invalid coeffs");
	}
}
