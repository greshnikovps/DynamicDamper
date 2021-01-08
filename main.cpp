#include <iostream>
#include "DynamicDamper.h"
#include "graphic.h"
#include "file_writer.h"

using namespace std;

int main(){
	double step = 0.01;
	Coefficients coeffs;
	try {
		readCoeffs(coeffs);
		DynamicDamper dd(coeffs);

		double simul_time = readSimulTime();
		vector<Coordinates> coords(static_cast<int>(simul_time / step));
		dd.ClacCoordinates(simul_time, coords);

		string pathToFile = "output_coordinates.txt";

//		bool firstFlag = true;
//		for (auto el : coords){
//			if (!firstFlag){
//				cout << ", ";
//				cout << el.damper_coord;
//			} else {
//				cout << el.damper_coord;
//				firstFlag = false;
//			}
//		}
//		cout << endl;
//		firstFlag = true;
//		for (auto el : coords){
//			if (!firstFlag){
//				cout << ", ";
//				cout << el.body_coord;
//			} else {
//				cout << el.body_coord;
//				firstFlag = false;
//			}
//		}

		//writeRangeToFile(coords.begin(), coords.end(), pathToFile);
		writeVectorToFile(coords, pathToFile);
		cout << "File successfully filled!" << endl;

	} catch (invalid_argument& ia) {
		printMessage(ia.what());
	}
	return 0;
}
