//#pragma ones
#ifndef COEFFS
#define COEFFS

#include <iostream>
#include <stdexcept>

using namespace std;

struct Coefficients{
	double c_bottom;
	double c_top;
	double m_damper;
	double m_body;
	double bottom_length;
	double top_length;
	double Amp;
	double freq;
};

istream& operator >> (istream& is, Coefficients& coeffs);

#endif
