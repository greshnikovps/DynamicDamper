#pragma ones

#include <iostream>
#include <fstream>
#include <vector>
#include "Coordinates.h"

using namespace std;

template <typename Iterator>
void writeRangeToFile(Iterator begin, Iterator end, string pathToFile);
void writeVectorToFile(const vector<Coordinates>& coords, string pathToFile);
