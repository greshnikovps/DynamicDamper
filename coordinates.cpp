#include "coordinates.h"

ostream& operator << (ostream& os, const Coordinates& coords){
	os << coords.damper_coord << ';' << coords.body_coord;
	return os;
}



