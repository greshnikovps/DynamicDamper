#pragma ones

#include <iostream>
#include <string>
#include "coordinates.h"
#include "coefficients.h"
#include <vector>

using namespace std;

void printMessage(const string& msg);
double readSimulTime();
void Draw(const vector<Coordinates>& coords);
void readCoeffs(Coefficients& coeffs);
