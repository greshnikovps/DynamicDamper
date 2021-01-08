#pragma once

#include <vector>
#include "coordinates.h"
#include "coefficients.h"
#include "coordinates.h"
#include <cmath>

using namespace std;

class Body{
public:
	Body(double _coord, double _velocity):coord(_coord), velocity(_velocity) {}
	Body():coord(0), velocity(0) {}

	double coord;
	double velocity;
};

class DynamicDamper{
public:
	DynamicDamper(const Coefficients& _coeffs);
	void ClacCoordinates(double simulation_time, vector<Coordinates>& coords);
private:
	void UpdateBodyesCoords(const double& dt);
	const Coefficients coeffs;
	Body damper;
	Body body;
};
