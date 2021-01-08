#include "coefficients.h"

istream& operator >> (istream& is, Coefficients& coeffs){
	is >> coeffs.c_bottom >> coeffs.c_top >> coeffs.m_damper >> coeffs.m_body
		>> coeffs.bottom_length >> coeffs.top_length >> coeffs.Amp >> coeffs.freq;
	return is;
}
