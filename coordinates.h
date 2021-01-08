//#pragma ones
#ifndef COORDS
#define COORDS

#include <iostream>

using namespace std;

struct Coordinates{
	double damper_coord;
	double body_coord;
};
#endif

ostream& operator << (ostream& os, const Coordinates& coords);

